const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // Navigate to passport ranking page
  await page.goto('http://localhost:3000/passport-ranking', { waitUntil: 'networkidle2' });
  await page.waitForSelector('table');

  // Scroll to table area
  await page.evaluate(() => {
    const table = document.querySelector('.table-wrapper');
    if (table) table.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot 1: Initial state showing the hint text and table
  await page.screenshot({ path: '/tmp/screenshot-1-initial.png', fullPage: false });
  console.log('Screenshot 1: Initial state saved');

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

  // Click on Italy checkbox
  await clickCountryCheckbox('Italy');

  // Click on Argentina checkbox
  await clickCountryCheckbox('Argentina');

  // Screenshot 2: Two passports selected, showing Compare button
  await page.screenshot({ path: '/tmp/screenshot-2-two-selected.png', fullPage: false });
  console.log('Screenshot 2: Two passports selected saved');

  // Click on Russia checkbox
  await clickCountryCheckbox('Russia');

  // Screenshot 3: Three passports selected
  await page.screenshot({ path: '/tmp/screenshot-3-three-selected.png', fullPage: false });
  console.log('Screenshot 3: Three passports selected saved');

  // Click "Passport combo" button
  const comboBtn = await page.$('button.combo-btn-small');
  if (comboBtn) {
    await comboBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Screenshot 4: After combo created - shows bar area
  await page.screenshot({ path: '/tmp/screenshot-4-combo-created.png', fullPage: false });
  console.log('Screenshot 4: Combo created saved');

  // Scroll to find combo row
  await page.evaluate(() => {
    const comboRow = document.querySelector('tr.combo-row');
    if (comboRow) comboRow.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot 5: Combo row visible
  await page.screenshot({ path: '/tmp/screenshot-5-combo-row.png', fullPage: false });
  console.log('Screenshot 5: Combo row saved');

  await browser.close();
  console.log('\nAll screenshots saved to /tmp/');
}

takeScreenshots().catch(console.error);
