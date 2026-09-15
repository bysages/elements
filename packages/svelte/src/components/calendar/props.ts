import type { DatePickerRootProps } from "@ark-ui/svelte/date-picker";
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Selected date(s) — an array, as the machine speaks in ranges. */
  value?: DatePickerRootProps["value"];
  min?: DatePickerRootProps["min"];
  max?: DatePickerRootProps["max"];
  onValueChange?: (value: NonNullable<DatePickerRootProps["value"]>) => void;
  children?: Snippet;
}
