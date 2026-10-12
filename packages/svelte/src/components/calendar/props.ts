import type { DatePickerRootProps } from "@ark-ui/svelte/date-picker";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Selected date(s) — an array, as the machine speaks in ranges. */
  value?: DatePickerRootProps["value"];
  defaultValue?: DatePickerRootProps["defaultValue"];
  min?: DatePickerRootProps["min"];
  max?: DatePickerRootProps["max"];
  /** compact keeps the popup's measure; full gives cells room for content. */
  variant?: "compact" | "full";
  /** month is the day grid; year starts on a month overview. */
  mode?: "month" | "year";
  selectionMode?: DatePickerRootProps["selectionMode"];
  startOfWeek?: number;
  fixedWeeks?: boolean;
  showWeekNumbers?: boolean;
  outsideDaySelectable?: boolean;
  closeOnSelect?: boolean;
  minView?: DatePickerRootProps["minView"];
  maxView?: DatePickerRootProps["maxView"];
  onValueChange?: (value: NonNullable<DatePickerRootProps["value"]>) => void;
  children?: Snippet;
}
