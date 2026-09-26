import type { ToggleGroupRootProps as ArkToggleGroupRootProps } from "@ark-ui/svelte/toggle-group";

export type ToggleGroupRootProps = ArkToggleGroupRootProps & {
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
};
