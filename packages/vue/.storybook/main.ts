import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.ts", "../../charts/src/**/*.stories.ts"],
  addons: ["@storybook/addon-a11y"],
  framework: "@storybook/vue3-vite",
};

export default config;
