import type { ProgressRootProps as ArkProgressRootProps } from "@ark-ui/svelte/progress";

export type ProgressRootProps = ArkProgressRootProps & {
  /** One rung of the groove ladder — the track's thickness. */
  size?: "sm" | "md" | "lg";
};
