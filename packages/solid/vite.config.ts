import solid from "unplugin-solid/rolldown";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    plugins: [solid()],
  },
});
