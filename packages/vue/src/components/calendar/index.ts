import { DatePicker as ArkDatePicker } from "@ark-ui/vue/date-picker";
import type { DatePickerRootProps, DateValue, UseDatePickerContext } from "@ark-ui/vue/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType, SetupContext, UnwrapRef } from "vue";
import { defineComponent, h } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { DatePicker } from "../date-picker";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/vue/date-picker";

function chevron(dir: "left" | "right") {
  return iconNode(dir === "left" ? "chevron-left" : "chevron-right", { width: 16, height: 16 });
}

type DatePickerApi = UnwrapRef<UseDatePickerContext>;

/** The date-picker's grid standing on the page. Compact is the popup's
 * quiet card; full opens it into a dashboard calendar. Year mode starts
 * on a month overview; choosing a month drills into its day grid. */
const CalendarFacade = defineComponent({
  name: "Calendar",
  inheritAttrs: false,
  props: {
    /** Selected date(s) — an array, as the machine speaks in ranges. */
    modelValue: {
      type: null as unknown as PropType<DatePickerRootProps["modelValue"]>,
      default: undefined,
    },
    defaultValue: {
      type: null as unknown as PropType<DatePickerRootProps["defaultValue"]>,
      default: undefined,
    },
    min: { type: null as unknown as PropType<DatePickerRootProps["min"]>, default: undefined },
    max: { type: null as unknown as PropType<DatePickerRootProps["max"]>, default: undefined },
    /** compact keeps the popup's measure; full gives cells room for content. */
    variant: { type: String as PropType<"compact" | "full">, default: "compact" },
    /** month is the day grid; year starts on a month overview. */
    mode: { type: String as PropType<"month" | "year">, default: "month" },
    selectionMode: {
      type: String as PropType<DatePickerRootProps["selectionMode"]>,
      default: undefined,
    },
    startOfWeek: { type: Number, default: undefined },
    fixedWeeks: { type: Boolean, default: false },
    showWeekNumbers: { type: Boolean, default: false },
    outsideDaySelectable: { type: Boolean, default: true },
    closeOnSelect: { type: Boolean, default: true },
    minView: { type: String as PropType<DatePickerRootProps["minView"]>, default: undefined },
    maxView: { type: String as PropType<DatePickerRootProps["maxView"]>, default: undefined },
  },
  emits: {
    "update:modelValue": (_value: NonNullable<DatePickerRootProps["modelValue"]>) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("calendar");
    injectComponentStyle("date-picker");
    const hostId = useElementId("calendar", ctx.attrs);
    const cellContent = (day: DateValue) => ctx.slots.cell?.({ day }) ?? day.day;

    const title = (dp: DatePickerApi) => {
      const date = dp.focusedValue;
      if (!date) return "";
      if (dp.view === "month") return dp.format(date, { year: "numeric" });
      if (dp.view === "day") return dp.format(date, { month: "long", year: "numeric" });
      const decade = Math.floor(date.year / 10) * 10;
      return `${decade} - ${decade + 9}`;
    };

    const header = (dp?: DatePickerApi) =>
      h("div", { "data-scope": "calendar", "data-part": "header" }, [
        h(ArkDatePicker.ViewControl, () => [
          h(ArkDatePicker.PrevTrigger, () => chevron("left")),
          h(ArkDatePicker.Context, null, {
            default: (context: DatePickerApi) => h(ArkDatePicker.ViewTrigger, () => title(context)),
          }),
          ...(props.variant === "full" && dp ? [todayTrigger(dp)] : []),
          h(ArkDatePicker.NextTrigger, () => chevron("right")),
        ]),
      ]);

    const todayTrigger = (dp: DatePickerApi) =>
      h(
        "button",
        {
          type: "button",
          "data-scope": "calendar",
          "data-part": "today-trigger",
          onClick: () => {
            dp.selectToday();
            if (props.mode === "year" && dp.view === "month") dp.setView("day");
          },
        },
        "Today",
      );

    const dayCell = (day: DateValue, id: number) =>
      h(ArkDatePicker.TableCell, { key: id, value: day }, () =>
        h(ArkDatePicker.TableCellTrigger, () => cellContent(day)),
      );

    const dayTable = (dp: DatePickerApi) => {
      const weeks = dp.weeks;
      return h(ArkDatePicker.Table, () => [
        h(ArkDatePicker.TableHead, () =>
          h(ArkDatePicker.TableRow, () => [
            ...(props.showWeekNumbers
              ? [h(ArkDatePicker.WeekNumberHeaderCell as never, () => "Wk")]
              : []),
            ...dp.weekDays.map((day, id) =>
              h(ArkDatePicker.TableHeader, { key: id, "aria-label": day.long }, () => day.narrow),
            ),
          ]),
        ),
        h(ArkDatePicker.TableBody, () =>
          weeks.map((week, id) =>
            h(ArkDatePicker.TableRow, { key: id }, () => [
              ...(props.showWeekNumbers
                ? [
                    h(
                      ArkDatePicker.WeekNumberCell as never,
                      { key: "week", weekIndex: id, week },
                      () => dp.getWeekNumber(week),
                    ),
                  ]
                : []),
              ...week.map(dayCell),
            ]),
          ),
        ),
      ]);
    };

    const monthGrid = (dp: DatePickerApi, columns: 3 | 4) =>
      h(ArkDatePicker.Table, { columns }, () =>
        h(ArkDatePicker.TableBody, () =>
          dp
            .getMonthsGrid({ columns, format: columns === 4 ? "short" : "long" })
            .map((months, id) =>
              h(ArkDatePicker.TableRow, { key: id }, () =>
                months.map((month, id: number) =>
                  h(ArkDatePicker.TableCell, { key: id, value: month.value, columns }, () =>
                    h(ArkDatePicker.TableCellTrigger, () => month.label),
                  ),
                ),
              ),
            ),
        ),
      );

    const yearGrid = (dp: DatePickerApi) =>
      h(ArkDatePicker.Table, { columns: 3 }, () =>
        h(ArkDatePicker.TableBody, () =>
          dp
            .getYearsGrid({ columns: 3 })
            .map((years, id) =>
              h(ArkDatePicker.TableRow, { key: id }, () =>
                years.map((year, id: number) =>
                  h(ArkDatePicker.TableCell, { key: id, value: year.value, columns: 3 }, () =>
                    h(ArkDatePicker.TableCellTrigger, () => year.label),
                  ),
                ),
              ),
            ),
        ),
      );

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "calendar",
          "data-part": "root",
          "data-variant": props.variant,
          "data-mode": props.mode,
        },
        h(
          withPresenceRoot(ArkDatePicker.Root),
          withPresenceEnter({
            id: `${hostId.value}:date-picker`,
            open: true,
            inline: true,
            closeOnSelect: props.closeOnSelect,
            outsideDaySelectable: props.outsideDaySelectable,
            ...(props.modelValue !== undefined ? { modelValue: props.modelValue } : {}),
            ...(props.defaultValue !== undefined ? { defaultValue: props.defaultValue } : {}),
            ...(props.min !== undefined ? { min: props.min } : {}),
            ...(props.max !== undefined ? { max: props.max } : {}),
            ...(props.selectionMode !== undefined ? { selectionMode: props.selectionMode } : {}),
            ...(props.startOfWeek !== undefined ? { startOfWeek: props.startOfWeek } : {}),
            /* Full is a page-shaped register: every month shows six
               weeks so paging never reshapes the sheet. */
            ...(props.fixedWeeks || props.variant === "full" ? { fixedWeeks: true } : {}),
            ...(props.showWeekNumbers ? { showWeekNumbers: true } : {}),
            ...(props.minView !== undefined ? { minView: props.minView } : {}),
            ...(props.maxView !== undefined ? { maxView: props.maxView } : {}),
            /* Year mode starts on the year's month overview. The machine
               stays free to drill down, so choosing a month opens its
               day calendar instead of "selecting the month". */
            ...(props.mode === "year"
              ? { defaultView: "month" as const, maxView: "month" as const }
              : {}),
            "onUpdate:modelValue": (value: unknown) => ctx.emit("update:modelValue", value),
          }),
          () => [
            h(ArkDatePicker.View, { view: "day" }, () =>
              h(ArkDatePicker.Context, null, {
                default: (dp: DatePickerApi) => [header(dp), dayTable(dp)],
              }),
            ),
            h(ArkDatePicker.View, { view: "month" }, () =>
              h(ArkDatePicker.Context, null, {
                default: (dp: DatePickerApi) => [
                  header(dp),
                  monthGrid(dp, props.mode === "year" ? 4 : 3),
                ],
              }),
            ),
            ...(props.mode === "month"
              ? [
                  h(ArkDatePicker.View, { view: "year" }, () =>
                    h(ArkDatePicker.Context, null, {
                      default: (dp: DatePickerApi) => [header(), yearGrid(dp)],
                    }),
                  ),
                ]
              : []),
          ],
        ),
      );
  },
});

export const Calendar = defineFamily(CalendarFacade, DatePicker) as typeof CalendarFacade &
  typeof DatePicker;
