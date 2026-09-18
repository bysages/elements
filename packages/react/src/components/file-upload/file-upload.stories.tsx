import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { FileUpload } from ".";

const meta: Meta = { title: "Components/Forms/File Upload" };
export default meta;

const fileGlyph = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Zm0 0v4h4" />
  </svg>
);

const uploadGlyph = (
  <svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14" />
  </svg>
);

const closeGlyph = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const clipGlyph = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

/** The accepted files land as loose hairline slips: preview, name, size,
 * and a delete glyph. */
function slips() {
  return (
    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {(api: any) =>
          api.acceptedFiles.map((file: File) => (
            <FileUpload.Item key={file.name} file={file}>
              <FileUpload.ItemPreview>{fileGlyph}</FileUpload.ItemPreview>
              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger>{closeGlyph}</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  );
}

/** Drop files onto the dashed paper or pick them with the trigger; each
 * accepted file lands as a loose slip with a delete glyph. */
export const Basic = {
  args: {
    label: "Attachments",
    dropzoneText: "Drag files here or",
    triggerText: "Choose files",
  },
  render: (args: any) => (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Label>{args.label}</FileUpload.Label>
      <FileUpload.Dropzone>
        {uploadGlyph}
        <span>{args.dropzoneText}</span>
        <FileUpload.Trigger>{args.triggerText}</FileUpload.Trigger>
      </FileUpload.Dropzone>
      {slips()}
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  ),
};

/** Without the dropzone: a plain trigger and its quiet twin, clear-all,
 * which only lights up once something rests on the paper. */
export const ClearTrigger = {
  render: () => (
    <FileUpload.Root maxFiles={5} accept="image/png,image/jpeg">
      <FileUpload.Label>Upload</FileUpload.Label>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <FileUpload.Trigger>
          {clipGlyph}
          Choose file(s)
        </FileUpload.Trigger>
        <FileUpload.ClearTrigger>Clear files</FileUpload.ClearTrigger>
      </div>
      {slips()}
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  ),
};

/** The door only admits certain papers: PNG and JPEG pass, the rest are
 * turned away with a reason. */
export const AcceptedFileTypes = {
  render: () => (
    <FileUpload.Root accept="image/png,image/jpeg">
      <FileUpload.Label>Photograph</FileUpload.Label>
      <FileUpload.Dropzone>
        {uploadGlyph}
        <span>PNG or JPEG only</span>
        <FileUpload.Trigger>Choose image</FileUpload.Trigger>
      </FileUpload.Dropzone>
      {slips()}
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  ),
};

/** Point the dropzone at directories: whole folders land as slips. */
export const DirectoryUpload = {
  render: () => (
    <FileUpload.Root directory>
      <FileUpload.Label>Archive</FileUpload.Label>
      <FileUpload.Dropzone>
        {uploadGlyph}
        <span>Drop a folder here</span>
        <FileUpload.Trigger>Choose folder</FileUpload.Trigger>
      </FileUpload.Dropzone>
      {slips()}
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  ),
};

/** The paper may arrive already carrying files — the slips start filled. */
export const InitialFiles = {
  render: () => {
    const initial = [
      new File([""], "invoice-2026.pdf", { type: "application/pdf" }),
      new File([""], "receipt.png", { type: "image/png" }),
    ];
    return (
      <FileUpload.Root defaultAcceptedFiles={initial}>
        <FileUpload.Label>Documents</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        {slips()}
        <FileUpload.HiddenInput />
      </FileUpload.Root>
    );
  },
};

/** Oversize or wrong-kind files are turned away; the rejection names the
 * file and the reason. */
export const RejectedFiles = {
  render: () => {
    const [rejected, setRejected] = useState<string[]>([]);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}>
        <FileUpload.Root
          maxFiles={2}
          onFileReject={(e: any) =>
            setRejected(
              e.files.map((r: any) => `${r.file.name} — ${r.errors[0]?.message ?? "rejected"}`),
            )
          }
        >
          <FileUpload.Label>Small images</FileUpload.Label>
          <FileUpload.Dropzone>
            {uploadGlyph}
            <span>Two files, no more</span>
            <FileUpload.Trigger>Choose files</FileUpload.Trigger>
          </FileUpload.Dropzone>
          {slips()}
          <FileUpload.HiddenInput />
        </FileUpload.Root>
        {rejected.length ? (
          <ul
            style={{
              margin: 0,
              paddingInlineStart: "1.25rem",
              fontSize: "var(--bs-font-size-sm)",
              color: "var(--bs-color-danger)",
            }}
          >
            {rejected.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
};

/** Size gates and type gates together: images or PDFs, at least 1 KB and
 * at most 1 MB each. */
export const ErrorHandling = {
  render: () => (
    <FileUpload.Root
      maxFiles={3}
      maxFileSize={1024 * 1024}
      minFileSize={1024}
      accept="image/*,application/pdf"
    >
      <FileUpload.Label>Records</FileUpload.Label>
      <FileUpload.Dropzone>
        {uploadGlyph}
        <span>Images or PDFs · 1 KB – 1 MB · up to 3</span>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      </FileUpload.Dropzone>
      {slips()}
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  ),
};

/** Under a form name the chosen files ride the hidden inputs on submit. */
export const FormUsage = {
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}
    >
      <FileUpload.Root maxFiles={5} name="files">
        <FileUpload.Label>Enclosures</FileUpload.Label>
        <FileUpload.Dropzone>
          {uploadGlyph}
          <span>They submit with the form</span>
          <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        </FileUpload.Dropzone>
        {slips()}
        <FileUpload.HiddenInput />
      </FileUpload.Root>
      <button type="submit">Submit</button>
    </form>
  ),
};
