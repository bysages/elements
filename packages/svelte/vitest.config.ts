import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { defineProject } from "vite-plus";

export default defineProject({
  resolve: {
    conditions: ["browser"],
  },
  plugins: [svelte({ preprocess: vitePreprocess() })],
  test: {
    environment: "happy-dom",
    include: ["src/**/*.spec.{ts,tsx}"],
    server: {
      deps: {
        inline: [
          /@ark-ui[+/]svelte/,
          /@zag-js[+/]svelte/,
          /@tanstack[+/]svelte-table/,
          /@tanstack[+/]svelte-store/,
        ],
      },
    },
  },
});
