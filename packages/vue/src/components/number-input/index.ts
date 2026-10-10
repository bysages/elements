import { NumberInput as ArkNumberInput } from "@ark-ui/vue/number-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The parts — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */
const NumberInputRoot = defineComponent({
  name: "SNumberInputRoot",
  props: {
    /** One rung of the control-height ladder for the field and its stepper. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("number-input", attrs);
    injectComponentStyle("number-input");

    return () => h(ArkNumberInput.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The one-tag path for a stepped number field; formatting, scrubbing,
 * and locale rules stay on the anatomy. */
const NumberInputFacade = defineComponent({
  name: "SNumberInput",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    step: { type: Number, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        NumberInputRoot,
        {
          ...attrs,
          size: props.size,
          min: props.min,
          max: props.max,
          step: props.step,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined
            ? {}
            : {
                modelValue: props.modelValue,
                "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
              }),
        },
        () => [
          ...(props.label ? [h(ArkNumberInput.Label, () => props.label)] : []),
          h(ArkNumberInput.Control, () => [
            h(ArkNumberInput.Input, {
              placeholder: props.placeholder,
            } as never),
            h(ArkNumberInput.Scrubber, () => iconNode("pause")),
            h(ArkNumberInput.IncrementTrigger, { "aria-label": "Increment" }, () =>
              iconNode("chevron-up"),
            ),
            h(ArkNumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () =>
              iconNode("chevron-down"),
            ),
          ]),
        ],
      );
  },
});

export const NumberInput = defineFamily(NumberInputFacade, {
  ...ArkNumberInput,
  Root: NumberInputRoot,
}) as unknown as typeof NumberInputFacade &
  (Omit<typeof ArkNumberInput, "Root"> & { Root: typeof NumberInputRoot });
