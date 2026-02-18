#!/usr/bin/env node
/**
 * Extracts visa policy information from downloaded Wikipedia pages
 * Usage: node scripts/extract-visa-info.js [country]
 *
 * If country is provided, extracts info for that country only
 * Otherwise extracts for all countries and compares with source data
 */

const fs = require('fs');
const path = require('path');

const VISA_POLICIES_DIR = path.join(__dirname, '../data/visa-policies');
const OUTPUT_FILE = path.join(__dirname, '../data/wikipedia-visa-data.json');

// Load source data for comparison
const passportData = require('../data/calculated-passport-scores.json');
const countries = passportData.results.map(p => p.country);

// EU member states for expanding "All European Union member states"
const euCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark',
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy',
  'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal',
  'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
];

// Country name aliases (Wikipedia name -> Our name)
const countryAliases = {
  'Czechia': 'Czech Republic',
  'Republic of the Congo': 'Congo',
  'Democratic Republic of the Congo': 'DR Congo',
  'East Timor': 'Timor-Leste',
  'Eswatini': 'Eswatini',
  'Swaziland': 'Eswatini',
  'Burma': 'Myanmar',
  'Macedonia': 'North Macedonia',
  'Cape Verde': 'Cape Verde',
  'Cabo Verde': 'Cape Verde',
  'Ivory Coast': 'Ivory Coast',
  "Côte d'Ivoire": 'Ivory Coast',
  'South Korea': 'South Korea',
  'Republic of Korea': 'South Korea',
  'Korea': 'South Korea',
  'North Korea': 'North Korea',
  'DPRK': 'North Korea',
  'Taiwan': 'Taiwan',
  'Chinese Taipei': 'Taiwan',
  'Hong Kong': 'Hong Kong',
  'Macao': 'Macao',
  'Macau': 'Macao',
  'Palestinian Territories': 'Palestinian Territories',
  'Palestine': 'Palestinian Territories',
  'State of Palestine': 'Palestinian Territories',
  'Vatican': 'Vatican City',
  'Holy See': 'Vatican City',
  'United Arab Emirates': 'United Arab Emirates',
  'UAE': 'United Arab Emirates',
  'United States': 'United States',
  'USA': 'United States',
  'United Kingdom': 'United Kingdom',
  'UK': 'United Kingdom',
  'Great Britain': 'United Kingdom',
  'Russia': 'Russia',
  'Russian Federation': 'Russia',
  'Georgia (country)': 'Georgia'
};

// Known countries we track
const knownCountries = new Set([
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'DR Congo', 'East Timor',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica',
  'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
  'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
  'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe'
]);

// Load current visa data from passport-index-dataset
const sourceVisaPath = '/Users/ivanboyko/passport-index-dataset/passport-index-tidy.csv';

function loadSourceVisaData() {
  const csv = fs.readFileSync(sourceVisaPath, 'utf-8');
  const lines = csv.trim().split('\n');
  const data = {};

  for (const line of lines.slice(1)) { // Skip header
    const parts = line.split(',');
    if (parts.length >= 3) {
      const passport = parts[0].trim();
      const destination = parts[1].trim();
      const requirement = parts[2].trim().replace(/\r/g, ''); // Remove carriage returns
      if (!data[destination]) {
        data[destination] = {};
      }
      data[destination][passport] = requirement;
    }
  }
  return data;
}

function normalizeCountryName(name) {
  // Clean up the name
  name = name.trim();

  // Check aliases
  if (countryAliases[name]) {
    return countryAliases[name];
  }

  return name;
}

function extractVisaFreeCountries(html) {
  const results = {
    visaFree: new Map(), // country -> days (or 'visa free' if days unknown)
    visaOnArrival: new Set(),
    eVisa: new Set(),
    raw: {}
  };

  // Find visa exemption section (between Visa_exemption header and next h2)
  const exemptionMatch = html.match(/<h2[^>]*id="Visa_exemption"[^>]*>[\s\S]*?<\/h2>([\s\S]*?)(?=<div class="mw-heading mw-heading2">|<h2|$)/i);

  if (!exemptionMatch) {
    // Try alternative patterns
    const altMatch = html.match(/Visa exemption<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (!altMatch) {
      return results;
    }
    // Use altMatch
  }

  const exemptionSection = exemptionMatch ? exemptionMatch[1] : '';

  // Look for duration headers like "90 days", "60 days", "30 days"
  // and extract countries under each
  let currentDays = null;

  // First, check for "All European Union member states" pattern
  if (exemptionSection.includes('European Union member states') ||
      exemptionSection.includes('European Union</a>')) {
    // Extract the days context around this mention
    const euContextMatch = exemptionSection.match(/<b>(\d+)\s*days<\/b>[\s\S]{0,2000}European Union/i) ||
                          exemptionSection.match(/European Union[\s\S]{0,500}<b>(\d+)\s*days<\/b>/i);
    const euDays = euContextMatch ? euContextMatch[1] : '90';

    for (const euCountry of euCountries) {
      results.visaFree.set(euCountry, euDays);
    }
  }

  // Split by duration headers and extract countries
  const durationPattern = /<b>(\d+)\s*days?<\/b>/gi;
  let lastIndex = 0;
  let match;

  const sections = [];
  while ((match = durationPattern.exec(exemptionSection)) !== null) {
    if (lastIndex > 0) {
      sections.push({
        days: currentDays,
        content: exemptionSection.slice(lastIndex, match.index)
      });
    }
    currentDays = match[1];
    lastIndex = match.index + match[0].length;
  }

  // Add the last section
  if (currentDays && lastIndex > 0) {
    sections.push({
      days: currentDays,
      content: exemptionSection.slice(lastIndex)
    });
  }

  // If no duration headers found, treat entire section as visa-free
  if (sections.length === 0 && exemptionSection) {
    sections.push({
      days: 'visa free',
      content: exemptionSection
    });
  }

  // Extract countries from each section
  for (const section of sections) {
    const countriesInSection = extractCountryNamesFromHtml(section.content);
    for (const country of countriesInSection) {
      const normalized = normalizeCountryName(country);
      if (knownCountries.has(normalized)) {
        // Don't overwrite if already set with specific days
        if (!results.visaFree.has(normalized) || results.visaFree.get(normalized) === 'visa free') {
          results.visaFree.set(normalized, section.days);
        }
      }
    }
  }

  // Also extract from the entire exemption section to catch any missed countries
  const allCountries = extractCountryNamesFromHtml(exemptionSection);
  for (const country of allCountries) {
    const normalized = normalizeCountryName(country);
    if (knownCountries.has(normalized) && !results.visaFree.has(normalized)) {
      results.visaFree.set(normalized, '90'); // Default to 90 days if not specified
    }
  }

  // Look for visa on arrival section
  const voaMatch = html.match(/<h[23][^>]*id="Visa_on_arrival"[^>]*>[\s\S]*?<\/h[23]>([\s\S]*?)(?=<div class="mw-heading|<h[23]|$)/i);
  if (voaMatch) {
    const voaCountries = extractCountryNamesFromHtml(voaMatch[1]);
    for (const country of voaCountries) {
      const normalized = normalizeCountryName(country);
      if (knownCountries.has(normalized)) {
        results.visaOnArrival.add(normalized);
      }
    }
  }

  // Look for e-visa section
  const eVisaMatch = html.match(/<h[23][^>]*id="[Ee]-?[Vv]isa"[^>]*>[\s\S]*?<\/h[23]>([\s\S]*?)(?=<div class="mw-heading|<h[23]|$)/i) ||
                     html.match(/<h[23][^>]*id="Electronic_visa"[^>]*>[\s\S]*?<\/h[23]>([\s\S]*?)(?=<div class="mw-heading|<h[23]|$)/i);
  if (eVisaMatch) {
    const eVisaCountries = extractCountryNamesFromHtml(eVisaMatch[1]);
    for (const country of eVisaCountries) {
      const normalized = normalizeCountryName(country);
      if (knownCountries.has(normalized)) {
        results.eVisa.add(normalized);
      }
    }
  }

  return results;
}

function extractCountryNamesFromHtml(html) {
  const countries = new Set();

  // Pattern 1: Links with title attribute containing country names
  // e.g., <a href="/wiki/Argentina" title="Argentina">Argentina</a>
  const linkPattern = /<a[^>]*href="\/wiki\/([^"]+)"[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const title = match[2];
    const text = match[3].trim();

    // Check if title is a known country or alias
    const normalizedTitle = normalizeCountryName(title);
    const normalizedText = normalizeCountryName(text);

    if (knownCountries.has(normalizedTitle)) {
      countries.add(normalizedTitle);
    } else if (knownCountries.has(normalizedText)) {
      countries.add(normalizedText);
    }
  }

  // Pattern 2: Links without title but with country name in href
  // e.g., <a href="/wiki/Japan">Japan</a>
  const simpleLinkPattern = /<a[^>]*href="\/wiki\/([^"#]+)"[^>]*>([^<]+)<\/a>/gi;
  while ((match = simpleLinkPattern.exec(html)) !== null) {
    const hrefCountry = match[1].replace(/_/g, ' ');
    const text = match[2].trim();

    const normalizedHref = normalizeCountryName(hrefCountry);
    const normalizedText = normalizeCountryName(text);

    if (knownCountries.has(normalizedHref)) {
      countries.add(normalizedHref);
    } else if (knownCountries.has(normalizedText)) {
      countries.add(normalizedText);
    }
  }

  return Array.from(countries);
}

function getFilename(country) {
  return `${country.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
}

function analyzeCountry(country, sourceData) {
  const filename = getFilename(country);
  const filepath = path.join(VISA_POLICIES_DIR, filename);

  if (!fs.existsSync(filepath)) {
    return { error: `File not found: ${filename}` };
  }

  const html = fs.readFileSync(filepath, 'utf-8');
  const extracted = extractVisaFreeCountries(html);

  // Compare with source data
  const sourceForCountry = sourceData[country] || {};
  const discrepancies = [];

  // Convert Map to object for easier handling
  const visaFreeMap = Object.fromEntries(extracted.visaFree);
  const visaFreeCountries = Object.keys(visaFreeMap);

  // Check: Wikipedia says visa-free, but source says visa required
  for (const visaFreeCountry of visaFreeCountries) {
    const sourceStatus = sourceForCountry[visaFreeCountry];
    if (sourceStatus && sourceStatus === 'visa required') {
      discrepancies.push({
        passport: visaFreeCountry,
        destination: country,
        wikipedia: `visa-free (${visaFreeMap[visaFreeCountry]} days)`,
        source: sourceStatus,
        type: 'wikipedia_says_visa_free'
      });
    }
  }

  // Check: Source says visa-free/days, but Wikipedia doesn't list it
  for (const [passport, status] of Object.entries(sourceForCountry)) {
    const isSourceVisaFree = /^\d+$/.test(status) || status === 'visa free';
    if (isSourceVisaFree && !visaFreeCountries.includes(passport) &&
        !extracted.visaOnArrival.has(passport) && knownCountries.has(passport)) {
      discrepancies.push({
        passport: passport,
        destination: country,
        wikipedia: 'not listed as visa-free',
        source: status,
        type: 'source_says_visa_free'
      });
    }
  }

  // Check: VOA discrepancies
  for (const voaCountry of extracted.visaOnArrival) {
    const sourceStatus = sourceForCountry[voaCountry];
    if (sourceStatus && sourceStatus !== 'visa on arrival' && sourceStatus !== 'visa free' && !/^\d+$/.test(sourceStatus)) {
      discrepancies.push({
        passport: voaCountry,
        destination: country,
        wikipedia: 'visa on arrival',
        source: sourceStatus,
        type: 'voa_mismatch'
      });
    }
  }

  return {
    country,
    extracted: {
      visaFree: visaFreeMap,
      visaFreeCount: visaFreeCountries.length,
      visaOnArrival: Array.from(extracted.visaOnArrival),
      eVisa: Array.from(extracted.eVisa)
    },
    discrepancies,
    stats: {
      visaFree: visaFreeCountries.length,
      visaOnArrival: extracted.visaOnArrival.size,
      eVisa: extracted.eVisa.size
    }
  };
}

async function main() {
  const specificCountry = process.argv[2];

  console.log('Loading source visa data...');
  const sourceData = loadSourceVisaData();

  if (specificCountry) {
    // Analyze single country
    console.log(`\nAnalyzing: ${specificCountry}`);
    const result = analyzeCountry(specificCountry, sourceData);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Analyze all countries
  console.log(`\nAnalyzing ${countries.length} countries...`);

  const allResults = [];
  const allDiscrepancies = [];
  let filesFound = 0;
  let filesMissing = 0;

  for (const country of countries) {
    const result = analyzeCountry(country, sourceData);
    if (result.error) {
      filesMissing++;
    } else {
      filesFound++;
      allResults.push(result);
      allDiscrepancies.push(...result.discrepancies);
    }
  }

  // Sort by number of visa-free countries extracted
  allResults.sort((a, b) => b.stats.visaFree - a.stats.visaFree);

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                    WIKIPEDIA vs SOURCE COMPARISON              ');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`Files found: ${filesFound}`);
  console.log(`Files missing: ${filesMissing}`);
  console.log(`Total discrepancies found: ${allDiscrepancies.length}`);

  // Group discrepancies by type
  const byType = {
    wikipedia_says_visa_free: allDiscrepancies.filter(d => d.type === 'wikipedia_says_visa_free'),
    source_says_visa_free: allDiscrepancies.filter(d => d.type === 'source_says_visa_free'),
    voa_mismatch: allDiscrepancies.filter(d => d.type === 'voa_mismatch')
  };

  console.log('\n--- Discrepancy Types ---');
  console.log(`Wikipedia says visa-free, source says visa required: ${byType.wikipedia_says_visa_free.length}`);
  console.log(`Source says visa-free, not in Wikipedia: ${byType.source_says_visa_free.length}`);
  console.log(`Visa on arrival mismatch: ${byType.voa_mismatch.length}`);

  console.log('\n--- Top 10 Countries by Extracted Visa-Free Count ---');
  allResults.slice(0, 10).forEach(r => {
    console.log(`  ${r.country}: ${r.stats.visaFree} visa-free countries`);
  });

  if (byType.wikipedia_says_visa_free.length > 0) {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('  WIKIPEDIA SAYS VISA-FREE, SOURCE SAYS VISA REQUIRED         ');
    console.log('  (Potential corrections needed in source data)               ');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Group by destination
    const byDest = {};
    for (const d of byType.wikipedia_says_visa_free) {
      if (!byDest[d.destination]) byDest[d.destination] = [];
      byDest[d.destination].push(d);
    }

    for (const [dest, items] of Object.entries(byDest).sort((a, b) => b[1].length - a[1].length).slice(0, 20)) {
      console.log(`\n${dest} (${items.length} discrepancies):`);
      items.slice(0, 10).forEach(d => {
        console.log(`  ${d.passport}: Wiki="${d.wikipedia}", Source="${d.source}"`);
      });
      if (items.length > 10) {
        console.log(`  ... and ${items.length - 10} more`);
      }
    }
  }

  if (byType.source_says_visa_free.length > 0) {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('  SOURCE SAYS VISA-FREE, NOT FOUND IN WIKIPEDIA                ');
    console.log('  (May be extraction issue or outdated Wikipedia)              ');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Group by destination
    const byDest = {};
    for (const d of byType.source_says_visa_free) {
      if (!byDest[d.destination]) byDest[d.destination] = [];
      byDest[d.destination].push(d);
    }

    // Show top 10 destinations with most missing
    const topMissing = Object.entries(byDest).sort((a, b) => b[1].length - a[1].length).slice(0, 10);
    for (const [dest, items] of topMissing) {
      console.log(`\n${dest} (${items.length} not found in Wikipedia):`);
      items.slice(0, 5).forEach(d => {
        console.log(`  ${d.passport}: Source="${d.source}"`);
      });
      if (items.length > 5) {
        console.log(`  ... and ${items.length - 5} more`);
      }
    }
  }

  // Save results
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
    extractionDate: new Date().toISOString(),
    countriesAnalyzed: allResults.length,
    discrepanciesFound: allDiscrepancies.length,
    summary: {
      wikipediaSaysVisaFree: byType.wikipedia_says_visa_free.length,
      sourceSaysVisaFree: byType.source_says_visa_free.length,
      voaMismatch: byType.voa_mismatch.length
    },
    discrepancies: allDiscrepancies,
    results: allResults
  }, null, 2));

  console.log(`\n═══════════════════════════════════════════════════════════════`);
  console.log(`Results saved to: ${OUTPUT_FILE}`);
  console.log(`═══════════════════════════════════════════════════════════════`);
}

main().catch(console.error);
