import { test, expect } from '@playwright/test';

test.describe('Year Navigation Fix', () => {
  test('should be able to click 2027 from 2026 page', async ({ page }) => {
    // Go to 2026 events page
    await page.goto('/tech-events-2026/');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on 2026 page
    await expect(page.locator('h1')).toContainText('2026');
    
    // Check that 2027 button exists and is visible
    const button2027 = page.locator('a:has-text("2027")');
    await expect(button2027).toBeVisible();
    
    // Check the href attribute is correct
    const href = await button2027.getAttribute('href');
    expect(href).toBe('/tech-events-2027');
    
    // Click the 2027 button
    await button2027.click();
    await page.waitForLoadState('networkidle');
    
    // Verify we navigated to 2027
    expect(page.url()).toContain('tech-events-2027');
    await expect(page.locator('h1')).toContainText('2027');
  });

  test('should navigate between all years', async ({ page }) => {
    // Start at 2025
    await page.goto('/tech-events-2025/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('2025');
    
    // Go to 2026
    await page.click('a:has-text("2026")');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('2026');
    expect(page.url()).toContain('tech-events-2026');
    
    // Go to 2027
    await page.click('a:has-text("2027")');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('2027');
    expect(page.url()).toContain('tech-events-2027');
    
    // Go to 2028
    await page.click('a:has-text("2028")');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('2028');
    expect(page.url()).toContain('tech-events-2028');
    
    // Go back to 2026
    await page.click('a:has-text("2026")');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('2026');
    expect(page.url()).toContain('tech-events-2026');
  });

  test('should have correct URL format for all year buttons', async ({ page }) => {
    await page.goto('/tech-events-2026/');
    await page.waitForLoadState('networkidle');
    
    // Check all year button URLs
    const button2025 = page.locator('a:has-text("2025")');
    const button2026 = page.locator('a:has-text("2026")');
    const button2027 = page.locator('a:has-text("2027")');
    const button2028 = page.locator('a:has-text("2028")');
    
    // Verify href attributes
    await expect(button2025).toHaveAttribute('href', '/tech-events-2025');
    await expect(button2026).toHaveAttribute('href', '/tech-events-2026');
    await expect(button2027).toHaveAttribute('href', '/tech-events-2027');
    await expect(button2028).toHaveAttribute('href', '/tech-events-2028');
  });

  test('should show active year styling', async ({ page }) => {
    await page.goto('/tech-events-2026/');
    await page.waitForLoadState('networkidle');
    
    // Check that 2026 button has active styling
    const button2026 = page.locator('a:has-text("2026")');
    await expect(button2026).toHaveClass(/bg-blue-600/);
    
    // Check that other buttons don't have active styling
    const button2025 = page.locator('a:has-text("2025")');
    const button2027 = page.locator('a:has-text("2027")');
    
    await expect(button2025).toHaveClass(/bg-white/);
    await expect(button2027).toHaveClass(/bg-white/);
  });
});