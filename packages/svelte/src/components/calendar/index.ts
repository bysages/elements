import { injectComponentStyle } from "@bysages/core";

import { withSelfRoot } from "../../internal/family";
import CalendarComponent from "./Calendar.svelte";

/** The date-picker's month grid, standing on the page without its
 * popup: always open, the trigger gone, the vessel a quiet card. */
export const Calendar = withSelfRoot(CalendarComponent);

export type { CalendarProps } from "./props";
injectComponentStyle("date-picker");
