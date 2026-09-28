import { ToggleGroup as ArkToggleGroup } from "@ark-ui/vue/toggle-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The parts — Root, Item. */
const ToggleGroupRoot = defineComponent({
  name: "SToggleGroupRoot",
  props: {
    /** One rung of the control-height ladder for the items. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("toggle-group");

    return () => h(ArkToggleGroup.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const ToggleGroup: Omit<typeof ArkToggleGroup, "Root"> & { Root: typeof ToggleGroupRoot } = {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
};
