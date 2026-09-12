import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Checkbox } from "./index.js";

const meta: Meta = { title: "Components / Checkbox" };
export default meta;

function checkGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 5 5L19 7" })],
  );
}

export const Basic = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
      h(Checkbox.Root, { defaultChecked: true }, () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Ship the register"),
        h(Checkbox.HiddenInput),
      ]),
      h(Checkbox.Root, () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Outline the story"),
        h(Checkbox.HiddenInput),
      ]),
      h(Checkbox.Root, { defaultChecked: true, disabled: true }, () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Archived"),
        h(Checkbox.HiddenInput),
      ]),
    ]),
};
