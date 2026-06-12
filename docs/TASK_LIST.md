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
- [ ] Rotate Telegram bot token if the current token has ever been deployed as `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
- [ ] Move Telegram notification calls to a server-only service
- [ ] Replace browser-side EmailJS contact submission with a server route
- [ ] Add Zod validation for contact and chat API payloads
- [ ] Add spam protection and submission rate limiting
- [ ] Add request body and attachment size limits
- [ ] Add AI chat timeout, rate limit, and structured error handling
- [ ] Protect `/[locale]/admin/chat` with authenticated admin authorization
- [ ] Document and test Supabase RLS policies for conversations and messages
- [ ] Replace regex HTML sanitization with structured Portable Text rendering or a maintained sanitizer
- [ ] Add security headers and Content Security Policy
- [ ] Remove production `console.log` statements and redact sensitive error details
- [ ] Create `.env.example` without secrets
- [ ] Document data retention and privacy behavior for contact/chat data
- [ ] Decide and document the authoritative source for projects, testimonials, products, and articles
- [ ] Remove the implicit `http://localhost:8080` production fallback or fail fast when the required API URL is missing

## Phase 1 - Product Strategy and Information Architecture

- [ ] Define primary audiences and decision makers
- [ ] Finalize umbrella positioning statement
- [ ] Define offer taxonomy: Solutions, Custom Engineering, Products
- [ ] Define CTA mapping for each offer
- [ ] Keep SaaS signup as a product-specific CTA
- [ ] Define final production domain boundary with `app.prambanandigital.com`
- [ ] Validate client/project/team/experience claims and evidence
- [ ] Inventory all existing Indonesian and English content
- [ ] Inventory Sanity documents and identify incomplete records
- [ ] Inventory all public assets and usage rights
- [ ] Approve target sitemap
- [ ] Define conversion funnel and analytics events

## Phase 2 - Design System

- [ ] Create color tokens with Prambanan orange/red as accent
- [ ] Define neutral and semantic color scales
- [ ] Define typography scale and line-height rules
- [ ] Define spacing, grid, container, radius, shadow, and motion tokens
- [ ] Define mobile-first breakpoints and content-width constraints
- [ ] Build accessible Button, IconButton, Link, Input, Select, Textarea, and FormField
- [ ] Build Header, MobileNavigation, Footer, Breadcrumbs, and LanguageSwitcher
- [ ] Build SectionHeader, LogoStrip, Metric, Testimonial, CaseStudy, Service, and Product components
- [ ] Define loading, empty, error, and unavailable states
- [ ] Add `prefers-reduced-motion` behavior
- [ ] Produce homepage desktop prototype
- [ ] Produce homepage mobile prototype
- [ ] Review prototype against WCAG 2.2 AA

## Phase 3 - Homepage Revamp

- [ ] Rewrite hero with literal offer and one primary CTA
- [ ] Replace atmospheric hero with inspectable project/product/team media
- [ ] Add verified proof immediately after hero
- [ ] Add three offer-path section
- [ ] Add selected case studies with measurable outcomes
- [ ] Simplify delivery process section
- [ ] Consolidate security/compliance/engineering proof
- [ ] Render testimonials only when valid CMS data exists
- [ ] Replace generic demo form with focused consultation flow
- [ ] Remove empty whitespace from missing CMS content
- [ ] Reduce homepage section count and total scroll length
- [ ] Remove or lazy-load particles, cursor glow, smooth scroll, chat, and noncritical animation
- [ ] Ensure page remains fully readable without animation execution
- [ ] Verify mobile text size, touch targets, and no-overlap behavior

## Phase 4 - Core Pages

- [ ] Build Solutions overview page
- [ ] Build Government Solutions page
- [ ] Build Education Solutions page
- [ ] Build Business Solutions page
- [ ] Build Custom Engineering services page
- [ ] Build Products overview page
- [ ] Build CMS Landing Page SaaS product page
- [ ] Build Work/Case Studies index
- [ ] Replace project ID routes with descriptive slug routes
- [ ] Build case-study detail template: context, challenge, solution, implementation, outcome
- [ ] Build About page with company evidence and team/process
- [ ] Build Contact page with server-side lead submission

## Phase 5 - CMS and Content Architecture

- [ ] Confirm Sanity as the single marketing CMS
- [ ] Remove Wisp integration if no longer used
- [ ] Remove unused API helper and fallback content paths
- [ ] Create global site settings schema
- [ ] Refine service schema
- [ ] Create solution schema
- [ ] Refine product schema
- [ ] Refine project schema into case-study schema
- [ ] Refine testimonial schema with approval/source metadata
- [ ] Add client/logo schema
- [ ] Refine post schema and category taxonomy
- [ ] Add bilingual validation for required fields
- [ ] Add preview and draft workflow
- [ ] Migrate existing content
- [ ] Add content completeness checks

## Phase 6 - Blog and SEO

- [ ] Rename/reposition Blog as Insights if approved
- [ ] Rebuild insight index and article detail pages
- [ ] Add per-route dynamic metadata
- [ ] Add canonical and hreflang validation
- [ ] Include articles, case studies, solutions, services, and products in sitemap
- [ ] Disallow admin/studio/internal paths in robots
- [ ] Add Organization and WebSite structured data
- [ ] Add Service, Product, Article, BreadcrumbList, and FAQ structured data where applicable
- [ ] Add Open Graph image strategy
- [ ] Add redirect map for changed routes
- [ ] Add 404 and error pages aligned with the brand
- [ ] Validate search-console readiness

## Phase 7 - Performance and Asset Optimization

- [ ] Set homepage First Load JS budget <= 180 kB
- [ ] Set LCP <= 2.5 s, CLS <= 0.1, and INP <= 200 ms targets
- [ ] Audit and reduce `"use client"` boundaries
- [ ] Remove overlapping animation libraries where possible
- [ ] Lazy-load chat and optional interactive widgets
- [ ] Replace raw `<img>` elements with optimized media components where appropriate
- [ ] Remove unused original assets from `public`
- [ ] Compress and resize all production images
- [ ] Add responsive `sizes` and priority rules
- [ ] Optimize font loading and subsets
- [ ] Add bundle analysis command
- [ ] Add Lighthouse CI or equivalent performance gate

## Phase 8 - Accessibility

- [ ] Add visible labels and help/error text to forms
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

- [ ] Add TypeScript configuration
- [ ] Convert config, utilities, and data contracts to TypeScript first
- [ ] Convert server routes and CMS adapters
- [ ] Convert shared components
- [ ] Convert page components
- [ ] Add strict linting and formatting
- [ ] Remove dead dependencies and legacy helpers
- [ ] Use `npm ci` in Docker
- [ ] Align Next standalone configuration and runtime command
- [ ] Install and verify `sharp` for standalone image optimization
- [ ] Verify all marketing content sources are reachable in standalone Docker runtime
- [ ] Plan Next 14 -> current supported Next migration using official docs
- [ ] Plan React 18 -> React 19 migration
- [ ] Plan Tailwind 3 -> Tailwind 4 migration separately from visual revamp
- [ ] Upgrade dependencies in controlled batches

## Phase 10 - Testing and Quality

- [ ] Add unit test foundation
- [ ] Add tests for validation, locale helpers, CMS mapping, and sanitization
- [ ] Add integration tests for contact and chat APIs
- [ ] Add Playwright configuration
- [ ] Test Indonesian and English homepage
- [ ] Test navigation and language switching
- [ ] Test consultation form positive and negative cases
- [ ] Test solution, product, work, and insight routes
- [ ] Test responsive desktop, tablet, and mobile viewports
- [ ] Test reduced-motion mode
- [ ] Test admin chat authorization denial
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

- [ ] Rewrite repository README with architecture, local setup, environment contract, and deployment
- [ ] Add health endpoint and Docker healthcheck
- [ ] Add production security headers
- [ ] Document Docker build arguments and runtime environment variables
- [ ] Validate non-root standalone container
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
