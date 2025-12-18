const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('http://localhost:3000/passport-ranking', { waitUntil: 'networkidle2' });
  await page.waitForSelector('table');

  // Scroll to table
  await page.evaluate(() => {
    const table = document.querySelector('.table-wrapper');
    if (table) table.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));

  // Click on Argentina row to expand it
  await page.evaluate(() => {
    const rows = document.querySelectorAll('tbody tr');
    for (const row of rows) {
      const countryCell = row.querySelector('.country-name');
      if (countryCell && countryCell.textContent === 'Argentina') {
        row.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // Scroll to show expanded content
  await page.evaluate(() => {
    const rows = document.querySelectorAll('tbody tr');
    for (const row of rows) {
      const countryCell = row.querySelector('.country-name');
      if (countryCell && countryCell.textContent === 'Argentina') {
        row.scrollIntoView({ behavior: 'instant', block: 'start' });
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot expanded Argentina
  await page.screenshot({ path: '/tmp/screenshot-argentina-expanded.png', fullPage: false });
  console.log('Screenshot: Argentina expanded saved');

  await browser.close();
}

takeScreenshots().catch(console.error);
