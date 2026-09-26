import type { SliderRootProps as ArkSliderRootProps } from "@ark-ui/svelte/slider";

export type SliderRootProps = ArkSliderRootProps & {
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
};
