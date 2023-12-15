interface ImportMetaEnv {
  MODE: 'development' | 'production';
  BASE_URL: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_NAME: string;
}
