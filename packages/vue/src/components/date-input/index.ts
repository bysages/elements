import { DateInput as ArkDateInput } from "@ark-ui/vue/date-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

export type {
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/vue/date-input";

/** DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The parts — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */
const DateInputRoot = defineComponent({
  name: "SDateInputRoot",
  props: {
    /** One rung of the control-height ladder for the segmented field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("date-input");

    return () => h(ArkDateInput.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const DateInput: Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot } = {
  ...ArkDateInput,
  Root: DateInputRoot,
};
