-- Migration: Create projects and solution_breakdowns tables
-- Date: 2024-07-09

-- ─── Projects ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  github_url TEXT,
  live_demo_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

-- ─── Solution Breakdowns ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS solution_breakdowns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  hero_title TEXT NOT NULL DEFAULT '',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_image TEXT,
  overview TEXT NOT NULL DEFAULT '',
  business_problem TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  workflow JSONB DEFAULT '[]'::jsonb,
  business_benefits TEXT NOT NULL DEFAULT '',
  roi_example TEXT NOT NULL DEFAULT '',
  technology_stack JSONB DEFAULT '[]'::jsonb,
  ideal_for TEXT NOT NULL DEFAULT '',
  cta_title TEXT NOT NULL DEFAULT '',
  cta_description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_solution_breakdowns_project_id ON solution_breakdowns(project_id);
CREATE INDEX IF NOT EXISTS idx_solution_breakdowns_status ON solution_breakdowns(status);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE solution_breakdowns ENABLE ROW LEVEL SECURITY;

-- RLS: Public can read published only
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read published solution breakdowns"
  ON solution_breakdowns FOR SELECT
  USING (status = 'published');

-- RLS: Service role can read/write all (bypasses RLS)
-- We use the service role client for admin operations, so no additional policies needed for admin

-- Add gallery support columns to existing tables
ALTER TABLE projects ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_projects_updated_at'
  ) THEN
    CREATE TRIGGER set_projects_updated_at
      BEFORE UPDATE ON projects
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_solution_breakdowns_updated_at'
  ) THEN
    CREATE TRIGGER set_solution_breakdowns_updated_at
      BEFORE UPDATE ON solution_breakdowns
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
