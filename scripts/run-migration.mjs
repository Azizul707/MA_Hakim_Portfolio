#!/usr/bin/env node

/**
 * Run database migrations for projects and solution_breakdowns tables.
 *
 * Usage:
 *   node scripts/run-migration.mjs
 *
 * This script attempts to connect to the Supabase database using:
 * 1. DATABASE_URL env variable
 * 2. Connection pooler URL constructed from project ref + DB password prompt
 */

import { readFileSync } from "fs";
import { createServerSupabaseClient } from "../lib/supabase/server.ts";
import { createClient } from "@supabase/supabase-js";

// Read the SQL migration file
const sql = readFileSync(
  new URL("../supabase/migrations/20240709_projects_solution_breakdowns.sql", import.meta.url),
  "utf-8"
);

async function runViaSupabaseClient() {
  // Try to use the service role client to check if tables exist
  const supabase = await createServerSupabaseClient();

  // Check if projects table exists by attempting a query
  const { error } = await supabase.from("projects").select("id", { count: "exact", head: true });

  if (!error) {
    console.log("✓ 'projects' table already exists");
    return;
  }

  // We can't execute raw SQL via supabase-js.
  // This script needs to be run from Supabase Dashboard SQL editor or via direct pg connection.
  throw new Error(
    "Cannot execute raw SQL via supabase-js client.\n\n" +
    "Please run the migration from Supabase Dashboard:\n" +
    "1. Open https://supabase.com/dashboard/project/eceqfjbcuwdanpczdcpa/sql/new\n" +
    "2. Copy and paste the SQL from: supabase/migrations/20240709_projects_solution_breakdowns.sql\n" +
    "3. Click 'Run'\n\n" +
    "Or install the Supabase CLI and run:\n" +
    "  supabase link --project-ref eceqfjbcuwdanpczdcpa\n" +
    "  supabase db push"
  );
}

// Check for pg module
async function runViaPg() {
  let pg;
  try {
    pg = await import("pg");
  } catch {
    return false;
  }

  const { default: { Pool } } = pg;

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return false;
  }

  const pool = new Pool({ connectionString: dbUrl });
  try {
    await pool.query(sql);
    console.log("✓ Migration executed successfully via pg");
    return true;
  } catch (err) {
    console.error("✗ Migration via pg failed:", err.message);
    return false;
  } finally {
    await pool.end();
  }
}

async function main() {
  // Try pg first if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    const ok = await runViaPg();
    if (ok) process.exit(0);
  }

  // Fall through to try via Supabase client
  try {
    await runViaSupabaseClient();
  } catch (err) {
    console.log("\n" + err.message);
    process.exit(1);
  }
}

main();
