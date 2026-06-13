import { test, expect } from '@playwright/test';

test.describe('Static and Core Dynamic Routes E2E Tests', () => {
  test('should successfully load the /about page', async ({ page }) => {
    await page.goto('/about');
    // Assert the main header is visible and contains expected context text
    await expect(page.locator('h1')).toContainText('Who We Are');
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should successfully load the /services page', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('span').filter({ hasText: 'Our Capabilities' })).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should successfully load the /products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should successfully load the /work portfolio index page', async ({ page }) => {
    await page.goto('/work');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should successfully load the /insights blog index page', async ({ page }) => {
    await page.goto('/insights');
    await expect(page.locator('h1')).toBeVisible();
  });
});
