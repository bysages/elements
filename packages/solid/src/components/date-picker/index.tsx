import {
  DatePicker as ArkDatePicker,
  type DatePickerDateRangePreset,
  type DateValue,
} from "@ark-ui/solid/date-picker";
import type { DatePickerRootProps as ArkDatePickerRootProps } from "@ark-ui/solid/date-picker";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's DatePicker, dressed in the paper-and-ink system: the popup
 * dissolves in on elevation, selected days take the flat ink fill, and
 * range middles run subtle with cut corners. The API is Ark's own —
 * Root, Label, Control, Input, Trigger, ClearTrigger, Positioner,
 * Content, View, ViewControl, ViewTrigger, RangeText, PrevTrigger,
 * NextTrigger, Table*, MonthSelect, YearSelect, PresetTrigger. */

type DatePickerOwnProps = {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};

function DatePickerRoot(props: ArkDatePickerRootProps & DatePickerOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("date-picker", () => rest.id);
  return <ArkDatePicker.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

type DatePickerFacadeValue = DateValue | DateValue[];

/** One quick choice in the popup: a named range, or exact dates. */
export type DatePickerPreset = {
  label: string;
  value: DatePickerDateRangePreset | DateValue[];
};

function toDatePickerValue(value: DatePickerFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete picker behind one date: the field opens a single day grid,
 * while ranges, multiple selection, and custom views remain anatomy work. */
export interface DatePickerFacadeProps {
  value?: DatePickerFacadeValue;
  defaultValue?: DatePickerFacadeValue;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
  /** Quick choices rendered above the calendar; the picker's own preset
   * machine resolves named ranges. */
  presets?: DatePickerPreset[];
  onValueChange?: (value: DateValue[]) => void;
}

function DatePickerFacade(props: DatePickerFacadeProps) {
  injectComponentStyle("date-picker");

  return (
    <DatePickerRoot
      size={props.size ?? "md"}
      defaultValue={toDatePickerValue(props.defaultValue)}
      disabled={props.disabled}
      invalid={props.invalid}
      placeholder={props.placeholder}
      required={props.required}
      {...(props.value === undefined ? {} : { value: toDatePickerValue(props.value) })}
      onValueChange={(details) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkDatePicker.Label>{props.label}</ArkDatePicker.Label>
      </Show>
      <ArkDatePicker.Control>
        <ArkDatePicker.Input aria-label={props.label ? undefined : props.placeholder} />
        <ArkDatePicker.Trigger>
          {iconNode("calendar", { width: "16", height: "16" })}
        </ArkDatePicker.Trigger>
      </ArkDatePicker.Control>
      <ArkDatePicker.Positioner>
        <ArkDatePicker.Content>
          <ArkDatePicker.View view="day">
            <ArkDatePicker.Context>
              {(dp) => (
                <>
                  <Show when={props.presets?.length}>
                    <div data-scope="date-picker" data-part="presets">
                      <For each={props.presets}>
                        {(preset) => (
                          <ArkDatePicker.PresetTrigger value={preset.value}>
                            {preset.label}
                          </ArkDatePicker.PresetTrigger>
                        )}
                      </For>
                    </div>
                  </Show>
                  <ArkDatePicker.ViewControl>
                    <ArkDatePicker.PrevTrigger>
                      {iconNode("chevron-left", { width: "14", height: "14" })}
                    </ArkDatePicker.PrevTrigger>
                    <ArkDatePicker.ViewTrigger>
                      <ArkDatePicker.RangeText />
                    </ArkDatePicker.ViewTrigger>
                    <ArkDatePicker.NextTrigger>
                      {iconNode("chevron-right", { width: "14", height: "14" })}
                    </ArkDatePicker.NextTrigger>
                  </ArkDatePicker.ViewControl>
                  <ArkDatePicker.Table>
                    <ArkDatePicker.TableHead>
                      <ArkDatePicker.TableRow>
                        <For each={dp().weekDays}>
                          {(day) => (
                            <ArkDatePicker.TableHeader aria-label={day.long}>
                              {day.narrow}
                            </ArkDatePicker.TableHeader>
                          )}
                        </For>
                      </ArkDatePicker.TableRow>
                    </ArkDatePicker.TableHead>
                    <ArkDatePicker.TableBody>
                      <For each={dp().weeks}>
                        {(week) => (
                          <ArkDatePicker.TableRow>
                            <For each={week}>
                              {(day) => (
                                <ArkDatePicker.TableCell value={day}>
                                  <ArkDatePicker.TableCellTrigger>
                                    {day.day}
                                  </ArkDatePicker.TableCellTrigger>
                                </ArkDatePicker.TableCell>
                              )}
                            </For>
                          </ArkDatePicker.TableRow>
                        )}
                      </For>
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

type DatePickerParts = Omit<typeof ArkDatePicker, "Root"> & {
  Root: typeof DatePickerRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const DatePicker: typeof DatePickerFacade & DatePickerParts = defineFamily(
  DatePickerFacade,
  {
    ...ArkDatePicker,
    Root: DatePickerRoot,
  },
);

injectComponentStyle("date-picker");
