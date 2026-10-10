import { PinInput as ArkPinInput } from "@ark-ui/vue/pin-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The parts —
 * Root, Label, Control, Input, HiddenInput. */
const PinInputRoot = defineComponent({
  name: "SPinInputRoot",
  props: {
    /** One rung of the control-height ladder each seal stands on. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("pin-input", attrs);
    injectComponentStyle("pin-input");

    return () => h(ArkPinInput.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The one-tag path for an even run of seals; OTP, masks, and custom
 * validation stay on the anatomy. */
const PinInputFacade = defineComponent({
  name: "SPinInput",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: "·" },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    length: { type: Number, default: 4 },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        PinInputRoot,
        {
          ...attrs,
          size: props.size,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          placeholder: props.placeholder,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined
            ? {}
            : {
                modelValue: props.modelValue,
                "onUpdate:modelValue": (value: string[]) => emit("update:modelValue", value),
              }),
        },
        () => [
          ...(props.label ? [h(ArkPinInput.Label, () => props.label)] : []),
          h(ArkPinInput.Control, () =>
            Array.from({ length: props.length }, (_, index) =>
              h(ArkPinInput.Input as never, { key: index, index }),
            ),
          ),
          h(ArkPinInput.HiddenInput),
        ],
      );
  },
});

export const PinInput = defineFamily(PinInputFacade, {
  ...ArkPinInput,
  Root: PinInputRoot,
}) as unknown as typeof PinInputFacade &
  (Omit<typeof ArkPinInput, "Root"> & { Root: typeof PinInputRoot });
