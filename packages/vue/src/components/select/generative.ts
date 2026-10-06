import { h } from "vue";

import { faces } from "../../generative/faces";
import { labelled, collectionFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
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
              h(Select.Indicator, () => [iconNode("chevrons-up-down", { width: 14, height: 14 })]),
            ]),
            h(Select.Positioner, () =>
              h(Select.Content, () =>
                h(Select.ItemGroup, () =>
                  props.options.map((option: { label: string; value: string }) =>
                    h(Select.Item as never, { key: option.value, item: option }, () => [
                      h(Select.ItemText, () => [option.label]),
                      h(Select.ItemIndicator, () => [iconNode("check", { width: 14, height: 14 })]),
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
