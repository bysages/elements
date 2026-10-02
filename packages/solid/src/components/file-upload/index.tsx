import { FileUpload as ArkFileUpload } from "@ark-ui/solid/file-upload";
import type { FileUploadRootProps as ArkFileUploadRootProps } from "@ark-ui/solid/file-upload";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

/** The inner trigger repeats the click binding the dropzone already
 * owns: keyboard users enter through the dropzone, so the button
 * leaves the tab order and the semantic tree entirely. */
function FileUploadTrigger(props: ComponentProps<typeof ArkFileUpload.Trigger>) {
  return <ArkFileUpload.Trigger {...props} tabindex={-1} aria-hidden="true" />;
}

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
export const FileUpload: Omit<typeof ArkFileUpload, "Root" | "Trigger"> & {
  Root: typeof FileUploadRoot;
  Trigger: typeof FileUploadTrigger;
} = {
  ...ArkFileUpload,
  Root: FileUploadRoot,
  Trigger: FileUploadTrigger,
};

injectComponentStyle("file-upload");
