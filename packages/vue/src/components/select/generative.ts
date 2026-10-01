import { h } from "vue";
import { z } from "zod";

import { labelled, collectionFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Icon } from "../icon";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
      value: z.string().optional(),
    }),
    description: "A choice field that opens a ruled list; options carry label and value.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      const collection = collectionFor(props.options);
      return labelled(
        props.label,
        h(
          Select.Root as never,
          {
            collection,
            modelValue: value,
            "onUpdate:modelValue": (next: string) => setValue(next),
          },
          () => [
            h(Select.Control, () => [
              h(Select.Trigger, () => [h(Select.ValueText, { placeholder: props.placeholder })]),
              h(Select.Indicator, () => [h(Icon, { name: "chevrons-up-down" })]),
            ]),
            h(Select.Positioner, () =>
              h(Select.Content, () =>
                h(Select.ItemGroup, () =>
                  props.options.map((option: { label: string; value: string }) =>
                    h(Select.Item as never, { key: option.value, item: option }, () => [
                      h(Select.ItemText, () => [option.label]),
                      h(Select.ItemIndicator, () => [h(Icon, { name: "check" })]),
                    ]),
                  ),
                ),
              ),
            ),
            h(Select.HiddenSelect as never),
          ],
        ),
      );
    },
  },
});
