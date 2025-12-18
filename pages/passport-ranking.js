import Head from 'next/head'
import Layout from '../components/Layout'
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for react-simple-maps to avoid SSR issues
const ComposableMap = dynamic(
  () => import('react-simple-maps').then(mod => mod.ComposableMap),
  { ssr: false }
)
const Geographies = dynamic(
  () => import('react-simple-maps').then(mod => mod.Geographies),
  { ssr: false }
)
const Geography = dynamic(
  () => import('react-simple-maps').then(mod => mod.Geography),
  { ssr: false }
)
const ZoomableGroup = dynamic(
  () => import('react-simple-maps').then(mod => mod.ZoomableGroup),
  { ssr: false }
)

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"


// Import calculated passport data from data pipeline
import calculatedData from '../data/calculated-passport-scores.json'
import tourismRaw from '../data/unwto-tourism-2023.json'

const tourismData = tourismRaw.data

// Algorithm: Score = Sum of annual visitors (in millions) to all visa-free/VOA/ETA destinations
// Data Sources:
// - Tourism data: UNWTO Tourism Statistics 2023/2024
// - Visa data: github.com/ilyankou/passport-index-dataset

// Extract passport data from the calculated results
const passportData = calculatedData.results

const maxScore = Math.max(...passportData.map(p => p.score))

function getGradientColor(score) {
  // Smooth gradient from red (worst) -> orange -> yellow -> yellow-green -> green (best)
  const ratio = Math.min(score / maxScore, 1)

  // Use HSL color space for smooth transitions
  // Hue: 0 (red) -> 30 (orange) -> 60 (yellow) -> 90 (yellow-green) -> 120 (green)
  const hue = ratio * 120 // 0 = red, 120 = green

  // Adjust saturation and lightness based on hue for prettier colors
  // Orange/yellow (hue 20-60) looks better with higher saturation and slightly different lightness
  let saturation = 75
  let lightness = 48

  if (hue >= 20 && hue <= 60) {
    // Orange to yellow range - boost saturation for vibrancy
    saturation = 85
    lightness = 50
  } else if (hue > 60 && hue <= 90) {
    // Yellow-green - slightly less saturation
    saturation = 70
    lightness = 42
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(3) + 'B'
  }
  return num + 'M'
}

// Region mapping for passports
const regionMap = {
  // Europe
  france: 'Europe', spain: 'Europe', italy: 'Europe', united_kingdom: 'Europe', germany: 'Europe',
  greece: 'Europe', austria: 'Europe', portugal: 'Europe', poland: 'Europe', croatia: 'Europe',
  netherlands: 'Europe', hungary: 'Europe', ireland: 'Europe', czech_republic: 'Europe', sweden: 'Europe',
  switzerland: 'Europe', romania: 'Europe', belgium: 'Europe', norway: 'Europe', slovakia: 'Europe',
  bulgaria: 'Europe', slovenia: 'Europe', denmark: 'Europe', lithuania: 'Europe', cyprus: 'Europe',
  latvia: 'Europe', finland: 'Europe', estonia: 'Europe', malta: 'Europe', iceland: 'Europe',
  luxembourg: 'Europe', liechtenstein: 'Europe', monaco: 'Europe', san_marino: 'Europe', andorra: 'Europe',
  serbia: 'Europe', montenegro: 'Europe', north_macedonia: 'Europe', albania: 'Europe', bosnia: 'Europe',
  ukraine: 'Europe', moldova: 'Europe', georgia: 'Europe', armenia: 'Europe', azerbaijan: 'Europe',
  belarus: 'Europe', russia: 'Europe', kosovo: 'Europe', turkey: 'Europe',

  // Asia
  united_arab_emirates: 'Asia', brunei: 'Asia', singapore: 'Asia', japan: 'Asia', south_korea: 'Asia',
  hong_kong: 'Asia', taiwan: 'Asia', malaysia: 'Asia', israel: 'Asia', qatar: 'Asia',
  kuwait: 'Asia', bahrain: 'Asia', thailand: 'Asia', oman: 'Asia', saudi_arabia: 'Asia',
  indonesia: 'Asia', china: 'Asia', jordan: 'Asia', kazakhstan: 'Asia', philippines: 'Asia',
  lebanon: 'Asia', mongolia: 'Asia', uzbekistan: 'Asia', india: 'Asia', vietnam: 'Asia',
  kyrgyzstan: 'Asia', cambodia: 'Asia', maldives: 'Asia', iran: 'Asia', sri_lanka: 'Asia',
  tajikistan: 'Asia', myanmar: 'Asia', turkmenistan: 'Asia', bangladesh: 'Asia', iraq: 'Asia',
  pakistan: 'Asia', nepal: 'Asia', bhutan: 'Asia', syria: 'Asia', yemen: 'Asia',
  afghanistan: 'Asia', north_korea: 'Asia', laos: 'Asia', timor: 'Asia',

  // Americas
  united_states: 'Americas', canada: 'Americas', mexico: 'Americas', chile: 'Americas', argentina: 'Americas',
  barbados: 'Americas', bahamas: 'Americas', brazil: 'Americas', st_kitts: 'Americas', antigua: 'Americas',
  costa_rica: 'Americas', panama: 'Americas', grenada: 'Americas', uruguay: 'Americas', st_lucia: 'Americas',
  dominica: 'Americas', trinidad: 'Americas', st_vincent: 'Americas', peru: 'Americas', colombia: 'Americas',
  ecuador: 'Americas', paraguay: 'Americas', jamaica: 'Americas', venezuela: 'Americas', bolivia: 'Americas',

  // Oceania
  australia: 'Oceania', new_zealand: 'Oceania', fiji: 'Oceania', samoa: 'Oceania', tonga: 'Oceania',
  vanuatu: 'Oceania', palau: 'Oceania', micronesia: 'Oceania', marshall: 'Oceania', nauru: 'Oceania',
  kiribati: 'Oceania', tuvalu: 'Oceania', solomon: 'Oceania', papua: 'Oceania',

  // Africa
  south_africa: 'Africa', mauritius: 'Africa', seychelles: 'Africa', morocco: 'Africa', botswana: 'Africa',
  egypt: 'Africa', namibia: 'Africa', tunisia: 'Africa', kenya: 'Africa', tanzania: 'Africa',
  ghana: 'Africa', rwanda: 'Africa', algeria: 'Africa', nigeria: 'Africa', ivory_coast: 'Africa',
  uganda: 'Africa', zambia: 'Africa', ethiopia: 'Africa', zimbabwe: 'Africa', cameroon: 'Africa',
  mozambique: 'Africa', angola: 'Africa', drc: 'Africa', libya: 'Africa', sudan: 'Africa',
  eritrea: 'Africa', south_sudan: 'Africa', somalia: 'Africa', senegal: 'Africa',
}

// ISO 3166-1 numeric codes for world-atlas TopoJSON
const isoNumericMap = {
  '784': 'united_arab_emirates', '096': 'brunei', '702': 'singapore', '392': 'japan', '410': 'south_korea',
  '250': 'france', '724': 'spain', '380': 'italy', '826': 'united_kingdom', '276': 'germany',
  '300': 'greece', '040': 'austria', '620': 'portugal', '616': 'poland', '191': 'croatia',
  '528': 'netherlands', '348': 'hungary', '372': 'ireland', '203': 'czech_republic', '752': 'sweden',
  '756': 'switzerland', '642': 'romania', '056': 'belgium', '578': 'norway', '703': 'slovakia',
  '100': 'bulgaria', '705': 'slovenia', '208': 'denmark', '440': 'lithuania', '196': 'cyprus',
  '428': 'latvia', '246': 'finland', '233': 'estonia', '470': 'malta', '352': 'iceland',
  '442': 'luxembourg', '438': 'liechtenstein', '492': 'monaco', '674': 'san_marino', '020': 'andorra',
  '840': 'united_states', '036': 'australia', '554': 'new_zealand', '124': 'canada',
  '344': 'hong_kong', '158': 'taiwan', '458': 'malaysia',
  '484': 'mexico', '376': 'israel', '152': 'chile', '032': 'argentina',
  '052': 'barbados', '044': 'bahamas', '076': 'brazil', '659': 'st_kitts', '028': 'antigua',
  '188': 'costa_rica', '591': 'panama', '308': 'grenada', '858': 'uruguay', '688': 'serbia',
  '662': 'st_lucia', '212': 'dominica', '780': 'trinidad', '670': 'st_vincent', '604': 'peru',
  '499': 'montenegro', '807': 'north_macedonia', '170': 'colombia', '008': 'albania', '070': 'bosnia',
  '218': 'ecuador', '600': 'paraguay', '388': 'jamaica', '862': 'venezuela', '804': 'ukraine',
  '068': 'bolivia', '498': 'moldova', '268': 'georgia', '051': 'armenia', '031': 'azerbaijan',
  '634': 'qatar', '792': 'turkey', '414': 'kuwait', '048': 'bahrain', '764': 'thailand',
  '512': 'oman', '682': 'saudi_arabia', '643': 'russia', '710': 'south_africa', '112': 'belarus',
  '360': 'indonesia', '156': 'china', '400': 'jordan', '398': 'kazakhstan', '480': 'mauritius',
  '690': 'seychelles', '383': 'kosovo', '583': 'micronesia', '584': 'marshall', '548': 'vanuatu',
  '585': 'palau', '608': 'philippines', '422': 'lebanon', '496': 'mongolia', '242': 'fiji',
  '860': 'uzbekistan', '504': 'morocco', '072': 'botswana', '818': 'egypt', '882': 'samoa',
  '356': 'india', '516': 'namibia', '776': 'tonga', '704': 'vietnam', '417': 'kyrgyzstan',
  '788': 'tunisia', '116': 'cambodia', '462': 'maldives', '404': 'kenya', '626': 'timor',
  '834': 'tanzania', '418': 'laos', '762': 'tajikistan', '090': 'solomon', '288': 'ghana',
  '364': 'iran', '520': 'nauru', '144': 'sri_lanka', '598': 'papua', '686': 'senegal',
  '296': 'kiribati', '104': 'myanmar', '795': 'turkmenistan', '646': 'rwanda', '012': 'algeria',
  '566': 'nigeria', '798': 'tuvalu', '384': 'ivory_coast', '800': 'uganda', '894': 'zambia',
  '231': 'ethiopia', '716': 'zimbabwe', '120': 'cameroon', '050': 'bangladesh', '508': 'mozambique',
  '368': 'iraq', '586': 'pakistan', '524': 'nepal', '024': 'angola', '064': 'bhutan',
  '180': 'drc', '434': 'libya', '729': 'sudan', '760': 'syria', '232': 'eritrea',
  '887': 'yemen', '728': 'south_sudan', '706': 'somalia', '004': 'afghanistan', '408': 'north_korea',
}

// Create a lookup from passport ID to passport data
const passportById = {}
passportData.forEach(p => {
  passportById[p.id] = p
})

// Generate CSV data
function generateCSV(data) {
  const headers = ['Rank', 'Country', 'Score (Millions)', 'Region', 'Key Access', 'Top Contributors', 'Major Misses', 'Note']
  const sortedData = [...data].sort((a, b) => b.score - a.score)

  const rows = sortedData.map((p, index) => {
    return [
      index + 1,
      p.country,
      p.score,
      regionMap[p.id] || 'Unknown',
      p.keyAccess.join('; '),
      p.topContributors.map(c => `${c.country}: ${c.value}M`).join('; '),
      p.misses.map(m => `${m.country}: ${m.value}M`).join('; '),
      p.note ? p.note.text : ''
    ]
  })

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return csvContent
}

function downloadCSV(data) {
  const csv = generateCSV(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'passport-ranking-total-experience-index.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function PassportRanking() {
  const [currentSort, setCurrentSort] = React.useState('score')
  const [currentFilter, setCurrentFilter] = React.useState('')
  const [currentRegion, setCurrentRegion] = React.useState('all')
  const [expandedIds, setExpandedIds] = React.useState(new Set())
  const [tooltipContent, setTooltipContent] = React.useState('')
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
  const [showMethodology, setShowMethodology] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState(new Set())
  const [showComparison, setShowComparison] = React.useState(false)
  const [showAllDifferences, setShowAllDifferences] = React.useState(false)

  const sortedData = [...passportData].sort((a, b) => {
    if (currentSort === 'score') {
      return b.score - a.score
    }
    return a.country.localeCompare(b.country)
  })

  const filteredData = sortedData.filter(p => {
    const matchesSearch = p.country.toLowerCase().includes(currentFilter.toLowerCase())
    const matchesRegion = currentRegion === 'all' || regionMap[p.id] === currentRegion
    return matchesSearch && matchesRegion
  })

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleSelection = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Get selected passports for comparison
  const selectedPassports = passportData.filter(p => selectedIds.has(p.id))

  // Get unified differences across all selected passports
  // Returns destinations where at least one passport has access and at least one doesn't
  const getUnifiedDifferences = (passports) => {
    if (passports.length < 2) return []

    // Build access sets for each passport
    const accessSets = passports.map(p => new Set(p.visaFreeDestinations || []))

    // Get all unique destinations across all passports
    const allDestinations = new Set()
    accessSets.forEach(set => set.forEach(d => allDestinations.add(d)))

    // Filter to only destinations where access differs
    const differences = []
    allDestinations.forEach(destination => {
      const accessPattern = passports.map((_, i) => accessSets[i].has(destination))
      const hasAccess = accessPattern.some(a => a)
      const lacksAccess = accessPattern.some(a => !a)

      // Only include if there's a difference (some have, some don't)
      if (hasAccess && lacksAccess) {
        differences.push({
          destination,
          tourism: tourismData[destination] || 0,
          access: accessPattern // [true, false, true] for each passport
        })
      }
    })

    // Sort by tourism value (highest first)
    differences.sort((a, b) => b.tourism - a.tourism)

    return differences
  }

  // Calculate region counts
  const regionCounts = {
    all: passportData.length,
    Europe: passportData.filter(p => regionMap[p.id] === 'Europe').length,
    Asia: passportData.filter(p => regionMap[p.id] === 'Asia').length,
    Americas: passportData.filter(p => regionMap[p.id] === 'Americas').length,
    Africa: passportData.filter(p => regionMap[p.id] === 'Africa').length,
    Oceania: passportData.filter(p => regionMap[p.id] === 'Oceania').length
  }

  return (
    <Layout>
      <Head>
        <title>Passport Ranking: The Total Experience Index | Ivan Braun</title>
        <meta name="description" content="A revolutionary passport ranking based on total tourism potential - measuring the sum of annual visitors to all accessible destinations, not just country count." />
        <meta name="keywords" content="passport ranking, passport index, total experience index, visa-free travel, passport power, tourism potential" />
        <link rel="canonical" href="https://aiandtractors.com/passport-ranking" />
      </Head>

      <div className="passport-page">
        <div className="header-section">
          <h1>The Total Experience Index</h1>
          <p className="subtitle">A passport ranking based on total tourism potential - measuring the sum of annual visitors to all accessible destinations, not just country count.</p>
        </div>

        <div className="container">
          <div className="methodology-box">
            <h2>The Methodology</h2>
            <p>Unlike traditional passport rankings that count the number of visa-free countries, this index calculates a score based on <strong>total accessible tourism volume</strong>. The logic: accessing France (100M visitors) matters more than accessing a small island nation.</p>
            <div className="formula">
              Score = Sum(Annual Visitors of all Visa-Free/eTA/VOA destinations)
            </div>
            <p className="small-text">
              Data based on UNWTO 2024 tourism statistics.
              <button className="learn-more-btn" onClick={() => setShowMethodology(true)}>
                Learn more about data sources
              </button>
            </p>
          </div>

          {showMethodology && (
            <div className="modal-overlay" onClick={() => setShowMethodology(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowMethodology(false)}>×</button>
                <h2>Data Sources & Methodology</h2>

                <div className="methodology-section">
                  <h3>Visa Requirements Data</h3>
                  <p><strong>Source:</strong> <a href="https://github.com/ilyankou/passport-index-dataset" target="_blank" rel="noopener noreferrer">Passport Index Dataset</a> (Ilya Ilyankou)</p>
                  <p>An open-source dataset tracking visa requirements between 199 passports and 227 destinations. Updated regularly to reflect the latest visa policy changes.</p>
                  <p><strong>Access types counted as visa-free:</strong></p>
                  <ul>
                    <li>Visa-free entry (any number of days)</li>
                    <li>Visa on arrival (VOA)</li>
                    <li>Electronic Travel Authorization (eTA/ETA)</li>
                  </ul>
                  <p><strong>Access types NOT counted:</strong></p>
                  <ul>
                    <li>Traditional visa required</li>
                    <li>e-Visa (requires pre-approval)</li>
                  </ul>
                </div>

                <div className="methodology-section">
                  <h3>Tourism Data</h3>
                  <p><strong>Primary Source:</strong> <a href="https://www.unwto.org/tourism-statistics/tourism-statistics-database" target="_blank" rel="noopener noreferrer">UNWTO World Tourism Barometer 2024/2025</a></p>
                  <p><strong>Baseline Data:</strong> <a href="https://data.worldbank.org/indicator/ST.INT.ARVL" target="_blank" rel="noopener noreferrer">World Bank International Tourism Arrivals</a> (2019 as baseline)</p>

                  <h4>Year Selection Logic</h4>
                  <p>We use 2024 estimates based on UNWTO reports, which indicate tourism has recovered to approximately 102% of pre-pandemic (2019) levels globally. For countries without 2024 data:</p>
                  <ul>
                    <li><strong>2019 baseline preferred</strong> over 2020-2022 pandemic years</li>
                    <li>Regional recovery rates applied based on UNWTO regional data</li>
                    <li>Asia-Pacific: slower recovery (~85% of 2019)</li>
                    <li>Middle East: exceeded 2019 levels (+20%)</li>
                    <li>Europe & Americas: ~95-100% of 2019</li>
                  </ul>
                </div>

                <div className="methodology-section">
                  <h3>Notable Data Adjustments</h3>
                  <table className="adjustments-table">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th>Adjustment</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>China</td>
                        <td>35M (2024 est.)</td>
                        <td>Expanded visa-free policy to 50+ countries in 2024-2025; slower recovery from COVID restrictions</td>
                      </tr>
                      <tr>
                        <td>Russia</td>
                        <td>8M (2024 est.)</td>
                        <td>Significantly reduced from pre-2022 levels due to international sanctions</td>
                      </tr>
                      <tr>
                        <td>Japan</td>
                        <td>35M (2024 est.)</td>
                        <td>Strong recovery post-COVID border reopening in late 2022</td>
                      </tr>
                      <tr>
                        <td>Schengen Zone</td>
                        <td>Aggregated</td>
                        <td>27 countries grouped as single entry for "Top Contributors" display</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="methodology-section">
                  <h3>Algorithm</h3>
                  <div className="formula">
                    Passport Score = Sum of (Annual Visitors in millions) for all visa-free/VOA/eTA destinations
                  </div>
                  <p>This approach weights destinations by their actual tourism activity, making access to major tourist destinations more valuable than access to smaller nations with limited visitor infrastructure.</p>
                </div>

                <div className="methodology-section">
                  <h3>Limitations</h3>
                  <ul>
                    <li>Tourism data may lag 1-2 years behind current figures</li>
                    <li>Visa policies change frequently; dataset may not reflect changes in the last few months</li>
                    <li>Some small nations have estimated visitor numbers</li>
                    <li>Transit visa-free arrangements (e.g., China's 144-hour transit) not counted</li>
                  </ul>
                </div>

                <div className="methodology-section last-updated">
                  <p><strong>Last Updated:</strong> December 2025</p>
                </div>
              </div>
            </div>
          )}

          {showComparison && selectedPassports.length >= 2 && (
            <div className="modal-overlay" onClick={() => { setShowComparison(false); setShowAllDifferences(false); }}>
              <div className="modal-content comparison-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => { setShowComparison(false); setShowAllDifferences(false); }}>×</button>
                <h2>Passport Comparison</h2>

                {(() => {
                  const differences = getUnifiedDifferences(selectedPassports)
                  const displayLimit = 30
                  const displayedDiffs = showAllDifferences ? differences : differences.slice(0, displayLimit)
                  const hiddenCount = differences.length - displayLimit

                  return (
                    <div className="comparison-content">
                      <table className="comparison-table unified-table">
                        <thead>
                          <tr>
                            <th className="dest-header">Destination</th>
                            {selectedPassports.map(p => (
                              <th key={p.id} className="passport-header">
                                <span className="comparison-flag">{p.flag}</span>
                                <span className="passport-name">{p.country}</span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedDiffs.map((diff, i) => (
                            <tr key={i}>
                              <td className="dest-cell">
                                <span className="dest-name">{diff.destination}</span>
                                {diff.tourism > 0 && (
                                  <span className="dest-tourism">({diff.tourism}M)</span>
                                )}
                              </td>
                              {diff.access.map((hasAccess, j) => (
                                <td key={j} className={`access-cell ${hasAccess ? 'has-access' : 'no-access'}`}>
                                  {hasAccess ? '✅' : '❌'}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {differences.length === 0 && (
                            <tr>
                              <td colSpan={selectedPassports.length + 1} className="no-differences">
                                These passports have identical visa-free access!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {!showAllDifferences && hiddenCount > 0 && (
                        <button
                          className="show-more-link"
                          onClick={() => setShowAllDifferences(true)}
                        >
                          {hiddenCount} more...
                        </button>
                      )}
                      {showAllDifferences && hiddenCount > 0 && (
                        <button
                          className="show-more-link"
                          onClick={() => setShowAllDifferences(false)}
                        >
                          Show less
                        </button>
                      )}
                      <div className="comparison-summary">
                        <p>{differences.length} destinations with different access across {selectedPassports.length} passports</p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

          <div className="map-container">
            <h2>Global Passport Power Map</h2>
            {tooltipContent && (
              <div
                className="map-tooltip"
                style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
              >
                {tooltipContent}
              </div>
            )}
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [0, 30]
              }}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      // world-atlas uses ISO numeric codes as geo.id
                      const numericId = geo.id
                      const passportId = isoNumericMap[numericId]
                      const passport = passportId ? passportById[passportId] : null
                      const fillColor = passport ? getGradientColor(passport.score) : '#e5e7eb'

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', stroke: '#fff', strokeWidth: 2 },
                            pressed: { outline: 'none' }
                          }}
                          onMouseEnter={(e) => {
                            const name = geo.properties.name || geo.properties.NAME || 'Unknown'
                            if (passport) {
                              setTooltipContent(`${passport.flag} ${passport.country}: ${formatNumber(passport.score)}`)
                            } else {
                              setTooltipContent(name)
                            }
                            setTooltipPosition({ x: e.clientX + 10, y: e.clientY - 30 })
                          }}
                          onMouseMove={(e) => {
                            setTooltipPosition({ x: e.clientX + 10, y: e.clientY - 30 })
                          }}
                          onMouseLeave={() => {
                            setTooltipContent('')
                          }}
                        />
                      )
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <div className="map-legend">
              <span className="legend-label">Low</span>
              <div className="legend-gradient"></div>
              <span className="legend-label">High</span>
              <span className="legend-item" style={{marginLeft: '1rem'}}><span className="legend-color" style={{background: '#e5e7eb'}}></span> No data</span>
            </div>
          </div>

          <div className="controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by country name..."
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <select
                className="filter-select"
                value={currentRegion}
                onChange={(e) => setCurrentRegion(e.target.value)}
              >
                <option value="all">All Regions ({regionCounts.all})</option>
                <option value="Europe">Europe ({regionCounts.Europe})</option>
                <option value="Asia">Asia ({regionCounts.Asia})</option>
                <option value="Americas">Americas ({regionCounts.Americas})</option>
                <option value="Africa">Africa ({regionCounts.Africa})</option>
                <option value="Oceania">Oceania ({regionCounts.Oceania})</option>
              </select>
              <select
                className="filter-select"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                <option value="score">Sort by Score</option>
                <option value="name">Sort by Name</option>
              </select>
              <button
                className="export-btn"
                onClick={() => downloadCSV(passportData)}
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            {selectedIds.size < 2 ? (
              <div className="compare-hint-row">
                <div className="hint-spacer"></div>
                <div className="hint-arrow-cell">↓</div>
                <div className="hint-text">Choose 2+ to compare</div>
              </div>
            ) : (
              <div className="compare-actions-row">
                <span className="selected-count">{selectedIds.size} selected</span>
                <button
                  className="compare-btn"
                  onClick={() => setShowComparison(true)}
                >
                  Compare
                </button>
                <button
                  className="clear-btn"
                  onClick={() => setSelectedIds(new Set())}
                >
                  Clear
                </button>
              </div>
            )}

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="rank-col">Rank</th>
                  <th className="checkbox-col"></th>
                  <th className="country-col">Country</th>
                  <th className="score-col">Visitors</th>
                  <th className="access-col">Key Access</th>
                  <th className="expand-col"></th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // Pre-calculate rank groups for merged cells
                  const rankGroups = []
                  if (currentSort === 'score') {
                    let currentRank = 1
                    let i = 0
                    while (i < filteredData.length) {
                      const currentScore = filteredData[i].score
                      let groupSize = 1
                      // Count how many countries have the same score
                      while (i + groupSize < filteredData.length && filteredData[i + groupSize].score === currentScore) {
                        groupSize++
                      }
                      // Assign same rank to all in group
                      for (let j = 0; j < groupSize; j++) {
                        rankGroups.push({
                          rank: currentRank,
                          isFirstInGroup: j === 0,
                          groupSize: groupSize
                        })
                      }
                      currentRank += groupSize
                      i += groupSize
                    }
                  }

                  return filteredData.map((passport, index) => {
                    const rankInfo = currentSort === 'score' ? rankGroups[index] : null
                    const rank = rankInfo ? rankInfo.rank : '-'
                    const rankClass = rank <= 3 ? `rank-${rank}` : ''
                    const progressWidth = (passport.score / maxScore) * 100
                    const isExpanded = expandedIds.has(passport.id)
                    const showRankCell = currentSort !== 'score' || rankInfo?.isFirstInGroup

                    // Sort top contributors by value descending
                    const sortedContributors = [...passport.topContributors].sort((a, b) => b.value - a.value)

                    // Calculate rowSpan: need to account for expanded detail rows
                    const calculateRowSpan = () => {
                      if (!rankInfo || !rankInfo.isFirstInGroup) return 1
                      let span = rankInfo.groupSize
                      // Add extra rows for any expanded items in this group
                      for (let j = 0; j < rankInfo.groupSize; j++) {
                        if (expandedIds.has(filteredData[index + j]?.id)) {
                          span++
                        }
                      }
                      return span
                    }

                    return (
                      <React.Fragment key={passport.id}>
                        <tr
                          className={`clickable ${isExpanded ? 'expanded' : ''}`}
                          onClick={() => toggleExpand(passport.id)}
                        >
                          {showRankCell && (
                            <td
                              className={`rank ${rankClass}`}
                              rowSpan={calculateRowSpan()}
                            >
                              {rank}
                            </td>
                          )}
                          <td className="checkbox-cell">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(passport.id)}
                              onChange={() => toggleSelection(passport.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                        <td className="country-cell">
                          <span className="flag">{passport.flag}</span>
                          <span className="country-name">{passport.country}</span>
                        </td>
                        <td className="score-cell">
                          <div className="score-value">{formatNumber(passport.score)}</div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${progressWidth}%`, background: getGradientColor(passport.score) }}
                            ></div>
                          </div>
                        </td>
                        <td className="key-access">
                          {passport.keyAccess.map((k, i) => (
                            <span key={i} className="key-access-tag">{k}</span>
                          ))}
                        </td>
                        <td className="expand-cell">
                          <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="detail-row">
                          <td colSpan="6">
                            <div className="detail-content">
                              <div className="detail-grid">
                                <div className="detail-section">
                                  <h4>Top Contributors</h4>
                                  {sortedContributors.map((c, i) => (
                                    <div key={i} className="detail-item">
                                      <span className="country">{c.country}</span>
                                      <span className="value positive">+{c.value}M</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="detail-section">
                                  <h4>Top Visa-Required</h4>
                                  {passport.misses.length > 0 ? passport.misses.map((c, i) => (
                                    <div key={i} className="detail-item">
                                      <span className="country">{c.country}</span>
                                      <span className="value negative">{c.value}M</span>
                                    </div>
                                  )) : <p className="no-misses">No major restrictions</p>}
                                </div>
                                {passport.note && (
                                  <div className="detail-section commentary-section">
                                    <h4>{passport.note.title}</h4>
                                    <p className="commentary-text">{passport.note.text}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
          </div>

          <div className="footer-info">
            <p>Data sources: <a href="https://www.unwto.org/tourism-statistics/tourism-statistics-database">UNWTO Tourism Statistics 2023/2024</a>, <a href="https://github.com/ilyankou/passport-index-dataset" className="github-link"><svg viewBox="0 0 16 16" width="16" height="16" className="github-icon"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg> Passport Index Dataset</a></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .passport-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
        }

        .header-section {
          text-align: center;
          padding: 3rem 0 2rem;
        }

        .header-section h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--secondary-color);
          max-width: 700px;
          margin: 0 auto 1rem;
        }

        .passport-count {
          font-size: 0.9rem;
          color: var(--accent-color);
          font-weight: 600;
        }

        .methodology-box {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .map-container {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .map-container h2 {
          font-size: 1.2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .map-tooltip {
          position: fixed;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          pointer-events: none;
          z-index: 1000;
          white-space: nowrap;
        }

        .map-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .legend-gradient {
          width: 200px;
          height: 16px;
          border-radius: 3px;
          background: linear-gradient(to right,
            hsl(0, 75%, 48%),
            hsl(25, 85%, 50%),
            hsl(45, 85%, 50%),
            hsl(75, 70%, 42%),
            hsl(120, 75%, 48%)
          );
        }

        .legend-label {
          font-size: 0.8rem;
          color: var(--secondary-color);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--secondary-color);
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }

        .export-btn {
          padding: 0.75rem 1.25rem;
          border: 1px solid var(--accent-color);
          border-radius: 8px;
          background: var(--accent-color);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-btn:hover {
          background: #3347b0;
        }

        .methodology-box h2 {
          font-size: 1.2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .methodology-box p {
          color: var(--secondary-color);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .formula {
          background: var(--bg-color);
          border-left: 4px solid var(--accent-color);
          padding: 1rem 1.25rem;
          border-radius: 0 8px 8px 0;
          font-family: 'Courier New', monospace;
          color: var(--primary-color);
          font-size: 0.9rem;
          overflow-x: auto;
        }

        .small-text {
          font-size: 0.85rem;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        .learn-more-btn {
          background: none;
          border: none;
          color: var(--accent-color);
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.85rem;
          margin-left: 0.5rem;
          padding: 0;
        }

        .learn-more-btn:hover {
          color: #3347b0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--card-bg);
          border-radius: 12px;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          position: relative;
          border: 1px solid var(--border-color);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--secondary-color);
          line-height: 1;
          padding: 0;
          width: 40px;
          height: 40px;
        }

        .modal-close:hover {
          color: var(--primary-color);
        }

        .modal-content h2 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
          padding-right: 2rem;
        }

        .methodology-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .methodology-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .methodology-section h3 {
          font-size: 1.1rem;
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }

        .methodology-section h4 {
          font-size: 0.95rem;
          color: var(--primary-color);
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .methodology-section p {
          color: var(--secondary-color);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .methodology-section ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          color: var(--secondary-color);
          font-size: 0.9rem;
        }

        .methodology-section li {
          margin-bottom: 0.4rem;
          line-height: 1.5;
        }

        .methodology-section a {
          color: var(--accent-color);
          text-decoration: underline;
        }

        .methodology-section a:hover {
          color: #3347b0;
        }

        .adjustments-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          margin-top: 0.75rem;
        }

        .adjustments-table th,
        .adjustments-table td {
          padding: 0.6rem 0.75rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .adjustments-table th {
          background: var(--bg-color);
          color: var(--primary-color);
          font-weight: 600;
        }

        .adjustments-table td {
          color: var(--secondary-color);
        }

        .last-updated {
          text-align: center;
        }

        .last-updated p {
          color: var(--secondary-color);
          font-size: 0.85rem;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--primary-color);
          font-size: 1rem;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--accent-color);
        }

        .filter-controls {
          display: flex;
          gap: 0.5rem;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--primary-color);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 140px;
        }

        .filter-select:hover {
          border-color: var(--accent-color);
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent-color);
        }

        .table-container {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          width: 100%;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--secondary-color);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          background: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
        }

        .checkbox-col { width: 4%; }
        .rank-col { width: 6%; }
        .country-col { width: 18%; }
        .score-col { width: 14%; }
        .access-col { width: 53%; }
        .expand-col { width: 5%; }

        tbody tr.clickable {
          border-bottom: 1px solid var(--border-color);
        }

        tbody tr.clickable:last-of-type {
          border-bottom: none;
        }

        td {
          padding: 0.75rem 1rem;
          vertical-align: middle;
        }

        tr.clickable {
          cursor: pointer;
        }

        tr.clickable:hover {
          background: var(--bg-color);
        }

        tr.expanded {
          background: var(--bg-color);
        }

        tr.expanded td {
        }

        .rank {
          font-weight: 700;
          font-size: 1rem;
          color: var(--secondary-color);
          vertical-align: middle;
          text-align: center;
          border-right: 1px solid var(--border-color);
        }

        .rank-1 { color: #fbbf24; }
        .rank-2 { color: #9ca3af; }
        .rank-3 { color: #d97706; }

        .country-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .flag {
          font-size: 1.5rem;
          line-height: 1;
        }

        .country-name {
          font-weight: 500;
          color: var(--primary-color);
          font-size: 0.95rem;
        }

        .score-cell {
          min-width: 120px;
        }

        .score-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 4px;
        }

        .progress-bar {
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .key-access {
          font-size: 0.8rem;
        }

        .key-access-tag {
          display: inline-block;
          background: var(--bg-color);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin: 2px;
          font-size: 0.75rem;
          color: var(--secondary-color);
        }

        .expand-cell {
          text-align: center;
        }

        .expand-icon {
          color: var(--secondary-color);
          font-size: 0.7rem;
          transition: transform 0.3s;
          display: inline-block;
        }

        .expand-icon.rotated {
          transform: rotate(180deg);
        }

        .detail-row td {
          padding: 0;
          background: var(--bg-color);
        }

        .detail-row {
          border-bottom: 1px solid var(--border-color);
        }

        .detail-content {
          padding: 1.5rem;
          overflow: hidden;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 1rem;
          max-width: 100%;
        }

        .detail-section {
          background: var(--card-bg);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .detail-section h4 {
          color: var(--accent-color);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }


        .commentary-section {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.1));
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-left: 4px solid #22c55e;
        }

        .commentary-section h4 {
          color: #16a34a;
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0;
        }

        .commentary-text {
          color: var(--primary-color);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item .country {
          color: var(--primary-color);
        }

        .detail-item .value {
          font-weight: 600;
        }

        .detail-item .value.positive {
          color: #22c55e;
        }

        .detail-item .value.negative {
          color: #ef4444;
        }

        .no-misses {
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin: 0;
        }

        .footer-info {
          text-align: center;
          padding: 2rem;
          color: var(--secondary-color);
          font-size: 0.85rem;
        }

        .footer-info a {
          color: #2563eb;
          text-decoration: underline;
        }

        .footer-info a:hover {
          color: #1d4ed8;
        }

        .footer-info .github-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .footer-info .github-icon {
          vertical-align: middle;
        }

        @media (max-width: 768px) {
          .passport-page {
            padding: 0 1rem 2rem;
          }

          .header-section h1 {
            font-size: 1.8rem;
          }

          th, td {
            padding: 0.5rem 0.25rem;
          }

          .rank-col {
            width: 40px;
          }

          .score-col {
            width: 80px;
          }

          .expand-col {
            width: 30px;
          }

          .access-col {
            display: none;
          }

          .key-access {
            display: none;
          }

          .country-col {
            width: auto;
          }

          .country-cell {
            gap: 0.5rem;
          }

          .flag {
            font-size: 1.2rem;
          }

          .country-name {
            font-size: 0.85rem;
          }

          .score-value {
            font-size: 0.85rem;
          }

          .rank {
            font-size: 0.9rem;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .controls {
            flex-direction: column;
          }

          .filter-controls {
            width: 100%;
            flex-direction: column;
          }

          .filter-select {
            width: 100%;
          }

          .export-btn {
            width: 100%;
          }

          .map-legend {
            gap: 0.5rem;
          }

          .legend-gradient {
            width: 120px;
          }

          .legend-item {
            font-size: 0.7rem;
          }

          .legend-label {
            font-size: 0.7rem;
          }

          .checkbox-col {
            width: 30px;
          }

          .comparison-bar {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .comparison-table {
            font-size: 0.8rem;
          }

          .comparison-header {
            padding: 0.5rem;
          }

          .comparison-flag {
            font-size: 1.2rem;
          }

          .pairwise-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Checkbox cell styling */
        .checkbox-cell {
          text-align: center;
          padding: 0.5rem;
        }

        .checkbox-cell input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--accent-color);
        }

        /* Comparison bar */
        .comparison-bar {
          position: sticky;
          top: 0;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .compare-hint {
          color: var(--secondary-color);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hint-arrow {
          font-size: 1.2rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .compare-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .selected-count {
          color: var(--primary-color);
          font-weight: 500;
        }

        .compare-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .compare-btn:hover {
          background: #3347b0;
        }

        .clear-btn {
          background: transparent;
          color: var(--secondary-color);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-btn:hover {
          border-color: var(--secondary-color);
          color: var(--primary-color);
        }

        /* Table wrapper for sticky hint row */
        .table-wrapper {
          position: relative;
        }

        .compare-hint-row {
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          background: var(--card-bg);
          z-index: 100;
          padding: 0.5rem 0;
          margin-bottom: 0.5rem;
        }

        .hint-spacer {
          width: 6%;
        }

        .hint-arrow-cell {
          width: 4%;
          text-align: center;
          font-size: 1.2rem;
          color: var(--secondary-color);
          animation: pulse 2s infinite;
        }

        .hint-text {
          color: var(--secondary-color);
          font-size: 0.85rem;
        }

        .compare-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: sticky;
          top: 0;
          background: var(--card-bg);
          z-index: 100;
          padding: 0.5rem 0;
          margin-bottom: 0.5rem;
        }

        /* Comparison modal */
        .comparison-modal {
          max-width: 900px;
        }

        .comparison-content {
          margin-top: 1.5rem;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .comparison-header {
          background: var(--bg-color);
          padding: 1rem;
          text-align: center;
          font-weight: 600;
          color: var(--primary-color);
          border-bottom: 2px solid var(--border-color);
        }

        .comparison-flag {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .comparison-cell {
          padding: 0.5rem 1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: top;
        }

        .comparison-cell:first-child {
          border-right: 1px solid var(--border-color);
        }

        .dest-name {
          color: var(--primary-color);
        }

        .dest-tourism {
          color: var(--secondary-color);
          font-size: 0.85rem;
          margin-left: 0.5rem;
        }

        .no-differences {
          text-align: center;
          padding: 2rem;
          color: var(--secondary-color);
          font-style: italic;
        }

        .comparison-summary {
          margin-top: 1.5rem;
          padding: 1rem;
          background: var(--bg-color);
          border-radius: 8px;
        }

        .comparison-summary p {
          margin: 0.5rem 0;
          color: var(--secondary-color);
        }

        /* Multi-country comparison */
        .multi-select-note {
          color: var(--secondary-color);
          margin-bottom: 1.5rem;
        }

        .pairwise-comparison {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .pairwise-comparison:last-child {
          border-bottom: none;
        }

        .pairwise-comparison h3 {
          color: var(--primary-color);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .pairwise-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .pairwise-col h4 {
          color: var(--accent-color);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .pairwise-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pairwise-col li {
          padding: 0.35rem 0;
          color: var(--primary-color);
          font-size: 0.9rem;
          border-bottom: 1px solid var(--border-color);
        }

        .pairwise-col li:last-child {
          border-bottom: none;
        }

        .pairwise-col li.more {
          color: var(--secondary-color);
          font-style: italic;
        }

        /* Unified comparison table */
        .unified-table {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }

        .unified-table th,
        .unified-table td {
          padding: 0.75rem;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }

        .dest-header {
          text-align: left !important;
          min-width: 180px;
          background: var(--bg-color);
        }

        .passport-header {
          background: var(--bg-color);
          min-width: 80px;
        }

        .passport-header .passport-name {
          font-size: 0.75rem;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dest-cell {
          text-align: left !important;
        }

        .access-cell {
          font-size: 1rem;
        }

        .access-cell.has-access {
          background: rgba(34, 197, 94, 0.1);
        }

        .access-cell.no-access {
          background: rgba(239, 68, 68, 0.1);
        }

        .show-more-link {
          display: block;
          width: 100%;
          padding: 0.75rem;
          margin-top: 0.5rem;
          background: none;
          border: none;
          color: var(--accent-color);
          font-size: 0.9rem;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s;
        }

        .show-more-link:hover {
          background: var(--bg-color);
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  )
}
