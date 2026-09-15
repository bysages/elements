import { DatePicker as ArkDatePicker } from "@ark-ui/vue/date-picker";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
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
 * popup: always open, the trigger gone, the vessel a quiet card. The grid itself is the date-picker's machinery —
 * value, range selection, and focus included. */
export const Calendar = defineComponent({
  name: "Calendar",
  props: {
    /** Selected date(s) — an array, as the machine speaks in ranges. */
    modelValue: { type: Array as unknown as any, default: undefined },
    min: { type: Object as unknown as any, default: undefined },
    max: { type: Object as unknown as any, default: undefined },
  },
  emits: {
    "update:modelValue": (_value: unknown) => true,
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "calendar", "data-part": "root" },
        h(
          ArkDatePicker.Root,
          {
            open: true,
            closeOnSelect: true,
            ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
            ...(props.min !== undefined ? { min: props.min } : {}),
            ...(props.max !== undefined ? { max: props.max } : {}),
            "onUpdate:modelValue": (value: unknown) => ctx.emit("update:modelValue", value),
          },
          () => [
            h("div", { "data-scope": "calendar", "data-part": "header" }, [
              h(ArkDatePicker.ViewControl, () => [
                h(ArkDatePicker.PrevTrigger, () => chevron("left")),
                h(ArkDatePicker.ViewTrigger, () => h(ArkDatePicker.RangeText)),
                h(ArkDatePicker.NextTrigger, () => chevron("right")),
              ]),
            ]),
            h(ArkDatePicker.View, { view: "day" }, () =>
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
                        h(
                          ArkDatePicker.TableRow,
                          { key: id },
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
            ),
          ],
        ),
      );
  },
});

injectComponentStyle("calendar");
