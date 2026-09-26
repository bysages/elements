import type { PinInputRootProps as ArkPinInputRootProps } from "@ark-ui/svelte/pin-input";

export type PinInputRootProps = ArkPinInputRootProps & {
  /** One rung of the control-height ladder each seal stands on. */
  size?: "sm" | "md" | "lg";
};
