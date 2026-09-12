import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Switch } from "./index.js";

const meta: Meta = { title: "Components / Switch" };
export default meta;

export const Basic = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
      h(Switch.Root, { defaultChecked: true }, () => [
        h(Switch.Control, () => h(Switch.Thumb)),
        h(Switch.Label, () => "Dissolve overlays"),
        h(Switch.HiddenInput),
      ]),
      h(Switch.Root, () => [
        h(Switch.Control, () => h(Switch.Thumb)),
        h(Switch.Label, () => "Show hairlines"),
        h(Switch.HiddenInput),
      ]),
      h(Switch.Root, { defaultChecked: true, disabled: true }, () => [
        h(Switch.Control, () => h(Switch.Thumb)),
        h(Switch.Label, () => "Reduced motion"),
        h(Switch.HiddenInput),
      ]),
    ]),
};
