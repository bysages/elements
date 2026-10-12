import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";

import { defineFamily } from "../../internal/family";
import CalendarComponent from "./Calendar.svelte";

/** The date-picker's grid standing on the page. Compact is the popup's
 * quiet card; full opens it into a dashboard calendar. Year mode starts
 * on a month overview; choosing a month drills into its day grid. */
export const Calendar: typeof CalendarComponent & typeof ArkDatePicker = defineFamily(
  CalendarComponent,
  ArkDatePicker,
);

export type { CalendarProps } from "./props";
