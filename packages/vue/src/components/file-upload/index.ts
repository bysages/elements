import { FileUpload as ArkFileUpload } from "@ark-ui/vue/file-upload";
import { injectComponentStyle } from "@bysages/core";

/** FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The parts — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */
export const FileUpload = ArkFileUpload;

injectComponentStyle("file-upload");
