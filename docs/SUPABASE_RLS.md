# Supabase Row-Level Security (RLS) Policies

To fully secure your visitor chat data, you must configure Row-Level Security (RLS) in your Supabase project dashboard (or via database migrations). Below are the recommended RLS policies for the `conversations` and `messages` tables.

---

## 1. `conversations` Table

Ensure RLS is enabled:
```sql
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
```

### Policies

#### A. Allow anyone to start/update their own conversation (Insert/Upsert)
This allows visitors to insert new conversation entries when they open the chat.
* **Allowed operation:** `INSERT`, `UPDATE`
* **Target Roles:** `anon`, `authenticated`
* **Expression (WITH CHECK):** `true` (Or limit by session_id validation if you generate deterministic session tokens).

#### B. Allow visitors to read their own conversations
* **Allowed operation:** `SELECT`
* **Target Roles:** `anon`
* **Expression (USING):** `session_id = current_setting('request.headers')::json->>'x-chat-session-id'` (Or query by matching cookies/local identifiers if passed as headers, otherwise fallback to filtering client-side while keeping this open).
* *Alternative (simpler baseline):* If visitors read conversations purely from client cache (IndexedDB) and admin reads from DB, you can restrict visitor SELECT entirely or allow SELECT based on session ID matching.

#### C. Allow authenticated admin users full access
Authenticated administrative users can read, insert replies, and update all conversations.
* **Allowed operation:** `ALL`
* **Target Roles:** `authenticated`
* **Expression (USING / WITH CHECK):** `auth.role() = 'authenticated'`

---

## 2. `messages` Table

Ensure RLS is enabled:
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### Policies

#### A. Allow visitors to insert new messages (Insert)
* **Allowed operation:** `INSERT`
* **Target Roles:** `anon`, `authenticated`
* **Expression (WITH CHECK):** `sender IN ('user', 'bot')` (Ensure visitors cannot spoof `admin` sender).

#### B. Allow visitors to subscribe to replies (Select)
* **Allowed operation:** `SELECT`
* **Target Roles:** `anon`
* **Expression (USING):** `true` (Or restrict to messages linked to their conversation session ID).

#### C. Allow authenticated admin users full access
* **Allowed operation:** `ALL`
* **Target Roles:** `authenticated`
* **Expression (USING / WITH CHECK):** `auth.role() = 'authenticated'`

---

## SQL Migration Snippet

You can execute the following SQL script directly in the **Supabase SQL Editor** to establish these policies:

```sql
-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public inserts on conversations" ON conversations;
DROP POLICY IF EXISTS "Allow admin full access on conversations" ON conversations;
DROP POLICY IF EXISTS "Allow public inserts on messages" ON messages;
DROP POLICY IF EXISTS "Allow public select on messages" ON messages;
DROP POLICY IF EXISTS "Allow admin full access on messages" ON messages;

-- conversations policies
CREATE POLICY "Allow public inserts on conversations" 
  ON conversations FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow public updates on conversations" 
  ON conversations FOR UPDATE 
  TO anon, authenticated 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on conversations" 
  ON conversations FOR ALL 
  TO authenticated 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- messages policies
CREATE POLICY "Allow public inserts on messages" 
  ON messages FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (sender IN ('user', 'bot'));

CREATE POLICY "Allow public select on messages" 
  ON messages FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow admin full access on messages" 
  ON messages FOR ALL 
  TO authenticated 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```
