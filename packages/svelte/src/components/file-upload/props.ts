import type { FileUploadRootProps as ArkFileUploadRootProps } from "@ark-ui/svelte/file-upload";

export type FileUploadRootProps = ArkFileUploadRootProps & {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};
