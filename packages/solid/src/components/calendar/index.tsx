import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import type {
  DatePickerRootProps,
  DatePickerSelectionMode,
  DatePickerValueChangeDetails,
  DatePickerDateView,
  UseDatePickerContext,
} from "@ark-ui/solid/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { DatePicker } from "../date-picker";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/solid/date-picker";

function chevron(dir: "left" | "right") {
  return iconNode(dir === "left" ? "chevron-left" : "chevron-right", {
    width: "16",
    height: "16",
  });
}

export interface CalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Selected date(s) — an array, as the machine speaks in ranges. */
  value?: DatePickerRootProps["value"];
  defaultValue?: DatePickerRootProps["defaultValue"];
  min?: DatePickerRootProps["min"];
  max?: DatePickerRootProps["max"];
  /** compact keeps the popup's measure; full gives cells room for content. */
  variant?: "compact" | "full";
  /** month is the day grid; year starts on a month overview. */
  mode?: "month" | "year";
  selectionMode?: DatePickerSelectionMode;
  startOfWeek?: number;
  fixedWeeks?: boolean;
  showWeekNumbers?: boolean;
  outsideDaySelectable?: boolean;
  closeOnSelect?: boolean;
  minView?: DatePickerDateView;
  maxView?: DatePickerDateView;
  onValueChange?: (value: NonNullable<DatePickerRootProps["value"]>) => void;
}

/** The date-picker's grid standing on the page. Compact is the popup's
 * quiet card; full opens it into a dashboard calendar. Year mode starts
 * on a month overview; choosing a month drills into its day grid. */
function CalendarImpl(props: CalendarProps) {
  injectComponentStyle("calendar");
  injectComponentStyle("date-picker");

  const [own, rest] = splitProps(props, [
    "id",
    "value",
    "defaultValue",
    "min",
    "max",
    "variant",
    "mode",
    "selectionMode",
    "startOfWeek",
    "fixedWeeks",
    "showWeekNumbers",
    "outsideDaySelectable",
    "closeOnSelect",
    "minView",
    "maxView",
    "onValueChange",
  ]);
  const id = useElementId("calendar", () => own.id);

  /* zag's RangeText follows the visible day-page (startValue), which
     the month and year steps never move — it would freeze the title.
     Formatting the focused value keeps it in step with the arrows. */
  const title = (dp: UseDatePickerContext) => {
    const api = dp();
    const date = api.focusedValue;
    if (!date) return "";
    if (api.view === "month") return api.format(date, { year: "numeric" });
    if (api.view === "day") return api.format(date, { month: "long", year: "numeric" });
    const decade = Math.floor(date.year / 10) * 10;
    return `${decade} - ${decade + 9}`;
  };

  const todayTrigger = (dp: UseDatePickerContext) => (
    <button
      type="button"
      data-scope="calendar"
      data-part="today-trigger"
      onclick={() => {
        const api = dp();
        api.selectToday();
        if ((own.mode ?? "month") === "year" && api.view === "month") api.setView("day");
      }}
    >
      Today
    </button>
  );

  const header = (dp?: UseDatePickerContext) => (
    <div data-scope="calendar" data-part="header">
      <ArkDatePicker.ViewControl>
        <ArkDatePicker.PrevTrigger>{chevron("left")}</ArkDatePicker.PrevTrigger>
        <ArkDatePicker.Context>
          {(context) => <ArkDatePicker.ViewTrigger>{title(context)}</ArkDatePicker.ViewTrigger>}
        </ArkDatePicker.Context>
        {own.variant === "full" && dp ? todayTrigger(dp) : null}
        <ArkDatePicker.NextTrigger>{chevron("right")}</ArkDatePicker.NextTrigger>
      </ArkDatePicker.ViewControl>
    </div>
  );

  const dayTable = (_dp: UseDatePickerContext) => (
    <ArkDatePicker.Table>
      <ArkDatePicker.TableHead>
        <ArkDatePicker.TableRow>
          {own.showWeekNumbers ? (
            <ArkDatePicker.WeekNumberHeaderCell>Wk</ArkDatePicker.WeekNumberHeaderCell>
          ) : null}
          <ArkDatePicker.Context>
            {(context) => (
              <For each={context().weekDays}>
                {(day) => (
                  <ArkDatePicker.TableHeader aria-label={day.long}>
                    {day.narrow}
                  </ArkDatePicker.TableHeader>
                )}
              </For>
            )}
          </ArkDatePicker.Context>
        </ArkDatePicker.TableRow>
      </ArkDatePicker.TableHead>
      <ArkDatePicker.TableBody>
        <ArkDatePicker.Context>
          {(context) => (
            <For each={context().weeks}>
              {(week, weekIndex) => (
                <ArkDatePicker.TableRow>
                  {own.showWeekNumbers ? (
                    <ArkDatePicker.WeekNumberCell weekIndex={weekIndex()} week={week}>
                      {context().getWeekNumber(week)}
                    </ArkDatePicker.WeekNumberCell>
                  ) : null}
                  <For each={week}>
                    {(day) => (
                      <ArkDatePicker.TableCell value={day}>
                        <ArkDatePicker.TableCellTrigger>{day.day}</ArkDatePicker.TableCellTrigger>
                      </ArkDatePicker.TableCell>
                    )}
                  </For>
                </ArkDatePicker.TableRow>
              )}
            </For>
          )}
        </ArkDatePicker.Context>
      </ArkDatePicker.TableBody>
    </ArkDatePicker.Table>
  );

  const monthGrid = (_dp: UseDatePickerContext, columns: 3 | 4) => (
    <ArkDatePicker.Table columns={columns}>
      <ArkDatePicker.TableBody>
        <ArkDatePicker.Context>
          {(context) => (
            <For
              each={context().getMonthsGrid({ columns, format: columns === 4 ? "short" : "long" })}
            >
              {(months) => (
                <ArkDatePicker.TableRow>
                  <For each={months}>
                    {(month) => (
                      <ArkDatePicker.TableCell value={month.value} columns={columns}>
                        <ArkDatePicker.TableCellTrigger>
                          {month.label}
                        </ArkDatePicker.TableCellTrigger>
                      </ArkDatePicker.TableCell>
                    )}
                  </For>
                </ArkDatePicker.TableRow>
              )}
            </For>
          )}
        </ArkDatePicker.Context>
      </ArkDatePicker.TableBody>
    </ArkDatePicker.Table>
  );

  const yearGrid = (_dp: UseDatePickerContext) => (
    <ArkDatePicker.Table columns={3}>
      <ArkDatePicker.TableBody>
        <ArkDatePicker.Context>
          {(context) => (
            <For each={context().getYearsGrid({ columns: 3 })}>
              {(years) => (
                <ArkDatePicker.TableRow>
                  <For each={years}>
                    {(year) => (
                      <ArkDatePicker.TableCell value={year.value} columns={3}>
                        <ArkDatePicker.TableCellTrigger>
                          {year.label}
                        </ArkDatePicker.TableCellTrigger>
                      </ArkDatePicker.TableCell>
                    )}
                  </For>
                </ArkDatePicker.TableRow>
              )}
            </For>
          )}
        </ArkDatePicker.Context>
      </ArkDatePicker.TableBody>
    </ArkDatePicker.Table>
  );

  return (
    <div
      {...rest}
      id={id()}
      data-scope="calendar"
      data-part="root"
      data-variant={own.variant ?? "compact"}
      data-mode={own.mode ?? "month"}
    >
      {/* inline: the calendar stands on the page with no popup parts,
          so the machine must skip its dismissable layer — without it
          it hunts for a content node that never renders. */}
      <ArkDatePicker.Root
        id={`${id()}:date-picker`}
        open
        inline
        closeOnSelect={own.closeOnSelect ?? true}
        outsideDaySelectable={own.outsideDaySelectable ?? true}
        {...(own.value !== undefined ? { value: own.value } : {})}
        {...(own.defaultValue !== undefined ? { defaultValue: own.defaultValue } : {})}
        {...(own.min !== undefined ? { min: own.min } : {})}
        {...(own.max !== undefined ? { max: own.max } : {})}
        {...(own.selectionMode !== undefined ? { selectionMode: own.selectionMode } : {})}
        {...(own.startOfWeek !== undefined ? { startOfWeek: own.startOfWeek } : {})}
        /* Full is a page-shaped register: every month shows six weeks
           so paging never reshapes the sheet. */
        {...(own.fixedWeeks || own.variant === "full" ? { fixedWeeks: true } : {})}
        {...(own.showWeekNumbers ? { showWeekNumbers: true } : {})}
        {...(own.minView !== undefined ? { minView: own.minView } : {})}
        {...(own.maxView !== undefined ? { maxView: own.maxView } : {})}
        /* Year mode starts on the year's month overview. The machine
           stays free to drill down, so choosing a month opens its day
           calendar instead of "selecting the month". */
        {...(own.mode === "year"
          ? { defaultView: "month" as const, maxView: "month" as const }
          : {})}
        onValueChange={(details: DatePickerValueChangeDetails) =>
          own.onValueChange?.(details.value)
        }
      >
        <ArkDatePicker.View view="day">
          {header()}
          <ArkDatePicker.Context>{(dp) => dayTable(dp)}</ArkDatePicker.Context>
        </ArkDatePicker.View>
        <ArkDatePicker.View view="month">
          {header()}
          <ArkDatePicker.Context>
            {(dp) => monthGrid(dp, own.mode === "year" ? 4 : 3)}
          </ArkDatePicker.Context>
        </ArkDatePicker.View>
        {(own.mode ?? "month") === "month" ? (
          <ArkDatePicker.View view="year">
            {header()}
            <ArkDatePicker.Context>{(dp) => yearGrid(dp)}</ArkDatePicker.Context>
          </ArkDatePicker.View>
        ) : null}
      </ArkDatePicker.Root>
    </div>
  );
}

export const Calendar = defineFamily(CalendarImpl, DatePicker) as typeof CalendarImpl &
  typeof DatePicker;
