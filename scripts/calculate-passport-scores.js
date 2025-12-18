/**
 * Passport Score Calculator
 *
 * Algorithm:
 * For each passport, sum the tourism value (annual visitors in millions) of all
 * destinations that can be accessed without a traditional visa.
 *
 * Access types that count toward the score:
 * - Numeric values (e.g., "90", "30") = visa-free for N days
 * - "visa on arrival" = can enter without pre-arranged visa
 * - "eta" = electronic travel authorization (like US ESTA, Canada eTA)
 *
 * Access types that do NOT count:
 * - "visa required" = needs traditional visa application
 * - "e-visa" = requires online visa application before travel
 * - "covid ban" or similar = no entry allowed
 */

const fs = require('fs')
const path = require('path')

// Load datasets
const tourismData = require('../data/unwto-tourism-2023.json')
const tourismAdjustments = require('../data/tourism-adjustments.json')
const visaCorrections = require('../data/visa-corrections.json')
const passportCsvPath = path.join(__dirname, '../data/passport-index-tidy.csv')

// Country name mappings (passport dataset -> tourism dataset)
// Note: Most mappings are now handled in extract-unwto-data.js
const countryNameMap = {
  'United States': 'United States',
  'Ivory Coast': 'Ivory Coast',
  'Timor-Leste': 'Timor-Leste',
  'Swaziland': 'Eswatini',
  'North Korea': 'North Korea',
  'South Korea': 'South Korea',
  'UAE': 'United Arab Emirates'
}

// Country flags
const countryFlags = {
  'Afghanistan': '🇦🇫', 'Albania': '🇦🇱', 'Algeria': '🇩🇿', 'Andorra': '🇦🇩', 'Angola': '🇦🇴',
  'Antigua and Barbuda': '🇦🇬', 'Argentina': '🇦🇷', 'Armenia': '🇦🇲', 'Australia': '🇦🇺', 'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿', 'Bahamas': '🇧🇸', 'Bahrain': '🇧🇭', 'Bangladesh': '🇧🇩', 'Barbados': '🇧🇧',
  'Belarus': '🇧🇾', 'Belgium': '🇧🇪', 'Belize': '🇧🇿', 'Benin': '🇧🇯', 'Bhutan': '🇧🇹',
  'Bolivia': '🇧🇴', 'Bosnia and Herzegovina': '🇧🇦', 'Botswana': '🇧🇼', 'Brazil': '🇧🇷', 'Brunei': '🇧🇳',
  'Bulgaria': '🇧🇬', 'Burkina Faso': '🇧🇫', 'Burundi': '🇧🇮', 'Cambodia': '🇰🇭', 'Cameroon': '🇨🇲',
  'Canada': '🇨🇦', 'Cape Verde': '🇨🇻', 'Central African Republic': '🇨🇫', 'Chad': '🇹🇩', 'Chile': '🇨🇱',
  'China': '🇨🇳', 'Colombia': '🇨🇴', 'Comoros': '🇰🇲', 'Congo': '🇨🇬', 'Costa Rica': '🇨🇷',
  'Croatia': '🇭🇷', 'Cuba': '🇨🇺', 'Cyprus': '🇨🇾', 'Czech Republic': '🇨🇿', 'DR Congo': '🇨🇩',
  'Denmark': '🇩🇰', 'Djibouti': '🇩🇯', 'Dominica': '🇩🇲', 'Dominican Republic': '🇩🇴', 'Ecuador': '🇪🇨',
  'Egypt': '🇪🇬', 'El Salvador': '🇸🇻', 'Equatorial Guinea': '🇬🇶', 'Eritrea': '🇪🇷', 'Estonia': '🇪🇪',
  'Eswatini': '🇸🇿', 'Ethiopia': '🇪🇹', 'Fiji': '🇫🇯', 'Finland': '🇫🇮', 'France': '🇫🇷',
  'Gabon': '🇬🇦', 'Gambia': '🇬🇲', 'Georgia': '🇬🇪', 'Germany': '🇩🇪', 'Ghana': '🇬🇭',
  'Greece': '🇬🇷', 'Grenada': '🇬🇩', 'Guatemala': '🇬🇹', 'Guinea': '🇬🇳', 'Guinea-Bissau': '🇬🇼',
  'Guyana': '🇬🇾', 'Haiti': '🇭🇹', 'Honduras': '🇭🇳', 'Hungary': '🇭🇺', 'Iceland': '🇮🇸',
  'India': '🇮🇳', 'Indonesia': '🇮🇩', 'Iran': '🇮🇷', 'Iraq': '🇮🇶', 'Ireland': '🇮🇪',
  'Israel': '🇮🇱', 'Italy': '🇮🇹', 'Ivory Coast': '🇨🇮', 'Jamaica': '🇯🇲', 'Japan': '🇯🇵',
  'Jordan': '🇯🇴', 'Kazakhstan': '🇰🇿', 'Kenya': '🇰🇪', 'Kiribati': '🇰🇮', 'Kuwait': '🇰🇼',
  'Kyrgyzstan': '🇰🇬', 'Laos': '🇱🇦', 'Latvia': '🇱🇻', 'Lebanon': '🇱🇧', 'Lesotho': '🇱🇸',
  'Liberia': '🇱🇷', 'Libya': '🇱🇾', 'Liechtenstein': '🇱🇮', 'Lithuania': '🇱🇹', 'Luxembourg': '🇱🇺',
  'Madagascar': '🇲🇬', 'Malawi': '🇲🇼', 'Malaysia': '🇲🇾', 'Maldives': '🇲🇻', 'Mali': '🇲🇱',
  'Malta': '🇲🇹', 'Marshall Islands': '🇲🇭', 'Mauritania': '🇲🇷', 'Mauritius': '🇲🇺', 'Mexico': '🇲🇽',
  'Micronesia': '🇫🇲', 'Moldova': '🇲🇩', 'Monaco': '🇲🇨', 'Mongolia': '🇲🇳', 'Montenegro': '🇲🇪',
  'Morocco': '🇲🇦', 'Mozambique': '🇲🇿', 'Myanmar': '🇲🇲', 'Namibia': '🇳🇦', 'Nauru': '🇳🇷',
  'Nepal': '🇳🇵', 'Netherlands': '🇳🇱', 'New Zealand': '🇳🇿', 'Nicaragua': '🇳🇮', 'Niger': '🇳🇪',
  'Nigeria': '🇳🇬', 'North Korea': '🇰🇵', 'North Macedonia': '🇲🇰', 'Norway': '🇳🇴', 'Oman': '🇴🇲',
  'Pakistan': '🇵🇰', 'Palau': '🇵🇼', 'Palestine': '🇵🇸', 'Panama': '🇵🇦', 'Papua New Guinea': '🇵🇬',
  'Paraguay': '🇵🇾', 'Peru': '🇵🇪', 'Philippines': '🇵🇭', 'Poland': '🇵🇱', 'Portugal': '🇵🇹',
  'Qatar': '🇶🇦', 'Romania': '🇷🇴', 'Russia': '🇷🇺', 'Rwanda': '🇷🇼', 'Samoa': '🇼🇸',
  'San Marino': '🇸🇲', 'Sao Tome and Principe': '🇸🇹', 'Saudi Arabia': '🇸🇦', 'Senegal': '🇸🇳', 'Serbia': '🇷🇸',
  'Seychelles': '🇸🇨', 'Sierra Leone': '🇸🇱', 'Singapore': '🇸🇬', 'Slovakia': '🇸🇰', 'Slovenia': '🇸🇮',
  'Solomon Islands': '🇸🇧', 'Somalia': '🇸🇴', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'South Sudan': '🇸🇸',
  'Spain': '🇪🇸', 'Sri Lanka': '🇱🇰', 'St. Kitts and Nevis': '🇰🇳', 'St. Lucia': '🇱🇨', 'St. Vincent and the Grenadines': '🇻🇨',
  'Sudan': '🇸🇩', 'Suriname': '🇸🇷', 'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Syria': '🇸🇾',
  'Taiwan': '🇹🇼', 'Tajikistan': '🇹🇯', 'Tanzania': '🇹🇿', 'Thailand': '🇹🇭', 'Timor-Leste': '🇹🇱',
  'Togo': '🇹🇬', 'Tonga': '🇹🇴', 'Trinidad and Tobago': '🇹🇹', 'Tunisia': '🇹🇳', 'Turkey': '🇹🇷',
  'Turkmenistan': '🇹🇲', 'Tuvalu': '🇹🇻', 'Uganda': '🇺🇬', 'Ukraine': '🇺🇦', 'United Arab Emirates': '🇦🇪',
  'United Kingdom': '🇬🇧', 'United States': '🇺🇸', 'Uruguay': '🇺🇾', 'Uzbekistan': '🇺🇿', 'Vanuatu': '🇻🇺',
  'Vatican City': '🇻🇦', 'Venezuela': '🇻🇪', 'Vietnam': '🇻🇳', 'Yemen': '🇾🇪', 'Zambia': '🇿🇲', 'Zimbabwe': '🇿🇼'
}

// Build corrections lookup map
function buildCorrectionsMap() {
  const corrections = {}
  if (visaCorrections && visaCorrections.corrections) {
    visaCorrections.corrections.forEach(c => {
      const key = `${c.passport}|${c.destination}`
      corrections[key] = c.newValue
    })
  }
  return corrections
}

const correctionsMap = buildCorrectionsMap()

// Parse CSV
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index]
    })

    // Apply visa corrections
    const correctionKey = `${row.Passport}|${row.Destination}`
    if (correctionsMap[correctionKey]) {
      row.Requirement = correctionsMap[correctionKey]
    }

    data.push(row)
  }
  return data
}

// Check if access type counts toward score
function isVisaFreeAccess(requirement) {
  if (!requirement) return false
  const req = requirement.toLowerCase().trim()

  // Numeric values (days) = visa-free
  if (/^\d+$/.test(req)) return true

  // These count as visa-free access
  if (req === 'visa on arrival') return true
  if (req === 'eta') return true
  if (req === 'visa free') return true
  if (req === '-1') return true // Usually means unlimited/free access

  // These do NOT count
  if (req === 'visa required') return false
  if (req === 'e-visa') return false
  if (req.includes('covid')) return false
  if (req.includes('ban')) return false

  return false
}

// Get tourism value for a destination
// Priority: 1) Manual adjustments, 2) UNWTO data
function getTourismValue(destination) {
  const mappedName = countryNameMap[destination] || destination

  // Check if we have a manual adjustment for this country
  if (tourismAdjustments.adjustments[mappedName]) {
    return tourismAdjustments.adjustments[mappedName].value
  }

  return tourismData.data[mappedName] || 0
}

// Main calculation
function calculatePassportScores() {
  const csvContent = fs.readFileSync(passportCsvPath, 'utf-8')
  const visaData = parseCSV(csvContent)

  // Group by passport
  const passportAccess = {}
  // Count how many passports have visa-free access to each destination
  const destinationAccessCount = {}

  visaData.forEach(row => {
    const passport = row.Passport
    const destination = row.Destination
    const requirement = row.Requirement

    if (!passportAccess[passport]) {
      passportAccess[passport] = {
        visaFree: [],
        visaRequired: []
      }
    }

    if (isVisaFreeAccess(requirement)) {
      passportAccess[passport].visaFree.push({
        country: destination,
        requirement: requirement,
        tourismValue: getTourismValue(destination)
      })
      // Track how many passports can access this destination
      destinationAccessCount[destination] = (destinationAccessCount[destination] || 0) + 1
    } else {
      passportAccess[passport].visaRequired.push({
        country: destination,
        requirement: requirement,
        tourismValue: getTourismValue(destination)
      })
    }
  })

  const totalPassports = Object.keys(passportAccess).length

  // Calculate scores
  const results = []
  Object.keys(passportAccess).forEach(passport => {
    const access = passportAccess[passport]
    const score = access.visaFree.reduce((sum, dest) => sum + dest.tourismValue, 0)

    // Schengen countries list for aggregation
    const schengenCountriesList = [
      'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia',
      'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
      'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
      'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'
    ]

    // Get top contributors with Schengen aggregation (for expanded dropdown)
    const visaFreeWithValue = access.visaFree.filter(d => d.tourismValue > 0)
    const schengenDestinations = visaFreeWithValue.filter(d => schengenCountriesList.includes(d.country))
    const schengenTotal = schengenDestinations.reduce((sum, d) => sum + d.tourismValue, 0)
    const hasSchengenAccess = schengenDestinations.length > 0

    const nonSchengenDestinations = visaFreeWithValue
      .filter(d => !schengenCountriesList.includes(d.country))
      .sort((a, b) => b.tourismValue - a.tourismValue)

    const topContributors = []
    if (hasSchengenAccess) {
      topContributors.push({ country: 'Schengen Zone', value: Math.round(schengenTotal) })
    }
    const nonSchengenLimit = hasSchengenAccess ? 4 : 5
    nonSchengenDestinations.slice(0, nonSchengenLimit).forEach(d => {
      topContributors.push({ country: d.country, value: d.tourismValue })
    })

    // Calculate unique access - destinations where fewer passports have access (for Key Access column)
    // Sort by: 1) fewest passports have access, 2) highest tourism value as tiebreaker
    const uniqueAccessList = access.visaFree
      .filter(d => d.tourismValue > 0)
      .map(d => ({
        country: d.country,
        value: d.tourismValue,
        accessCount: destinationAccessCount[d.country] || 0
      }))
      .sort((a, b) => {
        if (a.accessCount !== b.accessCount) return a.accessCount - b.accessCount
        return b.value - a.value
      })
      .slice(0, 5)
      .map(d => d.country)

    // Get major misses (highest tourism value destinations requiring visa)
    // Show top 5 visa-required destinations regardless of tourism value
    const majorMisses = access.visaRequired
      .filter(d => d.tourismValue > 0) // Only exclude countries with no tourism data
      .sort((a, b) => b.tourismValue - a.tourismValue)
      .slice(0, 5)
      .map(d => ({ country: d.country, value: -d.tourismValue }))

    // Determine key access regions
    const keyAccess = []
    const visaFreeCountries = access.visaFree.map(d => d.country)

    // Check for Schengen (if any major EU country is accessible)
    const schengenCountries = ['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Greece', 'Portugal', 'Poland']
    if (schengenCountries.some(c => visaFreeCountries.includes(c))) {
      keyAccess.push('Schengen')
    }

    // Check for other major destinations
    if (visaFreeCountries.includes('United States')) keyAccess.push('USA')
    if (visaFreeCountries.includes('China')) keyAccess.push('China')
    if (visaFreeCountries.includes('Japan')) keyAccess.push('Japan')
    if (visaFreeCountries.includes('Russia')) keyAccess.push('Russia')
    if (visaFreeCountries.includes('United Kingdom')) keyAccess.push('UK')
    if (visaFreeCountries.includes('India')) keyAccess.push('India')

    // Get list of all visa-free destination names for comparison feature
    const visaFreeDestinations = access.visaFree.map(d => d.country)

    results.push({
      id: passport.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
      country: passport,
      flag: countryFlags[passport] || '🏳️',
      score: Math.round(score),
      keyAccess: keyAccess.slice(0, 5),
      uniqueAccess: uniqueAccessList,
      topContributors: topContributors,
      misses: majorMisses,
      visaFreeCount: access.visaFree.length,
      visaRequiredCount: access.visaRequired.length,
      visaFreeDestinations: visaFreeDestinations
    })
  })

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  return results
}

// Run and output
const results = calculatePassportScores()

// Output JSON
const outputPath = path.join(__dirname, '../data/calculated-passport-scores.json')
const correctionsCount = visaCorrections.corrections ? visaCorrections.corrections.length : 0
const tourismAdjustmentsCount = Object.keys(tourismAdjustments.adjustments).length
fs.writeFileSync(outputPath, JSON.stringify({
  _metadata: {
    generatedAt: new Date().toISOString(),
    algorithm: 'Sum of annual visitors (millions) to all visa-free/VOA/ETA destinations',
    tourismSource: 'UNWTO Tourism Statistics 2023/2024',
    visaSource: 'github.com/ilyankou/passport-index-dataset',
    visaCorrectionsApplied: correctionsCount,
    visaCorrectionsLastUpdated: visaCorrections._metadata ? visaCorrections._metadata.lastUpdated : null,
    tourismAdjustmentsApplied: tourismAdjustmentsCount,
    tourismAdjustmentsLastUpdated: tourismAdjustments._metadata ? tourismAdjustments._metadata.lastUpdated : null
  },
  results: results
}, null, 2))

console.log(`Generated ${results.length} passport scores`)
console.log(`Applied ${correctionsCount} visa corrections`)
console.log(`Applied ${tourismAdjustmentsCount} tourism adjustments (countries with outdated UN data)`)
console.log(`Output saved to: ${outputPath}`)
console.log('\nTop 10:')
results.slice(0, 10).forEach((r, i) => {
  console.log(`${i+1}. ${r.country}: ${r.score}M (${r.visaFreeCount} visa-free destinations)`)
})

console.log('\nBottom 5:')
results.slice(-5).forEach((r, i) => {
  console.log(`${results.length - 4 + i}. ${r.country}: ${r.score}M (${r.visaFreeCount} visa-free destinations)`)
})
