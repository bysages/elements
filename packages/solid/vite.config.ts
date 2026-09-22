import solid from "unplugin-solid/rolldown";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    // The plugin's generic type outruns TypeScript's comparison stack
    // whenever the peer-resolution shift re-instances it — the
    // annotation keeps the check deterministic.
    plugins: [solid() as never],
  },
});
