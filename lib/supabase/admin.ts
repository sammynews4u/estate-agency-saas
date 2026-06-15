import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getSupabasePublicEnv, getSupabaseServerEnv } from '@/lib/env';

export function createAdminClient() {
  const { supabaseUrl } = getSupabasePublicEnv();
  const { serviceRoleKey } = getSupabaseServerEnv();

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. Add it only as a server-side environment variable in Vercel.');
  }

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
