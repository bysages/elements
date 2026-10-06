import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { DatePicker } from "./index";

/** A field that opens a calendar to pick a date. */
export default defineEntry({
  DatePicker: {
    props: z.object({ label: z.string().optional() }),
    description: "A field that opens a calendar to pick a date.",
    component: ({ props }) => {
      const calendarIcon = () => iconNode("calendar", { width: 16, height: 16 });
      const chevron = (left: boolean) =>
        iconNode(left ? "chevron-left" : "chevron-right", { width: 16, height: 16 });
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
        h(DatePicker.Trigger, () => calendarIcon()),
      ]);
      const popup = h(DatePicker.Positioner, () => h(DatePicker.Content, () => [dayView()]));
      return labelled(
        props.label,
        h(DatePicker.Root as never, {}, () => [field, popup]),
      );
    },
  },
});
