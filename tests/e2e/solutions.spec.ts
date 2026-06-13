import { test, expect } from '@playwright/test';

test.describe('Solutions Page E2E Tests', () => {
  test('should load solutions page and navigate to a sector detail page', async ({ page }) => {
    // Navigate to solutions page
    await page.goto('/solutions');

    // Verify solutions overview page loaded in default locale (Indonesian)
    const title = page.locator('h1');
    await expect(title).toContainText('Sistem yang Dirancang untuk Industri Utama');

    // Locate the cards / links
    const govTitle = page.locator('h3').filter({ hasText: 'Pemerintah & Layanan Publik' });
    const eduTitle = page.locator('h3').filter({ hasText: 'Pendidikan & SIAKAD' });
    const bizTitle = page.locator('h3').filter({ hasText: 'ERP Bisnis & Sistem Kustom' });

    await expect(govTitle).toBeVisible();
    await expect(eduTitle).toBeVisible();
    await expect(bizTitle).toBeVisible();

    // Click "Jelajahi Solusi" link inside the Government block
    const govLink = page.locator('a[href*="/solutions/government"]').first();
    await expect(govLink).toBeVisible();
    await govLink.click();

    // Verify URL
    await expect(page).toHaveURL(/\/solutions\/government/);

    // Verify government solutions detail page loaded
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('Digitalisasi Pemerintahan (SPBE)');

    // Toggle to English using the navbar switcher
    const enButton = page.locator('button[aria-label="Switch language to English"]').first();
    await expect(enButton).toBeVisible();
    await enButton.click();

    // Verify URL has /en
    await expect(page).toHaveURL(/\/en\/solutions\/government/);

    // Verify heading updated to English
    await expect(pageTitle).toContainText('Government Digitalization (SPBE)');
  });
});
