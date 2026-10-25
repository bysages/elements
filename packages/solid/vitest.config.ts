import solid from "unplugin-solid/vite";
import { defineProject } from "vite-plus";

export default defineProject({
  plugins: [
    solid({
      dev: false,
      ssr: false,
      // Vitest's module runner cannot serve the HMR virtual module.
      hot: false,
    }) as never,
  ],
  test: {
    environment: "happy-dom",
    include: ["src/**/*.spec.{ts,tsx}"],
    server: {
      deps: {
        inline: [/@solidjs/, /solid-js/],
      },
    },
  },
});
