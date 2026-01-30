import { createClient } from "@supabase/supabase-js";

// Safely retrieve environment variables
// This prevents crashes if import.meta.env is undefined in certain environments
const getEnv = () => {
  try {
    return import.meta.env || {};
  } catch {
    return {};
  }
};

const env = getEnv();

// Use placeholders if keys are missing to prevent immediate initialization errors
// Note: Real data fetching will fail without valid keys
const supabaseUrl = env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseKey);
