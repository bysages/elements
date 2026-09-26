/** Ark's DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The API is Ark's own —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */
import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import { injectComponentStyle } from "@bysages/core";

import DatePickerRoot from "./DatePickerRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DatePicker: Omit<typeof ArkDatePicker, "Root"> & { Root: typeof DatePickerRoot } = {
  ...ArkDatePicker,
  Root: DatePickerRoot,
};

injectComponentStyle("date-picker");
