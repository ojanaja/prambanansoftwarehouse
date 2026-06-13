# Prambanan Digital - Deployment and Operations Runbook

This operations runbook outlines staging deployment workflows, uptime and error monitoring configurations, backup and restore procedures, rollback guides, credential breach incident response, and a pre-launch gate checklist.

---

## 1. Staging Deployment Workflow

Staging environments are used to validate content integrations, E2E flows, and accessibility benchmarks on hardware matching production spec before going live.

### Staging Setup Guidelines
1. **Repository Branching Strategy**:
   - A dedicated `staging` branch should track stable candidate code before merging to `main`.
   - Continuous Integration (CI) executes build and lint checks on every pull request targeting `staging`.
2. **Container Image Tagging**:
   - Automated workflows should build and push staging containers to your private registry (e.g. GitHub Packages or Docker Hub) using:
     `docker build -t prambanan-digital:staging-latest .`
3. **Environment Isolation**:
   - Use dedicated staging credentials (separate Supabase database project and Sanity dataset name `staging` or `development`) to prevent schema changes from impacting production records.

---

## 2. Uptime & Error Monitoring Setup

Observability keeps the operations team informed about server health, API performance degradation, and client runtime crashes.

### Uptime Monitoring (Blackbox checks)
- Configure an uptime check service (e.g. UptimeRobot, Better Stack, or statuscake) targeting the health check endpoint:
  `https://your-domain.web.id/api/health`
- **Settings**:
  - **Threshold**: Query every 1 minute.
  - **Escalation**: Trigger Telegram alerts if the endpoint fails to return status code `200` for 3 consecutive checks (timeouts > 5000ms).

### Error Exception Monitoring (Sentry Integration)
Next.js supports native Sentry integration for client and server-side tracking:
1. **Installation**:
   ```bash
   npm install @sentry/nextjs --legacy-peer-deps
   ```
2. **Configuration Wizard**:
   Run the setup wizard to generate `sentry.client.config.js`, `sentry.server.config.js`, and `sentry.edge.config.js`:
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```
3. **Environment Setup**:
   Ensure `SENTRY_AUTH_TOKEN` is injected in the deployment pipeline to compile source-maps, and configure `NEXT_PUBLIC_SENTRY_DSN` in your runtime environment.

---

## 3. Backup & Restore Procedures

Ensure that a daily backup strategy is enforced to protect leads data and website content from corruption.

### Supabase Database Backups
Since the portal stores consultation leads inside Supabase's PostgreSQL `leads` table, configure automated backups:
- **Schema & Data Backup (pg_dump)**:
  Extract database snapshots containing table schemas, conversations, and contact logs:
  ```bash
  pg_dump -h db.cdmmwcuqiysfjgbgyodz.supabase.co \
          -U postgres \
          -d postgres \
          -F p \
          -b \
          -v \
          -t leads \
          -t conversations \
          -t messages \
          -f supabase_leads_backup.sql
  ```
- **Database Restoration (psql)**:
  To restore records on a fresh project instance:
  ```bash
  psql -h db.cdmmwcuqiysfjgbgyodz.supabase.co \
       -U postgres \
       -d postgres \
       -f supabase_leads_backup.sql
  ```

### Sanity CMS Datasets
Public marketing pages depend on Sanity dataset structures (portfolios, testimonials, insights articles):
- **Exporting CMS Data**:
  Execute dataset dumps into local compressed TAR files:
  ```bash
  npx sanity dataset export production production-sanity-backup.tar.gz
  ```
- **Importing CMS Data**:
  Restore CMS datasets to standard datasets:
  ```bash
  npx sanity dataset import production-sanity-backup.tar.gz production --replace
  ```

---

## 4. Rollback Procedures

If a critical incident or functional regression is identified post-deployment, roll back the production application immediately.

### Container Rollback (Docker Standalone)
1. List prior active container tags in the image registry.
2. Stop and remove the malfunctioning running container:
   ```bash
   docker stop prambanan-portal
   docker rm prambanan-portal
   ```
3. Deploy the previous stable release version (e.g. tag `v1.2.0`):
   ```bash
   docker run -d \
     --name prambanan-portal \
     -p 3001:3001 \
     prambanan-digital-revamp:v1.2.0
   ```
4. Verify the container status:
   ```bash
   docker inspect --format='{{json .State.Health}}' prambanan-portal
   ```

### Git Revert Workflow
If utilizing direct branch deployments (e.g. Vercel / Netlify):
1. Locate the commit hash of the last stable build:
   `git log -n 5 --oneline`
2. Perform a hard reset locally and push force (only if main is locked or you have deployment urgency):
   ```bash
   git reset --hard <stable-commit-hash>
   git push origin main --force
   ```
   *Alternatively, create a revert commit to keep history intact:*
   ```bash
   git revert <malfunctioning-commit-hash>
   git push origin main
   ```

---

## 5. Security Incident Response & Token Rotation

If secrets are accidentally committed to public repositories or leaked via logs, follow this response protocol immediately.

### Token Rotation Playbook
1. **Telegram Bot Token Leak**:
   - Open Telegram and message `@BotFather`.
   - Send `/token` and select the compromised bot name.
   - Select **Revoke current token** to instantly invalidate it and generate a new token.
   - Update `TELEGRAM_BOT_TOKEN` in the production environment variables configuration.
2. **Supabase Anon Key / API Secret Leak**:
   - Navigate to the Supabase Dashboard -> **Project Settings** -> **API**.
   - Under **JWT Settings**, click **Generate new JWT Secret** (Caution: this invalidates all current client key signatures).
   - Copy the newly generated `anon` public API key and update `NEXT_PUBLIC_SUPABASE_ANON_KEY` in deployment environment variables.
3. **OpenRouter API Key Leak**:
   - Go to [OpenRouter Settings](https://openrouter.ai/keys).
   - Delete the leaked API key.
   - Generate a new key and update `OPENROUTER_API_KEY` on the hosting platform.

### Post-Breach Auditing
- Verify Supabase RLS (Row Level Security) policies are strictly applied to ensure public inserts are allowed, but queries to the `leads` table are blocked except for authorized admin users.
- Redact leaked keys from any local terminal logs and verify the public GitHub history has been purged if the commit was pushed.

---

## 6. Launch Gate Checklist

Verify this checklist is 100% complete before opening the portal to public traffic:

- [ ] **Domain & SSL**: Canonical URL routes to `https://prambanandigital.web.id` with valid, auto-renewing Let's Encrypt SSL/TLS certificates.
- [ ] **Environment Variables**: Production `.env` matches `.env.example` exactly and has no dummy values (`your-token`).
- [ ] **Supabase Security**: RLS (Row Level Security) is enabled on all tables, and public select queries are fully blocked.
- [ ] **Tests Pass**: Run `npm test` and `npx playwright test` synchronously and verify zero failures.
- [ ] **Health Endpoint**: Pinging `/api/health` returns status `200` and `{"status":"ok"}`.
- [ ] **Cookie Consent AA compliance**: Verify the Cookie Consent banner is styled correctly and doesn't block screen readers.
- [ ] **Structured Logging**: Structured JSON logger is active, and console logs are suppressed.
- [ ] **SEO Readiness**: robots.txt blocks `/admin/*` and `/studio/*`, and sitemap.xml is populated with correct links.
