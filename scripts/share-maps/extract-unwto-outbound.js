/**
 * Extract UN Tourism outbound departures (overnight tourists) to JSON.
 * Same COVID-aware year selection as extract-unwto-data.js:
 * most recent year, but prefer 2019 over 2020-2022.
 * Falls back to total visitors (VSTR) for countries with no TOUR series.
 *
 * Input: /tmp/unwto-outbound.xlsx (UN_Tourism_outbound_departures_12_2025.xlsx)
 * Output: data/unwto-outbound-departures.json (millions of trips)
 */
const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

const COVID_YEARS = [2020, 2021, 2022]
const wb = XLSX.readFile('/tmp/unwto-outbound.xlsx')
const rows = XLSX.utils.sheet_to_json(wb.Sheets['Data'])

function seriesFor(code) {
  const byCountry = {}
  rows.filter(r => r.indicator_code === code).forEach(r => {
    const v = parseFloat(r.value)
    if (isNaN(v) || v <= 0) return
    ;(byCountry[r.reporter_area_label] ||= {})[parseInt(r.year)] = v / 1000 // thousands -> millions
  })
  return byCountry
}

function pick(years) {
  const ys = Object.keys(years).map(Number)
  let best = Math.max(...ys)
  if (COVID_YEARS.includes(best) && ys.includes(2019)) best = 2019
  return { year: best, value: Math.round(years[best] * 100) / 100 }
}

const tour = seriesFor('OUTB_TRIP_TOTL_TOTL_TOUR')
const vstr = seriesFor('OUTB_TRIP_TOTL_TOTL_VSTR')

const out = {}
const sources = { ...vstr, ...tour } // TOUR wins where both exist
for (const [country, years] of Object.entries(sources)) {
  out[country] = { ...pick(years), series: tour[country] ? 'tourists' : 'visitors' }
}

const result = {
  _metadata: {
    source: 'UN Tourism (UNWTO) Outbound Departures Dataset',
    downloadUrl: 'https://www.unwto.org/tourism-statistics/tourism-data-outbound-tourism',
    dataFile: 'UN_Tourism_outbound_departures_12_2025.xlsx',
    unit: 'millions of outbound overnight trips (visitor trips where tourist series missing)',
    yearSelectionLogic: 'Most recent year available, except prefer 2019 over 2020-2022 (COVID years)',
    extractedAt: new Date().toISOString(),
  },
  data: out,
}

const dest = path.join(__dirname, '../../data/unwto-outbound-departures.json')
fs.writeFileSync(dest, JSON.stringify(result, null, 1))
const sorted = Object.entries(out).sort((a, b) => b[1].value - a[1].value)
console.log(`${sorted.length} countries ->`, dest)
console.log(sorted.slice(0, 15).map(([c, v]) => `${c}: ${v.value}M (${v.year})`).join('\n'))
