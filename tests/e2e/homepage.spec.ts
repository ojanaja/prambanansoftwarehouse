import { test, expect } from '@playwright/test';

test.describe('Homepage & Language Switching E2E Tests', () => {
  test('should load the homepage in default locale (ID) and display correct hero heading', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Check that the title or header matches the default locale (Indonesian)
    const heroHeading = page.locator('.hero-heading');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Digitalisasi Sektor Publik &');
    await expect(heroHeading).toContainText('Pendidikan yang Akuntabel.');

    // Check that contact link in navigation is visible and matches "Kontak"
    const contactNavLink = page.locator('nav a').filter({ hasText: /^Kontak$/ }).first();
    await expect(contactNavLink).toBeVisible();
  });

  test('should successfully switch languages using the Navbar language switcher', async ({ page }) => {
    await page.goto('/');

    // Locate language switcher buttons (using the desktop navbar switcher)
    const idButton = page.locator('button[aria-label="Switch language to Indonesian"]').first();
    const enButton = page.locator('button[aria-label="Switch language to English"]').first();

    await expect(idButton).toBeVisible();
    await expect(enButton).toBeVisible();

    // Click English button
    await enButton.click();

    // Verify URL changed to include /en
    await expect(page).toHaveURL(/\/en/);

    // Verify page content changed to English
    const heroHeading = page.locator('.hero-heading');
    await expect(heroHeading).toContainText('Accountable Digitalization for');
    await expect(heroHeading).toContainText('Public Sector & Education.');

    // Click Indonesian button
    await idButton.click();

    // Verify URL reverted to ID (either path / or ending with /id)
    await expect(page).toHaveURL(new RegExp('(\\/(id)?$)|(\\/(id)?#)'));

    // Verify page content reverted to Indonesian
    await expect(heroHeading).toContainText('Digitalisasi Sektor Publik &');
  });
});
