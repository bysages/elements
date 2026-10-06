import { h } from "vue";
import { z } from "zod";

import { labelled, stringsFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Combobox } from "./index";

/** A filterable field over a list; items are the choices. */
export default defineEntry({
  Combobox: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      items: z.array(z.string()).optional(),
      value: z.string().optional(),
    }),
    description: "A filterable field over a list; items are the choices.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      const collection = stringsFor(props.items);
      const options = (props.items ?? []).map((item: string) => ({ label: item, value: item }));
      return labelled(
        props.label,
        h(
          Combobox.Root as never,
          {
            collection,
            modelValue: value,
            "onUpdate:modelValue": (next: string) => setValue(next),
          },
          () => [
            h(Combobox.Control, () => [
              h(Combobox.Input as never, { placeholder: props.placeholder }),
              h(Combobox.Trigger, () => [iconNode("chevrons-up-down", { width: 14, height: 14 })]),
              h(Combobox.ClearTrigger, () => [iconNode("x", { width: 14, height: 14 })]),
            ]),
            h(Combobox.Positioner, () =>
              h(Combobox.Content, () =>
                h(Combobox.ItemGroup, () =>
                  options.map((option: { label: string; value: string }) =>
                    h(
                      Combobox.Item as never,
                      { key: option.value, item: option, value: option.value },
                      () => [
                        h(Combobox.ItemText, () => [option.label]),
                        h(Combobox.ItemIndicator, () => [
                          iconNode("check", { width: 14, height: 14 }),
                        ]),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    },
  },
});
