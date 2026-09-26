import type { NumberInputRootProps as ArkNumberInputRootProps } from "@ark-ui/svelte/number-input";

export type NumberInputRootProps = ArkNumberInputRootProps & {
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
};
