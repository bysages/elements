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
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, MiSans, "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',
    fontCode:
      'ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, "PingFang SC", "Microsoft YaHei", monospace',

    brandTitle: "By Sages Elements · React",

    // Primary actions are ink; the manager highlights are ink too.
    colorPrimary: "#36322c", // --bs-color-gray-800
    colorSecondary: "#36322c",

    // The workshop rests on warm paper with hairline seams. appHoverBg
    // paints the toolbar's hover pill (barHoverBg is gone in Storybook 10).
    appBg: "#fbfaf8", // --bs-color-surface-1
    appContentBg: "#fcfbf8", // --bs-color-surface-2
    appHoverBg: "#f6f4f1", // --bs-color-gray-50
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

    // Form fields follow the input recipe: surface + hairline, no shadow.
    inputBg: "#fcfbf8",
    inputBorder: "#d7d4ce",
    inputTextColor: "#1f1c18",
    inputBorderRadius: 4,
    // The boolean control paints the selected label's text with textColor,
    // so the selected pill must stay light — the raised paper, per the SB
    // light-theme convention (booleanBg is the recessed track).
    booleanBg: "#e9e7e2", // --bs-color-gray-100
    booleanSelectedBg: "#fcfbf8", // --bs-color-surface-2
    buttonBg: "#fcfbf8",
    buttonBorder: "#d7d4ce",
  }),
});
