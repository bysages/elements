import { DateInput as ArkDateInput } from "@ark-ui/solid/date-input";
import type { DateInputRootProps as ArkDateInputRootProps } from "@ark-ui/solid/date-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The API is
 * Ark's own — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */

type DateInputOwnProps = {
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
};

function DateInputRoot(props: ArkDateInputRootProps & DateInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("date-input", () => rest.id);
  return <ArkDateInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DateInput: typeof DateInputRoot &
  Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot } = defineFamily(DateInputRoot, {
  ...ArkDateInput,
  Root: DateInputRoot,
});

injectComponentStyle("date-input");
