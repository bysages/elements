import { DatePicker as ArkDatePicker } from "@ark-ui/vue/date-picker";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/vue/date-picker";

/** DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The parts —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */
const DatePickerRoot = defineComponent({
  name: "SDatePickerRoot",
  props: {
    /** One rung of the control-height ladder for the field row. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("date-picker");

    return () => h(ArkDatePicker.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const DatePicker: Omit<typeof ArkDatePicker, "Root"> & { Root: typeof DatePickerRoot } = {
  ...ArkDatePicker,
  Root: DatePickerRoot,
};
