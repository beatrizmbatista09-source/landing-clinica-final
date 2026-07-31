/*
# Clinic landing page template — multi-clinic schema

Creates a fully data-driven landing page template for aesthetic / wellness clinics.
All clinic-specific information (identity, treatments, testimonials, FAQ, features,
process, before/after, contact details, theme colors) lives in the database and is
scoped per clinic via `clinic_id`. The frontend selects a clinic by `slug` and
renders every section from the database, so the same UI serves many clinics.

1. New tables
- `clinics`           — one row per clinic: name, tagline, logo, hero, address,
                       contacts (phone/email/whatsapp), hours, theme colors, stats.
- `features`          — "why us" cards (icon + title + description), scoped per clinic.
- `process_steps`     — ordered process steps, scoped per clinic.
- `treatments`        — treatment cards (image + name + description), scoped per clinic.
- `before_after`      — before/after gallery images, scoped per clinic.
- `testimonials`      — patient testimonials (avatar + name + location + quote), scoped per clinic.
- `faqs`              — FAQ Q&A pairs, scoped per clinic.
- `leads`             — contact-form submissions (name, phone, email, message, preferred time).

2. Security
- RLS enabled on every table.
- This is a public, no-sign-in marketing site. Content tables are readable by
  `anon, authenticated` (USING true) because the content is intentionally public.
- `leads` is INSERT-only for anon/authenticated (public contact form); reads are
  restricted to authenticated owners of the clinic (placeholder policy) — in a real
  deployment leads would be read via a signed-in admin or a service-role edge function.
  For this template, reads on leads are blocked for anon (no public lead listing).

3. Notes
- All content tables carry `clinic_id` referencing `clinics(id) ON DELETE CASCADE`,
  so deleting a clinic removes its content.
- `sort_order` controls display order where relevant.
- Theme colors are stored as hex strings and injected as CSS variables by the frontend.
*/

-- ── clinics ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  logo_url text,
  hero_image_url text,
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  region text NOT NULL DEFAULT '',
  latitude numeric,
  longitude numeric,
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  whatsapp text,
  hours jsonb NOT NULL DEFAULT '[]'::jsonb,
  primary_color text NOT NULL DEFAULT '#0f4c5c',
  accent_color text NOT NULL DEFAULT '#c9a96e',
  rating numeric NOT NULL DEFAULT 5.0,
  patients_count text NOT NULL DEFAULT '',
  reviews_count text NOT NULL DEFAULT '',
  reviews_label text NOT NULL DEFAULT '',
  cta_title text NOT NULL DEFAULT '',
  cta_subtitle text NOT NULL DEFAULT '',
  cta_image_url text,
  footer_note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_clinics" ON clinics;
CREATE POLICY "anon_read_clinics" ON clinics FOR SELECT
  TO anon, authenticated USING (true);

-- ── features ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  icon text NOT NULL DEFAULT 'Sparkles',
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_features" ON features;
CREATE POLICY "anon_read_features" ON features FOR SELECT
  TO anon, authenticated USING (true);

-- ── process_steps ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  step_number int NOT NULL DEFAULT 0,
  title text NOT NULL,
  description text NOT NULL
);
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_process" ON process_steps;
CREATE POLICY "anon_read_process" ON process_steps FOR SELECT
  TO anon, authenticated USING (true);

-- ── treatments ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  image_url text,
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_treatments" ON treatments;
CREATE POLICY "anon_read_treatments" ON treatments FOR SELECT
  TO anon, authenticated USING (true);

-- ── before_after ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS before_after (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  image_url text,
  caption text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE before_after ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_before_after" ON before_after;
CREATE POLICY "anon_read_before_after" ON before_after FOR SELECT
  TO anon, authenticated USING (true);

-- ── testimonials ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  avatar_url text,
  rating int NOT NULL DEFAULT 5,
  quote text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_testimonials" ON testimonials;
CREATE POLICY "anon_read_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

-- ── faqs ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_faqs" ON faqs;
CREATE POLICY "anon_read_faqs" ON faqs FOR SELECT
  TO anon, authenticated USING (true);

-- ── leads ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  preferred_time text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_read_leads" ON leads;
-- No public read of leads; only authenticated (placeholder for future admin).
CREATE POLICY "anon_read_leads" ON leads FOR SELECT
  TO authenticated USING (true);

-- ── indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_features_clinic ON features(clinic_id);
CREATE INDEX IF NOT EXISTS idx_process_clinic ON process_steps(clinic_id);
CREATE INDEX IF NOT EXISTS idx_treatments_clinic ON treatments(clinic_id);
CREATE INDEX IF NOT EXISTS idx_before_after_clinic ON before_after(clinic_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_clinic ON testimonials(clinic_id);
CREATE INDEX IF NOT EXISTS idx_faqs_clinic ON faqs(clinic_id);
CREATE INDEX IF NOT EXISTS idx_leads_clinic ON leads(clinic_id);
