import { Field as ArkField } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The parts —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
const FieldRoot = defineComponent({
  name: "SFieldRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("field", attrs);

    return () => h(ArkField.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The one-tag path for a simple text field; textarea, select, and
 * custom controls keep the anatomy. */
const FieldFacade = defineComponent({
  name: "SField",
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    label: { type: String, default: undefined },
    description: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: {
    "update:modelValue": (_value: string | number) => true,
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        FieldRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
        },
        () => [
          ...(props.label ? [h(ArkField.Label, () => props.label)] : []),
          h(ArkField.Input, {
            placeholder: props.placeholder,
            defaultValue: props.defaultValue,
            ...(props.modelValue === undefined
              ? {}
              : {
                  modelValue: props.modelValue,
                  "onUpdate:modelValue": (value: string | number) =>
                    emit("update:modelValue", value),
                }),
          } as never),
          ...(props.description ? [h(ArkField.HelperText, () => props.description)] : []),
        ],
      );
  },
});

export const Field = defineFamily(FieldFacade, {
  ...ArkField,
  Root: FieldRoot,
}) as unknown as typeof FieldFacade & (Omit<typeof ArkField, "Root"> & { Root: typeof FieldRoot });

injectComponentStyle("field");
