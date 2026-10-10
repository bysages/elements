import { DatePicker as ArkDatePicker, type DateValue } from "@ark-ui/vue/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/vue/date-picker";

/** DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The parts —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */
const DatePickerRoot = defineComponent({
  name: "SDatePickerRoot",
  props: {
    /** One rung of the control-height ladder for the field row. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("date-picker", attrs);
    injectComponentStyle("date-picker");

    return () =>
      h(
        withPresenceRoot(ArkDatePicker.Root),
        withPresenceEnter({ ...attrs, id: id.value, "data-size": props.size }),
        slots,
      );
  },
});

type DatePickerFacadeValue = DateValue | DateValue[];

function toDatePickerValue(value: DatePickerFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete picker behind one date: the field opens a single day grid,
 * while ranges, multiple selection, and custom views remain anatomy work. */
const DatePickerFacade = defineComponent({
  name: "SDatePicker",
  props: {
    modelValue: {
      type: [Object, Array] as PropType<DatePickerFacadeValue>,
      default: undefined,
    },
    defaultValue: {
      type: [Object, Array] as PropType<DatePickerFacadeValue>,
      default: undefined,
    },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: DateValue[]) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    return () => {
      const modelValue = toDatePickerValue(props.modelValue);
      return h(
        DatePickerRoot,
        {
          ...attrs,
          defaultValue: toDatePickerValue(props.defaultValue),
          disabled: props.disabled,
          invalid: props.invalid,
          placeholder: props.placeholder,
          required: props.required,
          ...(modelValue === undefined ? {} : { modelValue }),
          "onUpdate:modelValue": (value: DateValue[]) => emit("update:modelValue", value),
        } as never,
        () => [
          ...(props.label ? [h(ArkDatePicker.Label, () => props.label)] : []),
          h(ArkDatePicker.Control, () => [
            h(ArkDatePicker.Input as never, props.label ? {} : { "aria-label": props.placeholder }),
            h(ArkDatePicker.Trigger, () => iconNode("calendar", { width: 16, height: 16 })),
          ]),
          h(ArkDatePicker.Positioner, () =>
            h(ArkDatePicker.Content, () =>
              h(ArkDatePicker.View, { view: "day" }, () =>
                h(ArkDatePicker.Context, null, {
                  default: (dp: any) => [
                    h(ArkDatePicker.ViewControl, () => [
                      h(ArkDatePicker.PrevTrigger, () =>
                        iconNode("chevron-left", { width: 14, height: 14 }),
                      ),
                      h(ArkDatePicker.ViewTrigger, () => h(ArkDatePicker.RangeText)),
                      h(ArkDatePicker.NextTrigger, () =>
                        iconNode("chevron-right", { width: 14, height: 14 }),
                      ),
                    ]),
                    h(ArkDatePicker.Table, () => [
                      h(ArkDatePicker.TableHead, () =>
                        h(ArkDatePicker.TableRow, () =>
                          dp.weekDays.map((day: any, index: number) =>
                            h(
                              ArkDatePicker.TableHeader,
                              { key: index, "aria-label": day.long },
                              () => day.narrow,
                            ),
                          ),
                        ),
                      ),
                      h(ArkDatePicker.TableBody, () =>
                        dp.weeks.map((week: any[], index: number) =>
                          h(ArkDatePicker.TableRow, { key: index }, () =>
                            week.map((day: any, dayIndex: number) =>
                              h(ArkDatePicker.TableCell, { key: dayIndex, value: day }, () =>
                                h(ArkDatePicker.TableCellTrigger, () => day.day),
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
        ],
      );
    };
  },
});

export const DatePicker = defineFamily(DatePickerFacade, {
  ...ArkDatePicker,
  Root: DatePickerRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof DatePickerFacade &
  Omit<typeof ArkDatePicker, "Root"> & { Root: typeof ArkDatePicker.Root & typeof DatePickerRoot };
