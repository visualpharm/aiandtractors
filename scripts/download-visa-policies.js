#!/usr/bin/env node
/**
 * Downloads Wikipedia visa policy pages for all countries
 * Usage: node scripts/download-visa-policies.js
 *
 * - Uses empty user agent as requested
 * - Rate limited to 1 request per second (polite crawling)
 * - Saves HTML to data/visa-policies/ directory
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../data/visa-policies');

// Get list of countries from passport data
const passportData = require('../data/calculated-passport-scores.json');
const countries = passportData.results.map(p => p.country);

// Wikipedia URL format: https://en.wikipedia.org/wiki/Visa_policy_of_[Country]
// Some countries have special naming
const countryToWikiName = {
  'United States': 'the_United_States',
  'United Kingdom': 'the_United_Kingdom',
  'United Arab Emirates': 'the_United_Arab_Emirates',
  'Czech Republic': 'the_Czech_Republic',
  'Netherlands': 'the_Netherlands',
  'Philippines': 'the_Philippines',
  'Dominican Republic': 'the_Dominican_Republic',
  'Central African Republic': 'the_Central_African_Republic',
  'Republic of the Congo': 'the_Republic_of_the_Congo',
  'DR Congo': 'the_Democratic_Republic_of_the_Congo',
  'Gambia': 'the_Gambia',
  'Bahamas': 'the_Bahamas',
  'Maldives': 'the_Maldives',
  'Marshall Islands': 'the_Marshall_Islands',
  'Solomon Islands': 'the_Solomon_Islands',
  'Comoros': 'the_Comoros',
  'Seychelles': 'the_Seychelles',
  'Vatican City': 'the_Vatican_City',
  'Ivory Coast': "Côte_d'Ivoire",
  'North Korea': 'North_Korea',
  'South Korea': 'South_Korea',
  'Hong Kong': 'Hong_Kong',
  'Macao': 'Macau',
  'Taiwan': 'Taiwan',
  'Kosovo': 'Kosovo',
  'Palestinian Territories': 'the_State_of_Palestine',
  'Timor-Leste': 'East_Timor',
  'Eswatini': 'Eswatini',
  'Myanmar': 'Myanmar',
  'North Macedonia': 'North_Macedonia',
  'Bosnia and Herzegovina': 'Bosnia_and_Herzegovina',
  'Trinidad and Tobago': 'Trinidad_and_Tobago',
  'Saint Kitts and Nevis': 'Saint_Kitts_and_Nevis',
  'Saint Vincent and the Grenadines': 'Saint_Vincent_and_the_Grenadines',
  'Antigua and Barbuda': 'Antigua_and_Barbuda',
  'Sao Tome and Principe': 'São_Tomé_and_Príncipe',
  'Papua New Guinea': 'Papua_New_Guinea',
  'Equatorial Guinea': 'Equatorial_Guinea',
  'Guinea-Bissau': 'Guinea-Bissau',
  'Burkina Faso': 'Burkina_Faso',
  'Sierra Leone': 'Sierra_Leone',
  'South Sudan': 'South_Sudan',
  'Sri Lanka': 'Sri_Lanka',
  'Saudi Arabia': 'Saudi_Arabia',
  'New Zealand': 'New_Zealand',
  'South Africa': 'South_Africa',
  'Costa Rica': 'Costa_Rica',
  'El Salvador': 'El_Salvador',
  'Cape Verde': 'Cape_Verde',
  'San Marino': 'San_Marino'
};

function getWikiUrl(country) {
  let wikiName = countryToWikiName[country] || country.replace(/ /g, '_');
  return `https://en.wikipedia.org/wiki/Visa_policy_of_${wikiName}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': '', // Empty user agent as requested
        'Accept': 'text/html',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    };

    https.get(url, options, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          // Handle relative redirects
          const fullUrl = redirectUrl.startsWith('http')
            ? redirectUrl
            : `https://en.wikipedia.org${redirectUrl}`;
          downloadPage(fullUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Downloading visa policy pages for ${countries.length} countries...`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Rate limit: 1 request per second\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    const url = getWikiUrl(country);
    const filename = `${country.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      console.log(`[${i + 1}/${countries.length}] ${country} - already exists, skipping`);
      results.success.push(country);
      continue;
    }

    process.stdout.write(`[${i + 1}/${countries.length}] ${country}... `);

    try {
      const html = await downloadPage(url);
      fs.writeFileSync(filepath, html);
      console.log(`OK (${Math.round(html.length / 1024)}KB)`);
      results.success.push(country);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      results.failed.push({ country, url, error: err.message });
    }

    // Rate limit: wait 1 second between requests
    if (i < countries.length - 1) {
      await sleep(1000);
    }
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed countries:');
    results.failed.forEach(f => {
      console.log(`  - ${f.country}: ${f.error}`);
      console.log(`    URL: ${f.url}`);
    });

    // Save failed list for retry
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '_failed.json'),
      JSON.stringify(results.failed, null, 2)
    );
  }

  // Save metadata
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_metadata.json'),
    JSON.stringify({
      downloadDate: new Date().toISOString(),
      totalCountries: countries.length,
      successful: results.success.length,
      failed: results.failed.length
    }, null, 2)
  );
}

main().catch(console.error);
