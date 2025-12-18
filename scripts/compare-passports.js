const fs = require('fs');
const path = require('path');

// Parse CSV
const csvPath = path.join(__dirname, '../data/passport-index-tidy.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');
const passportData = lines.slice(1).map(line => {
  const values = line.split(',');
  return {
    Passport: values[0],
    Destination: values[1],
    Requirement: values[2]
  };
});

const tourismRaw = require('../data/unwto-tourism-2023.json');
const tourismData = tourismRaw.data;

// Get visa-free destinations for each
const sgAccess = passportData.filter(r => r.Passport === 'Singapore');
const krAccess = passportData.filter(r => r.Passport === 'South Korea');

// Find destinations Korea has visa-free but Singapore doesn't
const sgDestMap = {};
sgAccess.forEach(r => { sgDestMap[r.Destination] = r.Requirement; });

const krDestMap = {};
krAccess.forEach(r => { krDestMap[r.Destination] = r.Requirement; });

function isVisaFree(req) {
  if (!req) return false;
  const r = req.toLowerCase().trim();
  if (/^\d+$/.test(r)) return true; // Numeric = days visa-free
  if (r === 'visa on arrival') return true;
  if (r === 'eta') return true;
  if (r === 'visa free') return true;
  if (r === '-1') return true;
  return false;
}

console.log('=== Destinations where Korea has better access than Singapore ===');
const koreaAdvantages = [];
Object.keys(krDestMap).forEach(dest => {
  const krReq = krDestMap[dest];
  const sgReq = sgDestMap[dest] || 'unknown';

  const krVisaFreeAccess = isVisaFree(krReq);
  const sgVisaFreeAccess = isVisaFree(sgReq);

  if (krVisaFreeAccess && !sgVisaFreeAccess) {
    const tourism = tourismData[dest] || 0;
    koreaAdvantages.push({ dest, krReq, sgReq, tourism });
  }
});

koreaAdvantages.sort((a, b) => b.tourism - a.tourism);
koreaAdvantages.forEach(item => {
  console.log(`${item.dest}: Korea=${item.krReq}, Singapore=${item.sgReq}, Tourism=${item.tourism}M`);
});

console.log('\n=== Destinations where Singapore has better access than Korea ===');
const sgAdvantages = [];
Object.keys(sgDestMap).forEach(dest => {
  const sgReq = sgDestMap[dest];
  const krReq = krDestMap[dest] || 'unknown';

  const sgVisaFreeAccess = isVisaFree(sgReq);
  const krVisaFreeAccess = isVisaFree(krReq);

  if (sgVisaFreeAccess && !krVisaFreeAccess) {
    const tourism = tourismData[dest] || 0;
    sgAdvantages.push({ dest, sgReq, krReq, tourism });
  }
});

sgAdvantages.sort((a, b) => b.tourism - a.tourism);
sgAdvantages.forEach(item => {
  console.log(`${item.dest}: Singapore=${item.sgReq}, Korea=${item.krReq}, Tourism=${item.tourism}M`);
});

console.log('\n=== Summary ===');
console.log(`Korea advantages total tourism: ${koreaAdvantages.reduce((sum, i) => sum + i.tourism, 0)}M`);
console.log(`Singapore advantages total tourism: ${sgAdvantages.reduce((sum, i) => sum + i.tourism, 0)}M`);
console.log(`Net difference: ${koreaAdvantages.reduce((sum, i) => sum + i.tourism, 0) - sgAdvantages.reduce((sum, i) => sum + i.tourism, 0)}M`);
