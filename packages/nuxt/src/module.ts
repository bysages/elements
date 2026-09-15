import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { componentStyles, tokensCss, type ApplyThemeOptions } from "@bysages/core";
import { addComponent, addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";

/** Every family @bysages/vue exports, with the name it is exported by. */
const FAMILIES = [
  "Accordion",
  "Ai",
  "Alert",
  "AngleSlider",
  "AvatarGroup",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Card",
  "Carousel",
  "Checkbox",
  "Chip",
  "Clipboard",
  "Collapsible",
  "ColorPicker",
  "Combobox",
  "DateInput",
  "DatePicker",
  "Dialog",
  "Drawer",
  "Editable",
  "Empty",
  "Field",
  "Fieldset",
  "FileUpload",
  "FloatingPanel",
  "Format",
  "Frame",
  "Highlight",
  "HoverCard",
  "ImageCropper",
  "JsonTreeView",
  "Kbd",
  "Listbox",
  "Marquee",
  "Menu",
  "NavigationMenu",
  "NumberInput",
  "Pagination",
  "PasswordInput",
  "PinInput",
  "Popover",
  "Progress",
  "QrCode",
  "RadioGroup",
  "RatingGroup",
  "ScrollArea",
  "SegmentGroup",
  "Select",
  "Separator",
  "SignaturePad",
  "Skeleton",
  "Slider",
  "Splitter",
  "Steps",
  "Swap",
  "Switch",
  "Tabs",
  "TagsInput",
  "DataTable",
  "Timeline",
  "Timer",
  "Toast",
  "Toc",
  "ToggleGroup",
  "Toggle",
  "Tooltip",
  "Tour",
  "TreeView",
];

export interface BsElementsOptions {
  /** Prefix for the auto-imported components — "Bs" renders `<BsButton>`.
   * Empty by default. */
  prefix?: string;
  /** Theme applied on the client before the app mounts: mode, accent,
   * scene, density, contrast — anything `applyTheme` accepts. */
  theme?: ApplyThemeOptions;
}

export default defineNuxtModule<BsElementsOptions>({
  meta: {
    name: "@bysages/nuxt",
    configKey: "bsElements",
  },
  defaults: {
    prefix: "",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    for (const name of FAMILIES) {
      addComponent({
        name: options.prefix + name,
        export: name,
        filePath: "@bysages/vue",
      });
    }

    // The wrappers and the theme plugin are authored in TypeScript and
    // rely on the app's aliases and auto-imports — they must ride the
    // Nuxt build.
    nuxt.options.build.transpile.push("@bysages/nuxt", "@bysages/vue", "@bysages/core");

    nuxt.options.runtimeConfig.public.bsElements = {
      theme: options.theme ?? null,
    };

    // Ship the whole core style layer as one build-time stylesheet: SSR
    // pages carry styled HTML, so the first paint never waits on the
    // wrappers' runtime injection. The head marker tells that injection
    // to stand down — it parses before any module script, so the
    // wrappers cannot race it however their chunks load.
    const stylesDir = join(nuxt.options.buildDir, "bs-styles");
    mkdirSync(stylesDir, { recursive: true });
    const stylesFile = join(stylesDir, "core.css");
    writeFileSync(stylesFile, tokensCss + Object.values(componentStyles).join("\n"));
    nuxt.options.css.push(stylesFile);
    nuxt.options.app.head.meta ||= [];
    nuxt.options.app.head.meta.push({ name: "bs-styles-shipped", content: "build" });

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
