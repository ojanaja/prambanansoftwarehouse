# Prambanan Software House Revamp Plan

## 1. Product Direction

Prambanan Digital remains the customer-facing marketing brand. The separate SaaS repository remains the application platform for signup, pricing, admin, super-admin, billing, provisioning, and tenant websites.

Recommended domain boundary:

- `prambanandigital.com`: marketing website.
- `www.prambanandigital.com`: redirect to marketing canonical domain.
- `app.prambanandigital.com`: SaaS platform.
- Tenant subdomains and custom domains: SaaS public renderer.

## 2. Positioning Decision

Use one umbrella promise:

> Prambanan Digital builds reliable digital systems for institutions and growing organizations.

Organize offers into three clear paths:

1. **Solutions**
   - Government and public-sector systems.
   - Education and foundation systems.
   - Business operations systems.

2. **Custom Engineering**
   - Product discovery.
   - Web/mobile development.
   - System integration and modernization.
   - Developer as a Service.

3. **Products**
   - CMS Landing Page SaaS.
   - Other validated Prambanan products.

The homepage primary CTA should be consultation. SaaS signup should be a product-specific secondary CTA, not the universal destination for every offer.

## 3. Target Information Architecture

- `/[locale]`
- `/[locale]/solutions`
- `/[locale]/solutions/government`
- `/[locale]/solutions/education`
- `/[locale]/solutions/business`
- `/[locale]/services`
- `/[locale]/products`
- `/[locale]/products/cms-landing-page`
- `/[locale]/work`
- `/[locale]/work/[slug]`
- `/[locale]/about`
- `/[locale]/insights`
- `/[locale]/insights/[slug]`
- `/[locale]/contact`
- Secure admin/CMS surfaces on a separate protected hostname or route group.

## 4. Homepage Composition

1. Hero with literal offer, proof, and one primary CTA.
2. Trusted clients/verified proof.
3. Three offer paths: solutions, engineering, products.
4. Selected case studies with outcomes.
5. Delivery process.
6. Security, compliance, and engineering standards.
7. Testimonials only when real data exists.
8. Focused consultation CTA.
9. Compact footer.

Remove or move secondary material from the homepage:

- Full tech-stack grid.
- Repetitive benefit cards.
- Empty product/project/testimonial sections.
- Generic “about” copy that belongs on `/about`.
- Heavy interactive decoration without conversion value.

## 5. Design Direction

- Keep the recognizable Prambanan orange/red as an accent, not as the only visual color.
- Use a quiet neutral foundation with high-contrast editorial typography.
- Use real screenshots, project outcomes, team/process photography, or product interfaces.
- Reduce glassmorphism, blurred decoration, particles, and competing gradients.
- Use motion sparingly and provide `prefers-reduced-motion` behavior.
- Establish tokens for color, typography, spacing, elevation, radius, breakpoints, and motion.
- Use consistent iconography and visible labels for forms.

## 6. Technical Direction

### Framework

- Upgrade incrementally, not in the middle of visual implementation.
- First stabilize current Next 14.
- Add TypeScript and tests.
- Then migrate Next/React using official migration guides and a dedicated branch.

### Rendering

- Server-render static/editorial sections.
- Keep client components only for genuine interaction.
- Lazy-load chat and noncritical animation.
- Remove overlapping animation/runtime libraries where possible.

### Content

- Choose Sanity as the single marketing CMS.
- Remove Wisp and unused API/fallback paths after migration.
- Define schemas for:
  - services,
  - solutions,
  - products,
  - case studies,
  - testimonials,
  - posts,
  - clients,
  - global site settings.

### Lead Capture

- Replace browser-side EmailJS with a server endpoint.
- Validate with Zod.
- Add Turnstile or equivalent spam protection.
- Store lead metadata with consent and campaign attribution.
- Notify internal channels from server-only credentials.

### Chat

- Decide whether chat is business-critical.
- If retained:
  - protect admin access,
  - define Supabase RLS,
  - rate limit AI,
  - limit attachment size/type,
  - add retention/privacy policy,
  - lazy-load visitor widget.
- If not validated, remove it from the first revamp release.

## 7. Delivery Phases

### Phase 0 - Safety Baseline

- Rotate exposed-risk credentials.
- Move Telegram/lead integrations server-side.
- Protect admin chat.
- Add validation, limits, security headers, and RLS documentation.
- Add `.env.example` and operational README.

### Phase 1 - Product and Content Strategy

- Finalize audiences, offers, proof, and CTA mapping.
- Inventory existing content and assets.
- Validate all claims.
- Define sitemap and conversion events.

### Phase 2 - Design System and Prototype

- Create design tokens and core components.
- Prototype homepage desktop/mobile.
- Validate accessibility and content density before implementation.

### Phase 3 - Core Marketing Build

- Build homepage, navigation, footer, contact, solutions, services, products, work, and about pages.
- Add robust empty/error states.
- Migrate content to the final Sanity schemas.

### Phase 4 - Insights and Case Studies

- Rebuild blog as insights.
- Add SEO-ready case-study templates.
- Generate dynamic metadata, sitemap, breadcrumbs, and structured data.

### Phase 5 - Performance and Accessibility

- Meet performance budgets.
- Remove unnecessary client runtime.
- Optimize assets and fonts.
- Complete keyboard, screen-reader, contrast, and reduced-motion audits.

### Phase 6 - Quality and Launch

- Add unit, integration, and Playwright coverage.
- Add analytics and conversion dashboards.
- Validate Docker, healthchecks, backups, monitoring, and rollback.
- Complete staging UAT and production launch checklist.

## 8. Release Strategy

Use incremental releases:

1. Security hotfix release.
2. Homepage and design-system release.
3. Solutions/products/work pages.
4. Insights and CMS migration.
5. Chat/AI reintroduction only after security and conversion validation.

Keep the current website deployable until each replacement route passes staging acceptance criteria.

