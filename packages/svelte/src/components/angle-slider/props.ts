import type { AngleSliderRootProps as ArkAngleSliderRootProps } from "@ark-ui/svelte/angle-slider";

export type AngleSliderRootProps = ArkAngleSliderRootProps & {
  /** One rung of the dial ladder — the diameter the needle sweeps. */
  size?: "sm" | "md" | "lg";
};
