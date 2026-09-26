import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type FileUploadRootProps = ComponentProps<typeof ArkFileUpload.Root> & {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function FileUploadRoot({ size = "md", ...rest }: FileUploadRootProps) {
  return <ArkFileUpload.Root {...rest} data-size={size} />;
}

/** Ark's FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The API is Ark's own — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const FileUpload: Omit<typeof ArkFileUpload, "Root"> & { Root: typeof FileUploadRoot } = {
  ...ArkFileUpload,
  Root: FileUploadRoot,
};

injectComponentStyle("file-upload");
