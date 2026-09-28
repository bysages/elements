import { NumberInput as ArkNumberInput } from "@ark-ui/vue/number-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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
    injectComponentStyle("number-input");

    return () => h(ArkNumberInput.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const NumberInput: Omit<typeof ArkNumberInput, "Root"> & {
  Root: typeof NumberInputRoot;
} = {
  ...ArkNumberInput,
  Root: NumberInputRoot,
};
