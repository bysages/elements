import { parseDate } from "@ark-ui/solid/date-picker";
import { createSignal } from "solid-js";

import { Calendar } from ".";

const meta = { title: "Components/Forms/Calendar", component: Calendar };
export default meta;

/** The month grid on the page: the popup gone, the vessel a quiet card,
 * the machinery entirely the shared date-picker's. */
export const Basic = {
  render: () => <Calendar style={{ "max-inline-size": "20rem" }} />,
};

/** A controlled selection: the chosen day reports back through the
 * binding and reads in the line below. */
export const Controlled = {
  render: () => {
    const [value, setValue] = createSignal([parseDate("2026-09-15")]);

    return (
      <div style={{ display: "grid", gap: "var(--bs-space-3)", "justify-items": "start" }}>
        <Calendar value={value()} onValueChange={setValue} style={{ "max-inline-size": "20rem" }} />
        <p style={{ color: "var(--bs-color-text-secondary)", margin: "0" }}>
          Selected: {value()[0]?.toString() ?? "nothing yet"}
        </p>
      </div>
    );
  },
};

/** The full variant opens the grid to its container and gives every day
 * room for an annotation; today rides the machine through the header. */
export const Full = {
  render: () => <Calendar variant="full" />,
};

/** Year mode opens the machine on its month overview: paging walks
 * years, and choosing a month drills into that day grid. */
export const Year = {
  render: () => <Calendar mode="year" />,
};

/** Multiple selection keeps every chosen day in one array. */
export const Multiple = {
  render: () => (
    <Calendar
      selectionMode="multiple"
      defaultValue={[parseDate("2026-09-08"), parseDate("2026-09-11"), parseDate("2026-09-25")]}
    />
  ),
};

/** The shared machine carries range geometry: the middle days read as a
 * continuous band between the endpoints. */
export const Range = {
  render: () => (
    <Calendar
      selectionMode="range"
      defaultValue={[parseDate("2026-09-08"), parseDate("2026-09-19")]}
      style={{ "max-inline-size": "22rem" }}
    />
  ),
};

/** Week numbers turn the rows into calendar-week coordinates. */
export const WeekNumbers = {
  render: () => <Calendar showWeekNumbers fixedWeeks />,
};
