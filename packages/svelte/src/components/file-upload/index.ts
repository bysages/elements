/** Ark's FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The API is Ark's own — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";

import FileUploadRoot from "./FileUploadRoot.svelte";
import FileUploadTrigger from "./FileUploadTrigger.svelte";

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
