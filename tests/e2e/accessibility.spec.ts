import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

  const routes = [
    '/id',
    '/id/about',
    '/id/services',
    '/id/products',
    '/id/contact',
    '/id/work',
    '/id/insights',
    '/id/solutions/business',
    '/id/solutions/education',
    '/id/solutions/government'
  ];

  for (const route of routes) {
    test(`should not have WCAG 2.1 AA violations on ${route}`, async ({ page }) => {
      await page.goto(route);

      // Wait for page to fully hydrate and animations to settle
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      // Run Axe accessibility scan
      const scanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Check if there are any violations, if so print details for easy debugging
      if (scanResults.violations.length > 0) {
        console.error(`Accessibility violations on ${route}:`);
        for (const violation of scanResults.violations) {
          console.error(`- [${violation.id}] ${violation.help}`);
          console.error(`  Impact: ${violation.impact}`);
          console.error(`  Description: ${violation.description}`);
          console.error(`  Nodes affected:`);
          for (const node of violation.nodes) {
            console.error(`    * HTML: ${node.html}`);
            console.error(`      Target: ${node.target.join(', ')}`);
          }
        }
      }

      expect(scanResults.violations).toEqual([]);
    });
  }
});
