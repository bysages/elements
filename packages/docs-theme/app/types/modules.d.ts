/** Auto-imported functions whose types the bare tsc pass never sees
 * (the generated `.nuxt` type templates are not part of this package):
 *
 * - `nuxt-schema-org` injects its own `useSchemaOrg`, bound to the app's
 *   head instance; the package export takes a raw Unhead instance, which
 *   Nuxt 4 does not expose on `useNuxtApp()`.
 * - `nuxt-site-config` injects `useSiteConfig` to read the resolved
 *   `site` config from its runtime context. */
declare function useSchemaOrg(input: unknown): void;

declare function useSiteConfig(): {
  url?: string;
  name?: string;
  description?: string;
};
