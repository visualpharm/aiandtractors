import { test, expect } from '@playwright/test';

test.describe('Basic Events Navigation', () => {
  test('should load events page and navigate between years', async ({ page }) => {
    // Navigate to events page
    await page.goto('/tech-events-2025');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check page title contains year
    await expect(page.locator('h1')).toContainText('2025');
    
    // Check we have events displayed
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0);
    
    // Click on 2026 year button
    await page.click('a[href*="tech-events-2026"]');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on 2026 page
    await expect(page.url()).toContain('tech-events-2026');
    await expect(page.locator('h1')).toContainText('2026');
  });

  test('should show event details', async ({ page }) => {
    await page.goto('/tech-events-2025');
    await page.waitForLoadState('networkidle');
    
    // Check first event has required elements
    const firstEvent = page.locator('.bg-white.rounded-xl').first();
    
    // Should have event name
    await expect(firstEvent.locator('h3')).toBeVisible();
    
    // Should have location icon
    await expect(firstEvent.locator('text=📍')).toBeVisible();
    
    // Should have date icon
    await expect(firstEvent.locator('text=📅')).toBeVisible();
    
    // Should have attendees icon
    await expect(firstEvent.locator('text=👥')).toBeVisible();
    
    // Should have popularity bar
    await expect(firstEvent.locator('.bg-blue-600')).toBeVisible();
    
    // Should have AI presence bar
    await expect(firstEvent.locator('.bg-green-600')).toBeVisible();
  });
});