import type { SelectRootProps as ArkSelectRootProps } from "@ark-ui/svelte/select";

export type SelectValue = string | string[];

export interface SelectFacadeProps extends Omit<
  ArkSelectRootProps,
  "value" | "defaultValue" | "onValueChange"
> {
  /** Bind a scalar model for single select, or an array for multiple. */
  value?: SelectValue;
  /** The initial value when `value` is not bound. */
  defaultValue?: SelectValue;
  /** Single select always reports an empty string after clearing. */
  onValueChange?: (value: SelectValue) => void;
}

export type SelectRootProps = ArkSelectRootProps & {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};
