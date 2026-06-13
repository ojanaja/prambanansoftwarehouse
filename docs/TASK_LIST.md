# Task List - Prambanan Software House Revamp

## Status Legend

- `[ ]` Pending
- `[/]` In progress
- `[x]` Completed
- `[!]` Blocked or needs decision

## Phase 0 - Audit and Safety Baseline

- [x] Audit repository structure, dependencies, build, lint, routes, and assets
- [x] Audit desktop and mobile homepage rendering
- [x] Document current product, UX, performance, SEO, security, and deployment gaps
- [x] Rotate Telegram bot token if the current token has ever been deployed as `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
- [x] Move Telegram notification calls to a server-only service
- [x] Replace browser-side EmailJS contact submission with a server route
- [x] Add Zod validation for contact and chat API payloads (using robust native validator)
- [x] Add spam protection and submission rate limiting
- [x] Add request body and attachment size limits
- [x] Add AI chat timeout, rate limit, and structured error handling
- [x] Protect `/[locale]/admin/chat` with authenticated admin authorization
- [x] Document and test Supabase RLS policies for conversations and messages
- [x] Replace regex HTML sanitization with structured Portable Text rendering or a maintained sanitizer
- [x] Add security headers and Content Security Policy
- [x] Remove production `console.log` statements and redact sensitive error details
- [x] Create `.env.example` without secrets
- [x] Document data retention and privacy behavior for contact/chat data
- [x] Decide and document the authoritative source for projects, testimonials, products, and articles
- [x] Remove the implicit `http://localhost:8080` production fallback or fail fast when the required API URL is missing

## Phase 1 - Product Strategy and Information Architecture

- [ ] Define primary audiences and decision makers
- [ ] Finalize umbrella positioning statement
- [ ] Define offer taxonomy: Solutions, Custom Engineering, Products
- [ ] Define CTA mapping for each offer
- [ ] Keep SaaS signup as a product-specific CTA
- [x] Confirm transition marketing domain: `https://prambanandigital.web.id`
- [x] Confirm transition SaaS domain: `https://app.prambanandigital.web.id`
- [x] Confirm transition tenant wildcard: `*.prambanandigital.web.id`
- [ ] Define and approve the final-release marketing and SaaS domain boundary separately
- [ ] Centralize public marketing base URL in one validated server-side configuration
- [ ] Replace hardcoded `prambanandigital.com` references with the transition domain in metadata, sitemap, robots, JSON-LD, and OpenRouter referrer
- [ ] Configure canonical URL to `https://prambanandigital.web.id`
- [ ] Configure optional `www.prambanandigital.web.id` redirect to the canonical transition domain
- [ ] Configure marketing CTA and `NEXT_PUBLIC_SAAS_URL` to `https://app.prambanandigital.web.id`
- [ ] Verify DNS and TLS for `prambanandigital.web.id`, `app.prambanandigital.web.id`, and `*.prambanandigital.web.id`
- [ ] Verify analytics, Search Console, CORS, Supabase, Sanity, and external API allowlists for the transition domain
- [ ] Prepare redirect and canonical migration checklist for the future final domain
- [ ] Validate client/project/team/experience claims and evidence
- [ ] Inventory all existing Indonesian and English content
- [ ] Inventory Sanity documents and identify incomplete records
- [ ] Inventory all public assets and usage rights
- [ ] Approve target sitemap
- [ ] Define conversion funnel and analytics events

## Phase 2 - Design System

- [x] Create color tokens with Prambanan orange/red as accent
- [x] Define neutral and semantic color scales
- [x] Define typography scale and line-height rules
- [x] Define spacing, grid, container, radius, shadow, and motion tokens
- [x] Define mobile-first breakpoints and content-width constraints
- [/] Build accessible Button, IconButton, Link, Input, Select, Textarea, and FormField (Created Button, Input, Textarea, Select, FormField)
- [ ] Build Header, MobileNavigation, Footer, Breadcrumbs, and LanguageSwitcher
- [/] Build SectionHeader, LogoStrip, Metric, Testimonial, CaseStudy, Service, and Product components (Created SectionHeader)
- [ ] Define loading, empty, error, and unavailable states
- [x] Add `prefers-reduced-motion` behavior
- [ ] Produce homepage desktop prototype
- [ ] Produce homepage mobile prototype
- [ ] Review prototype against WCAG 2.2 AA

## Phase 3 - Homepage Revamp

- [x] Rewrite hero with literal offer and one primary CTA (Redirected primary CTA to `#contact` lead capture)
- [ ] Replace atmospheric hero with inspectable project/product/team media
- [x] Add verified proof immediately after hero (Stats section is positioned directly below hero)
- [x] Add three offer-path section (Specialized solutions is configured directly on page)
- [x] Add selected case studies with measurable outcomes (Rendered conditionally on data)
- [ ] Simplify delivery process section
- [ ] Consolidate security/compliance/engineering proof
- [x] Render testimonials only when valid CMS data exists
- [ ] Replace generic demo form with focused consultation flow
- [x] Remove empty whitespace from missing CMS content (Added empty array guards to project and testimonial sections)
- [x] Reduce homepage section count and total scroll length (Reduced page sections from 15 to 8, First Load JS decreased by 97kB)
- [x] Remove or lazy-load particles, cursor glow, smooth scroll, chat, and noncritical animation (ChatWidget realtime bundle is dynamically lazy-loaded)
- [ ] Ensure page remains fully readable without animation execution
- [ ] Verify mobile text size, touch targets, and no-overlap behavior

## Phase 4 - Core Pages

- [x] Build Solutions overview page
- [x] Build Government Solutions page
- [x] Build Education Solutions page
- [x] Build Business Solutions page
- [x] Build Custom Engineering services page
- [x] Build Products overview page
- [x] Build CMS Landing Page SaaS product page
- [x] Build Work/Case Studies index
- [x] Replace project ID routes with descriptive slug routes
- [x] Build case-study detail template: context, challenge, solution, implementation, outcome
- [x] Build About page with company evidence and team/process
- [x] Build Contact page with server-side lead submission

## Phase 5 - CMS and Content Architecture

- [x] Confirm Sanity as the single marketing CMS
- [x] Remove Wisp integration if no longer used
- [x] Remove unused API helper and fallback content paths
- [x] Create global site settings schema
- [x] Refine service schema
- [x] Create solution schema
- [x] Refine product schema
- [x] Refine project schema into case-study schema
- [x] Refine testimonial schema with approval/source metadata
- [x] Add client/logo schema
- [x] Refine post schema and category taxonomy
- [x] Add bilingual validation for required fields
- [x] Add preview and draft workflow
- [x] Migrate existing content
- [x] Add content completeness checks

## Phase 6 - Blog and SEO

- [x] Rename/reposition Blog as Insights if approved
- [x] Rebuild insight index and article detail pages
- [x] Add per-route dynamic metadata
- [x] Add canonical and hreflang validation
- [x] Include articles, case studies, solutions, services, and products in sitemap
- [x] Disallow admin/studio/internal paths in robots
- [x] Add Organization and WebSite structured data
- [x] Add Service, Product, Article, BreadcrumbList, and FAQ structured data where applicable
- [x] Add Open Graph image strategy
- [x] Add redirect map for changed routes
- [x] Add 404 and error pages aligned with the brand
- [x] Validate search-console readiness

## Phase 7 - Performance and Asset Optimization

- [x] Set homepage First Load JS budget <= 180 kB
- [ ] Set LCP <= 2.5 s, CLS <= 0.1, and INP <= 200 ms targets
- [x] Audit and reduce `"use client"` boundaries
- [ ] Remove overlapping animation libraries where possible
- [x] Lazy-load chat and optional interactive widgets
- [x] Replace raw `<img>` elements with optimized media components where appropriate
- [ ] Remove unused original assets from `public`
- [ ] Compress and resize all production images
- [ ] Add responsive `sizes` and priority rules
- [ ] Optimize font loading and subsets
- [x] Add bundle analysis command
- [ ] Add Lighthouse CI or equivalent performance gate

## Phase 8 - Accessibility

- [x] Add visible labels and help/error text to forms
- [ ] Audit keyboard navigation and focus order
- [ ] Audit color contrast in light and dark modes
- [ ] Audit heading hierarchy and landmarks
- [ ] Audit image alt text
- [ ] Audit language switcher semantics
- [ ] Audit dialogs, mobile navigation, accordions, sliders, and chat
- [ ] Ensure animations respect reduced motion
- [ ] Ensure content remains available without hover
- [ ] Run automated axe checks
- [ ] Complete manual screen-reader smoke test

## Phase 9 - Technical Modernization

- [x] Add TypeScript configuration
- [x] Convert config, utilities, and data contracts to TypeScript first
- [x] Convert server routes and CMS adapters
- [x] Convert shared components
- [x] Convert page components
- [x] Add strict linting and formatting
- [x] Remove dead dependencies and legacy helpers
- [x] Use `npm ci` in Docker
- [x] Align Next standalone configuration and runtime command
- [x] Install and verify `sharp` for standalone image optimization
- [x] Verify all marketing content sources are reachable in standalone Docker runtime
- [x] Plan Next 14 -> current supported Next migration using official docs
- [x] Plan React 18 -> React 19 migration
- [x] Plan Tailwind 3 -> Tailwind 4 migration separately from visual revamp
- [x] Upgrade dependencies in controlled batches

## Phase 10 - Testing and Quality

- [x] Add unit test foundation
- [x] Add tests for validation, locale helpers, CMS mapping, and sanitization
- [ ] Add integration tests for contact and chat APIs
- [x] Add Playwright configuration
- [x] Test Indonesian and English homepage
- [x] Test navigation and language switching
- [x] Test consultation form positive and negative cases
- [x] Test solution, product, work, and insight routes
- [x] Test responsive desktop, tablet, and mobile viewports
- [x] Test reduced-motion mode
- [x] Test admin chat authorization denial
- [ ] Add visual regression screenshots for critical routes
- [ ] Add build, lint, test, and accessibility CI gate

## Phase 11 - Analytics and Conversion

- [ ] Define consent-aware analytics architecture
- [ ] Track primary CTA clicks
- [ ] Track consultation form start, validation failure, and success
- [ ] Track SaaS product/signup outbound clicks
- [ ] Track case-study and solution engagement
- [ ] Preserve UTM and referrer attribution
- [ ] Add privacy-safe conversion dashboard
- [ ] Remove duplicate or unused analytics integrations

## Phase 12 - Deployment and Operations

- [/] Rewrite repository README with architecture, local setup, environment contract, and deployment
- [x] Add health endpoint and Docker healthcheck
- [x] Add production security headers
- [x] Document Docker build arguments and runtime environment variables
- [x] Validate non-root standalone container
- [ ] Add staging deployment
- [ ] Add uptime and error monitoring
- [ ] Add structured server logging
- [ ] Add backup/restore documentation for Sanity/Supabase-dependent data
- [ ] Add incident response for lead/chat data exposure
- [ ] Add rollback procedure
- [ ] Add launch checklist

## Phase 13 - Launch Gate

- [ ] All P0 security tasks completed
- [ ] Positioning and CTA architecture approved
- [ ] Indonesian and English content approved
- [ ] No empty or broken homepage section
- [ ] Core Web Vitals budgets pass
- [ ] WCAG 2.2 AA core-flow audit passes
- [ ] SEO metadata, sitemap, robots, redirects, and structured data pass
- [ ] Contact and SaaS outbound conversion tracking pass
- [ ] Cross-browser and responsive E2E pass
- [ ] Staging stakeholder UAT approved
- [ ] Production rollback tested
- [ ] Production release approved
