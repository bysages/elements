import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import svelte from "rollup-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    plugins: [
      // The tsdown-recommended svelte plugin: standard transform hooks
      // only, unlike @sveltejs/vite-plugin-svelte whose option pipeline
      // never runs under the pack toolchain.
      svelte({ preprocess: vitePreprocess() }),
    ],
  },
});
