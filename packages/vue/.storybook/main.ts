import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.ts", "../../charts/src/**/*.stories.ts"],
  addons: ["@storybook/addon-a11y"],
  framework: "@storybook/vue3-vite",
  // The static build deploys under the docs site at /storybook/ — every
  // asset URL must carry the prefix or the docs domain serves 404s.
  viteFinal: (config) => ({
    ...config,
    base: "/storybook/",
  }),
};

export default config;
