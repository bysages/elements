import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
import type { DatePickerRootProps } from "@ark-ui/react/date-picker";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

function chevron(dir: "left" | "right") {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
      style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  /** Selected date(s) — an array, as the machine speaks in ranges. */
  value?: DatePickerRootProps["value"];
  min?: DatePickerRootProps["min"];
  max?: DatePickerRootProps["max"];
  onValueChange?: (value: NonNullable<DatePickerRootProps["value"]>) => void;
}

/** The date-picker's month grid, standing on the page without its
 * popup: always open, the trigger gone, the vessel a quiet card. The
 * title zooms out through month and year grids; the grids themselves
 * are the shared machinery — value, range selection, and focus ride
 * Ark's own contract. */
export function Calendar({ value, min, max, onValueChange, children, ...rest }: CalendarProps) {
  /* zag's RangeText follows the visible day-page (startValue), which
     the month and year steps never move — it would freeze the title.
     Formatting the focused value keeps it in step with the arrows. */
  const title = (dp: any) => {
    const d = dp.focusedValue;
    if (!d) return "";
    if (dp.view === "day") return dp.format(d, { month: "long", year: "numeric" });
    if (dp.view === "month") return dp.format(d, { year: "numeric" });
    const decade = Math.floor(d.year / 10) * 10;
    return `${decade} - ${decade + 9}`;
  };
  /* The header lives inside every view: the triggers read their view
     from the view's props context, so one shared header outside the
     views would step months while the machine sits in month or year. */
  const header = (
    <div data-scope="calendar" data-part="header">
      <ArkDatePicker.ViewControl>
        <ArkDatePicker.PrevTrigger>{chevron("left")}</ArkDatePicker.PrevTrigger>
        <ArkDatePicker.Context>
          {(dp: any) => <ArkDatePicker.ViewTrigger>{title(dp)}</ArkDatePicker.ViewTrigger>}
        </ArkDatePicker.Context>
        <ArkDatePicker.NextTrigger>{chevron("right")}</ArkDatePicker.NextTrigger>
      </ArkDatePicker.ViewControl>
    </div>
  );
  return (
    <div {...rest} data-scope="calendar" data-part="root">
      {/* inline: the calendar stands on the page with no popup parts,
          so the machine must skip its dismissable layer — without it
          it hunts for a content node that never renders. */}
      <ArkDatePicker.Root
        open
        closeOnSelect
        inline
        {...(value !== undefined ? { value: value as any } : {})}
        {...(min !== undefined ? { min: min as any } : {})}
        {...(max !== undefined ? { max: max as any } : {})}
        onValueChange={(details: any) => onValueChange?.(details.value)}
      >
        {/* Three views ride the machine; only the one matching the current
            view shows. Month and year are hand-laid grids of three columns
            — the machine supplies the cells. */}
        <ArkDatePicker.View view="day">
          {header}
          <ArkDatePicker.Table>
            <ArkDatePicker.TableHead>
              <ArkDatePicker.TableRow>
                <ArkDatePicker.Context>
                  {(dp) =>
                    dp.weekDays.map((day: any, id: number) => (
                      <ArkDatePicker.TableHeader key={id} aria-label={day.long}>
                        {day.narrow}
                      </ArkDatePicker.TableHeader>
                    ))
                  }
                </ArkDatePicker.Context>
              </ArkDatePicker.TableRow>
            </ArkDatePicker.TableHead>
            <ArkDatePicker.TableBody>
              <ArkDatePicker.Context>
                {(dp) =>
                  dp.weeks.map((week: any, id: number) => (
                    <ArkDatePicker.TableRow key={id}>
                      {week.map((day: any, id2: number) => (
                        <ArkDatePicker.TableCell key={id2} value={day}>
                          <ArkDatePicker.TableCellTrigger>{day.day}</ArkDatePicker.TableCellTrigger>
                        </ArkDatePicker.TableCell>
                      ))}
                    </ArkDatePicker.TableRow>
                  ))
                }
              </ArkDatePicker.Context>
            </ArkDatePicker.TableBody>
          </ArkDatePicker.Table>
        </ArkDatePicker.View>
        <ArkDatePicker.View view="month">
          {header}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              <ArkDatePicker.Context>
                {(dp) =>
                  dp.getMonthsGrid({ columns: 3 }).map((months: any, id: number) => (
                    <ArkDatePicker.TableRow key={id}>
                      {months.map((month: any, id2: number) => (
                        <ArkDatePicker.TableCell key={id2} value={month.value} columns={3}>
                          <ArkDatePicker.TableCellTrigger>
                            {month.label}
                          </ArkDatePicker.TableCellTrigger>
                        </ArkDatePicker.TableCell>
                      ))}
                    </ArkDatePicker.TableRow>
                  ))
                }
              </ArkDatePicker.Context>
            </ArkDatePicker.TableBody>
          </ArkDatePicker.Table>
        </ArkDatePicker.View>
        <ArkDatePicker.View view="year">
          {header}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              <ArkDatePicker.Context>
                {(dp) =>
                  dp.getYearsGrid({ columns: 3 }).map((years: any, id: number) => (
                    <ArkDatePicker.TableRow key={id}>
                      {years.map((year: any, id2: number) => (
                        <ArkDatePicker.TableCell key={id2} value={year.value} columns={3}>
                          <ArkDatePicker.TableCellTrigger>
                            {year.label}
                          </ArkDatePicker.TableCellTrigger>
                        </ArkDatePicker.TableCell>
                      ))}
                    </ArkDatePicker.TableRow>
                  ))
                }
              </ArkDatePicker.Context>
            </ArkDatePicker.TableBody>
          </ArkDatePicker.Table>
        </ArkDatePicker.View>
      </ArkDatePicker.Root>
      {children}
    </div>
  );
}

injectComponentStyle("calendar");
