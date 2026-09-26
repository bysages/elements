import type { ClipboardRootProps as ArkClipboardRootProps } from "@ark-ui/svelte/clipboard";

export type ClipboardRootProps = ArkClipboardRootProps & {
  /** One rung of the control-height ladder for the value field and
   * its copy seal. */
  size?: "sm" | "md" | "lg";
};
