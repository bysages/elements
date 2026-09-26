import type { RadioGroupRootProps as ArkRadioGroupRootProps } from "@ark-ui/svelte/radio-group";

export type RadioGroupRootProps = ArkRadioGroupRootProps & {
  /** One rung for the dial; the chosen dot rides it. */
  size?: "sm" | "md" | "lg";
};
