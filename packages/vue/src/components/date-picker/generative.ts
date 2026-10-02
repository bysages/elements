import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { DatePicker } from "./index";

/** A field that opens a calendar to pick a date. */
export default defineEntry({
  DatePicker: {
    props: z.object({ label: z.string().optional() }),
    description: "A field that opens a calendar to pick a date.",
    component: ({ props }) => {
      const calendar = () =>
        h(
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
      const chevron = (left: boolean) =>
        h(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.75,
            "aria-hidden": true,
            style: left ? { transform: "rotate(180deg)" } : undefined,
          },
          [h("path", { d: "m9 5 7 7-7 7" })],
        );
      const viewControl = () =>
        h(DatePicker.ViewControl, () => [
          h(DatePicker.PrevTrigger, () => chevron(true)),
          h(DatePicker.ViewTrigger, () => h(DatePicker.RangeText as never)),
          h(DatePicker.NextTrigger, () => chevron(false)),
        ]);
      const dayView = () =>
        h(DatePicker.View, { view: "day" }, () =>
          h(DatePicker.Context, null, {
            default: (dp: any) => [
              viewControl(),
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
                    h(DatePicker.TableRow, { key: id }, () =>
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
      const field = h(DatePicker.Control, () => [
        h(DatePicker.Input as never),
        h(DatePicker.Trigger, () => calendar()),
      ]);
      const popup = h(DatePicker.Positioner, () => h(DatePicker.Content, () => [dayView()]));
      return labelled(
        props.label,
        h(DatePicker.Root as never, {}, () => [field, popup]),
      );
    },
  },
});
