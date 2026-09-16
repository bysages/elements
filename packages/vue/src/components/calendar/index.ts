import { DatePicker as ArkDatePicker } from "@ark-ui/vue/date-picker";
import type { DatePickerRootProps } from "@ark-ui/vue/date-picker";
import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/vue/date-picker";

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

/** The date-picker's month grid, standing on the page without its
 * popup: always open, the trigger gone, the vessel a quiet card. The
 * title zooms out through month and year grids; the grids themselves
 * are the date-picker's machinery — value, range selection, and focus
 * included. */
export const Calendar = defineComponent({
  name: "Calendar",
  props: {
    /** Selected date(s) — an array, as the machine speaks in ranges. */
    modelValue: {
      type: null as unknown as PropType<DatePickerRootProps["value"]>,
      default: undefined,
    },
    min: { type: null as unknown as PropType<DatePickerRootProps["min"]>, default: undefined },
    max: { type: null as unknown as PropType<DatePickerRootProps["max"]>, default: undefined },
  },
  emits: {
    "update:modelValue": (_value: NonNullable<DatePickerRootProps["value"]>) => true,
  },
  setup(props, ctx: SetupContext) {
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
    const header = () =>
      h("div", { "data-scope": "calendar", "data-part": "header" }, [
        h(ArkDatePicker.ViewControl, () => [
          h(ArkDatePicker.PrevTrigger, () => chevron("left")),
          h(ArkDatePicker.Context, null, {
            default: (dp: any) => h(ArkDatePicker.ViewTrigger, () => title(dp)),
          }),
          h(ArkDatePicker.NextTrigger, () => chevron("right")),
        ]),
      ]);
    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "calendar", "data-part": "root" },
        h(
          ArkDatePicker.Root,
          {
            open: true,
            closeOnSelect: true,
            /* inline: the calendar stands on the page with no popup parts,
               so the machine must skip its dismissable layer — without it
               it hunts for a content node that never renders. */
            inline: true,
            ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
            ...(props.min !== undefined ? { min: props.min } : {}),
            ...(props.max !== undefined ? { max: props.max } : {}),
            "onUpdate:modelValue": (value: unknown) => ctx.emit("update:modelValue", value),
          },
          () => [
            /* Three views ride the machine; only the one matching the
               current view shows. Month and year are hand-laid grids of
               three columns — the machine supplies the cells. */
            h(ArkDatePicker.View, { view: "day" }, () => [
              header(),
              h(ArkDatePicker.Context, null, {
                default: (dp: any) =>
                  h(ArkDatePicker.Table, () => [
                    h(ArkDatePicker.TableHead, () =>
                      h(ArkDatePicker.TableRow, () =>
                        dp.weekDays.map((day: any, id: number) =>
                          h(
                            ArkDatePicker.TableHeader,
                            { key: id, "aria-label": day.long },
                            () => day.narrow,
                          ),
                        ),
                      ),
                    ),
                    h(ArkDatePicker.TableBody, () =>
                      dp.weeks.map((week: any, id: number) =>
                        h(ArkDatePicker.TableRow, { key: id }, () =>
                          week.map((day: any, id: number) =>
                            h(ArkDatePicker.TableCell, { key: id, value: day }, () =>
                              h(ArkDatePicker.TableCellTrigger, () => day.day),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ]),
              }),
            ]),
            h(ArkDatePicker.View, { view: "month" }, () => [
              header(),
              h(ArkDatePicker.Context, null, {
                default: (dp: any) =>
                  h(ArkDatePicker.Table, { columns: 3 }, () =>
                    h(ArkDatePicker.TableBody, () =>
                      dp
                        .getMonthsGrid({ columns: 3 })
                        .map((months: any, id: number) =>
                          h(ArkDatePicker.TableRow, { key: id }, () =>
                            months.map((month: any, id: number) =>
                              h(
                                ArkDatePicker.TableCell,
                                { key: id, value: month.value, columns: 3 },
                                () => h(ArkDatePicker.TableCellTrigger, () => month.label),
                              ),
                            ),
                          ),
                        ),
                    ),
                  ),
              }),
            ]),
            h(ArkDatePicker.View, { view: "year" }, () => [
              header(),
              h(ArkDatePicker.Context, null, {
                default: (dp: any) =>
                  h(ArkDatePicker.Table, { columns: 3 }, () =>
                    h(ArkDatePicker.TableBody, () =>
                      dp
                        .getYearsGrid({ columns: 3 })
                        .map((years: any, id: number) =>
                          h(ArkDatePicker.TableRow, { key: id }, () =>
                            years.map((year: any, id: number) =>
                              h(
                                ArkDatePicker.TableCell,
                                { key: id, value: year.value, columns: 3 },
                                () => h(ArkDatePicker.TableCellTrigger, () => year.label),
                              ),
                            ),
                          ),
                        ),
                    ),
                  ),
              }),
            ]),
          ],
        ),
      );
  },
});

injectComponentStyle("calendar");
