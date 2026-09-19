import type { StorybookConfig } from "@storybook/vue3-vite";

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
  viteFinal: (config) => ({
    ...config,
    base: "/storybook/",
  }),
};

export default config;
