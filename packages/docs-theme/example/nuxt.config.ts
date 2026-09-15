import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: ["@bysages/docs-theme"],
  bsElements: {
    theme: { accent: "celadon" },
  },
  compatibilityDate: "2026-09-01",
});
