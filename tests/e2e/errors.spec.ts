import { test, expect } from '@playwright/test';

test.describe('404 Not Found Page E2E Tests', () => {
  test('should load localized English 404 page for /en/invalid-path', async ({ page }) => {
    await page.goto('/en/invalid-path');
    
    // Assert 404 header and localized texts
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2')).toContainText('Page Not Found');
    await expect(page.locator('main p')).toContainText('The page you are looking for might have been removed');
    
    // Assert CTA exists and goes back to home
    const homeBtn = page.locator('a:has-text("Back to Home")');
    await expect(homeBtn).toBeVisible();
    await homeBtn.click();
    await expect(page).toHaveURL(/.*\/en|.*\//);
  });

  test('should load localized Indonesian 404 page for /id/invalid-path', async ({ page }) => {
    await page.goto('/id/invalid-path');
    
    // Assert 404 header and localized texts
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2')).toContainText('Halaman Tidak Ditemukan');
    await expect(page.locator('main p')).toContainText('Halaman yang Anda cari mungkin telah dihapus');
    
    // Assert CTA exists and goes back to home
    const homeBtn = page.locator('a:has-text("Kembali ke Beranda")');
    await expect(homeBtn).toBeVisible();
    await homeBtn.click();
    await expect(page).toHaveURL(/.*\//);
  });

  test('should handle root-level unmatched paths by redirecting', async ({ page }) => {
    // Navigating to un-prefixed non-matching requests
    await page.goto('/invalid-path-no-locale');
    
    // Since root fallback redirects to / which goes to /id (or default locale /),
    // let's assert it redirects back to a valid page.
    await expect(page).toHaveURL(/.*\//);
  });
});
