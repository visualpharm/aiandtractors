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

  // Helper to click checkbox by country name
  async function clickCountryCheckbox(countryName) {
    await page.evaluate((name) => {
      const rows = document.querySelectorAll('tbody tr');
      for (const row of rows) {
        const countryCell = row.querySelector('.country-name');
        if (countryCell && countryCell.textContent === name) {
          const checkbox = row.querySelector('input[type="checkbox"]');
          if (checkbox) checkbox.click();
          break;
        }
      }
    }, countryName);
    await new Promise(r => setTimeout(r, 300));
  }

  // Select Italy, Argentina, Russia
  await clickCountryCheckbox('Italy');
  await clickCountryCheckbox('Argentina');
  await clickCountryCheckbox('Russia');

  // Click "Passport combo" button
  const comboBtn = await page.$('button.combo-btn-small');
  if (comboBtn) {
    await comboBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Find and click on combo row to expand it
  await page.evaluate(() => {
    const comboRow = document.querySelector('tr.combo-row');
    if (comboRow) {
      comboRow.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // Scroll to show expanded content
  await page.evaluate(() => {
    const comboRow = document.querySelector('tr.combo-row');
    if (comboRow) comboRow.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot expanded combo
  await page.screenshot({ path: '/tmp/screenshot-combo-expanded.png', fullPage: false });
  console.log('Screenshot: Combo expanded saved');

  await browser.close();
}

takeScreenshots().catch(console.error);
