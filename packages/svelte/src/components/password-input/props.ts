import type { PasswordInputRootProps as ArkPasswordInputRootProps } from "@ark-ui/svelte/password-input";

export type PasswordInputRootProps = ArkPasswordInputRootProps & {
  /** One rung of the control-height ladder for the field and its eye. */
  size?: "sm" | "md" | "lg";
};
