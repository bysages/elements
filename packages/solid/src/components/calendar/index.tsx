import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import type { DatePickerRootProps, UseDatePickerContext } from "@ark-ui/solid/date-picker";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { DatePicker } from "../date-picker";

function chevron(dir: "left" | "right") {
  return iconNode(dir === "left" ? "chevron-left" : "chevron-right", {
    width: "16",
    height: "16",
  });
}

export interface CalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
function CalendarImpl(props: CalendarProps) {
  injectComponentStyle("calendar");
  injectComponentStyle("date-picker");
  const [own, rest] = splitProps(props, ["id", "value", "min", "max", "onValueChange"]);
  const id = useElementId("calendar", () => own.id);
  /* zag's RangeText follows the visible day-page (startValue), which
     the month and year steps never move — it would freeze the title.
     Formatting the focused value keeps it in step with the arrows. */
  /* the context render prop hands over the api accessor */
  const title = (dp: UseDatePickerContext) => {
    const api = dp();
    const d = api.focusedValue;
    if (!d) return "";
    if (api.view === "day") return api.format(d, { month: "long", year: "numeric" });
    if (api.view === "month") return api.format(d, { year: "numeric" });
    const decade = Math.floor(d.year / 10) * 10;
    return `${decade} - ${decade + 9}`;
  };
  /* The header lives inside every view: the triggers read their view
     from the view's props context, so one shared header outside the
     views would step months while the machine sits in month or year. */
  const header = () => (
    <div data-scope="calendar" data-part="header">
      <ArkDatePicker.ViewControl>
        <ArkDatePicker.PrevTrigger>{chevron("left")}</ArkDatePicker.PrevTrigger>
        <ArkDatePicker.Context>
          {(dp) => <ArkDatePicker.ViewTrigger>{title(dp)}</ArkDatePicker.ViewTrigger>}
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
        id={id()}
        open
        closeOnSelect
        inline
        {...(own.value !== undefined ? { value: own.value } : {})}
        {...(own.min !== undefined ? { min: own.min } : {})}
        {...(own.max !== undefined ? { max: own.max } : {})}
        onValueChange={(details) => own.onValueChange?.(details.value)}
      >
        {/* Three views ride the machine; only the one matching the current
            view shows. Month and year are hand-laid grids of three columns
            — the machine supplies the cells. */}
        <ArkDatePicker.View view="day">
          {header()}
          <ArkDatePicker.Table>
            <ArkDatePicker.TableHead>
              <ArkDatePicker.TableRow>
                <ArkDatePicker.Context>
                  {(dp) => (
                    <For each={dp().weekDays}>
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
                {(dp) => (
                  <For each={dp().weeks}>
                    {(week) => (
                      <ArkDatePicker.TableRow>
                        <For each={week}>
                          {(day) => (
                            <ArkDatePicker.TableCell value={day}>
                              <ArkDatePicker.TableCellTrigger>
                                {day.day}
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
        </ArkDatePicker.View>
        <ArkDatePicker.View view="month">
          {header()}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              <ArkDatePicker.Context>
                {(dp) => (
                  <For each={dp().getMonthsGrid({ columns: 3 })}>
                    {(months) => (
                      <ArkDatePicker.TableRow>
                        <For each={months}>
                          {(month) => (
                            <ArkDatePicker.TableCell value={month.value} columns={3}>
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
        </ArkDatePicker.View>
        <ArkDatePicker.View view="year">
          {header()}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              <ArkDatePicker.Context>
                {(dp) => (
                  <For each={dp().getYearsGrid({ columns: 3 })}>
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
        </ArkDatePicker.View>
      </ArkDatePicker.Root>
      <Show when={rest.children}>{rest.children}</Show>
    </div>
  );
}

export const Calendar = defineFamily(CalendarImpl, DatePicker) as typeof CalendarImpl &
  typeof DatePicker;
