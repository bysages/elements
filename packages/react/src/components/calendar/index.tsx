import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
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
  value?: unknown[];
  min?: unknown;
  max?: unknown;
  onValueChange?: (value: unknown[]) => void;
}

/** The date-picker's month grid, standing on the page without its
 * popup: always open, the trigger gone, the vessel a quiet card. The
 * grid itself is the shared machinery — value, range selection, and
 * focus ride Ark's own contract. */
export function Calendar({ value, min, max, onValueChange, children, ...rest }: CalendarProps) {
  return (
    <div {...rest} data-scope="calendar" data-part="root">
      <ArkDatePicker.Root
        open
        closeOnSelect
        {...(value !== undefined ? { value: value as any } : {})}
        {...(min !== undefined ? { min: min as any } : {})}
        {...(max !== undefined ? { max: max as any } : {})}
        onValueChange={(details: any) => onValueChange?.(details.value)}
      >
        <div data-scope="calendar" data-part="header">
          <ArkDatePicker.ViewControl>
            <ArkDatePicker.PrevTrigger>{chevron("left")}</ArkDatePicker.PrevTrigger>
            <ArkDatePicker.ViewTrigger>
              <ArkDatePicker.RangeText />
            </ArkDatePicker.ViewTrigger>
            <ArkDatePicker.NextTrigger>{chevron("right")}</ArkDatePicker.NextTrigger>
          </ArkDatePicker.ViewControl>
        </div>
        <ArkDatePicker.View view="day">
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
      </ArkDatePicker.Root>
      {children}
    </div>
  );
}

injectComponentStyle("calendar");
