const defaultSupabaseUrl = 'https://dadtorrtahknyhaybcac.supabase.co';

function assertEnv(name: string, value: string | undefined, fallback?: string) {
  const resolved = value || fallback;

  if (!resolved) {
    throw new Error(
      `Missing environment variable: ${name}. Add it in .env.local for development and in Vercel Project Settings for production.`
    );
  }

  return resolved;
}

export function getSupabasePublicEnv() {
  return {
    supabaseUrl: assertEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL, defaultSupabaseUrl),
    supabaseAnonKey: assertEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };
}

export function getSupabaseServerEnv() {
  return {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    databaseUrl: process.env.DATABASE_URL,
  };
}

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}
