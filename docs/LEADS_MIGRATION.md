# Supabase SQL Migration - `leads` Table

To store contact/leads submissions alongside captured UTM parameters and referrer URLs, you must execute the following SQL script inside the **Supabase SQL Editor** dashboard.

---

## SQL Script

```sql
-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  app_type TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public inserts on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin full access on leads" ON public.leads;

-- Policy A: Allow public anonymous and authenticated users to insert new leads
-- (This lets visitors submit the contact form from the frontend website)
CREATE POLICY "Allow public inserts on leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy B: Allow authenticated admin dashboard users full access to read and delete leads
CREATE POLICY "Allow admin full access on leads"
  ON public.leads FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```
