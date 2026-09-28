import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import svelte from "rollup-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    // One entry per family plus the barrel: the packer then emits a chunk
    // per family, so a consumer that imports one component stops paying
    // for the other hundred at bundle time.
    entry: ["src/index.ts", "src/components/*/index.ts"],
    plugins: [
      // The tsdown-recommended svelte plugin: standard transform hooks
      // only, unlike @sveltejs/vite-plugin-svelte whose option pipeline
      // never runs under the pack toolchain.
      svelte({ preprocess: vitePreprocess() }),
    ],
  },
});
