import { h } from "vue";
import { z } from "zod";

import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { TagsInput } from "./index";

/** A field that turns entries into removable tags. */
export default defineEntry({
  TagsInput: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      value: z.array(z.string()).optional(),
    }),
    description: "A field that turns entries into removable tags.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string[]>(props.value, bindings?.value);
      const cross = () => iconNode("x");
      return labelled(
        props.label,
        h(
          TagsInput.Root as never,
          {
            modelValue: value ?? ["Qinghua"],
            "onUpdate:modelValue": (next: string[]) => setValue(next),
          },
          () => [
            h(TagsInput.Control, null, {
              default: () => [
                h(TagsInput.Context, null, {
                  default: (api: { value: string[] }) =>
                    api.value.map((entry: string, index: number) =>
                      h(TagsInput.Item, { key: index, index, value: entry }, () => [
                        h(TagsInput.ItemPreview, () => [
                          h(TagsInput.ItemText, () => entry),
                          h(TagsInput.ItemDeleteTrigger, () => cross()),
                        ]),
                        h(TagsInput.ItemInput as never),
                      ]),
                    ),
                }),
                h(TagsInput.Input as never, { placeholder: props.placeholder }),
                h(TagsInput.ClearTrigger, () => cross()),
              ],
            }),
            h(TagsInput.HiddenInput as never),
          ],
        ),
      );
    },
  },
});
