import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    // Scope tests to the workspace packages.
    include: ["packages/**/*.{spec,test}.ts"],
    benchmark: {
      reporters: ["default"],
    },
    sequence: {
      concurrent: true,
    },
  },
  fmt: {
    // Landing pages carry MDC component slots a formatter would flatten.
    ignorePatterns: ["**/docs/content/*/index.md"],
    sortImports: {
      type: "natural",
    },
    sortPackageJson: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
