import type { DatePickerRootProps, UseDatePickerContext } from "@ark-ui/react/date-picker";
import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { DatePicker } from "../date-picker";

function chevron(dir: "left" | "right") {
  return iconNode(dir === "left" ? "chevron-left" : "chevron-right", { width: 16, height: 16 });
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
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
}

/** The date-picker's grid standing on the page. Compact is the popup's
 * quiet card; full opens it into a dashboard calendar. Year mode starts
 * on a month overview; choosing a month drills into its day grid. */
function CalendarImpl({
  value,
  defaultValue,
  min,
  max,
  variant = "compact",
  mode = "month",
  selectionMode,
  startOfWeek,
  fixedWeeks = false,
  showWeekNumbers = false,
  outsideDaySelectable = true,
  closeOnSelect = true,
  minView,
  maxView,
  onValueChange,
  children,
  ...rest
}: CalendarProps) {
  injectComponentStyle("calendar");
  injectComponentStyle("date-picker");
  const hostId = useElementId("calendar", rest);
  /* zag's RangeText follows the visible day-page (startValue), which
     the month and year steps never move — it would freeze the title.
     Formatting the focused value keeps it in step with the arrows. */
  const title = (dp: UseDatePickerContext) => {
    const date = dp.focusedValue;
    if (!date) return "";
    if (dp.view === "month") return dp.format(date, { year: "numeric" });
    if (dp.view === "day") return dp.format(date, { month: "long", year: "numeric" });
    const decade = Math.floor(date.year / 10) * 10;
    return `${decade} - ${decade + 9}`;
  };

  const header = (dp?: UseDatePickerContext) => (
    <div data-scope="calendar" data-part="header">
      <ArkDatePicker.ViewControl>
        <ArkDatePicker.PrevTrigger>{chevron("left")}</ArkDatePicker.PrevTrigger>
        <ArkDatePicker.Context>
          {(context) => <ArkDatePicker.ViewTrigger>{title(context)}</ArkDatePicker.ViewTrigger>}
        </ArkDatePicker.Context>
        {variant === "full" && dp ? todayTrigger(dp) : null}
        <ArkDatePicker.NextTrigger>{chevron("right")}</ArkDatePicker.NextTrigger>
      </ArkDatePicker.ViewControl>
    </div>
  );

  const todayTrigger = (dp: UseDatePickerContext) => (
    <button
      type="button"
      data-scope="calendar"
      data-part="today-trigger"
      onClick={() => {
        dp.selectToday();
        if (mode === "year" && dp.view === "month") dp.setView("day");
      }}
    >
      Today
    </button>
  );

  const dayTable = (dp: UseDatePickerContext) => {
    const weeks = dp.weeks;
    return (
      <ArkDatePicker.Table>
        <ArkDatePicker.TableHead>
          <ArkDatePicker.TableRow>
            {showWeekNumbers ? (
              <ArkDatePicker.WeekNumberHeaderCell>Wk</ArkDatePicker.WeekNumberHeaderCell>
            ) : null}
            {dp.weekDays.map((day, id) => (
              <ArkDatePicker.TableHeader key={id} aria-label={day.long}>
                {day.narrow}
              </ArkDatePicker.TableHeader>
            ))}
          </ArkDatePicker.TableRow>
        </ArkDatePicker.TableHead>
        <ArkDatePicker.TableBody>
          {weeks.map((week, id) => (
            <ArkDatePicker.TableRow key={id}>
              {showWeekNumbers ? (
                <ArkDatePicker.WeekNumberCell key="week" weekIndex={id} week={week}>
                  {dp.getWeekNumber(week)}
                </ArkDatePicker.WeekNumberCell>
              ) : null}
              {week.map((day, cellId) => (
                <ArkDatePicker.TableCell key={cellId} value={day}>
                  <ArkDatePicker.TableCellTrigger>{day.day}</ArkDatePicker.TableCellTrigger>
                </ArkDatePicker.TableCell>
              ))}
            </ArkDatePicker.TableRow>
          ))}
        </ArkDatePicker.TableBody>
      </ArkDatePicker.Table>
    );
  };

  const monthGrid = (dp: UseDatePickerContext, columns: 3 | 4) => (
    <ArkDatePicker.Table columns={columns}>
      <ArkDatePicker.TableBody>
        {dp
          .getMonthsGrid({ columns, format: columns === 4 ? "short" : "long" })
          .map((months, id) => (
            <ArkDatePicker.TableRow key={id}>
              {months.map((month, monthId) => (
                <ArkDatePicker.TableCell key={monthId} value={month.value} columns={columns}>
                  <ArkDatePicker.TableCellTrigger>{month.label}</ArkDatePicker.TableCellTrigger>
                </ArkDatePicker.TableCell>
              ))}
            </ArkDatePicker.TableRow>
          ))}
      </ArkDatePicker.TableBody>
    </ArkDatePicker.Table>
  );

  const yearGrid = (dp: UseDatePickerContext) => (
    <ArkDatePicker.Table columns={3}>
      <ArkDatePicker.TableBody>
        {dp.getYearsGrid({ columns: 3 }).map((years, id) => (
          <ArkDatePicker.TableRow key={id}>
            {years.map((year, yearId) => (
              <ArkDatePicker.TableCell key={yearId} value={year.value} columns={3}>
                <ArkDatePicker.TableCellTrigger>{year.label}</ArkDatePicker.TableCellTrigger>
              </ArkDatePicker.TableCell>
            ))}
          </ArkDatePicker.TableRow>
        ))}
      </ArkDatePicker.TableBody>
    </ArkDatePicker.Table>
  );

  return (
    <div {...rest} data-scope="calendar" data-part="root" data-variant={variant} data-mode={mode}>
      <ArkDatePicker.Root
        id={`${hostId}:date-picker`}
        open
        inline
        closeOnSelect={closeOnSelect}
        outsideDaySelectable={outsideDaySelectable}
        {...(value !== undefined ? { value } : {})}
        {...(defaultValue !== undefined ? { defaultValue } : {})}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        {...(selectionMode !== undefined ? { selectionMode } : {})}
        {...(startOfWeek !== undefined ? { startOfWeek } : {})}
        /* Full is a page-shaped register: every month shows six
           weeks so paging never reshapes the sheet. */
        fixedWeeks={fixedWeeks || variant === "full"}
        showWeekNumbers={showWeekNumbers}
        {...(minView !== undefined ? { minView } : {})}
        {...(maxView !== undefined ? { maxView } : {})}
        /* Year mode starts on the year's month overview. The machine
           stays free to drill down, so choosing a month opens its
           day calendar instead of "selecting the month". */
        {...(mode === "year" ? { defaultView: "month" as const, maxView: "month" as const } : {})}
        onValueChange={(details) => onValueChange?.(details.value)}
      >
        <ArkDatePicker.View view="day">
          <ArkDatePicker.Context>
            {(dp) => (
              <>
                {header(dp)}
                {dayTable(dp)}
              </>
            )}
          </ArkDatePicker.Context>
        </ArkDatePicker.View>
        <ArkDatePicker.View view="month">
          <ArkDatePicker.Context>
            {(dp) => (
              <>
                {header(dp)}
                {monthGrid(dp, mode === "year" ? 4 : 3)}
              </>
            )}
          </ArkDatePicker.Context>
        </ArkDatePicker.View>
        {mode === "month" ? (
          <ArkDatePicker.View view="year">
            <ArkDatePicker.Context>
              {(dp) => (
                <>
                  {header()}
                  {yearGrid(dp)}
                </>
              )}
            </ArkDatePicker.Context>
          </ArkDatePicker.View>
        ) : null}
      </ArkDatePicker.Root>
      {children}
    </div>
  );
}

export const Calendar = Object.assign(CalendarImpl, DatePicker) as typeof CalendarImpl &
  typeof DatePicker;
