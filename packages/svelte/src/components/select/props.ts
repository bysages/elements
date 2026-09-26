import type { SelectRootProps as ArkSelectRootProps } from "@ark-ui/svelte/select";

export type SelectRootProps = ArkSelectRootProps & {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};
