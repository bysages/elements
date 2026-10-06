/** Ark's DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The API is
 * Ark's own — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */
import { DateInput as ArkDateInput } from "@ark-ui/svelte/date-input";

import { defineFamily } from "../../internal/family";
import DateInputFacade from "./DateInput.svelte";
import DateInputRoot from "./DateInputRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DateInput: typeof DateInputFacade &
  Omit<typeof ArkDateInput, "Root"> & {
    Root: typeof DateInputRoot;
  } = defineFamily(DateInputFacade, {
  ...ArkDateInput,
  Root: DateInputRoot,
});
