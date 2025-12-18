/**
 * Extract UNWTO Tourism Data with COVID-aware year selection
 *
 * Logic:
 * 1. Use the most recent year available
 * 2. If the most recent year is 2020-2022 (COVID years), prefer 2019 if available
 * 3. Convert from thousands to millions for consistency with our scoring
 */

const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

const COVID_YEARS = [2020, 2021, 2022]

function extractTourismData() {
  const xlsxPath = path.join(
    process.env.HOME,
    'Downloads/UN_Tourism_bulk_data_download_10_2025/02_Inbound/01_Total_arrivals/UN_Tourism_inbound_arrivals_10_2025.xlsx'
  )

  console.log('Reading UNWTO Excel file...')
  const workbook = XLSX.readFile(xlsxPath)
  const sheet = workbook.Sheets['Data']
  const data = XLSX.utils.sheet_to_json(sheet)

  // Filter for overnight tourists only
  const tourists = data.filter(row => row.indicator_code === 'INBD_TRIP_TOTL_TOTL_TOUR')

  console.log(`Found ${tourists.length} tourist arrival records`)

  // Group by country with all years
  const countryYears = {}
  tourists.forEach(row => {
    const country = row.reporter_area_label
    const year = parseInt(row.year)
    const value = parseFloat(row.value)

    if (!isNaN(value) && value > 0) {
      if (!countryYears[country]) {
        countryYears[country] = {}
      }
      countryYears[country][year] = value
    }
  })

  // Country name mapping (UN names -> our passport data names)
  const countryNameMap = {
    'United States of America': 'United States',
    'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom',
    'Russian Federation': 'Russia',
    'Korea, Republic of': 'South Korea',
    'Korea, Democratic People\'s Republic of': 'North Korea',
    'China, Hong Kong SAR': 'Hong Kong',
    'China, Macao SAR': 'Macau',
    'Taiwan, Province of China': 'Taiwan',
    'Iran, Islamic Republic of': 'Iran',
    'Venezuela, Bolivarian Republic of': 'Venezuela',
    'Bolivia, Plurinational State of': 'Bolivia',
    'Syrian Arab Republic': 'Syria',
    'Lao People\'s Democratic Republic': 'Laos',
    'Viet Nam': 'Vietnam',
    'Czechia': 'Czech Republic',
    'Türkiye': 'Turkey',
    'Côte d\'Ivoire': 'Ivory Coast',
    'Congo, Democratic Republic of the': 'DR Congo',
    'Congo': 'Congo',
    'Tanzania, United Republic of': 'Tanzania',
    'State of Palestine': 'Palestine',
    'Brunei Darussalam': 'Brunei',
    'Timor-Leste': 'Timor-Leste',
    'Eswatini': 'Eswatini',
    'North Macedonia': 'North Macedonia',
    'Moldova, Republic of': 'Moldova',
    'Micronesia, Federated States of': 'Micronesia',
    'Micronesia (Federated States of)': 'Micronesia',
    'Republic of Korea': 'South Korea',
    'Netherlands (Kingdom of the)': 'Netherlands',
    'Cabo Verde': 'Cape Verde',
    'China, Hong Kong Special Administrative Region': 'Hong Kong',
    'China, Macao Special Administrative Region': 'Macau',
    'Taiwan Province of China': 'Taiwan',
    'Iran (Islamic Republic of)': 'Iran',
    'Venezuela (Bolivarian Republic of)': 'Venezuela',
    'Bolivia (Plurinational State of)': 'Bolivia',
    'Democratic Republic of the Congo': 'DR Congo',
    'United Republic of Tanzania': 'Tanzania',
    'Republic of Moldova': 'Moldova'
  }

  // Build result with COVID-aware year selection
  const result = {
    _metadata: {
      source: 'UN Tourism (UNWTO) Inbound Arrivals Dataset',
      downloadUrl: 'https://www.unwto.org/tourism-statistics/key-tourism-statistics',
      dataFile: 'UN_Tourism_inbound_arrivals_10_2025.xlsx',
      unit: 'millions of international tourist arrivals (overnight visitors)',
      yearSelectionLogic: 'Most recent year available, except prefer 2019 over 2020-2022 (COVID years)',
      extractedAt: new Date().toISOString()
    },
    data: {},
    yearInfo: {} // Track which year was used for each country
  }

  Object.keys(countryYears).forEach(unCountry => {
    const years = countryYears[unCountry]
    const availableYears = Object.keys(years).map(Number).sort((a, b) => b - a)
    const latestYear = availableYears[0]

    let selectedYear = latestYear
    let selectedValue = years[latestYear]

    // COVID-aware logic: if latest is 2020-2022 and 2019 exists, prefer 2019
    if (COVID_YEARS.includes(latestYear) && years[2019]) {
      selectedYear = 2019
      selectedValue = years[2019]
    }

    // Map country name
    const country = countryNameMap[unCountry] || unCountry

    // Convert from thousands to millions (divide by 1000)
    const valueInMillions = Math.round(selectedValue / 1000 * 10) / 10 // One decimal place

    result.data[country] = valueInMillions
    result.yearInfo[country] = {
      year: selectedYear,
      latestAvailable: latestYear,
      covidAdjusted: COVID_YEARS.includes(latestYear) && selectedYear === 2019
    }
  })

  // Sort by value for readability
  const sortedData = {}
  Object.keys(result.data)
    .sort((a, b) => result.data[b] - result.data[a])
    .forEach(k => sortedData[k] = result.data[k])
  result.data = sortedData

  return result
}

// Run extraction
const result = extractTourismData()

// Save to data directory
const outputPath = path.join(__dirname, '../data/unwto-tourism-2023.json')
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

console.log(`\nSaved ${Object.keys(result.data).length} countries to ${outputPath}`)

// Show top 20 and some interesting cases
console.log('\nTop 20 destinations:')
const entries = Object.entries(result.data).slice(0, 20)
entries.forEach(([country, value], i) => {
  const info = result.yearInfo[country]
  const covidNote = info.covidAdjusted ? ' (2019, COVID-adjusted)' : ''
  console.log(`  ${i + 1}. ${country}: ${value}M (${info.year})${covidNote}`)
})

// Show COVID-adjusted countries
console.log('\nCOVID-adjusted countries (using 2019 instead of 2020-2022):')
Object.entries(result.yearInfo)
  .filter(([_, info]) => info.covidAdjusted)
  .slice(0, 15)
  .forEach(([country, info]) => {
    console.log(`  ${country}: using 2019 (latest was ${info.latestAvailable})`)
  })
