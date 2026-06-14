/* The Open Door Index — passport ranking page.
   Ported 1:1 from the Claude Design handoff (design_handoff_passport_ranking,
   May 2026): hero with pixel strike, six highlight cards, d3 choropleth map,
   sticky filter bar, ranking table with tie groups, country drawer, and
   differential comparison modal. Data comes from lib/open-door-data.js,
   generated from the passport-index dataset (scripts/generate-open-door-data.sh). */

import Head from 'next/head'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature as topoFeature } from 'topojson-client'
import PASSPORT_DATA from '../lib/open-door-data'

const { PASSPORTS, DESTS } = PASSPORT_DATA

const fmtVisitors = (m) => {
  if (m >= 1000) return (m / 1000).toFixed(3) + 'B'
  if (m >= 1) return Math.round(m * 10) / 10 + 'M'
  return (m * 1000).toFixed(0) + 'K'
}
const REGION_LABEL = { EU: 'Europe', AS: 'Asia', AM: 'Americas', AF: 'Africa', OC: 'Oceania' }
const REGION_DOT = { EU: '#5e6ad2', AS: '#f2994a', AM: '#5fa760', AF: '#eb5757', OC: '#1d6fb6' }

// Whole addressable market: every tourist arrival on Earth, and the largest
// single destination (France). Drawer graphs are drawn against these absolute
// scales, not against the passport's own maximum, so two drawers compare.
const WORLD_TOTAL = Object.values(DESTS).reduce((s, d) => s + d.v, 0)
const MAX_DEST_V = Object.values(DESTS).reduce((m, d) => Math.max(m, d.v), 0)

// Sequential indigo scale — matches the world map choropleth so the
// table's "relative" bar and the map fill read as the same metric.
function scoreColor(value, max) {
  const t = Math.max(0, Math.min(1, value / max))
  const lerp = (a, b) => Math.round(a + (b - a) * t)
  const r = lerp(0xf1, 0x5e)
  const g = lerp(0xf2, 0x6a)
  const b = lerp(0xf8, 0xd2)
  return `rgb(${r},${g},${b})`
}

function Sparkbar({ value, max }) {
  const pct = Math.max(2, Math.min(100, value / max * 100))
  const color = scoreColor(value, max)
  return (
    <div className="sparkbar">
      <div className="sparkbar-fill" style={{ width: pct + '%', background: color }} />
    </div>)
}

// -------------------------------------------------------------------------
// Combined passports — a virtual passport built from 2+ real ones.
// Access = union of the members' access sets; score = the same tourism sum
// as everywhere else. Ranks against real countries without shifting them.
// -------------------------------------------------------------------------
// How many passports can enter each destination — used to pick a combo's
// "interesting access": rarest doors first, then visitor volume.
let _destAccessCount = null
function destAccessCount() {
  if (!_destAccessCount) {
    _destAccessCount = {}
    PASSPORTS.forEach((p) => p.access.forEach((d) => {
      _destAccessCount[d] = (_destAccessCount[d] || 0) + 1
    }))
  }
  return _destAccessCount
}

function makeCombo(members) {
  const access = new Set()
  members.forEach((m) => m.access.forEach((d) => access.add(d)))
  const totalM = [...access].reduce((s, d) => s + DESTS[d].v, 0)
  const counts = destAccessCount()
  const top = [...access]
    .sort((a, b) => (counts[a] || 0) - (counts[b] || 0) || DESTS[b].v - DESTS[a].v)
    .slice(0, 4)
  return {
    name: members.map((m) => m.name).join(' + '),
    flag: members.map((m) => m.flag).join(''),
    isCombo: true,
    region: 'COMBO',
    totalM,
    access,
    top,
    rank: PASSPORTS.filter((p) => p.totalM > totalM).length + 1,
    tieCount: 1,
    tiePos: 0,
    tieIsLast: false,
    perCapita: null,
  }
}

// -------------------------------------------------------------------------
// Hero
// -------------------------------------------------------------------------
// Country mention inside hero cards — clicking opens the detail drawer.
function CLink({ name, onSelect, children }) {
  const exists = useMemo(() => PASSPORTS.some((p) => p.name === name), [name])
  if (!exists) return <span>{children || name}</span>
  return (
    <button className="hero-country-link" onClick={() => onSelect(name)}>
      {children || name}
    </button>)
}

function Hero({ onSelect }) {
  return (
    <header className="hero">
      <div className="hero-eyebrow">
        <span className="t-section-label"><a href="/passport-ranking" style={{ color: 'inherit', textDecoration: 'none' }}>The Open Door Index</a> · 2026</span>
      </div>
      <h1 className="hero-title">
        A passport ranking that measures<br />
        <span className="hero-strike-wrap">
          <span className="hero-strike">where you <s>can</s></span>
        </span>
        {' '}
        <em className="hero-pixel">want to go.</em>
      </h1>
      <p className="hero-sub">
        Traditional rankings count visa-free countries. This one weights each
        destination by its annual tourism volume – so a passport that opens
        France (100M visitors a year) outscores one that opens a quieter
        country with the same number of stamps.
      </p>
      <div className="hero-meth-line">
        <a href="/passport-insights" className="hero-link">Key findings →</a>
        <span className="hero-meth-sep">·</span>
        <a href="/passport-insights/methodology" className="hero-link">Methodology →</a>
        <span className="hero-meth-sep">·</span>
        <a href="/passport-insights/maps" className="hero-link">Maps →</a>
      </div>
      <dl className="hero-stats">
        <div>
          <dt>Strongest passport</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇰🇷</span>
            <CLink name="South Korea" onSelect={onSelect} />
          </dd>
          <div className="hero-stat-sub">
            Unlocks 1.4 billion tourists' worth of world. Honestly, the top ten is a tie between rich East Asia and the Nordics – same metric, same lifestyle, same passport: small countries that quietly out-travel everyone.
          </div>
        </div>
        <div>
          <dt>Most welcoming</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇲🇻</span>
            <CLink name="Maldives" onSelect={onSelect} />
          </dd>
          <div className="hero-stat-sub">
            Lets in nearly every nationality on Earth without a pre-issued visa. The richest tourist destination that holds the door open for everyone, not just the wealthy West.
          </div>
          <div className="hero-stat-runners">
            Runners-up: <span>🇷🇼 <CLink name="Rwanda" onSelect={onSelect} /></span> · <span>🇰🇪 <CLink name="Kenya" onSelect={onSelect} /></span>
          </div>
        </div>
        <div>
          <dt>Weakest passport</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇵🇰</span>
            <CLink name="Pakistan" onSelect={onSelect} />
          </dd>
          <div className="hero-stat-sub">
            Reaches destinations worth just 28M tourists a year – 51× less than the top passport. Afghanistan gets called the world's worst, but it slips into visa-free Macau; Pakistan can't, which is why the weighted map puts Pakistan last.
          </div>
          <div className="hero-stat-runners">
            Runners-up: <span>🇳🇬 <CLink name="Nigeria" onSelect={onSelect} /></span> · <span>🇧🇩 <CLink name="Bangladesh" onSelect={onSelect} /></span>
          </div>
        </div>
        <div>
          <dt>Most overlooked</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇧🇮</span>
            <CLink name="Burundi" onSelect={onSelect} />
          </dd>
          <div className="hero-stat-sub">
            Open to almost every passport on Earth – and almost nobody comes. About 50K visitors a year, against 100M for France. Easy to enter, rarely visited.
          </div>
          <div className="hero-stat-runners">
            Runners-up: <span>🇰🇲 <CLink name="Comoros" onSelect={onSelect} /></span> · <span>🇫🇲 <CLink name="Micronesia" onSelect={onSelect} /></span>
          </div>
        </div>
        <div>
          <dt>One-way passport</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇺🇸</span>
            <CLink name="United States" onSelect={onSelect} />
          </dd>
          <div className="hero-stat-sub">
            Americans walk into 160 countries without a visa. The U.S. itself lets in just 46 nationalities the same way – the widest one-way street in passport diplomacy.
          </div>
          <div className="hero-stat-runners">
            Runners-up: <span>🇦🇺 <CLink name="Australia" onSelect={onSelect} /></span> · <span>🇨🇦 <CLink name="Canada" onSelect={onSelect} /></span>
          </div>
        </div>
        <div>
          <dt>Biggest 2026 shift</dt>
          <dd className="hero-stat-country">
            <span className="hero-stat-flag">🇨🇳</span>
            <span><CLink name="China" onSelect={onSelect} /> <span className="hero-stat-trend up">↑</span></span>
          </dd>
          <div className="hero-stat-sub">
            Quietly opened visa-free travel to seven new countries this year – UK, Canada, and five Gulf states. Roughly 455M tourist-arrivals' worth of new mobility, the largest single expansion of 2026.
          </div>
          <div className="hero-stat-runners">
            Also opening: <span>🇮🇳 <CLink name="India" onSelect={onSelect} /> <span className="hero-stat-trend up">↑</span></span> · Also closing: <span>🇳🇦 <CLink name="Namibia" onSelect={onSelect} /> <span className="hero-stat-trend down">↓</span></span>
          </div>
        </div>
      </dl>
    </header>)
}

// -------------------------------------------------------------------------
// Power map — d3-geo choropleth from world-atlas TopoJSON
// -------------------------------------------------------------------------
// world-atlas (Natural Earth) uses some long-form labels; map them to the
// names in passport-index.
const MAP_ALIASES = {
  'United States of America': 'United States',
  'Russian Federation': 'Russia',
  'Russia': 'Russia',
  'Republic of Korea': 'South Korea',
  "Dem. People's Republic of Korea": 'North Korea',
  "Dem. Rep. Korea": 'North Korea',
  'Korea': 'South Korea',
  "Côte d'Ivoire": 'Ivory Coast',
  "Cote d'Ivoire": 'Ivory Coast',
  'Czechia': 'Czech Republic',
  'Czech Rep.': 'Czech Republic',
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'Eswatini': 'Swaziland',
  'eSwatini': 'Swaziland',
  'Macedonia': 'North Macedonia',
  'North Macedonia': 'North Macedonia',
  'Dominican Rep.': 'Dominican Republic',
  'Central African Rep.': 'Central African Republic',
  'Eq. Guinea': 'Equatorial Guinea',
  'S. Sudan': 'South Sudan',
  'Solomon Is.': 'Solomon Islands',
  'Cape Verde': 'Cape Verde',
  'Cabo Verde': 'Cape Verde',
  'Burma': 'Myanmar',
  'Lao PDR': 'Laos',
  "Lao People's Dem. Rep.": 'Laos',
  'Tanzania, United Rep. of': 'Tanzania',
  'United Rep. of Tanzania': 'Tanzania',
  'Viet Nam': 'Vietnam',
  'Brunei Darussalam': 'Brunei',
  'Iran (Islamic Republic of)': 'Iran',
  'Syrian Arab Republic': 'Syria',
  'Palestine': 'Palestine',
  'State of Palestine': 'Palestine',
  'West Bank': 'Palestine',
  'United Republic of Tanzania': 'Tanzania',
  'Republic of the Congo': 'Congo',
  'Democratic Republic of the Congo': 'DR Congo',
  'Dem. Rep. Congo': 'DR Congo',
  'Falkland Islands': null,
  'Greenland': null,
  'Antarctica': null,
  'Western Sahara': null,
  'Fr. S. Antarctic Lands': null,
  'N. Cyprus': null,
  'Kosovo': 'Kosovo',
  'Republic of Serbia': 'Serbia',
  'Trinidad and Tobago': 'Trinidad and Tobago',
  'United Kingdom': 'United Kingdom',
  'Vatican City': 'Vatican',
  'Holy See': 'Vatican',
  'Sao Tome and Principe': 'Sao Tome and Principe',
  'São Tomé and Principe': 'Sao Tome and Principe',
  'St. Lucia': 'Saint Lucia',
  'Saint Lucia': 'Saint Lucia',
  'St. Vin. and Gren.': 'Saint Vincent and the Grenadines',
  'Saint Vincent and the Grenadines': 'Saint Vincent and the Grenadines',
  'St. Kitts and Nevis': 'Saint Kitts and Nevis',
  'Saint Kitts and Nevis': 'Saint Kitts and Nevis',
  'Antigua and Barb.': 'Antigua and Barbuda',
  'Antigua and Barbuda': 'Antigua and Barbuda',
}

function PowerMap({ rows }) {
  const [world, setWorld] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

  // Tooltip follows the cursor (offset 16px); flips to the left of the
  // pointer in the right half so it never clips outside the canvas.
  const trackCursor = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width })
  }

  useEffect(() => {
    // Local copy of world-atlas/countries-110m.json (~108KB); no runtime CDN
    // dependency.
    fetch('/open-door/countries-110m.json')
      .then(r => r.json())
      .then(setWorld)
      .catch(err => console.error('Map load failed:', err))
  }, [])

  // name → passport row lookup
  const byName = useMemo(() => {
    const m = {}
    rows.forEach(p => { m[p.name] = p })
    return m
  }, [rows])

  const max = useMemo(() =>
    rows.reduce((m, p) => Math.max(m, p.totalM), 0) || 1
  , [rows])

  // Choropleth color: white-to-indigo for the reach scale ("more is more").
  const fillFor = (passport) => {
    if (!passport) return '#ececef'
    const t = Math.min(1, passport.totalM / max)
    const lerp = (a, b, t2) => Math.round(a + (b - a) * t2)
    const r = lerp(0xf1, 0x5e, t)
    const g = lerp(0xf2, 0x6a, t)
    const b = lerp(0xf8, 0xd2, t)
    return `rgb(${r},${g},${b})`
  }

  const W = 960, H = 480

  const { features, pathGen } = useMemo(() => {
    if (!world) return { features: [], pathGen: null }
    const fc = topoFeature(world, world.objects.countries)
    const proj = geoNaturalEarth1().fitSize([W, H], fc)
    const path = geoPath(proj)
    return { features: fc.features, pathGen: path }
  }, [world])

  return (
    <section id="map" className="map-section">
      <div className="map-canvas map-canvas--real" ref={canvasRef} onMouseMove={trackCursor}>
        <div className="map-eyebrow">PASSPORT REACH · TOURISM FLOW UNLOCKED</div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="map-svg">
          {!world && (
            <text x={W/2} y={H/2} textAnchor="middle" fontSize="14" fill="var(--muted)">
              Loading world…
            </text>
          )}
          {world && pathGen && features.map((feat, i) => {
            const rawName = feat.properties && (feat.properties.name || feat.properties.NAME)
            // Antarctica adds visual weight without signal — drop it.
            if (rawName === 'Antarctica') return null
            const matched = MAP_ALIASES.hasOwnProperty(rawName) ? MAP_ALIASES[rawName] : rawName
            const passport = matched ? byName[matched] : null
            const fill = fillFor(passport)
            const isHover = hovered && hovered.id === feat.id
            return (
              <path
                key={feat.id || i}
                d={pathGen(feat)}
                fill={fill}
                stroke="#fff"
                strokeWidth={isHover ? 1.4 : 0.5}
                style={{ cursor: passport ? 'pointer' : 'default', transition: 'stroke-width .12s' }}
                onMouseEnter={() => setHovered({ id: feat.id, name: rawName, passport })}
                onMouseLeave={() => setHovered(null)} />
            )
          })}

          {/* Embedded legend — sequential indigo scale */}
          <g className="map-legend-overlay" transform={`translate(${W - 200}, 24)`}>
            <rect x="-12" y="-16" width="200" height="56" rx="8" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.06)" />
            <text x="0" y="0" fontSize="10" fontWeight="600" fill="#6c6e77" letterSpacing="0.06em">TOURISM REACH UNLOCKED</text>
            <defs>
              <linearGradient id="mapGradReal" x1="0" x2="1">
                <stop offset="0" stopColor="#f1f2f8" />
                <stop offset="1" stopColor="#5e6ad2" />
              </linearGradient>
            </defs>
            <rect x="0" y="10" width="176" height="8" rx="2" fill="url(#mapGradReal)" stroke="rgba(0,0,0,0.04)" />
            <text x="0" y="32" fontSize="10" fill="#6c6e77">0</text>
            <text x="176" y="32" fontSize="10" fill="#6c6e77" textAnchor="end">1.44B visitors/yr</text>
          </g>
        </svg>

        {hovered && (
          <div
            className="map-tooltip"
            style={cursor.w && cursor.x > cursor.w * 0.55
              ? { left: cursor.x - 16, top: cursor.y + 16, transform: 'translateX(-100%)' }
              : { left: cursor.x + 16, top: cursor.y + 16 }}>
            <div className="map-tooltip-name">
              {hovered.passport ? hovered.passport.flag + ' ' : ''}
              {hovered.passport ? hovered.passport.name : hovered.name}
            </div>
            {hovered.passport ? (
              <div className="map-tooltip-stat">
                <strong>{(hovered.passport.totalM / 1000).toFixed(2)}B</strong> visitors of reach
                <span className="map-tooltip-sub">  ·  rank #{hovered.passport.rank} of {rows.length}</span>
              </div>
            ) : (
              <div className="map-tooltip-stat map-tooltip-empty">no passport data</div>
            )}
          </div>
        )}
      </div>
    </section>)
}

// -------------------------------------------------------------------------
// Filter row
// -------------------------------------------------------------------------
function downloadCSV() {
  const headers = ['Rank', 'Country', 'Region', 'Total reach (M visitors/yr)', 'Open destinations']
  const rows = PASSPORTS.map(p => [p.rank, p.name, REGION_LABEL[p.region] || p.region, p.totalM, p.vfCount])
  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'open-door-index.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function FilterRow({ region, setRegion, search, setSearch, sort, setSort }) {
  const regions = [
  ['ALL', 'All'],
  ['EU', 'Europe'],
  ['AS', 'Asia'],
  ['AM', 'Americas'],
  ['AF', 'Africa'],
  ['OC', 'Oceania']]

  return (
    <div className="filter-row">
      <div className="region-pills">
        {regions.map(([k, label]) =>
        <button
          key={k}
          className={'region-pill' + (region === k ? ' is-active' : '')}
          onClick={() => setRegion(k)}>

            {region === k && <span className="region-dot" style={{ background: REGION_DOT[k] || '#1c1d1f' }} />}
            {label}
          </button>
        )}
      </div>

      <div className="filter-spacer" />

      <div className="search-wrap">
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="search-input"
          placeholder="Search countries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

        {search && <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear">×</button>}
      </div>

      <div className="sort-group">
        <span className="t-mini">Sort</span>
        <div className="sort-wrap">
          <button className={'sort-btn' + (sort === 'score' ? ' is-active' : '')} onClick={() => setSort('score')}>Score</button>
          <button className={'sort-btn' + (sort === 'name' ? ' is-active' : '')} onClick={() => setSort('name')}>Name</button>
        </div>
      </div>

      <button className="ghost-btn" title="Export" onClick={downloadCSV}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4v12" /><path d="m6 12 6 6 6-6" /><path d="M4 20h16" />
        </svg>
        CSV
      </button>
    </div>)
}

// -------------------------------------------------------------------------
// Compare prompt bar — sticky banner above table.
// -------------------------------------------------------------------------
function ComparePrompt({ count, onOpen, onClear, onCombine }) {
  return (
    <div className={'compare-prompt' + (count >= 2 ? ' is-ready' : '')}>
      {count < 2 ?
      <div className="compare-prompt-cue">
          <span className="compare-prompt-text" style={{ padding: "0px 0px 0px 100px" }}>
            Pick two or more – compare passports, or score your dual citizenship.
          </span>
          {/* Hand-scribbled arrow. The SVG's left edge is anchored to the
              table's left edge (.compare-arrow has left:-14px, cancelling the
              prompt bar's padding). Playwright-measured checkbox center sits
              at (71, 92) in this SVG's coordinate space, constant across
              1280/1700px viewports (the rank+check columns are fixed-width).
              The checkbox is 18px tall (top edge y≈83); the arrow stops at
              y≈76, ~7px above it — pointing at the box without touching.
              The tail starts at the right edge, under the prompt text
              (100px left padding ≈ x=114 here), and swings down-left. */}
          <svg className="compare-arrow" width="130" height="110" viewBox="0 0 130 110" fill="none" aria-hidden="true">
            <defs>
              <filter id="penWobble" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="1.4" />
              </filter>
            </defs>
            <g style={{ filter: 'url(#penWobble)' }}>
              <path
              d="M126,12 Q117,4 105,10 Q86,19 78,38 Q70,56 71,72"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none" />
              <path
              d="M62,64 L71,76 L80,66"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" />
            </g>
          </svg>
        </div> :

      <div className="compare-prompt-actions">
          <span className="compare-prompt-text">
            <strong>{count}</strong> passports selected
          </span>
          <div style={{ flex: 1 }} />
          <button className="ghost-btn" onClick={onClear}>Clear</button>
          <button className="combine-cta" onClick={onCombine} title="Merge the selected passports into one virtual passport and rank it">
            ⊕ Combine into one passport
          </button>
          <button className="compare-cta" onClick={onOpen}>
            Compare {count} →
          </button>
        </div>
      }
    </div>)
}

// -------------------------------------------------------------------------
// Country detail drawer (right side)
// -------------------------------------------------------------------------
function CountryDetail({ country, onClose, onCompare, isComparing, compareCount, onOpenCompare }) {
  // Region distribution from country.access — by VISITOR VOLUME (sum of v),
  // not country count. The whole point of the ranking is that volume is
  // the metric — country counts are exactly the thing we don't want to show.
  const regionDistr = useMemo(() => {
    if (!country) return []
    const c = { EU: 0, AS: 0, AM: 0, AF: 0, OC: 0 }
    country.access.forEach((d) => { c[DESTS[d].region] += DESTS[d].v })
    // pct is of the WORLD's visitor volume, not of this passport's total —
    // the unfilled remainder of the bar is the market the passport misses.
    return Object.entries(c)
      .map(([k, v]) => ({ k, label: REGION_LABEL[k], v, pct: v / WORLD_TOTAL * 100 }))
      .sort((a, b) => b.v - a.v)
  }, [country && country.name])

  // Top 8 destinations by visitor volume from access
  const topDests = useMemo(() => {
    if (!country) return []
    return [...country.access].
    sort((a, b) => DESTS[b].v - DESTS[a].v).
    slice(0, 8).
    map((n) => ({ name: n, v: DESTS[n].v, flag: DESTS[n].flag, region: DESTS[n].region }))
  }, [country && country.name])

  if (!country) return null
  const realIdx = PASSPORTS.findIndex((p) => p.name === country.name)
  let peers
  if (realIdx >= 0) {
    const peerStart = Math.max(0, realIdx - 2)
    peers = PASSPORTS.slice(peerStart, peerStart + 5)
  } else {
    // Virtual (combined) passport — splice it between its real neighbors.
    let at = PASSPORTS.findIndex((p) => p.totalM < country.totalM)
    if (at === -1) at = PASSPORTS.length
    peers = [...PASSPORTS.slice(Math.max(0, at - 2), at), country, ...PASSPORTS.slice(at, at + 2)]
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="country-drawer" role="dialog">
        <div className="drawer-head">
          <div className="drawer-rank-strip">
            <span className="t-mini">Rank</span>
            <span className="drawer-rank">#{country.rank}</span>
            <span className="t-mini">of {PASSPORTS.length}</span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 3 L11 11 M11 3 L3 11" />
            </svg>
          </button>
        </div>

        <div className="drawer-hero">
          <div className="drawer-flag">{country.flag}</div>
          <div className="drawer-name-block">
            <h2 className="drawer-name">{country.name}</h2>
            {country.isCombo && <div className="drawer-combo-note t-mini">combined passport</div>}
          </div>
        </div>

        <div className="drawer-score-card">
          <div className="score-card-label t-section-label">Open Door score</div>
          <div className="score-card-value">{fmtVisitors(country.totalM)}</div>
          <div className="score-card-sub">tourists a year, summed across every destination this passport opens{country.perCapita ? ` · ${country.perCapita}× per capita` : ''}</div>
          <div className="score-card-bar">
            <div className="score-card-bar-fill" style={{ width: country.totalM / WORLD_TOTAL * 100 + '%' }} />
          </div>
          <div className="score-card-marks">
            <span>0</span><span>500M</span><span>1B</span><span>{fmtVisitors(WORLD_TOTAL)} = the whole world</span>
          </div>
        </div>

        <section className="drawer-section">
          <div className="drawer-section-head">
            <span className="t-section-label">Breakdown by region</span>
            <span className="t-mini">of the world's visitor volume</span>
          </div>
          <div className="region-bar">
            {regionDistr.filter((r) => r.v > 0).map((r) =>
            <div key={r.k} className="region-bar-seg"
            style={{ width: r.pct + '%', background: REGION_DOT[r.k] }}
            title={`${r.label}: ${fmtVisitors(r.v)}`} />
            )}
          </div>
          <div className="region-legend">
            {regionDistr.filter((r) => r.v > 0).map((r) =>
            <div key={r.k} className="region-legend-row">
                <span className="region-dot" style={{ background: REGION_DOT[r.k] }} />
                <span className="region-legend-label">{r.label}</span>
                <span className="region-legend-n">{fmtVisitors(r.v)}</span>
              </div>
            )}
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-section-head">
            <span className="t-section-label">Highest-volume destinations</span>
            <span className="t-mini">visa-free, eTA, or VOA</span>
          </div>
          <div className="dest-bars">
            {topDests.map((d) =>
            <div key={d.name} className="dest-bar-row">
                <div className="dest-bar-label">
                  <span className="dest-flag">{d.flag}</span>
                  <span className="dest-name">{d.name}</span>
                </div>
                <div className="dest-bar-track">
                  <div className="dest-bar-fill" style={{ width: Math.max(1.5, d.v / MAX_DEST_V * 100) + '%', background: REGION_DOT[d.region] }} />
                </div>
                <div className="dest-bar-val">{fmtVisitors(d.v)}</div>
              </div>
            )}
          </div>
        </section>

        <section className="drawer-section">
          <div className="drawer-section-head">
            <span className="t-section-label">Peers in the ranking</span>
          </div>
          <ol className="peer-list">
            {peers.map((p) =>
            <li key={p.name} className={'peer-row' + (p.name === country.name ? ' is-self' : '')}>
                <span className="peer-rank">#{p.rank}</span>
                <span className="peer-flag">{p.flag}</span>
                <span className="peer-name">{p.name}</span>
                <span className="peer-score">{fmtVisitors(p.totalM)}</span>
              </li>
            )}
          </ol>
        </section>

        <div className="drawer-actions">
          <button className={'btn btn-primary' + (isComparing ? ' is-on' : '')} onClick={() => onCompare(country.name)}>
            {isComparing ? '✓ In comparison' : '+ Add to comparison'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onOpenCompare()}
            disabled={!isComparing && compareCount < 2}
            title={compareCount < 2 ? 'Add 2+ passports to compare' : 'Open comparison'}>
            Compare{compareCount >= 2 ? ` (${compareCount})` : ''}
          </button>
        </div>
      </aside>
    </>)
}

// -------------------------------------------------------------------------
// Comparison modal — differential destinations table
// -------------------------------------------------------------------------
function CompareModal({ names, rows, onClose, onRemove }) {
  const [sortBy, setSortBy] = useState('visitors')
  const [sortDir, setSortDir] = useState('desc')

  const cols = useMemo(() => names.map((n) => rows.find((p) => p.name === n)).filter(Boolean), [names, rows])

  // Differential set: destinations where at least one passport has access AND at least one doesn't
  const diffRows = useMemo(() => {
    const all = new Set()
    cols.forEach((c) => c.access.forEach((d) => all.add(d)))
    const rows = [...all].map((d) => {
      const access = cols.map((c) => c.access.has(d))
      const hasAccess = access.filter(Boolean).length
      return {
        dest: d,
        v: DESTS[d].v,
        flag: DESTS[d].flag,
        region: DESTS[d].region,
        access,
        differs: hasAccess > 0 && hasAccess < cols.length
      }
    }).filter((r) => r.differs)

    rows.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'visitors') cmp = b.v - a.v
      else if (sortBy === 'name') cmp = a.dest.localeCompare(b.dest)
      return sortDir === 'asc' ? -cmp : cmp
    })
    const ranked = [...rows].sort((a, b) => b.v - a.v)
    rows.forEach((r) => { r.rank = ranked.indexOf(r) + 1 })
    return rows
  }, [cols, sortBy, sortDir])

  function toggleSort(key) {
    if (sortBy === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortBy(key); setSortDir(key === 'name' ? 'asc' : 'desc') }
  }
  const arrow = (key) => sortBy === key ? sortDir === 'asc' ? ' ↑' : ' ↓' : ''

  return (
    <div className="cmp-overlay" onClick={onClose}>
      <div className="cmp-modal" onClick={(e) => e.stopPropagation()}>
        <header className="cmp-header">
          <div>
            <h2 className="cmp-title">Passport Comparison</h2>
            <p className="cmp-sub">
              {diffRows.length} destinations with different access across {cols.length} passports
            </p>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="cmp-body">
          <table className="cmp-table">
            <thead>
              <tr>
                <th onClick={() => toggleSort('rank')} className="cmp-th cmp-th-sortable">RANK{arrow('rank')}</th>
                <th onClick={() => toggleSort('name')} className="cmp-th cmp-th-sortable">DESTINATION{arrow('name')}</th>
                <th onClick={() => toggleSort('visitors')} className="cmp-th cmp-th-sortable cmp-th-num">VISITORS{arrow('visitors')}</th>
                {cols.map((c) =>
                <th key={c.name} className="cmp-th cmp-th-pass">
                    <div className="cmp-pass-head">
                      <span className="cmp-pass-flag">{c.flag}</span>
                      <span className="cmp-pass-name">{c.name}</span>
                      <button className="cmp-pass-remove" onClick={() => onRemove(c.name)} title="Remove">×</button>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {diffRows.map((r) =>
              <tr key={r.dest}>
                  <td className="cmp-rank">{r.rank}</td>
                  <td className="cmp-dest">
                    <span className="cmp-dest-flag">{r.flag}</span>
                    <span>{r.dest}</span>
                  </td>
                  <td className="cmp-num">{fmtVisitors(r.v)}</td>
                  {r.access.map((has, i) =>
                <td key={i} className={'cmp-cell ' + (has ? 'cmp-cell-yes' : 'cmp-cell-no')}>
                      {has ? <span className="cmp-mark cmp-mark-yes">✓</span> : <span className="cmp-mark cmp-mark-no">✗</span>}
                    </td>
                )}
                </tr>
              )}
              {diffRows.length === 0 &&
              <tr>
                  <td colSpan={3 + cols.length} className="cmp-empty">
                    All selected passports have identical access. Try adding a more contrasting country.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <footer className="cmp-footer">
          <span className="t-meta">
            Each row is a destination where access differs.
            <span className="cmp-mark cmp-mark-yes">✓</span> = entry permitted ·
            <span className="cmp-mark cmp-mark-no">✗</span> = visa required.
          </span>
        </footer>
      </div>
    </div>)
}

// -------------------------------------------------------------------------
// Ranking row
// -------------------------------------------------------------------------
function RankingRow({ p, isSelected, isInCompare, onSelect, onToggleCompare, onRemoveCombo, maxScore }) {
  const cls = ['rank-row']
  if (isSelected) cls.push('is-selected')
  if (isInCompare) cls.push('is-compare')
  if (p.isCombo) cls.push('is-combo')
  // Tie-group rendering: only the FIRST row of a tie group shows the rank
  // number; it sticks for the duration of the group via position: sticky.
  const tied = p.tieCount > 1
  if (tied) cls.push('is-tied')
  if (tied && p.tiePos === 0) cls.push('is-tie-first')
  if (tied && p.tieIsLast) cls.push('is-tie-last')
  const showRank = !tied || p.tiePos === 0

  return (
    <tr className={cls.join(' ')} onClick={() => onSelect(p.name)} data-row-name={p.name}>
      <td className="col-rank">
        {showRank ? (
          <span className="rank-num">{p.rank}</span>
        ) : null}
      </td>
      <td className="col-check" onClick={(e) => e.stopPropagation()}>
        <label className="check-wrap" title="Add to comparison">
          <input
            type="checkbox"
            checked={isInCompare}
            onChange={() => onToggleCompare(p.name)} />

          <span className="check-box">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </label>
      </td>
      <td className="col-flag"><span className="flag-cell">{p.flag}</span></td>
      <td className="col-name">
        <span className="name-text">{p.name}</span>
        {p.isCombo &&
        <>
            <span className="combo-badge">combined</span>
            <button
            className="combo-remove"
            onClick={(e) => { e.stopPropagation(); onRemoveCombo(p.name) }}
            title="Remove this combined passport">×</button>
          </>
        }
      </td>
      <td className="col-score">{fmtVisitors(p.totalM)}</td>
      <td className="col-spark"><Sparkbar value={p.totalM} max={maxScore} /></td>
      <td className="col-unique">
        <div className="unique-row">
          {p.top.map((n) =>
          <span key={n} className="unique-pill">
              <span className="unique-pill-flag">{DESTS[n]?.flag || '🏳️'}</span>
              {n}
            </span>
          )}
        </div>
      </td>
    </tr>)
}

// -------------------------------------------------------------------------
// Footer
// -------------------------------------------------------------------------
function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="footer-note">
        Sources: <a href="https://github.com/visualpharm/visa-free-dataset" target="_blank" rel="noopener">visa-free-dataset</a> on
        GitHub (visa rules), UN Tourism and World Bank (tourist arrivals),{' '}
        <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> (map geometry).
      </div>
      <div className="footer-note">
        Country borders and disputed territories are simplified for visualization.
        Colors represent tourism-flow data, not political status.
      </div>
      <div className="footer-base">
        <span>© 2026 Ivan Braun</span>
        <span className="footer-spacer" />
        <span className="t-mono">build · 2026.06.11</span>
      </div>
    </footer>)
}

// -------------------------------------------------------------------------
// Page root
// -------------------------------------------------------------------------
export default function PassportRanking() {
  const [region, setRegion] = useState('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('score')
  const [selectedName, setSelectedName] = useState(null)
  const [compareSet, setCompareSet] = useState(new Set())
  const [compareOpen, setCompareOpen] = useState(false)
  const [combos, setCombos] = useState([])
  const tableRef = useRef(null)

  const allRows = useMemo(() => [...PASSPORTS, ...combos], [combos])

  const filtered = useMemo(() => {
    let rows = PASSPORTS
    if (region !== 'ALL') rows = rows.filter((p) => p.region === region)
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter((p) => p.name.toLowerCase().includes(q))
    }
    // Combined passports are pinned into the ranking regardless of filters.
    rows = [...rows, ...combos]
    if (sort === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name))
    else rows = [...rows].sort((a, b) => b.totalM - a.totalM)
    return rows
  }, [region, search, sort, combos])

  const selected = selectedName ? allRows.find((p) => p.name === selectedName) : null
  const maxScore = PASSPORTS[0].totalM

  function toggleCompare(name) {
    setCompareSet((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else if (next.size < 4) next.add(name)
      return next
    })
  }

  function combineSelected() {
    const members = [...compareSet].map((n) => allRows.find((p) => p.name === n)).filter(Boolean)
    if (members.length < 2) return
    const combo = makeCombo(members)
    setCompareSet(new Set())
    if (allRows.some((p) => p.name === combo.name)) return
    setCombos((prev) => [...prev, combo])
    setTimeout(() => {
      document.querySelector(`[data-row-name="${CSS.escape(combo.name)}"]`)?.
      scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 80)
  }

  function removeCombo(name) {
    setCombos((prev) => prev.filter((c) => c.name !== name))
    setCompareSet((prev) => {
      if (!prev.has(name)) return prev
      const next = new Set(prev)
      next.delete(name)
      return next
    })
    if (selectedName === name) setSelectedName(null)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (compareOpen) setCompareOpen(false)
        else if (selectedName) setSelectedName(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedName, compareOpen])

  // Measure actual sticky heights and publish as CSS variables so pinned rows
  // sit flush below the real stack (which can wrap on narrower viewports).
  useEffect(() => {
    function measure() {
      const nav = document.querySelector('.topnav')
      const filter = document.querySelector('.filter-row')
      const prompt = document.querySelector('.compare-prompt')
      const root = document.documentElement
      const navH = nav ? nav.getBoundingClientRect().height : 60
      const filterH = filter ? filter.getBoundingClientRect().height : 49
      const promptH = prompt ? prompt.getBoundingClientRect().height : 0
      root.style.setProperty('--nav-h', navH + 'px')
      root.style.setProperty('--filter-h', filterH + 'px')
      root.style.setProperty('--prompt-h', promptH + 'px')
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ;[document.querySelector('.topnav'), document.querySelector('.filter-row'), document.querySelector('.compare-prompt')].
    filter(Boolean).forEach((el) => ro.observe(el))
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [compareSet.size])

  return (
    <div className="page">
      <Head>
        <title>The Open Door Index · A passport ranking that measures where you want to go | Ivan Braun</title>
        <meta name="description" content="A passport ranking that measures which doors are worth walking through - every destination weighted by annual tourist arrivals instead of counting countries." />
        <meta name="keywords" content="passport ranking, passport index, open door index, visa-free travel, passport power, tourism potential" />
        <link rel="canonical" href="https://aiandtractors.com/passport-ranking" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/open-door/noe.css" />
        <link rel="stylesheet" href="/open-door/styles.css" />
      </Head>

      <nav className="topnav">
        <div className="topnav-inner">
          <a className="topnav-brand pixel-brand" href="/">Ivan Braun</a>
          <div className="topnav-links">
            <a href="/experience">Experience</a>
            <a href="/book">Book</a>
            <a href="/tech-events-2026">Tech Events</a>
            <a href="/passport-ranking" className="is-active">Passport Ranking</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="topnav-langs">
            <span className="lang-flag" title="English">🇺🇸</span>
            <span className="lang-flag" title="Español">🇦🇷</span>
            <span className="lang-flag" title="Português">🇧🇷</span>
          </div>
        </div>
      </nav>

      <main className="page-main">
        <Hero onSelect={setSelectedName} />

        <PowerMap rows={PASSPORTS} />

        <FilterRow
          region={region} setRegion={setRegion}
          search={search} setSearch={setSearch}
          sort={sort} setSort={setSort} />

        <ComparePrompt
          count={compareSet.size}
          onOpen={() => setCompareOpen(true)}
          onClear={() => setCompareSet(new Set())}
          onCombine={combineSelected} />

        <div className="ranking-table-wrap" ref={tableRef}>
          <table className="ranking-table">
            <thead>
              <tr>
                <th className="col-rank">Rank</th>
                <th className="col-check" title="Compare"></th>
                <th className="col-flag"></th>
                <th className="col-name">Country</th>
                <th className="col-score">Total reach</th>
                <th className="col-spark">Relative</th>
                <th className="col-unique">Interesting access</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) =>
              <RankingRow
                key={'row-' + p.name}
                p={p}
                isSelected={selectedName === p.name}
                isInCompare={compareSet.has(p.name)}
                onSelect={setSelectedName}
                onToggleCompare={toggleCompare}
                onRemoveCombo={removeCombo}
                maxScore={maxScore} />
              )}
              {filtered.length === 0 &&
              <tr><td colSpan="7" className="empty-row">No countries match those filters.</td></tr>
              }
            </tbody>
          </table>
        </div>

        <PageFooter />
      </main>

      {selected &&
      <CountryDetail
        country={selected}
        onClose={() => setSelectedName(null)}
        onCompare={toggleCompare}
        isComparing={compareSet.has(selected.name)}
        compareCount={compareSet.size}
        onOpenCompare={() => setCompareOpen(true)} />
      }

      {compareOpen && compareSet.size >= 2 &&
      <CompareModal
        names={[...compareSet]}
        rows={allRows}
        onClose={() => setCompareOpen(false)}
        onRemove={(n) => toggleCompare(n)} />
      }
    </div>)
}
