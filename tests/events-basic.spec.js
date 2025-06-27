import { test, expect } from '@playwright/test';

test.describe('Events Basic Functionality', () => {
  test('should load 2025 events page with events', async ({ page }) => {
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
    
    // Check page title
    await expect(page.locator('h1')).toContainText('2025');
    
    // Check we have events
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0);
    
    // Check first event has basic information
    const firstEvent = events.first();
    await expect(firstEvent.locator('h3')).toBeVisible();
    await expect(firstEvent.locator('text=📍')).toBeVisible();
    await expect(firstEvent.locator('text=📅')).toBeVisible();
  });

  test('should navigate to 2026 events page', async ({ page }) => {
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to 2026
    await page.goto('/tech-events-2026/');
    await page.waitForLoadState('networkidle');
    
    // Check we're on 2026
    await expect(page.locator('h1')).toContainText('2026');
    
    // Check we have events
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0);
  });

  test('should filter events by country', async ({ page }) => {
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
    
    // Get initial event count
    const allEvents = page.locator('.bg-white.rounded-xl');
    const allCount = await allEvents.count();
    expect(allCount).toBeGreaterThan(0);
    
    // Open country dropdown
    await page.click('.country-dropdown-trigger');
    await page.waitForTimeout(200);
    
    // Filter by Brazil
    await page.click('.country-dropdown-option:has-text("Brazil")');
    await page.waitForTimeout(500);
    
    // Check filtered results
    const brazilEvents = page.locator('.bg-white.rounded-xl:has-text("Brazil")');
    const brazilCount = await brazilEvents.count();
    expect(brazilCount).toBeGreaterThan(0);
    
    // Verify no non-Brazil events visible
    const nonBrazilEvents = page.locator('.bg-white.rounded-xl:not(:has-text("Brazil"))');
    const nonBrazilCount = await nonBrazilEvents.count();
    expect(nonBrazilCount).toBe(0);
  });

  test('should sort events', async ({ page }) => {
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
    
    // Check we have events
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0);
    
    // Change sort to date
    await page.selectOption('select', 'date');
    await page.waitForTimeout(500);
    
    // Verify sort dropdown value changed
    const sortValue = await page.locator('select').inputValue();
    expect(sortValue).toBe('date');
    
    // Change sort to attendees
    await page.selectOption('select', 'attendees');
    await page.waitForTimeout(500);
    
    const attendeesValue = await page.locator('select').inputValue();
    expect(attendeesValue).toBe('attendees');
  });
});