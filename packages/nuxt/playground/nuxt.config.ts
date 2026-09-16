import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@bysages/nuxt"],
  bsElements: {
    theme: { accent: "celadon" },
  },
  compatibilityDate: "2026-09-01",
});
