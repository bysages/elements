import { DateInput as ArkDateInput } from "@ark-ui/vue/date-input";
import { injectComponentStyle } from "@bysages/core";

export type {
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/vue/date-input";

/** DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The parts — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */
export const DateInput = ArkDateInput;

injectComponentStyle("date-input");
