# Prambanan Digital Data Architecture & Privacy Governance

This document establishes the authoritative sources of truth, data retention bounds, privacy policies, and security validation details for Prambanan Digital.

---

## 1. Authoritative Sources of Truth

We separate static marketing content management from dynamic application data storage to ensure operational integrity and compliance.

### A. Custom CMS API (Marketing & Editorial Content)
Prambanan's Custom CMS API is the single, authoritative source of truth for all public-facing marketing resources.
- **Portfolios / Case Studies**: All project details, slugs, client categories, descriptions, live deployment links, and gallery assets.
- **Insights / Articles**: Blog posts, author info, cover photos, tags, and publication timestamps.
- **Products**: SaaS features, product names, showcase links, and pricing details.
- **Testimonials**: Customer quotes, ratings, company names, and review avatars.

*Operational Policy*: No fallback databases or local markdown duplicates are maintained in production. If the Custom CMS API is unreachable, fallback logic caught at compilation or runtime gracefully defaults to empty UI boundaries to prevent page crashes.

### B. Supabase (Dynamic Customer Data)
Supabase is the single, authoritative source of truth for dynamic visitor interactions and backend settings.
- **Contact Leads**: Consultation entries, demo requests, and customer contact data.
- **Chat Conversations**: active session messages and conversations between website visitors and support.
- **Admin Chat Dashboard**: Session details, chat configuration parameters, and admin credentials.

---

## 2. Data Retention & Privacy Behavior

To comply with personal data protection standards (PDP Law / GDPR compliance), we enforce structured data lifecycle rules.

### A. Contact Lead Submissions
- **Purpose**: Collection of user-submitted contact data (name, WhatsApp number, email, institution name, app type) exclusively to schedule demonstrations or consultations.
- **Retention Period**:
  - Leads are stored in the database for a maximum of **90 days** for operational follow-ups.
  - If a lead transitions to an active customer relationship, data is moved to the secure tenant billing system.
  - Inactive or unconverted leads are automatically soft-deleted/anonymized after the 90-day window.
- **Data Security**: Lead email addresses and WhatsApp numbers are encrypted at rest using database-level cryptography.

### B. Anonymous Chat Widget Logs
- **Purpose**: Real-time communication between anonymous visitors and administrators.
- **Retention Period**:
  - active chat history is preserved for **30 days** to allow continuity during follow-up queries.
  - Chat sessions containing no message activity for **14 days** are marked as abandoned and archived.
  - Archived or inactive chat logs are purged automatically every **30 days** from the database.
- **Privacy Controls**: IP addresses of visitors are never stored in conversation tables. Only the country of origin is mapped using GeoIP checks to help route queries.

---

## 3. Security Audit & Token Verification

We conducted an audit of the codebase to identify any exposed API tokens or variables:

- **Audit Target**: Exposure of `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`.
- **Finding**: No references to `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` exist in client bundles, repository code, or configuration keys.
- **Security Check**:
  - The Telegram bot token is stored securely as a server-only environment variable (`TELEGRAM_BOT_TOKEN`).
  - All bot alerts and chat notification dispatch actions are isolated to a server-side route: [src/app/api/chat/notify/route.ts](file:///Users/fauzan/Documents/Project/prambanansoftwarehouse/src/app/api/chat/notify/route.ts).
  - This server route implements strict body size limits (10KB), Zod request parameter validations, and IP-based rate limiting (max 3 dispatches per minute) to prevent abuse or denial-of-service attempts.
- **Resolution**: No token leakage has occurred. Token rotation is not required unless the operator's private hosting panel has exposed the variable.
