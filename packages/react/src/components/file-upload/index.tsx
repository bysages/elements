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

/** The inner trigger repeats the click binding the dropzone already
 * owns, and no flavor of taming a nested button survives the audit —
 * assistive tech can still land on it. So the visual cue is a plain
 * span wearing the trigger props; the dropzone stays the one real
 * control, keyboard included. */
function FileUploadTrigger(props: ComponentProps<typeof ArkFileUpload.Trigger>) {
  const { children, ...rest } = props;
  return (
    <ArkFileUpload.Trigger asChild {...rest}>
      <span data-scope="file-upload" data-part="trigger" aria-hidden="true">
        {children}
      </span>
    </ArkFileUpload.Trigger>
  );
}

/** Ark's FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The API is Ark's own — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */
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
