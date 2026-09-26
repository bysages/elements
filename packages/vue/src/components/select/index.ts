import { Select as ArkSelect } from "@ark-ui/vue/select";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Select, dressed in the paper-and-ink system: the trigger is the
 * whole control and its list dissolves open as a paper vessel, the checked
 * row taking the flat ink fill. The parts — Root, Label, Control,
 * Trigger, ValueText, Indicator, ClearTrigger, HiddenSelect, Positioner,
 * Content, List, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel. */
const SelectRoot = defineComponent({
  name: "SSelectRoot",
  props: {
    /** One rung of the control-height ladder for the trigger. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    // `as never` sidesteps the h() overload the collection prop's generic
    // cannot unroll — see the autocomplete preset for the same turn.
    return () => h(ArkSelect.Root as never, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Select: Omit<typeof ArkSelect, "Root"> & { Root: typeof SelectRoot } = {
  ...ArkSelect,
  Root: SelectRoot,
};

injectComponentStyle("select");
