import { test, expect } from '@playwright/test';

test.describe('Responsive Viewports E2E Tests', () => {
  test('should adjust layout and elements correctly on a mobile viewport', async ({ page }) => {
    // Set mobile size (e.g. iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });

    // Navigate to homepage
    await page.goto('/');

    // Hero heading should remain visible
    await expect(page.locator('.hero-heading')).toBeVisible();

    // Mobile menu toggle button should be visible
    const mobileMenuButton = page.locator('button[aria-label="Open menu"]');
    await expect(mobileMenuButton).toBeVisible();

    // Desktop registration / CTA button should be hidden on mobile viewports
    const desktopDemoButton = page.locator('nav').first().locator('a[href*="/signup"]');
    await expect(desktopDemoButton).not.toBeVisible();
  });

  test('should adjust layout correctly on a tablet viewport', async ({ page }) => {
    // Set tablet size (e.g. iPad)
    await page.setViewportSize({ width: 768, height: 1024 });

    // Navigate to homepage
    await page.goto('/');

    // Hero heading should remain visible
    await expect(page.locator('.hero-heading')).toBeVisible();

    // Desktop navbar should become active and visible (md is active at >= 768px width)
    const desktopDemoButton = page.locator('nav').first().locator('a[href*="/signup"]');
    await expect(desktopDemoButton).toBeVisible();

    // Mobile menu toggle button should be hidden on desktop/tablet layout
    const mobileMenuButton = page.locator('button[aria-label="Open menu"]');
    await expect(mobileMenuButton).not.toBeVisible();
  });
});
