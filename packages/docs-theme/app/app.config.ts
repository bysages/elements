/** Layer defaults; consuming sites override any key from their own
 * `app.config.ts`. The typed placeholders keep the optional keys sites
 * may set — the copyright line, the outline heading — visible through
 * `useAppConfig()`, whose type derives from this very literal. */
export default {
  docs: {
    name: "By Sages Docs",
    description: "Documentation dressed in paper and ink.",
    /** UI-strings locale when `@nuxtjs/i18n` is not registered. */
    locale: "en",
    copyright: undefined as { label?: string; url?: string } | undefined,
    toc: undefined as { title?: string } | undefined,
  },
};
