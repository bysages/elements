import { PasswordInput as ArkPasswordInput } from "@ark-ui/vue/password-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** PasswordInput, dressed in the paper-and-ink system: the reveal
 * eye sits quiet at the field's edge and swaps in place — no shift, no
 * noise. The parts — Root, Label, Control, Input, Indicator,
 * VisibilityTrigger. */
const PasswordInputRoot = defineComponent({
  name: "SPasswordInputRoot",
  props: {
    /** One rung of the control-height ladder for the field and its eye. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkPasswordInput.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const PasswordInput: Omit<typeof ArkPasswordInput, "Root"> & {
  Root: typeof PasswordInputRoot;
} = {
  ...ArkPasswordInput,
  Root: PasswordInputRoot,
};

injectComponentStyle("password-input");
