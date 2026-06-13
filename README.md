# Prambanan Digital Revamp Portal

This repository hosts the modernized and optimized portal for Prambanan Digital (Prambanan Software House). The codebase has fully transitioned from JavaScript to TypeScript, with enhanced security baselines, modular architectures, automated testing configurations, and Docker standalone containerization.

## System Architecture

The portal is built with **Next.js 14** (App Router) using standalone configurations.
- **Frontend Core**: React 18, TypeScript, next-intl for localization, TailwindCSS for layouts, and Framer Motion / GSAP for smooth interactive components.
- **Marketing CMS**: Sanity CMS for portfolios, customer testimonials, and wawasan (insights) articles.
- **Database & Auth Services**: Supabase for lead/chat storage, conversations management, and admin console session authorization.
- **External Notifications**: Telegram bot endpoints configured server-side for real-time contact alerts.
- **Hardened Security**: Content Security Policy (CSP), custom X-Frame options, Permissions Policies, body size limitations, and request rate-limiting.

---

## Directory Structure

```
├── docs/                      # Repository revamp audits, plans, and task lists
├── messages/                  # Localization json files (Indonesian 'id.json' & English 'en.json')
├── public/                    # Optimized image assets, logos, and web manifest details
├── tests/
│   └── e2e/                   # Playwright E2E test scripts (homepage, forms, viewports, accessibility)
├── playwright.config.ts       # Playwright E2E testing settings
├── jest.config.ts             # Jest config ignoring standalone bundles
├── jest.setup.ts              # JSDOM testing overrides
└── src/
    ├── app/                   # Dynamic localized routes, API endpoints, and sitemap/robots
    ├── components/            # Reusable UI elements, particle backgrounds, and sections
    ├── config/                # Shared layout, routing, and domain options
    ├── helper/                # Validation utils, supabase configs, and rate limiters
    ├── i18n/                  # next-intl configuration and routing prefixes
    └── lib/                   # API mapping adapters and backend CMS clients
```

---

## Setup & Local Development

### 1. Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Local or staging Supabase & Sanity project credentials

### 2. Environment Configuration
Create a `.env.local` file in the root directory. Refrain from deploying secrets. Copy keys from `.env.example`:

```bash
# General
NEXT_PUBLIC_SAAS_URL="https://app.prambanandigital.web.id"
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXT_PUBLIC_GA_MEASUREMENT_ID="your-ga-id"

# Supabase Configurations
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Sanity CMS Configurations
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-03-08"
SANITY_API_READ_TOKEN="your-sanity-read-token"
SANITY_WRITE_TOKEN="your-sanity-write-token"

# API & Hardening Secrets
CRON_SECRET="your-cron-secret"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_CHAT_ID="your-telegram-chat-id"
OPENROUTER_API_KEY="your-openrouter-key"
```

### 3. Run Development Server
Install dependencies (bypassing peer-dependencies via `--legacy-peer-deps` due to TypeScript compilation overrides) and start the local server:

```bash
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## Testing Workflows

The codebase features two testing stages:

### Unit & Integration Tests (Jest)
Runs the test suites verifying helper validations, in-memory rate-limiters, and mock-fetch CMS API mapping adapters:
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
```

### End-to-End Tests (Playwright)
Executes localized, responsive viewport, route resolution, and accessibility tests. The framework automatically fires the Next.js dev server on port `3000` inside a Chromium container:
```bash
# Install Chromium browser binaries (first time setup)
npx playwright install chromium

# Run all E2E specs
npm run test:e2e
```

---

## Production Builds & Docker Standalone

Next.js is configured for `standalone` outputs, compiling lightweight build traces.

### 1. Compile Locally
```bash
npm run build
npm run start
```

### 2. Build & Run Standalone Container
A secure `Dockerfile` is provided utilizing non-root user execution (`USER nextjs`) and features automated health status polling (`HEALTHCHECK`).

Since static pages perform CMS queries at build time, you must pass appropriate environment variables as build arguments:

```bash
# Build the Docker image
docker build \
  --build-arg NEXT_PUBLIC_SAAS_URL="https://app.prambanandigital.web.id" \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://your-supabase.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key" \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-id" \
  --build-arg NEXT_PUBLIC_SANITY_DATASET="production" \
  --build-arg NEXT_PUBLIC_SANITY_API_VERSION="2024-03-08" \
  --build-arg NEXT_PUBLIC_API_URL="http://localhost:8080" \
  --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID="your-ga-id" \
  -t prambanan-digital-revamp:latest .

# Run container on port 3001
docker run -d --name prambanan-portal -p 3001:3001 prambanan-digital-revamp:latest
```

The container runs internal healthchecks querying the `/api/health` API endpoint on port `3001` every 30 seconds.
```bash
# Verify container is healthy
docker inspect --format='{{json .State.Health}}' prambanan-portal
```
