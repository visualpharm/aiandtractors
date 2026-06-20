/**
 * MapPorn map: every country shaded by the single biggest destination its
 * passport still can't enter visa-free — the same groups as the reddit tier list.
 * Labels are written OVER the largest area of each color, with a bracket, plus a
 * legend. Output: share-maps/map4-passport-doors.{html,png} (3200x2000).
 *
 *   node scripts/share-maps/render-passport-doors-map.mjs
 */
import fs from 'fs'
import path from 'path'
import url from 'url'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature as topoFeature } from 'topojson-client'
import { chromium } from 'playwright'

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, 'share-maps')
const world = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/open-door/countries-110m.json')))
const scores = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/calculated-passport-scores.json'))).results

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

const MAP_W = 1520, MAP_H = 740
const fc = topoFeature(world, world.objects.countries)
fc.features = fc.features.filter(f => (f.properties?.name) !== 'Antarctica')
const proj = geoNaturalEarth1().fitSize([MAP_W, MAP_H], fc)
const pathGen = geoPath(proj)
const datasetName = f => {
  const raw = f.properties && (f.properties.name || f.properties.NAME)
  return MAP_ALIASES.hasOwnProperty(raw) ? MAP_ALIASES[raw] : raw
}
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
// Group every passport by its biggest missing door (same buckets as tier list)
// ---------------------------------------------------------------------------
const POLITICS = new Set(['Russia', 'Ukraine', 'Syria', 'Israel', 'Palestine', 'North Korea', 'Iran'])
const biggestMiss = r => {
  for (const m of r.misses) if (!POLITICS.has(m.country)) return m.country
  return r.misses.length ? r.misses[0].country : null
}
function groupOf(r) {
  const reach = r.score
  if (reach >= 1295) return biggestMiss(r) === 'Cuba' ? 'cuba' : 'india'
  const hasChina = r.keyAccess.includes('China')
  if (reach >= 1130) {                                    // strong, miss one giant
    if (biggestMiss(r) === 'China') return 'china'        // the US passport
    return hasChina ? 'usa' : 'usa_china'
  }
  if (reach >= 960) return hasChina ? 'usa' : 'usa_china' // regional comfort
  if (reach >= 100) return 'rich'                         // lots of paperwork
  return 'seashells'                                      // border officer side quest
}
const GROUP = {}
for (const r of scores) GROUP[r.country] = groupOf(r)

const COLORS = {
  cuba: '#e0574f', india: '#ef8c47', china: '#efb13e', usa: '#e3d75f',
  usa_china: '#a6c656', rich: '#54ab86', seashells: '#4c9fcf',
}
const NO_DATA = '#e4e4e7'

// ---------------------------------------------------------------------------
// SVG
// ---------------------------------------------------------------------------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const countryPaths = fc.features.map(feat => {
  const name = datasetName(feat)
  const g = name && GROUP[name]
  const fill = g ? COLORS[g] : NO_DATA
  return `<path d="${pathGen(feat)}" fill="${fill}" stroke="#fbfaf8" stroke-width="0.6"/>`
}).join('\n')

// label centred at (x,y) over the region (no bracket)
function mapLabel(anchorCountry, text, { dx = 0, dy = 0, fs = 27 } = {}) {
  const a = anchorOf(anchorCountry)
  if (!a) { console.warn('no anchor', anchorCountry); return '' }
  const x = a[0] + dx, y = a[1] + dy
  return `<g>
    <text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="800"
      fill="#15161b" paint-order="stroke" stroke="#fbfaf8" stroke-width="6.5" stroke-linejoin="round">${esc(text)}</text>
  </g>`
}

// multi-line label in open space, joined to one or more regions by dashed leaders
function calloutLabel(lines, [lx, ly], targets, { fs = 25, lh = 32 } = {}) {
  const pts = targets.map(anchorOf).filter(Boolean)
  const leaders = pts.map(t => `
    <line x1="${lx}" y1="${ly - 6}" x2="${t[0]}" y2="${t[1]}" stroke="#fbfaf8" stroke-width="5.5"/>
    <line x1="${lx}" y1="${ly - 6}" x2="${t[0]}" y2="${t[1]}" stroke="#2b6ea8" stroke-width="2.2" stroke-dasharray="2 7" stroke-linecap="round"/>
    <circle cx="${t[0]}" cy="${t[1]}" r="6" fill="#2b6ea8" stroke="#fbfaf8" stroke-width="2.2"/>`).join('')
  const tspans = lines.map((s, i) => `<tspan x="${lx}" dy="${i === 0 ? 0 : lh}">${esc(s)}</tspan>`).join('')
  return `<g>
    ${leaders}
    <text x="${lx}" y="${ly}" text-anchor="middle" font-size="${fs}" font-weight="800"
      fill="#15161b" paint-order="stroke" stroke="#fbfaf8" stroke-width="6.5" stroke-linejoin="round">${tspans}</text>
  </g>`
}

const labels = [
  mapLabel('United States', '✗ China', { dx: -6, dy: -6 }),
  mapLabel('Mexico', '✗ USA ✗ China', { dy: 30, fs: 23 }),
  mapLabel('Brazil', '✗ USA', { dy: -10 }),
  mapLabel('Germany', '✗ India', { dx: 18, dy: -30 }),
  mapLabel('Canada', '✗ India', { dy: -6 }),
  mapLabel('Australia', '✗ India', { dy: 6 }),
  mapLabel('Japan', '✗ Cuba', { dx: 4, dy: -12, fs: 23 }),
  mapLabel('China', '✗ anywhere rich', { dx: -34, dy: -88 }),
].join('')

// legend across the bottom band
const LEGEND = [
  ['cuba', '✗ Cuba'], ['india', '✗ India'], ['china', '✗ China'],
  ['usa', '✗ USA'], ['usa_china', '✗ USA + China'],
  ['rich', '✗ anywhere rich'], ['seashells', '✓ a couple of neighbors + some seashells'],
]
const legFS = 19, sw = 24, pad = 12, gap = 30
const itemW = ([, t]) => sw + pad + t.length * legFS * 0.54
const totalW = LEGEND.reduce((s, it) => s + itemW(it), 0) + gap * (LEGEND.length - 1)
let lx = (MAP_W - totalW) / 2
const legendSvg = LEGEND.map(([k, t]) => {
  const g = `<g transform="translate(${lx},${MAP_H + 44})">
    <rect width="${sw}" height="${sw}" rx="4" fill="${COLORS[k]}" stroke="rgba(0,0,0,0.12)"/>
    <text x="${sw + pad}" y="${sw - 5}" font-size="${legFS}" font-weight="600" fill="#33343c">${esc(t)}</text>
  </g>`
  lx += itemW([k, t]) + gap
  return g
}).join('')

// ---------------------------------------------------------------------------
const W = 1600, H = 1000
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:${W}px; height:${H}px; background:#fbfaf8; font-family:Inter,-apple-system,sans-serif; overflow:hidden; }
  .frame { width:100%; height:100%; padding:42px 40px 18px; display:flex; flex-direction:column; }
  .eyebrow { font-family:'DotGothic16',monospace; font-size:15px; letter-spacing:0.22em; color:#c4612a; margin-bottom:10px; }
  h1 { font-size:42px; font-weight:800; letter-spacing:-0.02em; color:#1c1d22; margin-bottom:10px; max-width:1180px; }
  .sub { font-size:17.5px; line-height:1.45; color:#4a4b55; max-width:1180px; }
  .mapwrap { flex:1; position:relative; margin-top:6px; min-height:0; }
  .mapwrap svg { position:absolute; inset:0; }
  .footer { display:flex; justify-content:space-between; font-size:13px; color:#8a8b94; padding-top:6px; border-top:1px solid rgba(0,0,0,0.07); }
  .footer b { color:#c4612a; font-weight:700; }
</style></head><body>
<div class="frame">
  <h1>The most important destination each passport<br>still can&rsquo;t enter visa-free</h1>
  <div class="sub">Every country is shaded by the single most important destination its passport still can&rsquo;t enter visa-free (<b style="color:#c4612a">&#10007;</b>). &lsquo;Most important&rsquo; means where people actually travel, not land area, so India and Cuba outrank bigger places. The strongest passports miss only India or Cuba, the weakest (<b style="color:#1d7a4d">&#10003;</b>) get a couple of neighbors and some seashells.</div>
  <div class="mapwrap">
    <svg viewBox="0 0 ${MAP_W} ${MAP_H + 96}" width="100%" height="100%" preserveAspectRatio="xMidYMin meet">
      ${countryPaths}
      ${labels}
      ${legendSvg}
    </svg>
  </div>
  <div class="footer">
    <span><b>The Open Door Index</b> · aiandtractors.com/passport-ranking</span>
    <span>Visa data: github.com/visualpharm/visa-free-dataset · grouped by biggest visa-required destination by tourism · borders simplified</span>
  </div>
</div>
</body></html>`
fs.writeFileSync(path.join(OUT, 'map4-passport-doors.html'), html)

// report group sizes
const sizes = {}
for (const c in GROUP) sizes[GROUP[c]] = (sizes[GROUP[c]] || 0) + 1
console.log('group sizes:', sizes)

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
const pg = await ctx.newPage()
await pg.goto('file://' + path.join(OUT, 'map4-passport-doors.html'))
await pg.waitForTimeout(900)
await pg.screenshot({ path: path.join(OUT, 'map4-passport-doors.png') })
await browser.close()
console.log('rendered map4-passport-doors.png')
