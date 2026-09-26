import type { DateInputRootProps as ArkDateInputRootProps } from "@ark-ui/svelte/date-input";

export type DateInputRootProps = ArkDateInputRootProps & {
  /** One rung of the control-height ladder for the segmented field. */
  size?: "sm" | "md" | "lg";
};
