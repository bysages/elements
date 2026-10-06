import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import type { DatePickerRootProps as ArkDatePickerRootProps } from "@ark-ui/solid/date-picker";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The API is Ark's own —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */

type DatePickerOwnProps = {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function DatePickerRoot(props: ArkDatePickerRootProps & DatePickerOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("date-picker", () => rest.id);
  return <ArkDatePicker.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DatePicker: typeof DatePickerRoot &
  Omit<typeof ArkDatePicker, "Root"> & { Root: typeof DatePickerRoot } = defineFamily(
  DatePickerRoot,
  {
    ...ArkDatePicker,
    Root: DatePickerRoot,
  },
);

injectComponentStyle("date-picker");
