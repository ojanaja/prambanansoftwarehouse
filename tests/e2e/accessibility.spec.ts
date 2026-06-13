import { test, expect } from '@playwright/test';

test.describe('Accessibility E2E Tests', () => {
  test('should respect prefers-reduced-motion media feature and not render particle background', async ({ page }) => {
    // Emulate reduced-motion preference in the browser context
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Navigate to homepage
    await page.goto('/');

    // Verify homepage loads successfully by checking the hero heading
    const heroHeading = page.locator('.hero-heading');
    await expect(heroHeading).toBeVisible();

    // Verify that the particle background container (#particles-hero) is not rendered
    const particlesContainer = page.locator('#particles-hero');
    await expect(particlesContainer).not.toBeAttached();
  });
});
