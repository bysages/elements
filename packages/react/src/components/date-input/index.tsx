import { DateInput as ArkDateInput } from "@ark-ui/react/date-input";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

export type {
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/react/date-input";

type DateInputRootProps = ComponentProps<typeof ArkDateInput.Root> & {
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
};

function DateInputRoot({ size = "md", ...rest }: DateInputRootProps) {
  return <ArkDateInput.Root {...rest} data-size={size} />;
}

/** Ark's DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The API is
 * Ark's own — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DateInput: Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot } = {
  ...ArkDateInput,
  Root: DateInputRoot,
};

injectComponentStyle("date-input");
