import { test, expect } from '@playwright/test';

const routes = [
  { name: 'id-home', path: '/' },
  { name: 'id-solutions', path: '/id/solutions' },
  { name: 'id-services', path: '/id/services' },
  { name: 'id-products', path: '/id/products' },
  { name: 'id-insights', path: '/id/insights' },
  { name: 'id-about', path: '/id/about' },
  { name: 'id-contact', path: '/id/contact' },
  { name: 'en-home', path: '/en' },
  { name: 'en-solutions', path: '/en/solutions' },
  { name: 'en-about', path: '/en/about' },
  { name: 'en-contact', path: '/en/contact' },
];

test.describe('Visual Regression Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Emulate reduced motion to ensure animations don't introduce visual discrepancies
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  for (const route of routes) {
    test(`should match visual snapshot for ${route.name} (${route.path})`, async ({ page }) => {
      // Navigate to the target route
      await page.goto(route.path);
      
      // Wait for page to reach network idle state (no active network requests)
      await page.waitForLoadState('networkidle');
      
      // Add a small buffer for layout stability (Framer motion transitions, particle renders, etc.)
      await page.waitForTimeout(1000);

      // Perform the snapshot assertion masking dynamic overlays (like the chat floating button)
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05, // 5% pixel discrepancy allowance for font/aliasing variations
        mask: [
          page.locator('div.fixed.bottom-6.right-6.z-50'), // Mask the lazy-loaded Chat Widget trigger
        ],
      });
    });
  }
});
