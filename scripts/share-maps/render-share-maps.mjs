/**
 * Render the three Open Door Index share maps (PNG, 3200x2000) for
 * MapPorn / dataisbeautiful launch posts.
 *
 *   1. hospitality-balance  - who holds the door vs who walks through
 *   2. hosts-and-guests     - inbound vs outbound tourism
 *   3. open-door-index      - passport strength, our metric, annotated
 *
 * Run from the aiandtractors repo root:
 *   node scripts/share-maps/render-share-maps.mjs
 * Requires share-maps/map-data.json (compute-map-data.py).
 */
import fs from 'fs'
import path from 'path'
import url from 'url'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature as topoFeature } from 'topojson-client'
import { chromium } from 'playwright'

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, 'share-maps')
const DATA = JSON.parse(fs.readFileSync(path.join(OUT, 'map-data.json')))
const world = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/open-door/countries-110m.json')))

// Same alias table as pages/passport-ranking.js (world-atlas -> dataset names)
const MAP_ALIASES = {
  'United States of America': 'United States', 'Russian Federation': 'Russia',
  'Republic of Korea': 'South Korea', "Dem. People's Republic of Korea": 'North Korea',
  'Dem. Rep. Korea': 'North Korea', 'Korea': 'South Korea',
  "Côte d'Ivoire": 'Ivory Coast', "Cote d'Ivoire": 'Ivory Coast',
  'Czechia': 'Czech Republic', 'Czech Rep.': 'Czech Republic',
  'Bosnia and Herz.': 'Bosnia and Herzegovina', 'Eswatini': 'Swaziland', 'eSwatini': 'Swaziland',
  'Macedonia': 'North Macedonia', 'Dominican Rep.': 'Dominican Republic',
  'Central African Rep.': 'Central African Republic', 'Eq. Guinea': 'Equatorial Guinea',
  'S. Sudan': 'South Sudan', 'Solomon Is.': 'Solomon Islands', 'Cabo Verde': 'Cape Verde',
  'Burma': 'Myanmar', 'Lao PDR': 'Laos', "Lao People's Dem. Rep.": 'Laos',
  'United Rep. of Tanzania': 'Tanzania', 'United Republic of Tanzania': 'Tanzania',
  'Viet Nam': 'Vietnam', 'Brunei Darussalam': 'Brunei', 'Iran (Islamic Republic of)': 'Iran',
  'Syrian Arab Republic': 'Syria', 'State of Palestine': 'Palestine', 'West Bank': 'Palestine',
  'Republic of the Congo': 'Congo', 'Democratic Republic of the Congo': 'DR Congo',
  'Dem. Rep. Congo': 'DR Congo', 'Falkland Is.': null, 'Falkland Islands': null,
  'Greenland': null, 'Antarctica': null, 'W. Sahara': null, 'Western Sahara': null,
  'Fr. S. Antarctic Lands': null, 'N. Cyprus': null, 'Republic of Serbia': 'Serbia',
  'Vatican City': 'Vatican', 'Holy See': 'Vatican',
  'São Tomé and Principe': 'Sao Tome and Principe',
  'St. Lucia': 'Saint Lucia', 'St. Vin. and Gren.': 'Saint Vincent and the Grenadines',
  'St. Kitts and Nevis': 'Saint Kitts and Nevis', 'Antigua and Barb.': 'Antigua and Barbuda',
  'New Caledonia': null, 'Puerto Rico': null, 'Timor-Leste': 'Timor-Leste',
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------
const MAP_W = 1520, MAP_H = 740
const fc = topoFeature(world, world.objects.countries)
fc.features = fc.features.filter(f => (f.properties?.name) !== 'Antarctica')
const proj = geoNaturalEarth1().fitSize([MAP_W, MAP_H], fc)
const pathGen = geoPath(proj)

function datasetName(feat) {
  const raw = feat.properties && (feat.properties.name || feat.properties.NAME)
  return MAP_ALIASES.hasOwnProperty(raw) ? MAP_ALIASES[raw] : raw
}

// centroid of the largest polygon (so France isn't pulled by Guiana, USA by Alaska)
function anchorOf(name) {
  const feat = fc.features.find(f => datasetName(f) === name)
  if (!feat) return null
  let geom = feat.geometry
  if (geom.type === 'MultiPolygon') {
    let best = null, bestArea = -1
    for (const coords of geom.coordinates) {
      const poly = { type: 'Polygon', coordinates: coords }
      const a = pathGen.area(poly)
      if (a > bestArea) { bestArea = a; best = poly }
    }
    geom = best
  }
  return pathGen.centroid(geom)
}

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => {
  const A = hex2rgb(a), B = hex2rgb(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`
}
// diverging: t in [-1, 1], negative -> negColor, positive -> posColor
const diverge = (t, negC, posC, midC = '#f6f5f2') =>
  t < 0 ? mix(midC, negC, Math.min(1, -t)) : mix(midC, posC, Math.min(1, t))

const NO_DATA = '#e4e4e7'
const INDIGO = '#5e6ad2', ORANGE = '#c4612a'
const GREEN = '#1d7a4d', RED = '#b3362a'

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
const fmtM = m => m >= 1000 ? (m / 1000).toFixed(2).replace(/0$/, '') + 'B' : Math.round(m) + 'M'

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------------------------------------------------------------------------
// SVG building blocks
// ---------------------------------------------------------------------------
function countryPaths(fillFor) {
  return fc.features.map(feat => {
    const name = datasetName(feat)
    const fill = (name && DATA.countries[name]) ? fillFor(name, DATA.countries[name]) : NO_DATA
    return `<path d="${pathGen(feat)}" fill="${fill}" stroke="#ffffff" stroke-width="0.6"/>`
  }).join('\n')
}

// annotation: halo text + leader line to country anchor
// a = { name, lines: [bold, normal...], lx, ly, align }  (lx/ly = label pos in map coords)
function annotation(a) {
  const anchor = anchorOf(a.name)
  if (!anchor) { console.warn('no anchor for', a.name); return '' }
  const [ax, ay] = anchor
  const align = a.align || 'start'
  const lineH = 21
  const text = a.lines.map((ln, i) =>
    `<text x="${a.lx}" y="${a.ly + i * lineH}" text-anchor="${align}"
       font-size="${i === 0 ? 17 : 14.5}" font-weight="${i === 0 ? 700 : 400}"
       fill="${i === 0 ? '#1c1d22' : '#4a4b55'}"
       paint-order="stroke" stroke="#fbfaf8" stroke-width="5" stroke-linejoin="round">${esc(ln)}</text>`
  ).join('')
  // Leader attaches to whichever edge of the label block faces the anchor.
  const estW = Math.max(...a.lines.map(l => l.length)) * 7.2
  const left = align === 'end' ? a.lx - estW : a.lx
  const right = align === 'end' ? a.lx : a.lx + estW
  const top = a.ly - 14, bottom = a.ly + (a.lines.length - 1) * lineH + 4
  let sx, sy
  if (ax > left - 20 && ax < right + 20 && ay > bottom) {        // anchor below
    sx = Math.max(left + 10, Math.min(right - 10, ax)); sy = bottom + 2
  } else if (ax > left - 20 && ax < right + 20 && ay < top) {    // anchor above
    sx = Math.max(left + 10, Math.min(right - 10, ax)); sy = top - 2
  } else if (ax < left) {                                        // anchor left
    sx = left - 8; sy = (top + bottom) / 2
  } else {                                                       // anchor right
    sx = right + 8; sy = (top + bottom) / 2
  }
  return `<g>
    <line x1="${sx}" y1="${sy}" x2="${ax}" y2="${ay}" stroke="#1c1d22" stroke-width="1.1" opacity="0.55"/>
    <circle cx="${ax}" cy="${ay}" r="3.4" fill="#1c1d22" opacity="0.85"/>
    ${text}
  </g>`
}

function gradientLegend({ id, x, y, w, stops, leftLabel, midLabel, rightLabel, title }) {
  const stopsSvg = stops.map(([off, c]) => `<stop offset="${off}" stop-color="${c}"/>`).join('')
  return `<g>
    ${title ? `<text x="${x}" y="${y - 12}" font-size="13" font-weight="700" letter-spacing="0.08em" fill="#6c6e77">${esc(title)}</text>` : ''}
    <defs><linearGradient id="${id}" x1="0" x2="1">${stopsSvg}</linearGradient></defs>
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="3" fill="url(#${id})" stroke="rgba(0,0,0,0.08)"/>
    <text x="${x}" y="${y + 32}" font-size="13.5" fill="#4a4b55">${esc(leftLabel)}</text>
    ${midLabel ? `<text x="${x + w / 2}" y="${y + 32}" font-size="13.5" fill="#4a4b55" text-anchor="middle">${esc(midLabel)}</text>` : ''}
    <text x="${x + w}" y="${y + 32}" font-size="13.5" fill="#4a4b55" text-anchor="end">${esc(rightLabel)}</text>
  </g>`
}

function page({ file, eyebrow, title, subtitle, mapSvg, cornerCard = '', footer }) {
  const W = 1600, H = 1000
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; background: #fbfaf8; font-family: Inter, -apple-system, sans-serif; overflow: hidden; }
  .frame { width: 100%; height: 100%; padding: 44px 40px 20px; display: flex; flex-direction: column; }
  .eyebrow { font-family: 'DotGothic16', monospace; font-size: 15px; letter-spacing: 0.22em; color: #5e6ad2; margin-bottom: 10px; }
  h1 { font-size: 41px; font-weight: 800; letter-spacing: -0.02em; color: #1c1d22; margin-bottom: 10px; max-width: 1090px; }
  .sub { font-size: 17.5px; line-height: 1.45; color: #4a4b55; max-width: 1080px; }
  .mapwrap { flex: 1; position: relative; margin-top: 4px; min-height: 0; }
  .mapwrap svg { position: absolute; inset: 0; }
  .footer { display: flex; justify-content: space-between; font-size: 13px; color: #8a8b94; padding-top: 6px; border-top: 1px solid rgba(0,0,0,0.07); }
  .footer b { color: #5e6ad2; font-weight: 700; }
  .corner-card { position: absolute; top: 40px; right: 40px; width: 400px; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 16px 18px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .corner-card .cc-title { font-family: 'DotGothic16', monospace; font-size: 12px; letter-spacing: 0.12em; color: #5e6ad2; margin-bottom: 8px; }
  .corner-card .cc-body { font-size: 14.5px; line-height: 1.5; color: #1c1d22; }
  .corner-card .cc-formula { margin-top: 10px; font-family: monospace; font-size: 12.5px; color: #4a4b55; background: #f6f5f2; border: 1px solid rgba(0,0,0,0.06); border-radius: 6px; padding: 6px 10px; display: inline-block; }
</style></head><body>
<div class="frame">
  <div class="eyebrow">${esc(eyebrow)}</div>
  <h1>${title}</h1>
  <div class="sub">${subtitle}</div>
  <div class="mapwrap">
    <svg viewBox="0 0 ${MAP_W} ${MAP_H + 90}" width="100%" height="100%" preserveAspectRatio="xMidYMin meet">
      ${mapSvg}
    </svg>
  </div>
  ${cornerCard}
  <div class="footer">
    <span><b>The Open Door Index</b> · aiandtractors.com/passport-ranking</span>
    <span>${esc(footer)}</span>
  </div>
</div>
</body></html>`
  fs.writeFileSync(path.join(OUT, file), html)
}

const C = DATA.countries
const WORLD_REACH = DATA.meta.worldReach   // 1466.2 M arrivals pool
const WORLD_DEP = DATA.meta.worldDep       // 1325.5 M departures pool

// ===========================================================================
// MAP 1 — Hospitality balance
// ===========================================================================
{
  // balance = log2( share of world travel welcomed / share of world travel enjoyed )
  const bal = e => {
    const give = (e.welcome / WORLD_DEP) + 1e-4
    const get = (e.reach / WORLD_REACH) + 1e-4
    return Math.log2(give / get)
  }
  const SCALE = 2 // clamp at ±2 doublings
  const fill = (name, e) => diverge(Math.max(-1, Math.min(1, bal(e) / SCALE)), RED, GREEN)

  const ann = [
    { name: 'United States', lx: 70, ly: 175, lines: [
      'United States',
      `Welcomed into ${fmtM(C['United States'].reach)} visitors’ worth of world,`,
      `holds its own door open to ${fmtM(C['United States'].welcome)}-worth.`] },
    { name: 'Burundi', lx: 870, ly: 655, lines: [
      'Burundi',
      'Holds the door for every passport on Earth.',
      `The world holds back ${fmtM(C['Burundi'].reach)}-worth.`] },
    { name: 'China', lx: 1505, ly: 75, align: 'end', lines: [
      'China',
      'The 2026 openings flipped it green: it now',
      'grants more travel than its passport gets.'] },
    { name: 'Thailand', lx: 1500, ly: 460, align: 'end', lines: [
      'Thailand',
      `Welcomes ${fmtM(C['Thailand'].welcome)}-worth of the world’s`,
      `travelers, gets ${fmtM(C['Thailand'].reach)}-worth back.`] },
    { name: 'Russia', lx: 870, ly: 75, lines: [
      'Russia',
      `Enjoys ${fmtM(C['Russia'].reach)}-worth of reach,`,
      `returns ${fmtM(C['Russia'].welcome)}-worth.`] },
    { name: 'Afghanistan', lx: 1085, ly: 565, align: 'end', lines: [
      'Afghanistan',
      'Admits almost no one freely —',
      'and is admitted almost nowhere.'] },
  ]

  page({
    file: 'map1-hospitality-balance.html',
    eyebrow: 'THE OPEN DOOR INDEX · HOSPITALITY BALANCE',
    title: 'Who holds the door open — and who just walks through',
    subtitle: `Both sides measured in travel flow, not country counts: the share of the world’s trips a country admits without a pre-arranged visa, against the share of the world’s tourist destinations its own passport gets into. <b style="color:${GREEN}">Green gives more hospitality than it receives.</b> <b style="color:${RED}">Red receives more than it gives.</b>`,
    mapSvg: countryPaths(fill) + ann.map(annotation).join('') +
      gradientLegend({
        id: 'g1', x: MAP_W / 2 - 260, y: MAP_H + 38, w: 520,
        stops: [[0, RED], [0.5, '#f6f5f2'], [1, GREEN]],
        leftLabel: 'walks through others’ doors', midLabel: 'even', rightLabel: 'holds the door open',
        title: 'HOSPITALITY GIVEN vs RECEIVED',
      }),
    footer: 'Visa data: github.com/visualpharm/visa-free-dataset, June 2026 · Travel flows: UN Tourism + World Bank, latest non-COVID year · Borders simplified; colors show tourism data, not political status',
  })
}

// ===========================================================================
// MAP 2 — Hosts and guests
// ===========================================================================
{
  const SCALE = 2.5
  const fill = (name, e) => {
    if (!(e.arr > 0) || !(e.dep > 0)) return NO_DATA
    const t = Math.max(-1, Math.min(1, Math.log2(e.arr / e.dep) / SCALE))
    return diverge(t, ORANGE, INDIGO)
  }

  const ann = [
    { name: 'Spain', lx: 435, ly: 335, lines: [
      'Spain',
      `${fmtM(C['Spain'].arr)} guests a year, ${fmtM(C['Spain'].dep)} trips out.`,
      'Europe’s living room.'] },
    { name: 'Germany', lx: 555, ly: 90, lines: [
      'Germany',
      `${fmtM(C['Germany'].dep)} trips abroad vs ${fmtM(C['Germany'].arr)} guests —`,
      'everyone’s favorite houseguest.'] },
    { name: 'China', lx: 1505, ly: 130, align: 'end', lines: [
      'China',
      `${fmtM(C['China'].dep)} trips out, ${fmtM(C['China'].arr)} guests in:`,
      'the planet’s biggest guest.'] },
    { name: 'Thailand', lx: 1500, ly: 480, align: 'end', lines: [
      'Thailand',
      `Hosts ${fmtM(C['Thailand'].arr)}, sends out ${fmtM(C['Thailand'].dep)}.`] },
    { name: 'Mexico', lx: 140, ly: 440, lines: [
      'Mexico',
      `${fmtM(C['Mexico'].arr)} in, ${fmtM(C['Mexico'].dep)} out —`,
      'a house that’s always full.'] },
    { name: 'Canada', lx: 215, ly: 90, lines: [
      'Canada',
      `${fmtM(C['Canada'].dep)} trips out vs ${fmtM(C['Canada'].arr)} in.`] },
  ]

  page({
    file: 'map2-hosts-and-guests.html',
    eyebrow: 'THE OPEN DOOR INDEX · WHO HOSTS, WHO VISITS',
    title: 'Host nations and guest nations',
    subtitle: `<b style="color:${INDIGO}">Indigo countries are hosts:</b> they receive more international tourists than their residents take trips abroad. <b style="color:${ORANGE}">Orange countries are guests:</b> they travel out more than the world comes to them. Gray: no outbound data.`,
    mapSvg: countryPaths(fill) + ann.map(annotation).join('') +
      gradientLegend({
        id: 'g2', x: MAP_W / 2 - 260, y: MAP_H + 38, w: 520,
        stops: [[0, ORANGE], [0.5, '#f6f5f2'], [1, INDIGO]],
        leftLabel: 'guest nation (travels out)', midLabel: 'balanced', rightLabel: 'host nation (welcomes in)',
        title: 'INBOUND ARRIVALS vs OUTBOUND TRIPS',
      }),
    footer: 'UN Tourism arrivals & departures (World Bank fallback), latest non-COVID year per country · Borders simplified; colors show tourism data, not political status',
  })
}

// ===========================================================================
// MAP 3 — The Open Door Index (passport strength, our method)
// ===========================================================================
{
  const max = Math.max(...Object.values(C).map(e => e.reach))
  const fill = (name, e) => mix('#f1f2f8', INDIGO, Math.min(1, e.reach / max))

  const ann = [
    { name: 'South Korea', lx: 1395, ly: 195, align: 'end', lines: [
      '#1 South Korea',
      `${fmtM(C['South Korea'].reach)} tourists’ worth of world —`,
      '99% of everywhere humans actually go.',
      'Japan and Singapore a photo finish behind.'] },
    { name: 'United States', lx: 70, ly: 200, lines: [
      `#${C['United States'].rank} United States`,
      `${fmtM(C['United States'].reach)} of reach, but a one-way door:`,
      'it gets welcomed far more than it welcomes.'] },
    { name: 'Afghanistan', lx: 1000, ly: 505, align: 'end', lines: [
      `Last: Afghanistan`,
      `${fmtM(C['Afghanistan'].reach)}-worth of world — 30× less`,
      'than the top. The map is mostly closed.'] },
    { name: 'India', lx: 945, ly: 625, lines: [
      `#${C['India'].rank} India`,
      `1.4B people share ${fmtM(C['India'].reach)}-worth of open doors.`] },
    { name: 'Burundi', lx: 730, ly: 700, lines: [
      'Burundi',
      'Open to every passport on Earth.',
      'Almost nobody comes.'] },
  ]

  const method = `
    <div class="corner-card">
      <div class="cc-title">THE METHOD</div>
      <div class="cc-body">Most rankings count countries, so Tuvalu = France. We weigh every open door by the tourists who actually walk through it: unlocking France is worth 91M a year; unlocking Tuvalu is worth 2,000.</div>
      <div class="cc-formula">score = Σ yearly arrivals at every visa-free door</div>
    </div>`

  page({
    file: 'map3-open-door-index.html',
    eyebrow: 'THE OPEN DOOR INDEX · PASSPORT STRENGTH, REWEIGHED',
    title: 'Passport strength, by where humans actually go',
    subtitle: `Each passport scored by the total yearly tourist flow of the destinations it enters without a pre-arranged visa (visa-free, on arrival, or ETA) — out of the ${fmtM(WORLD_REACH)} international arrivals the world records a year.`,
    cornerCard: method,
    mapSvg: countryPaths(fill) + ann.map(annotation).join('') +
      gradientLegend({
        id: 'g3', x: MAP_W / 2 - 260, y: MAP_H + 38, w: 520,
        stops: [[0, '#f1f2f8'], [1, INDIGO]],
        leftLabel: '0', rightLabel: `${fmtM(max)} visitors/yr of reach`,
        title: 'TOURISM FLOW UNLOCKED',
      }),
    footer: 'Visa data: github.com/visualpharm/visa-free-dataset, June 2026 · Destination volumes: UN Tourism · Borders simplified; colors show tourism data, not political status',
  })
}

// ===========================================================================
// Screenshot
// ===========================================================================
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 })
const pg = await ctx.newPage()
for (const f of ['map1-hospitality-balance', 'map2-hosts-and-guests', 'map3-open-door-index']) {
  await pg.goto('file://' + path.join(OUT, f + '.html'))
  await pg.waitForTimeout(900) // fonts
  await pg.screenshot({ path: path.join(OUT, f + '.png') })
  console.log('rendered', f + '.png')
}
await browser.close()
