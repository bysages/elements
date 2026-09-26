import type { SwitchRootProps as ArkSwitchRootProps } from "@ark-ui/svelte/switch";

export type SwitchRootProps = ArkSwitchRootProps & {
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
};
