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

  // Select Argentina and Russia first to create a combo
  await clickCountryCheckbox('Argentina');
  await clickCountryCheckbox('Russia');

  // Click "Passport combo" button
  const comboBtn = await page.$('button.combo-btn-small');
  if (comboBtn) {
    await comboBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Now select Italy and the combo for comparison
  await clickCountryCheckbox('Italy');

  // Click on combo row checkbox
  await page.evaluate(() => {
    const comboRow = document.querySelector('tr.combo-row');
    if (comboRow) {
      const checkbox = comboRow.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.click();
    }
  });
  await new Promise(r => setTimeout(r, 300));

  // Click Compare button
  const compareBtn = await page.$('button.compare-btn-small');
  if (compareBtn) {
    await compareBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Screenshot comparison modal
  await page.screenshot({ path: '/tmp/screenshot-comparison-combo.png', fullPage: false });
  console.log('Screenshot: Comparison with combo saved');

  await browser.close();
}

takeScreenshots().catch(console.error);
