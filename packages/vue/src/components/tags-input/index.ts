import { TagsInput as ArkTagsInput } from "@ark-ui/vue/tags-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The parts — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
const TagsInputRoot = defineComponent({
  name: "STagsInputRoot",
  props: {
    /** One rung of the control-height ladder for the vessel at rest. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("tags-input", attrs);
    injectComponentStyle("tags-input");

    return () => h(ArkTagsInput.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

function closeIcon() {
  return iconNode("x");
}

/** The one-tag path: one labelled vessel whose values become editable
 * chips. Delimiters, limits, and custom validation stay on the anatomy. */
const TagsInputFacade = defineComponent({
  name: "STagsInput",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    /** Show the clear-all control when values exist. */
    clearable: { type: Boolean, default: true },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        TagsInputRoot,
        {
          ...attrs,
          size: props.size,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined
            ? {}
            : {
                modelValue: props.modelValue,
                "onUpdate:modelValue": (value: string[]) => emit("update:modelValue", value),
              }),
        },
        () => [
          ...(props.label ? [h(ArkTagsInput.Label, () => props.label)] : []),
          h(ArkTagsInput.Control, () => [
            h(ArkTagsInput.Context as never, null, {
              default: ({ value }: { value: string[] }) =>
                value.map((tag, index) =>
                  h(ArkTagsInput.Item, { key: `${tag}-${index}`, index, value: tag }, () => [
                    h(ArkTagsInput.ItemPreview, () => [
                      h(ArkTagsInput.ItemText, () => tag),
                      h(ArkTagsInput.ItemDeleteTrigger, () => closeIcon()),
                    ]),
                    h(ArkTagsInput.ItemInput),
                  ]),
                ),
            }),
            h(ArkTagsInput.Input, { placeholder: props.placeholder } as never),
            ...(props.clearable ? [h(ArkTagsInput.ClearTrigger, () => closeIcon())] : []),
          ]),
          h(ArkTagsInput.HiddenInput),
        ],
      );
  },
});

export const TagsInput = defineFamily(TagsInputFacade, {
  ...ArkTagsInput,
  Root: TagsInputRoot,
}) as unknown as typeof TagsInputFacade &
  (Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot });
