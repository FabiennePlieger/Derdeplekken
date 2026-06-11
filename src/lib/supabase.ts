import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey) {
  // Warn at startup; pages degrade gracefully when env vars are missing
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY not set — DB features disabled");
}

// Public client (used in browser, anon read)
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Service-role client (server only — never exposed to the browser)
export const supabaseAdmin =
  url && serviceKey ? createClient(url, serviceKey, { auth: { persistSession: false } }) : null;
