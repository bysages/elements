import type { StepsRootProps as ArkStepsRootProps } from "@ark-ui/svelte/steps";

export type StepsRootProps = ArkStepsRootProps & {
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
};
