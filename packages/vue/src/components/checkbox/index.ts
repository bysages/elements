import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The parts — Root, Label, Control, Indicator,
 * HiddenInput. */
const CheckboxRoot = defineComponent({
  name: "SCheckboxRoot",
  props: {
    /** One rung for the control's box: the tick scales with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("checkbox");

    return () => h(ArkCheckbox.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Checkbox: Omit<typeof ArkCheckbox, "Root"> & { Root: typeof CheckboxRoot } = {
  ...ArkCheckbox,
  Root: CheckboxRoot,
};
