import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
import { type DateValue } from "@ark-ui/react/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

export type {
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
} from "@ark-ui/react/date-picker";

type DatePickerRootProps = ComponentProps<typeof ArkDatePicker.Root> & {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function DatePickerRoot(props: DatePickerRootProps) {
  injectComponentStyle("date-picker");
  const id = useElementId("date-picker", props);
  const { size = "md", ...rest } = props;

  return <ArkDatePicker.Root {...rest} id={id} data-size={size} />;
}

/** Ark's DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The API is Ark's own —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */

type DatePickerFacadeValue = DateValue | DateValue[];

type DatePickerFacadeProps = {
  value?: DatePickerFacadeValue;
  defaultValue?: DatePickerFacadeValue;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: DateValue[]) => void;
};

function toDatePickerValue(value: DatePickerFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete picker behind one date: the field opens a single day grid,
 * while ranges, multiple selection, and custom views remain anatomy work. */
function DatePickerFacade(props: DatePickerFacadeProps) {
  const {
    value,
    defaultValue,
    disabled,
    invalid,
    required,
    label,
    placeholder,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;

  return (
    <DatePickerRoot
      size={size}
      defaultValue={toDatePickerValue(defaultValue)}
      value={toDatePickerValue(value)}
      disabled={disabled}
      invalid={invalid}
      placeholder={placeholder}
      required={required}
      className={className}
      style={style}
      onValueChange={(event: { value: DateValue[] }) => onValueChange?.(event.value)}
    >
      {label ? <ArkDatePicker.Label>{label}</ArkDatePicker.Label> : null}
      <ArkDatePicker.Control>
        <ArkDatePicker.Input aria-label={label ? undefined : placeholder} />
        <ArkDatePicker.Trigger>
          {iconNode("calendar", { width: 16, height: 16 })}
        </ArkDatePicker.Trigger>
      </ArkDatePicker.Control>
      <ArkDatePicker.Positioner>
        <ArkDatePicker.Content>
          <ArkDatePicker.View view="day">
            <ArkDatePicker.Context>
              {(dp: any) => (
                <>
                  <ArkDatePicker.ViewControl>
                    <ArkDatePicker.PrevTrigger>
                      {iconNode("chevron-left", { width: 14, height: 14 })}
                    </ArkDatePicker.PrevTrigger>
                    <ArkDatePicker.ViewTrigger>
                      <ArkDatePicker.RangeText />
                    </ArkDatePicker.ViewTrigger>
                    <ArkDatePicker.NextTrigger>
                      {iconNode("chevron-right", { width: 14, height: 14 })}
                    </ArkDatePicker.NextTrigger>
                  </ArkDatePicker.ViewControl>
                  <ArkDatePicker.Table>
                    <ArkDatePicker.TableHead>
                      <ArkDatePicker.TableRow>
                        {dp.weekDays.map((day: any, index: number) => (
                          <ArkDatePicker.TableHeader key={index} aria-label={day.long}>
                            {day.narrow}
                          </ArkDatePicker.TableHeader>
                        ))}
                      </ArkDatePicker.TableRow>
                    </ArkDatePicker.TableHead>
                    <ArkDatePicker.TableBody>
                      {dp.weeks.map((week: any[], index: number) => (
                        <ArkDatePicker.TableRow key={index}>
                          {week.map((day: any, dayIndex: number) => (
                            <ArkDatePicker.TableCell key={dayIndex} value={day}>
                              <ArkDatePicker.TableCellTrigger>
                                {day.day}
                              </ArkDatePicker.TableCellTrigger>
                            </ArkDatePicker.TableCell>
                          ))}
                        </ArkDatePicker.TableRow>
                      ))}
                    </ArkDatePicker.TableBody>
                  </ArkDatePicker.Table>
                </>
              )}
            </ArkDatePicker.Context>
          </ArkDatePicker.View>
        </ArkDatePicker.Content>
      </ArkDatePicker.Positioner>
    </DatePickerRoot>
  );
}

export const DatePicker: typeof DatePickerFacade &
  Omit<typeof ArkDatePicker, "Root"> & { Root: typeof DatePickerRoot } = Object.assign(
  DatePickerFacade,
  {
    ...ArkDatePicker,
    Root: DatePickerRoot,
  },
) as typeof DatePickerFacade & Omit<typeof ArkDatePicker, "Root"> & { Root: typeof DatePickerRoot };
