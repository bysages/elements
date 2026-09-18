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
    // Landing pages carry MDC component slots a formatter would flatten;
    // the component shelves are generator output (the generator's own
    // --check guards them, and a formatter's table realignment would
    // fight every regeneration).
    ignorePatterns: ["**/docs/content/*/index.md", "docs/content/**"],
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
