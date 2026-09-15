import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import { injectComponentStyle } from "@bysages/core";
import { For, Show } from "solid-js";

function chevron(dir: "left" | "right") {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={1.75}
      aria-hidden="true"
      style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export interface CalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
export function Calendar(props: CalendarProps) {
  const [own, rest] = splitProps(props, ["value", "min", "max", "onValueChange"]);
  return (
    <div {...rest} data-scope="calendar" data-part="root">
      <ArkDatePicker.Root
        open
        closeOnSelect
        {...(own.value !== undefined ? { value: own.value as any } : {})}
        {...(own.min !== undefined ? { min: own.min as any } : {})}
        {...(own.max !== undefined ? { max: own.max as any } : {})}
        onValueChange={(details: any) => own.onValueChange?.(details.value)}
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
                  {(dp) => (
                    <For each={dp.weekDays}>
                      {(day: any, id) => (
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
                  <For each={dp.weeks}>
                    {(week: any, id) => (
                      <ArkDatePicker.TableRow>
                        <For each={week}>
                          {(day: any, id2) => (
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
        </ArkDatePicker.View>
      </ArkDatePicker.Root>
      <Show when={rest.children}>{rest.children}</Show>
    </div>
  );
}

injectComponentStyle("calendar");
