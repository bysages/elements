import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/vue/segment-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts — Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
const SegmentGroupRoot = defineComponent({
  name: "SSegmentGroupRoot",
  props: {
    /** One rung of the control-height ladder for the segments. The
     * family keeps its compact register, so the rungs sit one notch
     * below the global ladder — the default md rests at the small
     * height. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkSegmentGroup.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const SegmentGroup: Omit<typeof ArkSegmentGroup, "Root"> & {
  Root: typeof SegmentGroupRoot;
} = {
  ...ArkSegmentGroup,
  Root: SegmentGroupRoot,
};

injectComponentStyle("segment-group");
