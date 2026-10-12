import { FileUpload as ArkFileUpload } from "@ark-ui/solid/file-upload";
import type { FileUploadRootProps as ArkFileUploadRootProps } from "@ark-ui/solid/file-upload";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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
  const id = useElementId("file-upload", () => rest.id);
  return <ArkFileUpload.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The one-tag path: a labelled dropzone and its accepted slips; MIME
 * rules, directories, and controlled files stay on the anatomy. */
export interface FileUploadFacadeProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  maxFiles?: number;
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
}

function FileUploadFacade(props: FileUploadFacadeProps) {
  injectComponentStyle("file-upload");

  return (
    <FileUploadRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      maxFiles={props.maxFiles}
    >
      <Show when={props.label}>
        <ArkFileUpload.Label>{props.label}</ArkFileUpload.Label>
      </Show>
      <ArkFileUpload.Dropzone>
        <FileUploadTrigger>{props.placeholder ?? "Choose files"}</FileUploadTrigger>
      </ArkFileUpload.Dropzone>
      <ArkFileUpload.ItemGroup>
        <ArkFileUpload.Context>
          {(context) => (
            <For each={context().acceptedFiles}>
              {(file) => (
                <ArkFileUpload.Item file={file}>
                  <ArkFileUpload.ItemPreview>{iconNode("file")}</ArkFileUpload.ItemPreview>
                  <ArkFileUpload.ItemName />
                  <ArkFileUpload.ItemSizeText />
                  <ArkFileUpload.ItemDeleteTrigger>{iconNode("x")}</ArkFileUpload.ItemDeleteTrigger>
                </ArkFileUpload.Item>
              )}
            </For>
          )}
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>
      <ArkFileUpload.HiddenInput />
    </FileUploadRoot>
  );
}

type FileUploadParts = Omit<typeof ArkFileUpload, "Root" | "Trigger"> & {
  Root: typeof FileUploadRoot;
  Trigger: typeof FileUploadTrigger;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const FileUpload: typeof FileUploadFacade & FileUploadParts = defineFamily(
  FileUploadFacade,
  {
    ...ArkFileUpload,
    Root: FileUploadRoot,
    Trigger: FileUploadTrigger,
  },
);

injectComponentStyle("file-upload");
