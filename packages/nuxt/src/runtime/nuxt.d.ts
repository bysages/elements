/** The Nuxt auto-imports the runtime plugin relies on; the real
 * implementations are injected when Nuxt builds the application. */
declare function defineNuxtPlugin(plugin: (nuxtApp: unknown) => unknown): unknown;
declare function useRuntimeConfig(): { public: Record<string, any> };
