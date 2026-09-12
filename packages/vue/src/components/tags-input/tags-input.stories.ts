import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { TagsInput } from "./index.js";

const meta: Meta = { title: "Components / Tags Input" };
export default meta;

const xPath = "M4 4l8 8M12 4l-8 8";

const XIcon = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none" }, [
    h("path", {
      d: xPath,
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
    }),
  ]);

export const Basic = {
  render: () =>
    h(
      TagsInput.Root,
      { defaultValue: ["Qinghua", "Celadon"] },
      {
        default: () => [
          h(TagsInput.Label, () => "Pigments"),
          h(TagsInput.Control, null, {
            default: () => [
              h(TagsInput.Context, null, {
                default: (tagsInput: { value: string[] }) =>
                  tagsInput.value.map((value: string, index: number) =>
                    h(TagsInput.Item, { key: index, index, value }, () => [
                      h(TagsInput.ItemPreview, () => [
                        h(TagsInput.ItemText, () => value),
                        h(TagsInput.ItemDeleteTrigger, () => h(XIcon)),
                      ]),
                      h(TagsInput.ItemInput),
                    ]),
                  ),
              }),
              h(TagsInput.Input as any, { placeholder: "Add pigment" }),
              h(TagsInput.ClearTrigger, () => h(XIcon)),
            ],
          }),
          h(TagsInput.HiddenInput),
        ],
      },
    ),
};
