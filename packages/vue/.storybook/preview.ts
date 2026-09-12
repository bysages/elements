import type { Preview } from "@storybook/vue3-vite";
import "@bysages/tokens/css";

const preview: Preview = {
  parameters: {
    options: { storySort: { order: ["Components"], method: "alphabetical" } },
    layout: "padded",
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: { disable: true },
    viewport: { disable: true },
  },
};

export default preview;
