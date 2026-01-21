/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_PRICE_ID_MONTHLY: string;
  readonly VITE_STRIPE_PRICE_ID_QUARTERLY: string;
  readonly VITE_STRIPE_PRICE_ID_BIANNUAL: string;
  readonly VITE_STRIPE_PRICE_ID_YEARLY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
