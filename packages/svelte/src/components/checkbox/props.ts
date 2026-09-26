import type { CheckboxRootProps as ArkCheckboxRootProps } from "@ark-ui/svelte/checkbox";

export type CheckboxRootProps = ArkCheckboxRootProps & {
  /** One rung for the control's box: the tick scales with it. */
  size?: "sm" | "md" | "lg";
};
