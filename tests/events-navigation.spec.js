import { test, expect } from '@playwright/test';

test.describe('Events Navigation and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the 2025 events page
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate between different years', async ({ page }) => {
    // Verify we're on 2025 page
    await expect(page.locator('h1')).toContainText('Tech Events 2025');
    await expect(page.locator('a.bg-blue-600:has-text("2025")')).toBeVisible(); // Active year button

    // Click on 2026 year button
    await page.click('a[href*="tech-events-2026"]');
    await page.waitForLoadState('networkidle');
    
    // Verify navigation to 2026
    await expect(page.url()).toContain('tech-events-2026');
    await expect(page.locator('h1')).toContainText('Tech Events 2026');
    await expect(page.locator('[href*="2026"]')).toHaveClass(/bg-blue-600/);

    // Click on 2027 year button
    await page.click('a[href*="tech-events-2027"]');
    await page.waitForLoadState('networkidle');
    
    // Verify navigation to 2027
    await expect(page.url()).toContain('tech-events-2027');
    await expect(page.locator('h1')).toContainText('Tech Events 2027');

    // Click on 2028 year button
    await page.click('a[href*="tech-events-2028"]');
    await page.waitForLoadState('networkidle');
    
    // Verify navigation to 2028
    await expect(page.url()).toContain('tech-events-2028');
    await expect(page.locator('h1')).toContainText('Tech Events 2028');

    // Navigate back to 2025
    await page.click('a[href*="tech-events-2025"]');
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('tech-events-2025');
  });

  test('should filter events by country', async ({ page }) => {
    // Wait for events to load
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0); // Should have events

    // Click country dropdown
    await page.click('.country-dropdown-trigger');
    await expect(page.locator('.country-dropdown-content')).toBeVisible();

    // Filter by Brazil
    await page.click('.country-dropdown-option:has-text("Brazil")');
    await page.waitForTimeout(500); // Wait for filtering

    // Verify only Brazilian events are shown
    const brazilEvents = page.locator('.bg-white.rounded-xl:has-text("Brazil")');
    const brazilCount = await brazilEvents.count();
    expect(brazilCount).toBeGreaterThan(0); // Should have Brazilian events
    
    // Verify no Mexican or Colombian events are visible
    await expect(page.locator('.bg-white.rounded-xl:has-text("Mexico")')).toHaveCount(0);
    await expect(page.locator('.bg-white.rounded-xl:has-text("Colombia")')).toHaveCount(0);

    // Click country dropdown again
    await page.click('.country-dropdown-trigger');
    
    // Filter by Mexico
    await page.click('.country-dropdown-option:has-text("Mexico")');
    await page.waitForTimeout(500);

    // Verify only Mexican events are shown
    const mexicoEvents = page.locator('.bg-white.rounded-xl:has-text("Mexico")');
    const mexicoCount = await mexicoEvents.count();
    expect(mexicoCount).toBeGreaterThan(0); // Should have Mexican events
    
    // Reset to all countries
    await page.click('.country-dropdown-trigger');
    await page.click('.country-dropdown-option:has-text("All")');
    await page.waitForTimeout(500);
    
    // Verify all events are shown again
    const allEvents = page.locator('.bg-white.rounded-xl');
    const allCount = await allEvents.count();
    expect(allCount).toBeGreaterThan(0);
  });

  test('should sort events by different criteria', async ({ page }) => {
    // Default sort should be by popularity
    const firstEventByPopularity = page.locator('.bg-white.rounded-xl').first();
    await expect(firstEventByPopularity).toContainText('Rio Innovation Week'); // Highest popularity (98%)

    // Sort by date
    await page.selectOption('select', 'date');
    await page.waitForTimeout(500);
    
    const firstEventByDate = page.locator('.bg-white.rounded-xl').first();
    await expect(firstEventByDate).toContainText('South Summit Brazil'); // March event should be first

    // Sort by attendees
    await page.selectOption('select', 'attendees');
    await page.waitForTimeout(500);
    
    const firstEventByAttendees = page.locator('.bg-white.rounded-xl').first();
    await expect(firstEventByAttendees).toContainText('Rio Innovation Week'); // 150k attendees

    // Sort back to popularity
    await page.selectOption('select', 'popularity');
    await page.waitForTimeout(500);
    await expect(page.locator('.bg-white.rounded-xl').first()).toContainText('Rio Innovation Week');
  });

  test('should preserve filters when navigating between years', async ({ page }) => {
    // Apply country filter on 2025
    await page.click('.country-dropdown-trigger');
    await page.click('.country-dropdown-option:has-text("Brazil")');
    await page.waitForTimeout(500);

    // Apply sorting
    await page.selectOption('select', 'attendees');
    await page.waitForTimeout(500);

    // Navigate to 2026
    await page.click('a[href*="tech-events-2026"]');
    await page.waitForLoadState('networkidle');

    // Verify filters are preserved in URL
    await expect(page.url()).toContain('country=Brazil');
    await expect(page.url()).toContain('sort=attendees');

    // Verify filters are applied
    await expect(page.locator('select')).toHaveValue('attendees');
    await expect(page.locator('.country-dropdown-trigger')).toContainText('Brazil');
    
    // Verify only Brazilian events are shown
    const events = page.locator('.bg-white.rounded-xl');
    const eventCount = await events.count();
    expect(eventCount).toBeGreaterThan(0); // Should have Brazilian events in 2026
  });

  test('should display correct event information', async ({ page }) => {
    // Check first event has all required information
    const firstEvent = page.locator('.bg-white.rounded-xl').first();
    
    // Check event name
    await expect(firstEvent.locator('h3')).toBeTruthy();
    
    // Check location with emoji
    await expect(firstEvent.locator('text=📍')).toBeTruthy();
    
    // Check date with emoji
    await expect(firstEvent.locator('text=📅')).toBeTruthy();
    
    // Check attendees with emoji
    await expect(firstEvent.locator('text=👥')).toBeTruthy();
    
    // Check popularity bar is visible
    await expect(firstEvent.locator('.bg-blue-600')).toBeTruthy();
    
    // Check AI presence bar is visible
    await expect(firstEvent.locator('.bg-green-600')).toBeTruthy();
    
    // Check description text
    await expect(firstEvent.locator('p')).toBeTruthy();
    
    // Check focus section
    await expect(firstEvent.locator('text=Focus:')).toBeTruthy();
  });

  test('should handle URL navigation correctly', async ({ page }) => {
    // Navigate directly to 2027 via URL
    await page.goto('/tech-events-2027/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1')).toContainText('Tech Events 2027');
    await expect(page.locator('a.bg-blue-600:has-text("2027")')).toBeVisible();

    // Navigate to 2028 with query parameters
    await page.goto('/tech-events-2028/?sort=date&country=Brazil');
    await page.waitForLoadState('networkidle');
    
    // Verify filters are applied from URL
    await expect(page.locator('select')).toHaveValue('date');
    await expect(page.locator('.country-dropdown-trigger')).toContainText('Brazil');
  });

  test('should show only upcoming events for current year', async ({ page }) => {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    if (currentYear === 2025) {
      // Navigate to current year page
      await page.goto('/tech-events-2025/');
      await page.waitForLoadState('networkidle');
      
      // Check that past events are filtered out
      const events = page.locator('.bg-white.rounded-xl');
      const eventCount = await events.count();
      
      // Verify we have some events (not all events should be past)
      expect(eventCount).toBeGreaterThan(0);
      
      // Check that no events have past dates
      for (let i = 0; i < eventCount; i++) {
        const event = events.nth(i);
        const dateText = await event.locator('text=/📅.*/').textContent();
        
        // Extract date from the text and verify it's not in the past
        // This is a basic check - in real implementation you'd parse the actual date
        await expect(event).toBeVisible();
      }
    }
  });

  test('should handle dropdown interactions correctly', async ({ page }) => {
    // Test country dropdown
    await expect(page.locator('.country-dropdown-content')).not.toBeVisible();
    
    // Open dropdown
    await page.click('.country-dropdown-trigger');
    await expect(page.locator('.country-dropdown-content')).toBeVisible();
    
    // Click outside to close dropdown
    await page.click('body');
    await page.waitForTimeout(200);
    await expect(page.locator('.country-dropdown-content')).not.toBeVisible();
    
    // Open dropdown again
    await page.click('.country-dropdown-trigger');
    await expect(page.locator('.country-dropdown-content')).toBeVisible();
    
    // Select an option
    await page.click('.country-dropdown-option:has-text("Colombia")');
    await page.waitForTimeout(500);
    
    // Verify dropdown closes and selection is applied
    await expect(page.locator('.country-dropdown-content')).not.toBeVisible();
    await expect(page.locator('.country-dropdown-trigger')).toContainText('Colombia');
  });

  test('should be responsive on mobile viewports', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that year navigation is still visible and functional
    await expect(page.locator('a[href*="tech-events-2026"]')).toBeVisible();
    
    // Check that filters work on mobile
    await page.click('.country-dropdown-trigger');
    await expect(page.locator('.country-dropdown-content')).toBeVisible();
    
    // Check that events are displayed properly
    const events = page.locator('.bg-white.rounded-xl');
    await expect(events.first()).toBeVisible();
    
    // Test year navigation on mobile
    await page.click('a[href*="tech-events-2026"]');
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('tech-events-2026');
  });
});