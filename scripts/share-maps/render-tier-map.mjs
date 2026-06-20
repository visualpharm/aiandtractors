/**
 * MapPorn map: world map showing which tier each passport country belongs to.
 * Colors match the tier-list pastels. Title: "Which countries they can enter visa-free"
 * (the tier = the visa-free reach of that passport, not destinations).
 *
 * Tiers (from reddit/generate_tierlist.py):
 *   Almost world pass       - Japan, South Korea, Singapore, UK, Canada, Australia, EU
 *   Strong, missing big doors - US, UAE, HK, Malaysia, Romania, Bulgaria, Argentina, Brazil
 *   Regional comfort        - Mexico, Colombia
 *   Lots of paperwork       - China, India, Turkey
 *   Border officer side quest - Pakistan, Nigeria, Afghanistan
 *
 * Output: share-maps/map5-tier-world.{html,png}
 *
 *   node scripts/share-maps/render-tier-map.mjs
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

// Same alias table as other map scripts
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
// Tier definitions — mirroring reddit/generate_tierlist.py TIERS
// ---------------------------------------------------------------------------
// EU countries (all of Europe except Romania & Bulgaria)
const EU_COUNTRIES = [
  'Austria', 'Belgium', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark',
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
  'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  // Schengen non-EU
  'Andorra', 'Iceland', 'Liechtenstein', 'Monaco', 'Norway', 'Switzerland', 'Vatican',
]

const TIER_MAP = {}

// T1: Almost world pass — ✗ Cuba (Japan, South Korea) + ✗ India (Singapore, UK, Canada, Australia, EU)
for (const c of ['Japan', 'South Korea']) TIER_MAP[c] = 'top'
for (const c of ['Singapore', 'United Kingdom', 'Canada', 'Australia', ...EU_COUNTRIES]) TIER_MAP[c] = 'top'

// T2: Strong, missing big doors — ✗ China (US) + ✗ USA (UAE, HK, Malaysia, Romania, Bulgaria, Argentina, Brazil)
for (const c of ['United States', 'United Arab Emirates', 'Hong Kong', 'Malaysia',
                  'Romania', 'Bulgaria', 'Argentina', 'Brazil']) TIER_MAP[c] = 'strong'

// T3: Regional comfort — ✗ USA ✗ China (Mexico, Colombia)
for (const c of ['Mexico', 'Colombia']) TIER_MAP[c] = 'regional'

// T4: Lots of paperwork — ✗ anywhere rich (China, India, Turkey)
for (const c of ['China', 'India', 'Turkey']) TIER_MAP[c] = 'paperwork'

// T5: Border officer side quest — Pakistan, Nigeria, Afghanistan
for (const c of ['Pakistan', 'Nigeria', 'Afghanistan']) TIER_MAP[c] = 'sidequest'

// Tier colors — pastel versions matching generate_tierlist.py
const TIER_COLORS = {
  top:       '#f98a8a',  // Almost world pass — red pastel
  strong:    '#ffd86b',  // Strong, missing big doors — yellow
  regional:  '#cfe06a',  // Regional comfort — lime
  paperwork: '#8fdd8a',  // Lots of paperwork — green
  sidequest: '#6cc6e0',  // Border officer side quest — blue
}
const NO_DATA = '#e4e4e7'  // gray for countries not in any tier

// ---------------------------------------------------------------------------
// Build SVG
// ---------------------------------------------------------------------------
const MAP_W = 1520, MAP_H = 740

const fc = topoFeature(world, world.objects.countries)
fc.features = fc.features.filter(f => f.properties?.name !== 'Antarctica')
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

// Track which tiers are actually rendered (for debug)
const tierHits = {}
const countryPaths = fc.features.map(feat => {
  const name = datasetName(feat)
  const tier = name && TIER_MAP[name]
  const fill = tier ? TIER_COLORS[tier] : NO_DATA
  if (tier) tierHits[tier] = (tierHits[tier] || 0) + 1
  return `<path d="${pathGen(feat)}" fill="${fill}" stroke="#fbfaf8" stroke-width="0.6"/>`
}).join('\n')

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Map labels on large featured countries
function mapLabel(anchorCountry, text, { dx = 0, dy = 0, fs = 24 } = {}) {
  const a = anchorOf(anchorCountry)
  if (!a) { console.warn('no anchor', anchorCountry); return '' }
  const x = a[0] + dx, y = a[1] + dy
  return `<g>
    <text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="800"
      fill="#15161b" paint-order="stroke" stroke="#fbfaf8" stroke-width="6" stroke-linejoin="round">${esc(text)}</text>
  </g>`
}

const labels = [
  mapLabel('United States', 'US', { dy: -5, fs: 26 }),
  mapLabel('Canada', 'CA', { dy: -30, fs: 22 }),
  mapLabel('Brazil', 'BR', { dy: -10, fs: 24 }),
  mapLabel('Argentina', 'AR', { dy: 10, fs: 22 }),
  mapLabel('Mexico', 'MX', { dx: -5, dy: 10, fs: 20 }),
  mapLabel('France', '✗ India', { dx: -10, dy: -30, fs: 18 }),
  mapLabel('Germany', '✗ India', { dx: 10, dy: -24, fs: 18 }),
  mapLabel('Australia', '✗ India', { dy: 12, fs: 22 }),
  mapLabel('Japan', '✗ Cuba', { dx: 0, dy: -10, fs: 20 }),
  mapLabel('China', '✗ rich', { dx: -30, dy: -60, fs: 20 }),
  mapLabel('India', '✗ rich', { dx: -20, dy: 0, fs: 20 }),
  mapLabel('Russia', 'Russia', { dx: -20, dy: -30, fs: 20 }),
].join('')

// Legend across the bottom
const LEGEND = [
  ['top',       'Almost world pass',        '✗ Cuba / ✗ India'],
  ['strong',    'Strong, missing big doors', '✗ USA or ✗ China'],
  ['regional',  'Regional comfort',          '✗ USA + China'],
  ['paperwork', 'Lots of paperwork',         '✗ anywhere rich'],
  ['sidequest', 'Border officer side quest', '✓ a couple neighbors'],
]

const legFS = 17, sw = 22, pad = 10, gap = 22
function legW([k, t, sub]) {
  // swatch + name + sub
  return sw + pad + Math.max(t.length, sub.length) * legFS * 0.52 + pad
}
const totalW = LEGEND.reduce((s, it) => s + legW(it), 0) + gap * (LEGEND.length - 1)
let lx = (MAP_W - totalW) / 2
const legendSvg = LEGEND.map(([k, t, sub]) => {
  const w = legW([k, t, sub])
  const g = `<g transform="translate(${lx},${MAP_H + 20})">
    <rect width="${sw}" height="${sw * 2 + 4}" rx="4" fill="${TIER_COLORS[k]}" stroke="rgba(0,0,0,0.12)"/>
    <text x="${sw + pad}" y="${sw - 2}" font-size="${legFS}" font-weight="700" fill="#33343c">${esc(t)}</text>
    <text x="${sw + pad}" y="${sw + legFS + 2}" font-size="${legFS - 3}" font-weight="500" fill="#6b6d78">${esc(sub)}</text>
  </g>`
  lx += w + gap
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
  h1 { font-size:38px; font-weight:800; letter-spacing:-0.02em; color:#1c1d22; margin-bottom:10px; max-width:1200px; }
  .sub { font-size:16.5px; line-height:1.45; color:#4a4b55; max-width:1200px; }
  .mapwrap { flex:1; position:relative; margin-top:6px; min-height:0; }
  .mapwrap svg { position:absolute; inset:0; }
  .footer { display:flex; justify-content:space-between; font-size:13px; color:#8a8b94; padding-top:6px; border-top:1px solid rgba(0,0,0,0.07); }
  .footer b { color:#c4612a; font-weight:700; }
</style></head><body>
<div class="frame">
  <div class="eyebrow">THE OPEN DOOR INDEX · PASSPORT TIERS · 2026</div>
  <h1>Which countries they can enter visa-free</h1>
  <div class="sub">Countries colored by passport tier — the biggest destination still blocked defines the tier. Gray = not ranked in this tier list. EU countries colored as one tier (all of Europe except Romania &amp; Bulgaria).</div>
  <div class="mapwrap">
    <svg viewBox="0 0 ${MAP_W} ${MAP_H + 106}" width="100%" height="100%" preserveAspectRatio="xMidYMin meet">
      ${countryPaths}
      ${labels}
      ${legendSvg}
    </svg>
  </div>
  <div class="footer">
    <span><b>The Open Door Index</b> · aiandtractors.com/passport-ranking</span>
    <span>Visa data: github.com/visualpharm/visa-free-dataset · tiers by biggest visa-required destination by tourism · borders simplified</span>
  </div>
</div>
</body></html>`

fs.writeFileSync(path.join(OUT, 'map5-tier-world.html'), html)
console.log('tier hits:', tierHits)

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
const pg = await ctx.newPage()
await pg.goto('file://' + path.join(OUT, 'map5-tier-world.html'))
await pg.waitForTimeout(900)
await pg.screenshot({ path: path.join(OUT, 'map5-tier-world.png') })
await browser.close()
console.log('rendered map5-tier-world.png')
