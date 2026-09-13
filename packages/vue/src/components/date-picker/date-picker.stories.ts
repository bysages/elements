import { parseDate } from "@ark-ui/vue/date-picker";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { DatePicker } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Date Picker" };
export default meta;

function calendarGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("rect", { x: 3, y: 5, width: 18, height: 16, rx: 1.5 }),
      h("path", { d: "M3 9.5h18M8 3v4M16 3v4" }),
    ],
  );
}

function chevron(dir: "left" | "right") {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
      style: dir === "left" ? { transform: "rotate(180deg)" } : undefined,
    },
    [h("path", { d: "m9 5 7 7-7 7" })],
  );
}

function viewControl() {
  return h(DatePicker.ViewControl, () => [
    h(DatePicker.PrevTrigger, () => chevron("left")),
    h(DatePicker.ViewTrigger, () => h(DatePicker.RangeText)),
    h(DatePicker.NextTrigger, () => chevron("right")),
  ]);
}

function zoomViewControl() {
  return h(DatePicker.ViewControl, () => [
    h(DatePicker.PrevTrigger, () => chevron("left")),
    h(DatePicker.ViewTrigger, () => h(DatePicker.RangeText)),
    h(DatePicker.NextTrigger, () => chevron("right")),
    h(DatePicker.MonthSelect),
    h(DatePicker.YearSelect),
  ]);
}

function dayView() {
  return h(DatePicker.View, { view: "day" }, () =>
    h(DatePicker.Context, null, {
      default: (dp: any) => [
        viewControl(),
        h(DatePicker.Table, () => [
          h(DatePicker.TableHead, () =>
            h(DatePicker.TableRow, () =>
              dp.weekDays.map((day: any, id: number) =>
                h(DatePicker.TableHeader, { key: id, "aria-label": day.long }, () => day.narrow),
              ),
            ),
          ),
          h(DatePicker.TableBody, () =>
            dp.weeks.map((week: any, id: number) =>
              h(
                DatePicker.TableRow,
                { key: id },
                week.map((day: any, id: number) =>
                  h(DatePicker.TableCell, { key: id, value: day }, () =>
                    h(DatePicker.TableCellTrigger, () => day.day),
                  ),
                ),
              ),
            ),
          ),
        ]),
      ],
    }),
  );
}

function dayViewWithWeekNumbers() {
  return h(DatePicker.View, { view: "day" }, () =>
    h(DatePicker.Context, null, {
      default: (dp: any) => [
        viewControl(),
        h(DatePicker.Table, () => [
          h(DatePicker.TableHead, () =>
            h(DatePicker.TableRow, () => [
              h(DatePicker.WeekNumberHeaderCell, () => "Wk"),
              ...dp.weekDays.map((day: any, id: number) =>
                h(DatePicker.TableHeader, { key: id, "aria-label": day.long }, () => day.narrow),
              ),
            ]),
          ),
          h(DatePicker.TableBody, () =>
            dp.weeks.map((week: any, id: number) =>
              h(DatePicker.TableRow, { key: id }, [
                h(DatePicker.WeekNumberCell as any, { weekIndex: id, week }, () =>
                  dp.getWeekNumber(week),
                ),
                ...week.map((day: any, id: number) =>
                  h(DatePicker.TableCell, { key: id, value: day }, () =>
                    h(DatePicker.TableCellTrigger, () => day.day),
                  ),
                ),
              ]),
            ),
          ),
        ]),
      ],
    }),
  );
}

function monthView() {
  return h(DatePicker.View, { view: "month" }, () =>
    h(DatePicker.Context, null, {
      default: (dp: any) => [
        viewControl(),
        h(DatePicker.Table, () =>
          h(DatePicker.TableBody, () =>
            dp.getMonthsGrid({ columns: 4 }).map((months: any, id: number) =>
              h(
                DatePicker.TableRow,
                { key: id },
                months.map((month: any, id: number) =>
                  h(DatePicker.TableCell, { key: id, value: month.value }, () =>
                    h(DatePicker.TableCellTrigger, () => month.label),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    }),
  );
}

function yearView() {
  return h(DatePicker.View, { view: "year" }, () =>
    h(DatePicker.Context, null, {
      default: (dp: any) => [
        viewControl(),
        h(DatePicker.Table, () =>
          h(DatePicker.TableBody, () =>
            dp.getYearsGrid({ columns: 4 }).map((years: any, id: number) =>
              h(
                DatePicker.TableRow,
                { key: id },
                years.map((year: any, id: number) =>
                  h(DatePicker.TableCell, { key: id, value: year.value }, () =>
                    h(DatePicker.TableCellTrigger, () => year.label),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    }),
  );
}

function popup(...views: ReturnType<typeof dayView>[]) {
  return h(DatePicker.Positioner, () => h(DatePicker.Content, () => views));
}

function field(control: any[], label = "Start date") {
  return [h(DatePicker.Label, () => label), h(DatePicker.Control, () => control)];
}

/** The standard picker: type a date or pick one from the grid. */
export const Basic = {
  args: {
    label: "Start date",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(DatePicker.Root, () => [
          ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())], args.label),
          popup(dayView(), monthView(), yearView()),
        ]),
    ),
};

/** The field starts filled; the clear trigger empties it. */
export const DefaultValue = {
  render: () =>
    h(DatePicker.Root, { defaultValue: [parseDate("2026-01-15")] }, () => [
      ...field([
        h(DatePicker.Input),
        h(DatePicker.Trigger, () => calendarGlyph()),
        h(DatePicker.ClearTrigger, () => "Clear"),
      ]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** The picker answers to state: the field mirrors every selection made in
 * the grid and the input. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: [parseDate("2026-03-15")] });
      return () =>
        h(
          DatePicker.Root,
          {
            modelValue: state.value,
            onValueChange: (e: any) => {
              state.value = e.value;
            },
          } as any,
          () => [
            ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
            popup(dayView(), monthView(), yearView()),
          ],
        );
    }),
};

/** A range spans two inputs, one per endpoint; the preset triggers stamp
 * whole spans in one click. */
export const RangeSelection = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "range" }, () => [
      ...field([
        h(DatePicker.Input as any, { index: 0 }),
        h(DatePicker.Input as any, { index: 1 }),
        h(DatePicker.Trigger, () => calendarGlyph()),
        h(DatePicker.ClearTrigger, () => "Clear"),
      ]),
      h(DatePicker.PresetTrigger, { value: "last7Days" }, () => "Last 7 days"),
      h(DatePicker.PresetTrigger, { value: "last30Days" }, () => "Last 30 days"),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Several days at once; the counter in the header follows the count. */
export const MultipleSelection = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "multiple" }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Selection stops at the boundary dates; everything outside is inert. */
export const MinMax = {
  render: () =>
    h(DatePicker.Root, { min: parseDate("2026-01-01"), max: parseDate("2026-03-31") }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Six weeks in every month, whatever the month needs — rows never jump. */
export const FixedWeeks = {
  render: () =>
    h(DatePicker.Root, { fixedWeeks: true }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** The leading column counts the ISO week of the row. */
export const WeekNumbers = {
  render: () =>
    h(DatePicker.Root, { showWeekNumbers: true }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayViewWithWeekNumbers(), monthView(), yearView()),
    ]),
};

/** Two month grids side by side — long ranges read without paging. */
export const MultipleMonths = {
  render: () =>
    h(DatePicker.Root, { numOfMonths: 2 }, () => [
      ...field([
        h(DatePicker.Input as any, { index: 0 }),
        h(DatePicker.Input as any, { index: 1 }),
        h(DatePicker.Trigger, () => calendarGlyph()),
      ]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** The calendar speaks German and starts the week on Monday. */
export const Locale = {
  render: () =>
    h(DatePicker.Root, { locale: "de-DE", startOfWeek: 1 }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Clicking an empty grid cell opens the picker straight onto that date. */
export const OpenOnClick = {
  render: () =>
    h(DatePicker.Root, { openOnClick: true }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Weekends are inked out of the choices entirely. */
export const Unavailable = {
  render: () =>
    h(DatePicker.Root, { isDateUnavailable: (d: any) => d.day === 0 || d.day === 6 }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** Multiple selection with a hard ceiling of three days. */
export const MaxSelectedDates = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "multiple", maxSelectedDates: 3 }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(dayView()),
    ]),
};

/** The Today stamp lives in the calendar header, wired through the machine. */
export const SelectToday = {
  render: () =>
    h(DatePicker.Root, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      h(DatePicker.Positioner, () =>
        h(DatePicker.Content, () =>
          h(DatePicker.View, { view: "day" }, () =>
            h(DatePicker.Context, null, {
              default: (dp: any) => [
                viewControl(),
                h("div", { style: { display: "flex", justifyContent: "flex-end" } }, [
                  h(
                    "button",
                    {
                      type: "button",
                      onClick: () => dp.selectToday(),
                      style: {
                        border: "1px solid var(--bs-color-border)",
                        background: "var(--bs-color-surface-2)",
                        borderRadius: "var(--bs-radius-sm)",
                        padding: "0.25rem 0.5rem",
                        font: "inherit",
                        fontSize: "var(--bs-font-size-sm)",
                        cursor: "pointer",
                      },
                    },
                    "Today",
                  ),
                ]),
                h(DatePicker.Table, () => [
                  h(DatePicker.TableHead, () =>
                    h(DatePicker.TableRow, () =>
                      dp.weekDays.map((day: any, id: number) =>
                        h(
                          DatePicker.TableHeader,
                          { key: id, "aria-label": day.long },
                          () => day.narrow,
                        ),
                      ),
                    ),
                  ),
                  h(DatePicker.TableBody, () =>
                    dp.weeks.map((week: any, id: number) =>
                      h(
                        DatePicker.TableRow,
                        { key: id },
                        week.map((day: any, id: number) =>
                          h(DatePicker.TableCell, { key: id, value: day }, () =>
                            h(DatePicker.TableCellTrigger, () => day.day),
                          ),
                        ),
                      ),
                    ),
                  ),
                ]),
              ],
            }),
          ),
        ),
      ),
    ]),
};

/** A ghost trigger: the value text sits where an input would, so the whole
 * field reads as one quiet button. */
export const TriggerValue = {
  render: () =>
    h(DatePicker.Root, () => [
      ...field([
        h(
          DatePicker.Trigger,
          { style: { inlineSize: "100%", justifyContent: "space-between" } },
          () => [h(DatePicker.ValueText, { placeholder: "Select date" }), calendarGlyph()],
        ),
      ]),
      popup(dayView(), monthView(), yearView()),
    ]),
};

/** The input parses a two-digit-year day-first format and echoes it back. */
export const FormatParse = {
  render: () => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return h(
      DatePicker.Root,
      {
        placeholder: "dd/mm/yy",
        format: (d: any) => `${pad(d.day)}/${pad(d.month)}/${String(d.year).slice(2)}`,
        parse: (value: string) => {
          const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
          if (!m) return undefined;
          try {
            return parseDate(`20${m[3]}-${pad(Number(m[2]))}-${pad(Number(m[1]))}`);
          } catch {
            return undefined;
          }
        },
      },
      () => [
        ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
        popup(dayView(), monthView(), yearView()),
      ],
    );
  },
};

/** Month and year ride select controls in the header — paging becomes
 * jumping. */
export const MonthYearSelect = {
  render: () =>
    h(DatePicker.Root, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      h(DatePicker.Positioner, () =>
        h(DatePicker.Content, () =>
          h(DatePicker.View, { view: "day" }, () =>
            h(DatePicker.Context, null, {
              default: (dp: any) => [
                zoomViewControl(),
                h(DatePicker.Table, () => [
                  h(DatePicker.TableHead, () =>
                    h(DatePicker.TableRow, () =>
                      dp.weekDays.map((day: any, id: number) =>
                        h(
                          DatePicker.TableHeader,
                          { key: id, "aria-label": day.long },
                          () => day.narrow,
                        ),
                      ),
                    ),
                  ),
                  h(DatePicker.TableBody, () =>
                    dp.weeks.map((week: any, id: number) =>
                      h(
                        DatePicker.TableRow,
                        { key: id },
                        week.map((day: any, id: number) =>
                          h(DatePicker.TableCell, { key: id, value: day }, () =>
                            h(DatePicker.TableCellTrigger, () => day.day),
                          ),
                        ),
                      ),
                    ),
                  ),
                ]),
              ],
            }),
          ),
        ),
      ),
    ]),
};

/** Opens one level up: the month grid first, days on drill-down. */
export const DefaultView = {
  render: () =>
    h(DatePicker.Root, { defaultView: "month" }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(monthView(), yearView()),
    ]),
};

/** Months only — no day grid anywhere in the hierarchy. The floor view
 * keeps a cell click from drilling below the grain. */
export const MonthPicker = {
  render: () =>
    h(DatePicker.Root, { defaultView: "month", minView: "month" }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(monthView()),
    ]),
};

/** Years only — the coarsest picking grain. */
export const YearPicker = {
  render: () =>
    h(DatePicker.Root, { defaultView: "year", minView: "year" }, () => [
      ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
      popup(yearView()),
    ]),
};

/** A month-grain range: two inputs, the grid paginates years. */
export const MonthPickerRange = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "range", defaultView: "month", minView: "month" }, () => [
      ...field([
        h(DatePicker.Input as any, { index: 0 }),
        h(DatePicker.Input as any, { index: 1 }),
        h(DatePicker.Trigger, () => calendarGlyph()),
      ]),
      popup(monthView(), yearView()),
    ]),
};

/** A year-grain range for spanning decades. */
export const YearPickerRange = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "range", defaultView: "year", minView: "year" }, () => [
      ...field([
        h(DatePicker.Input as any, { index: 0 }),
        h(DatePicker.Input as any, { index: 1 }),
        h(DatePicker.Trigger, () => calendarGlyph()),
      ]),
      popup(yearView()),
    ]),
};

/** The calendar rests on the page itself — no trigger, no popup. */
export const Inline = {
  render: () => h(DatePicker.Root, { inline: true }, () => [dayView(), monthView(), yearView()]),
};

/** Under a form `name`, unavailable dates are skipped and the hidden input
 * carries the value on submit. */
export const FormUsage = {
  render: () =>
    h(
      "form",
      {
        onSubmit: (e: Event) => e.preventDefault(),
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          alignItems: "flex-start",
        },
      },
      [
        h(
          DatePicker.Root,
          { name: "date", isDateUnavailable: (d: any) => d.day === 0 || d.day === 6 },
          () => [
            ...field([h(DatePicker.Input), h(DatePicker.Trigger, () => calendarGlyph())]),
            popup(dayView(), monthView(), yearView()),
          ],
        ),
        h(
          "button",
          {
            type: "submit",
            style: {
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.25rem 0.75rem",
              font: "inherit",
              fontSize: "var(--bs-font-size-sm)",
              cursor: "pointer",
            },
          },
          "Submit",
        ),
      ],
    ),
};
