import type { TagsInputRootProps as ArkTagsInputRootProps } from "@ark-ui/svelte/tags-input";

export type TagsInputRootProps = ArkTagsInputRootProps & {
  /** One rung of the control-height ladder for the vessel at rest. */
  size?: "sm" | "md" | "lg";
};
