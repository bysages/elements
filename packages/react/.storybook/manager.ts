import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// The manager chrome dressed in the same paper-and-ink register as the
// components it previews. The theming engine consumes no CSS variables, so
// every hex below is a sampled token: paper surfaces and the gray ink ramp
// from the light theme, cinnabar/bamboo/ochre from the fixed pigments.
addons.setConfig({
  theme: create({
    base: "light",
    // UI chrome rides the hei stack, code rides the mono stack — same
    // split as --bs-font-sans / --bs-font-mono.
    fontBase:
      'MiSans, "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans CJK SC", sans-serif',
    fontCode:
      'ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, "PingFang SC", "Microsoft YaHei", monospace',

    brandTitle: "By Sages Elements",

    // Primary actions are ink; the manager highlights are ink too.
    colorPrimary: "#36322c", // --bs-color-gray-800
    colorSecondary: "#36322c",

    // The workshop rests on warm paper with hairline seams.
    appBg: "#fbfaf8", // --bs-color-surface-1
    appContentBg: "#fcfbf8", // --bs-color-surface-2
    appBorderColor: "#d7d4ce", // --bs-color-gray-200
    appBorderRadius: 6, // --bs-radius-sm — controls are square-cut like a seal

    textColor: "#1f1c18", // --bs-color-gray-900
    textMutedColor: "#635d56", // --bs-color-gray-600
    textInverseColor: "#fcfbf8",

    // Toolbar: quiet labels, ink for what is active.
    barBg: "#fbfaf8",
    barTextColor: "#635d56",
    barSelectedColor: "#1f1c18",
    barHoverColor: "#1f1c18",
    barHoverBg: "#f6f4f1", // --bs-color-gray-50

    // Form fields follow the input recipe: surface + hairline, no shadow.
    inputBg: "#fcfbf8",
    inputBorder: "#d7d4ce",
    inputTextColor: "#1f1c18",
    inputBorderRadius: 4,
    booleanBg: "#e9e7e2", // --bs-color-gray-100
    booleanSelectedBg: "#36322c",
    buttonBg: "#fcfbf8",
    buttonBorder: "#d7d4ce",

    // Fixed semantic pigments — bamboo, cinnabar, ochre.
    colorPositive: "#307a4f", // --bs-color-success
    colorNegative: "#ab3937", // --bs-color-danger
    colorWarning: "#a16004", // --bs-color-warning
  }),
});
