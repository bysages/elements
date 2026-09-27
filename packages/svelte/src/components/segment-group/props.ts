import type { SegmentGroupRootProps as ArkSegmentGroupRootProps } from "@ark-ui/svelte/segment-group";

export type SegmentGroupRootProps = ArkSegmentGroupRootProps & {
  /** One rung of the control-height ladder for the segments. The
   * family keeps its compact register, so the rungs sit one notch
   * below the global ladder - the default md rests at the small
   * height. */
  size?: "sm" | "md" | "lg";
};
