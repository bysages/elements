import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { DatePicker } from "./index.js";

const meta: Meta = { title: "Components / Date Picker" };
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

/** Day view with the full control row: type a date or pick one from the
 * grid; the title doubles as the zoom-out affordance. */
export const Basic = {
  render: () =>
    h(DatePicker.Root, () => [
      h(DatePicker.Label, () => "Start date"),
      h(DatePicker.Control, () => [
        h(DatePicker.Input),
        h(DatePicker.Trigger, () => calendarGlyph()),
      ]),
      h(DatePicker.Positioner, () =>
        h(DatePicker.Content, () => [dayView(), monthView(), yearView()]),
      ),
    ]),
};

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

/** A bounded range: the fill runs as one continuous band between the two
 * ink endpoints. */
export const RangeSelection = {
  render: () =>
    h(DatePicker.Root, { selectionMode: "range" }, () => [
      h(DatePicker.Label, () => "Stay"),
      h(DatePicker.Control, () => [
        h(DatePicker.Input as any, { index: 0 }),
        h(DatePicker.Input as any, { index: 1 }),
        h(DatePicker.Trigger, () => calendarGlyph()),
        h(DatePicker.ClearTrigger, () => "Clear"),
      ]),
      h(DatePicker.Positioner, () => h(DatePicker.Content, () => dayView())),
    ]),
};
