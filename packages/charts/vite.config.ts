import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import svelte from "rollup-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: [
      "src/index.ts",
      "src/scales/band.ts",
      "src/scales/linear.ts",
      "src/scales/ordinal.ts",
      "src/scales/point.ts",
      "src/tooltip.ts",
      "src/vue/chart.ts",
      "src/react/chart.ts",
      "src/solid/chart.ts",
      "src/svelte/chart.ts",
    ],
    plugins: [svelte({ preprocess: vitePreprocess() })],
  },
});
