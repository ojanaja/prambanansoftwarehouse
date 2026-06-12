# Prambanan Software House Revamp Audit

**Audit date:** 12 June 2026  
**Scope:** Product positioning, UX/UI, frontend architecture, content, CMS, SEO, accessibility, performance, security, operations, and deployment.

## Executive Summary

The current website has a solid visual foundation, bilingual content, Sanity-backed content, a working production build, and clear integration with the Prambanan Digital SaaS signup flow. However, it has grown into a broad collection of sections and integrations without a single conversion-focused product narrative.

The revamp should not begin as a visual reskin. The recommended order is:

1. Secure visitor data, chat administration, and server-side integrations.
2. Finalize positioning and conversion architecture.
3. Simplify the homepage and create a durable design system.
4. Rebuild key pages and content models.
5. Optimize performance, SEO, accessibility, testing, and deployment.

## Current Baseline

- Next.js 14.2.35 and React 18.3.1.
- App Router with Indonesian and English locale routes.
- Tailwind CSS 3, GSAP, Framer Motion, Lenis, Swiper, particles, and Lottie.
- Sanity for projects, services, testimonials, products, and blog content.
- Supabase realtime for visitor and admin chat.
- OpenRouter-backed AI assistant.
- EmailJS contact form delivery.
- Docker standalone deployment target.
- Production build succeeds.
- ESLint succeeds with warnings.
- Homepage first-load JavaScript: approximately 305 kB.
- Middleware bundle: approximately 45.7 kB.
- Production preview logs repeated connection failures to the default API URL at `localhost:8080`.
- Next image optimization fails in standalone preview because `sharp` is not installed.

## Critical Findings

### P0 - Security and Privacy

1. Telegram bot token and chat ID use `NEXT_PUBLIC_*` variables.
   - Browser-exposed variables must never contain bot credentials.
   - Move notifications behind a server-only route or service.

2. The admin chat page has no visible authentication or authorization guard.
   - `/[locale]/admin/chat` directly queries Supabase from the browser.
   - Access must require authenticated admin identity and server-enforced authorization.

3. Supabase security depends entirely on external RLS configuration.
   - Repository documentation does not define expected policies.
   - Add migrations/policy documentation and negative access tests.

4. AI chat endpoint lacks visible rate limiting, request size limits, schema validation, and abuse controls.
   - Image attachments may transmit large base64 payloads.
   - Add per-IP/session rate limits, payload limits, timeout, moderation, and structured errors.

5. Contact form sends visitor data directly through EmailJS from the browser.
   - Move submission server-side.
   - Add validation, spam protection, consent text, auditability, and delivery fallback.

6. Blog HTML sanitization uses regex before `dangerouslySetInnerHTML`.
   - Replace it with a trusted structured renderer or maintained sanitizer.

## High-Priority Findings

### Product and Conversion

- Positioning mixes government/education solutions, general software house services, Developer as a Service, custom development, product demos, and SaaS signup.
- Hero CTA says strategic consultation but routes to SaaS signup.
- Contact section says “try our application free,” which conflicts with custom software positioning.
- Claims such as client/project counts need verifiable source and consistent wording.
- There is no clear primary buyer journey:
  - government/education procurement,
  - custom software consultation,
  - SaaS self-service signup.

### UX and Information Architecture

- Homepage is approximately 12,000 px tall on desktop.
- Too many consecutive sections dilute the main offer.
- Text inside cards is small, especially on mobile.
- Project, testimonial, and product sections create weak or empty states when CMS data is unavailable.
- Animation-first rendering can make sections appear blank until scrolling triggers them.
- Navigation uses a dense floating pill with many controls and a competing CTA.
- The visual system relies heavily on glass cards, gradients, particles, blur, and motion.
- Hero background is atmospheric and does not clearly show the actual product, team, or delivered outcome.

### Performance

- Homepage first-load JS is approximately 305 kB.
- Multiple animation/runtime libraries overlap in responsibility.
- Global chat, cursor glow, smooth scroll, particles, analytics, and theme runtime increase baseline cost.
- A 15 MB source image and other original assets remain in `public`.
- Dynamic sections and heavy client components reduce the benefits of server rendering.
- No explicit performance budget is documented.

### Architecture and Maintainability

- The codebase is JavaScript-only and has no shared domain types.
- Content sources are fragmented across Sanity, Supabase, static translations, local fallback data, Wisp remnants, and a separate API helper.
- Homepage data currently mixes Sanity queries with a separate API whose default points to `localhost:8080`; unavailable API data causes empty project, testimonial, and article experiences.
- Several likely legacy helpers/dependencies remain.
- Homepage composition is hard-coded in one route.
- Client components are used broadly for sections that could be server-rendered.
- The README is still the default create-next-app template.
- There are no automated tests.

### SEO and Content

- Sitemap only includes locale roots and blog indexes; projects and blog slugs are missing.
- Robots rules do not explicitly protect admin/studio/API surfaces.
- Structured data is minimal and static.
- Project detail routes use IDs rather than descriptive slugs.
- Empty CMS states weaken crawlable content.
- Case studies lack a consistent problem/solution/outcome structure.
- No dedicated service landing pages exist for high-intent search queries.

### Accessibility

- Lint reports raw `<img>` elements and missing alt text in chat.
- Several controls use very small text.
- Motion preferences are not consistently respected.
- Custom smooth scrolling and cursor effects need keyboard/screen-reader verification.
- Forms rely on placeholders instead of durable visible labels.
- Focus states and contrast need formal audit.

### Deployment and Operations

- Docker uses `npm install` instead of deterministic `npm ci`.
- Build expects standalone output and emits a `next start` warning in local production preview.
- Standalone image optimization requires `sharp`, but the dependency is missing.
- Runtime API configuration is not fail-fast, so a missing/unreachable API silently degrades key marketing proof.
- No health endpoint or container healthcheck is documented in this repo.
- No security headers/CSP are defined in the app.
- Environment variable contract is undocumented.
- Dependency upgrades are substantial: Next 14 to 16, React 18 to 19, Tailwind 3 to 4, and several major UI libraries.

## What Should Be Preserved

- Indonesian/English locale architecture.
- Prambanan Digital identity and orange/red brand recognition.
- Existing Sanity content where its schema remains useful.
- Marketing-to-SaaS boundary using `NEXT_PUBLIC_SAAS_URL`.
- Existing project/client assets after quality and permission review.
- Docker-based deployment direction.
- Useful content themes: public-sector digitalization, education systems, custom software, and SaaS products.

## Recommended Target

The website should become a focused Prambanan Digital marketing platform with:

- A clear primary positioning statement.
- Separate buyer journeys for solutions, custom projects, and SaaS products.
- A fast, editorial homepage with real project/product evidence.
- Dedicated solution and case-study pages.
- Server-side lead capture and secure chat.
- A small design system shared conceptually with the SaaS platform.
- Measurable conversion events and performance budgets.
- Production-grade security, test coverage, and deployment documentation.

## Domain Transition

The active pre-release marketing domain is:

- `https://prambanandigital.web.id`

The complete pre-release ecosystem uses the same base domain:

- `https://app.prambanandigital.web.id` for the SaaS platform.
- `https://{tenant}.prambanandigital.web.id` for default tenant websites.
- Client custom domains continue to resolve through the SaaS tenant engine.

The current source still contains hardcoded references to
`prambanandigital.com` in metadata, sitemap, robots, structured data, and the
OpenRouter referrer header. These references must be centralized and changed
before the transition-domain deployment is treated as SEO-ready.

The final marketing and SaaS domains remain a separate release decision.

## Success Metrics

- Mobile LCP <= 2.5 seconds at p75.
- CLS <= 0.1 and INP <= 200 ms at p75.
- Homepage initial JS target <= 180 kB.
- No public secrets or unauthenticated admin surfaces.
- No empty homepage sections.
- WCAG 2.2 AA for core marketing flows.
- All primary CTAs tracked with source and destination.
- Contact submission success rate and spam rate observable.
- Every key service has a dedicated conversion page.
- Every featured project has a complete case study.
