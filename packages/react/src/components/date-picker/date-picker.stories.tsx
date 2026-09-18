import { parseDate } from "@ark-ui/react/date-picker";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { DatePicker } from ".";

const meta: Meta = { title: "Components/Forms/Date Picker" };
export default meta;

function CalendarGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 9.5h18M8 3v4M16 3v4" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}
      aria-hidden
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function viewControl() {
  return (
    <DatePicker.ViewControl>
      <DatePicker.PrevTrigger>
        <Chevron dir="left" />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger>
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.NextTrigger>
        <Chevron dir="right" />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>
  );
}

function zoomViewControl() {
  return (
    <DatePicker.ViewControl>
      <DatePicker.PrevTrigger>
        <Chevron dir="left" />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger>
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.NextTrigger>
        <Chevron dir="right" />
      </DatePicker.NextTrigger>
      <DatePicker.MonthSelect />
      <DatePicker.YearSelect />
    </DatePicker.ViewControl>
  );
}

function DayView() {
  return (
    <DatePicker.View view="day">
      <DatePicker.Context>
        {(dp) => (
          <>
            {viewControl()}
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {dp.weekDays.map((day, id) => (
                    <DatePicker.TableHeader key={id} aria-label={day.long}>
                      {day.narrow}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {dp.weeks.map((week, id) => (
                  <DatePicker.TableRow key={id}>
                    {week.map((day, id) => (
                      <DatePicker.TableCell key={id} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function DayViewWithWeekNumbers() {
  return (
    <DatePicker.View view="day">
      <DatePicker.Context>
        {(dp) => (
          <>
            {viewControl()}
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  <DatePicker.WeekNumberHeaderCell>Wk</DatePicker.WeekNumberHeaderCell>
                  {dp.weekDays.map((day, id) => (
                    <DatePicker.TableHeader key={id} aria-label={day.long}>
                      {day.narrow}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {dp.weeks.map((week, id) => (
                  <DatePicker.TableRow key={id}>
                    <DatePicker.WeekNumberCell weekIndex={id} week={week}>
                      {dp.getWeekNumber(week)}
                    </DatePicker.WeekNumberCell>
                    {week.map((day, id) => (
                      <DatePicker.TableCell key={id} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function MonthView() {
  return (
    <DatePicker.View view="month">
      <DatePicker.Context>
        {(dp) => (
          <>
            {viewControl()}
            <DatePicker.Table>
              <DatePicker.TableBody>
                {dp.getMonthsGrid({ columns: 4 }).map((months, id) => (
                  <DatePicker.TableRow key={id}>
                    {months.map((month, id) => (
                      <DatePicker.TableCell key={id} value={month.value}>
                        <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function YearView() {
  return (
    <DatePicker.View view="year">
      <DatePicker.Context>
        {(dp) => (
          <>
            {viewControl()}
            <DatePicker.Table>
              <DatePicker.TableBody>
                {dp.getYearsGrid({ columns: 4 }).map((years, id) => (
                  <DatePicker.TableRow key={id}>
                    {years.map((year, id) => (
                      <DatePicker.TableCell key={id} value={year.value}>
                        <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function TodayView() {
  return (
    <DatePicker.View view="day">
      <DatePicker.Context>
        {(dp) => (
          <>
            {viewControl()}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => dp.selectToday()}
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                }}
              >
                Today
              </button>
            </div>
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {dp.weekDays.map((day, id) => (
                    <DatePicker.TableHeader key={id} aria-label={day.long}>
                      {day.narrow}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {dp.weeks.map((week, id) => (
                  <DatePicker.TableRow key={id}>
                    {week.map((day, id) => (
                      <DatePicker.TableCell key={id} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function MonthYearSelectView() {
  return (
    <DatePicker.View view="day">
      <DatePicker.Context>
        {(dp) => (
          <>
            {zoomViewControl()}
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {dp.weekDays.map((day, id) => (
                    <DatePicker.TableHeader key={id} aria-label={day.long}>
                      {day.narrow}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {dp.weeks.map((week, id) => (
                  <DatePicker.TableRow key={id}>
                    {week.map((day, id) => (
                      <DatePicker.TableCell key={id} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.View>
  );
}

function popup(...views: ReactNode[]) {
  return (
    <DatePicker.Positioner>
      <DatePicker.Content>{views}</DatePicker.Content>
    </DatePicker.Positioner>
  );
}

function field(control: ReactNode, label = "Start date") {
  return (
    <>
      <DatePicker.Label>{label}</DatePicker.Label>
      <DatePicker.Control>{control}</DatePicker.Control>
    </>
  );
}

const inputControl = (
  <>
    <DatePicker.Input />
    <DatePicker.Trigger>
      <CalendarGlyph />
    </DatePicker.Trigger>
  </>
);

const rangeInputControl = (
  <>
    <DatePicker.Input index={0} />
    <DatePicker.Input index={1} />
    <DatePicker.Trigger>
      <CalendarGlyph />
    </DatePicker.Trigger>
  </>
);

/** Day view with the full control row: type a date or pick one from the
 * grid; the title doubles as the zoom-out affordance. */
export const Basic = {
  args: {
    label: "Start date",
  },
  render: (args: any) => (
    <DatePicker.Root>
      <DatePicker.Label>{args.label}</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger>
          <CalendarGlyph />
        </DatePicker.Trigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {(dp) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger>
                      <Chevron dir="left" />
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger>
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger>
                      <Chevron dir="right" />
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {dp.weekDays.map((day, id) => (
                          <DatePicker.TableHeader key={id} aria-label={day.long}>
                            {day.narrow}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {dp.weeks.map((week, id) => (
                        <DatePicker.TableRow key={id}>
                          {week.map((day, id) => (
                            <DatePicker.TableCell key={id} value={day}>
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context>
              {(dp) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger>
                      <Chevron dir="left" />
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger>
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger>
                      <Chevron dir="right" />
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {dp.getMonthsGrid({ columns: 4 }).map((months, id) => (
                        <DatePicker.TableRow key={id}>
                          {months.map((month, id) => (
                            <DatePicker.TableCell key={id} value={month.value}>
                              <DatePicker.TableCellTrigger>
                                {month.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {(dp) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger>
                      <Chevron dir="left" />
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger>
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger>
                      <Chevron dir="right" />
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {dp.getYearsGrid({ columns: 4 }).map((years, id) => (
                        <DatePicker.TableRow key={id}>
                          {years.map((year, id) => (
                            <DatePicker.TableCell key={id} value={year.value}>
                              <DatePicker.TableCellTrigger>
                                {year.label}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  ),
};

/** A bounded range: the fill runs as one continuous band between the two
 * ink endpoints. */
export function RangeSelection() {
  return (
    <DatePicker.Root selectionMode="range">
      <DatePicker.Label>Stay</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.Trigger>
          <CalendarGlyph />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {(dp) => (
                <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger>
                      <Chevron dir="left" />
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger>
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger>
                      <Chevron dir="right" />
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {dp.weekDays.map((day, id) => (
                          <DatePicker.TableHeader key={id} aria-label={day.long}>
                            {day.narrow}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {dp.weeks.map((week, id) => (
                        <DatePicker.TableRow key={id}>
                          {week.map((day, id) => (
                            <DatePicker.TableCell key={id} value={day}>
                              <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  );
}

/** The field starts filled; the clear trigger empties it. */
export const DefaultValue = {
  render: () => (
    <DatePicker.Root defaultValue={[parseDate("2026-01-15")]}>
      {field(
        <>
          <DatePicker.Input />
          <DatePicker.Trigger>
            <CalendarGlyph />
          </DatePicker.Trigger>
          <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
        </>,
      )}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** The picker answers to state: the field mirrors every selection made in
 * the grid and the input. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState([parseDate("2026-03-15")]);
    return (
      <DatePicker.Root value={value} onValueChange={(e) => setValue(e.value)}>
        {field(inputControl)}
        {popup(<DayView />, <MonthView />, <YearView />)}
      </DatePicker.Root>
    );
  },
};

/** Several days at once; the counter in the header follows the count. */
export const MultipleSelection = {
  render: () => (
    <DatePicker.Root selectionMode="multiple">
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Selection stops at the boundary dates; everything outside is inert. */
export const MinMax = {
  render: () => (
    <DatePicker.Root min={parseDate("2026-01-01")} max={parseDate("2026-03-31")}>
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Six weeks in every month, whatever the month needs — rows never jump. */
export const FixedWeeks = {
  render: () => (
    <DatePicker.Root fixedWeeks>
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** The leading column counts the ISO week of the row. */
export const WeekNumbers = {
  render: () => (
    <DatePicker.Root showWeekNumbers>
      {field(inputControl)}
      {popup(<DayViewWithWeekNumbers />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Two month grids side by side — long ranges read without paging. */
export const MultipleMonths = {
  render: () => (
    <DatePicker.Root numOfMonths={2}>
      {field(rangeInputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** The calendar speaks German and starts the week on Monday. */
export const Locale = {
  render: () => (
    <DatePicker.Root locale="de-DE" startOfWeek={1}>
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Clicking an empty grid cell opens the picker straight onto that date. */
export const OpenOnClick = {
  render: () => (
    <DatePicker.Root openOnClick>
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Weekends are inked out of the choices entirely. */
export const Unavailable = {
  render: () => (
    <DatePicker.Root isDateUnavailable={(d) => d.day === 0 || d.day === 6}>
      {field(inputControl)}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Multiple selection with a hard ceiling of three days. */
export const MaxSelectedDates = {
  render: () => (
    <DatePicker.Root selectionMode="multiple" maxSelectedDates={3}>
      {field(inputControl)}
      {popup(<DayView />)}
    </DatePicker.Root>
  ),
};

/** The Today stamp lives in the calendar header, wired through the machine. */
export const SelectToday = {
  render: () => (
    <DatePicker.Root>
      {field(inputControl)}
      {popup(<TodayView />)}
    </DatePicker.Root>
  ),
};

/** A ghost trigger: the value text sits where an input would, so the whole
 * field reads as one quiet button. */
export const TriggerValue = {
  render: () => (
    <DatePicker.Root>
      {field(
        <DatePicker.Trigger style={{ width: "100%", justifyContent: "space-between" }}>
          <DatePicker.ValueText placeholder="Select date" />
          <CalendarGlyph />
        </DatePicker.Trigger>,
      )}
      {popup(<DayView />, <MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** The input parses a two-digit-year day-first format and echoes it back. */
export const FormatParse = {
  render: () => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
      <DatePicker.Root
        placeholder="dd/mm/yy"
        format={(d) => `${pad(d.day)}/${pad(d.month)}/${String(d.year).slice(2)}`}
        parse={(value) => {
          const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
          if (!m) return undefined;
          try {
            return parseDate(`20${m[3]}-${pad(Number(m[2]))}-${pad(Number(m[1]))}`);
          } catch {
            return undefined;
          }
        }}
      >
        {field(inputControl)}
        {popup(<DayView />, <MonthView />, <YearView />)}
      </DatePicker.Root>
    );
  },
};

/** Month and year ride select controls in the header — paging becomes
 * jumping. */
export const MonthYearSelect = {
  render: () => (
    <DatePicker.Root>
      {field(inputControl)}
      {popup(<MonthYearSelectView />)}
    </DatePicker.Root>
  ),
};

/** Opens one level up: the month grid first, days on drill-down. */
export const DefaultView = {
  render: () => (
    <DatePicker.Root defaultView="month">
      {field(inputControl)}
      {popup(<MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** Months only — no day grid anywhere in the hierarchy. The floor view
 * keeps a cell click from drilling below the grain. */
export const MonthPicker = {
  render: () => (
    <DatePicker.Root defaultView="month" minView="month">
      {field(inputControl)}
      {popup(<MonthView />)}
    </DatePicker.Root>
  ),
};

/** Years only — the coarsest picking grain. */
export const YearPicker = {
  render: () => (
    <DatePicker.Root defaultView="year" minView="year">
      {field(inputControl)}
      {popup(<YearView />)}
    </DatePicker.Root>
  ),
};

/** A month-grain range: two inputs, the grid paginates years. */
export const MonthPickerRange = {
  render: () => (
    <DatePicker.Root selectionMode="range" defaultView="month" minView="month">
      {field(rangeInputControl)}
      {popup(<MonthView />, <YearView />)}
    </DatePicker.Root>
  ),
};

/** A year-grain range for spanning decades. */
export const YearPickerRange = {
  render: () => (
    <DatePicker.Root selectionMode="range" defaultView="year" minView="year">
      {field(rangeInputControl)}
      {popup(<YearView />)}
    </DatePicker.Root>
  ),
};

/** The calendar rests on the page itself — no trigger, no popup. */
export const Inline = {
  render: () => (
    <DatePicker.Root inline>
      <DayView />
      <MonthView />
      <YearView />
    </DatePicker.Root>
  ),
};

/** Under a form `name`, unavailable dates are skipped and the hidden input
 * carries the value on submit. */
export const FormUsage = {
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
    >
      <DatePicker.Root name="date" isDateUnavailable={(d) => d.day === 0 || d.day === 6}>
        {field(inputControl)}
        {popup(<DayView />, <MonthView />, <YearView />)}
      </DatePicker.Root>
      <button
        type="submit"
        style={{
          border: "1px solid var(--bs-color-border)",
          background: "var(--bs-color-surface-2)",
          borderRadius: "var(--bs-radius-sm)",
          padding: "0.25rem 0.75rem",
          font: "inherit",
          fontSize: "var(--bs-font-size-sm)",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  ),
};
