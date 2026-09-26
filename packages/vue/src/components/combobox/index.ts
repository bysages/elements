import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Combobox, dressed in the paper-and-ink system: the field carries
 * the control recipe and its matches dissolve open as a paper vessel, the
 * checked row taking the flat ink fill. The parts — Root, Label,
 * Control, Input, Trigger, ClearTrigger, Positioner, Content, List, Empty,
 * Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
const ComboboxRoot = defineComponent({
  name: "SComboboxRoot",
  props: {
    /** One rung of the control-height ladder for the field row. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkCombobox.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Combobox: Omit<typeof ArkCombobox, "Root"> & { Root: typeof ComboboxRoot } = {
  ...ArkCombobox,
  Root: ComboboxRoot,
};

injectComponentStyle("combobox");
