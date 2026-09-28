import { RadioGroup as ArkRadioGroup } from "@ark-ui/vue/radio-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The parts — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
const RadioGroupRoot = defineComponent({
  name: "SRadioGroupRoot",
  props: {
    /** One rung for the dial; the chosen dot rides it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("radio-group");

    return () => h(ArkRadioGroup.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const RadioGroup: Omit<typeof ArkRadioGroup, "Root"> & { Root: typeof RadioGroupRoot } = {
  ...ArkRadioGroup,
  Root: RadioGroupRoot,
};
