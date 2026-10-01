import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    // One entry per family plus the barrel: the packer then emits a chunk
    // per family, so a consumer that imports one component stops paying
    // for the other hundred at bundle time.
    entry: ["src/index.ts", "src/components/*/index.ts", "src/generative/index.ts"],
  },
});
