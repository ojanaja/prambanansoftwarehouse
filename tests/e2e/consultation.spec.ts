import { test, expect } from '@playwright/test';

test.describe('Contact/Consultation Form E2E Tests', () => {
  test('should validate input constraints and submit form successfully with mocked endpoint', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact');

    // Locate fields
    const nameInput = page.locator('input[name="name"]');
    const instInput = page.locator('input[name="institution"]');
    const waInput = page.locator('input[name="whatsapp"]');
    const emailInput = page.locator('input[name="email"]');
    const appSelect = page.locator('select[name="appType"]');
    const submitBtn = page.locator('button[type="submit"]');

    // Verify fields are visible
    await expect(nameInput).toBeVisible();
    await expect(instInput).toBeVisible();
    await expect(waInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(appSelect).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill form with too short WhatsApp number
    await nameInput.fill('Test User');
    await instInput.fill('Test Institution');
    await waInput.fill('12345'); // too short (< 10)
    await emailInput.fill('test@example.com');
    await appSelect.selectOption({ index: 1 }); // select first active option

    // Attempt submission
    await submitBtn.click();

    // Verify toast error is shown
    await expect(page.getByText('Nomor Whatsapp minimal 10 digit')).toBeVisible();

    // Mock the backend API POST route
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill valid whatsapp number (10-15 digits)
    await waInput.fill('081234567890');

    // Submit form again
    await submitBtn.click();

    // Verify toast success
    await expect(page.getByText('Request Demo Berhasil Dikirim')).toBeVisible();
    
    // Check form is reset
    await expect(nameInput).toHaveValue('');
    await expect(instInput).toHaveValue('');
    await expect(waInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(appSelect).toHaveValue('');
  });
});
