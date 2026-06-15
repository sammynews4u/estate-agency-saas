const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const optionalServer = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'NEXT_PUBLIC_APP_URL'
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('Missing required public environment variables:');
  for (const key of missing) console.error(`- ${key}`);
  console.error('\nAdd them locally in .env.local or in Vercel Project Settings > Environment Variables.');
  process.exit(1);
}

for (const key of optionalServer) {
  if (!process.env[key]) {
    console.warn(`Warning: ${key} is not set. Some server-side features may not work yet.`);
  }
}

console.log('Environment check passed.');
