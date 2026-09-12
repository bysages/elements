import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { RadioGroup } from "./index.js";

const meta: Meta = { title: "Components / Radio Group" };
export default meta;

const papers = ["Xuan", "Doushu", "Mian"];

export const Basic = {
  render: () =>
    h("div", { style: { display: "grid", gap: "1.5rem", "max-width": "20rem" } }, [
      h(RadioGroup.Root, { defaultValue: "Doushou" }, () => [
        h(RadioGroup.Label, () => "Paper"),
        ...papers.map((paper) =>
          h(RadioGroup.Item, { key: paper, value: paper }, () => [
            h(RadioGroup.ItemControl),
            h(RadioGroup.ItemText, () => paper),
            h(RadioGroup.ItemHiddenInput),
          ]),
        ),
      ]),
      h(RadioGroup.Root, { defaultValue: "Cinnabar", disabled: true }, () => [
        h(RadioGroup.Label, () => "Sealed away"),
        h(RadioGroup.Item, { value: "Cinnabar" }, () => [
          h(RadioGroup.ItemControl),
          h(RadioGroup.ItemText, () => "Cinnabar"),
          h(RadioGroup.ItemHiddenInput),
        ]),
        h(RadioGroup.Item, { value: "Ultramarine" }, () => [
          h(RadioGroup.ItemControl),
          h(RadioGroup.ItemText, () => "Ultramarine"),
          h(RadioGroup.ItemHiddenInput),
        ]),
      ]),
    ]),
};
