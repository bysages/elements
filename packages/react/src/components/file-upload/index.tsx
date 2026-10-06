import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type FileUploadRootProps = ComponentProps<typeof ArkFileUpload.Root> & {
  /** One rung of the control-height ladder for the trigger. */
  size?: "sm" | "md" | "lg";
};

function FileUploadRoot(props: FileUploadRootProps) {
  const id = useElementId("file-upload", props);
  const { size = "md", ...rest } = props;

  return <ArkFileUpload.Root {...rest} id={id} data-size={size} />;
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

const fileIcon = iconNode("file", { width: 16, height: 16 });

const uploadIcon = iconNode("upload", { width: 28, height: 28 });

const closeIcon = iconNode("x", { width: 14, height: 14 });

interface FileUploadFacadeProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  maxFiles?: number;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

/** The one-tag path: a labelled dropzone and its accepted slips; MIME
 * rules, directories, and controlled files stay on the anatomy. */
function FileUploadFacade({
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  maxFiles,
  size = "md",
}: FileUploadFacadeProps) {
  return (
    <FileUploadRoot
      size={size}
      disabled={disabled}
      invalid={invalid}
      required={required}
      maxFiles={maxFiles}
    >
      {label ? <ArkFileUpload.Label>{label}</ArkFileUpload.Label> : null}
      <ArkFileUpload.Dropzone>
        <FileUploadTrigger>
          {uploadIcon}
          {placeholder ?? "Choose files"}
        </FileUploadTrigger>
      </ArkFileUpload.Dropzone>
      <ArkFileUpload.ItemGroup>
        <ArkFileUpload.Context>
          {(api: { acceptedFiles: File[] }) =>
            api.acceptedFiles.map((file) => (
              <ArkFileUpload.Item key={file.name} file={file}>
                <ArkFileUpload.ItemPreview>{fileIcon}</ArkFileUpload.ItemPreview>
                <ArkFileUpload.ItemName />
                <ArkFileUpload.ItemSizeText />
                <ArkFileUpload.ItemDeleteTrigger>{closeIcon}</ArkFileUpload.ItemDeleteTrigger>
              </ArkFileUpload.Item>
            ))
          }
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>
      <ArkFileUpload.HiddenInput />
    </FileUploadRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const FileUpload = Object.assign(FileUploadFacade, {
  ...ArkFileUpload,
  Root: FileUploadRoot,
  Trigger: FileUploadTrigger,
});

injectComponentStyle("file-upload");
