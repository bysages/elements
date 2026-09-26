import { FileUpload as ArkFileUpload } from "@ark-ui/solid/file-upload";
import type { FileUploadRootProps as ArkFileUploadRootProps } from "@ark-ui/solid/file-upload";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The API is Ark's own — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */

type FileUploadOwnProps = {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function FileUploadRoot(props: ArkFileUploadRootProps & FileUploadOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkFileUpload.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const FileUpload: Omit<typeof ArkFileUpload, "Root"> & { Root: typeof FileUploadRoot } = {
  ...ArkFileUpload,
  Root: FileUploadRoot,
};

injectComponentStyle("file-upload");
