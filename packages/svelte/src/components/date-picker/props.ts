import type { DatePickerRootProps as ArkDatePickerRootProps } from "@ark-ui/svelte/date-picker";

export type DatePickerRootProps = ArkDatePickerRootProps & {
  /** One rung of the control-height ladder for the field row. */
  size?: "sm" | "md" | "lg";
};
