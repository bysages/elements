import type { EditableRootProps as ArkEditableRootProps } from "@ark-ui/svelte/editable";

export type EditableRootProps = ArkEditableRootProps & {
  /** One rung of the control-height ladder for the editing field. */
  size?: "sm" | "md" | "lg";
};
