import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: ["@bysages/docs-theme"],
  modules: ["@nuxtjs/i18n"],
  i18n: {
    // The theme's collections are prefixed per locale (`/en/…`,
    // `/zh/…`), so every language lives under its own segment.
    strategy: "prefix",
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", language: "en", file: "en.json" },
      { code: "zh", name: "中文", language: "zh-CN", file: "zh.json" },
    ],
  },
  compatibilityDate: "2026-09-01",
});
