import { PinInput as ArkPinInput } from "@ark-ui/vue/pin-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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
    return () => h(ArkPinInput.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const PinInput: Omit<typeof ArkPinInput, "Root"> & { Root: typeof PinInputRoot } = {
  ...ArkPinInput,
  Root: PinInputRoot,
};

injectComponentStyle("pin-input");
