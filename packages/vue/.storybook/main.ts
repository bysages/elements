import { resolve } from "node:path";

import type { StorybookConfig } from "@storybook/vue3-vite";

// X6's ESM tree carries module cycles that trip the bundler's lazy
// initialization — a hoisted helper lands undefined and the static
// build crashes with "P is not a function". The self-contained UMD
// bundle has no cycles to hoist.
const x6Bundle = resolve(import.meta.dirname, "../../../node_modules/@antv/x6/dist/x6.min.js");

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.ts",
    "../../charts/src/**/*.stories.ts",
    "../../workflow/src/**/*.stories.ts",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/vue3-vite",
    // vue-docgen-api (the silent default) is deprecated since 10.6 and
    // leaves in the next major; the Vue-team extractor handles our
    // defineComponent wrappers.
    options: { docgen: "vue-component-meta" },
  },
  // The static build deploys under the docs site at /storybook/ — every
  // asset URL must carry the prefix or the docs domain serves 404s.
  viteFinal: (config) => {
    const resolve = config.resolve ?? {};
    const alias = Array.isArray(resolve.alias)
      ? [...resolve.alias, { find: "@antv/x6", replacement: x6Bundle }]
      : Object.assign({}, resolve.alias, { "@antv/x6": x6Bundle });
    return {
      ...config,
      base: "/storybook/",
      resolve: { ...resolve, alias },
      // Vue esm-bundler asks for its compile-time feature flags; the
      // bundler warns on every page until they are pinned.
      define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        ...config.define,
      },
    };
  },
};

export default config;
