import { SCENE_DEFAULT_ACCENT } from "@bysages/core";
import type { Preview } from "@storybook/react-vite";
import "@bysages/tokens/css";

type Globals = {
  scene?: keyof typeof SCENE_DEFAULT_ACCENT | "auto";
  accent?: "auto" | "ink" | "qinghua" | "celadon" | "zhusha";
  theme?: "light" | "dark";
  density?: "auto" | "compact" | "default" | "comfortable" | "spacious";
};

/** The preview mirrors the theme engine's attribute resolution without
 * persisting: scenes pair with their default accent, explicit accent and
 * density choices override the scene, "ink" is the accent's absence. */
function applyGlobals(globals: Globals): void {
  const root = document.documentElement;

  root.dataset.theme = globals.theme ?? "light";

  if (globals.scene && globals.scene !== "auto") {
    root.dataset.scene = globals.scene;
  } else {
    delete root.dataset.scene;
  }

  let accent = globals.accent ?? "auto";
  if (accent === "auto") {
    accent =
      globals.scene && globals.scene !== "auto" ? SCENE_DEFAULT_ACCENT[globals.scene] : "ink";
  }
  if (accent === "ink") {
    delete root.dataset.accent;
  } else {
    root.dataset.accent = accent;
  }

  if (globals.density && globals.density !== "auto") {
    root.dataset.density = globals.density;
  } else {
    delete root.dataset.density;
  }
}

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Components"],
        method: "alphabetical",
      },
    },
    layout: "padded",
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: { disable: true },
    viewport: { disable: true },
  },

  globalTypes: {
    scene: {
      name: "Scene",
      description: "Context preset — shape, density, pace, light, and its paired pigment",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "auto", title: "Paper — the neutral register" },
          { value: "civic", title: "Civic 典章 — government portal" },
          { value: "enterprise", title: "Enterprise 信笺 — console" },
          { value: "studio", title: "Studio 雅集 — design & editorial" },
          { value: "tech", title: "Tech 司南 — precision product" },
        ],
      },
    },
    accent: {
      name: "Accent",
      description: "Mineral pigment under the primary block — auto follows the scene",
      toolbar: {
        icon: "contrast",
        dynamicTitle: true,
        items: [
          { value: "auto", title: "Auto — the scene's pigment" },
          { value: "ink", title: "Ink — solemn default" },
          { value: "qinghua", title: "Qinghua — cobalt" },
          { value: "celadon", title: "Celadon — aquatic green" },
          { value: "zhusha", title: "Zhusha — seal-paste red" },
        ],
      },
    },
    theme: {
      name: "Mode",
      description: "Light is xuan paper, dark is lacquer night",
      toolbar: {
        icon: "circlehollow",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
    density: {
      name: "Density",
      description: "Whitespace scale — auto follows the scene",
      toolbar: {
        icon: "grid",
        dynamicTitle: true,
        items: [
          { value: "auto", title: "Auto" },
          { value: "compact", title: "Compact" },
          { value: "default", title: "Default" },
          { value: "comfortable", title: "Comfortable" },
          { value: "spacious", title: "Spacious" },
        ],
      },
    },
  },

  initialGlobals: {
    scene: "auto",
    accent: "auto",
    theme: "light",
    density: "auto",
  } as Globals,

  decorators: [
    (Story, context) => {
      applyGlobals(context.globals as Globals);
      return Story();
    },
  ],
};

export default preview;
