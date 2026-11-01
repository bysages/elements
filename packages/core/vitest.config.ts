import { defineProject } from "vite-plus";

export default defineProject({
  test: {
    environment: "happy-dom",
    include: ["src/**/*.spec.ts"],
  },
});
