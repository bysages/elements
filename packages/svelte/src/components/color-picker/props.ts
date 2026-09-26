import type { ColorPickerRootProps as ArkColorPickerRootProps } from "@ark-ui/svelte/color-picker";

export type ColorPickerRootProps = ArkColorPickerRootProps & {
  /** One rung of the control-height ladder for the swatch seal. */
  size?: "sm" | "md" | "lg";
};
