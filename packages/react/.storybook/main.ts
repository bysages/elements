import { resolve } from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";

// X6's ESM tree carries module cycles that trip the bundler's lazy
// initialization — a hoisted helper lands undefined and the static
// build crashes with "P is not a function". The self-contained UMD
// bundle has no cycles to hoist.
const x6Bundle = resolve(import.meta.dirname, "../../../node_modules/@antv/x6/dist/x6.min.js");

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.tsx",
    "../../charts/src/**/*.stories.tsx",
    "../../workflow/src/**/*.stories.tsx",
  ],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    const resolve = config.resolve ?? {};
    const alias = Array.isArray(resolve.alias)
      ? [...resolve.alias, { find: "@antv/x6", replacement: x6Bundle }]
      : Object.assign({}, resolve.alias, { "@antv/x6": x6Bundle });
    return {
      ...config,
      resolve: { ...resolve, alias },
    };
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
};

export default config;
