import { test, expect } from '@playwright/test';

test.describe('Admin Route Guards E2E Tests', () => {
  test('should redirect unauthorized visits to /admin/chat back to the admin login page', async ({ page }) => {
    // Navigate directly to protected admin chat panel
    await page.goto('/admin/chat');

    // Verify user is redirected to the admin login page
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 15000 });

    // Verify login components or headings exist on page
    const loginHeading = page.locator('h1, h2').first();
    await expect(loginHeading).toBeVisible();
  });
});

