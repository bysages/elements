import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { FileUpload } from "./index.js";

const meta: Meta = { title: "Components / File Upload" };
export default meta;

function fileGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Zm0 0v4h4" })],
  );
}

function uploadGlyph() {
  return h(
    "svg",
    {
      width: 28,
      height: 28,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.5,
      "aria-hidden": true,
    },
    [h("path", { d: "M12 16V5m0 0-4 4m4-4 4 4M5 19h14" })],
  );
}

function closeGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 6 12 12M18 6 6 18" })],
  );
}

function clipGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("path", {
        d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      }),
    ],
  );
}

/** The accepted files land as loose hairline slips: preview, name, size,
 * and a delete glyph. */
function slips() {
  return h(FileUpload.ItemGroup, () =>
    h(FileUpload.Context, null, {
      default: (api: any) =>
        api.acceptedFiles.map((file: File) =>
          h(FileUpload.Item, { key: file.name, file }, () => [
            h(FileUpload.ItemPreview, () => fileGlyph()),
            h(FileUpload.ItemName),
            h(FileUpload.ItemSizeText),
            h(FileUpload.ItemDeleteTrigger, () => closeGlyph()),
          ]),
        ),
    }),
  );
}

/** Drop files onto the dashed paper or pick them with the trigger; each
 * accepted file lands as a loose slip with a delete glyph. */
export const Basic = {
  render: () =>
    h(FileUpload.Root, { maxFiles: 5 }, () => [
      h(FileUpload.Label, () => "Attachments"),
      h(FileUpload.Dropzone, () => [
        uploadGlyph(),
        h("span", () => "Drag files here or"),
        h(FileUpload.Trigger, () => "Choose files"),
      ]),
      slips(),
      h(FileUpload.HiddenInput),
    ]),
};

/** Without the dropzone: a plain trigger and its quiet twin, clear-all,
 * which only lights up once something rests on the paper. */
export const ClearTrigger = {
  render: () =>
    h(FileUpload.Root, { maxFiles: 5, accept: "image/png,image/jpeg" }, () => [
      h(FileUpload.Label, () => "Upload"),
      h("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" } }, () => [
        h(FileUpload.Trigger, () => [clipGlyph(), "Choose file(s)"]),
        h(FileUpload.ClearTrigger, () => "Clear files"),
      ]),
      slips(),
      h(FileUpload.HiddenInput),
    ]),
};

/** The door only admits certain papers: PNG and JPEG pass, the rest are
 * turned away with a reason. */
export const AcceptedFileTypes = {
  render: () =>
    h(FileUpload.Root, { accept: "image/png,image/jpeg" }, () => [
      h(FileUpload.Label, () => "Photograph"),
      h(FileUpload.Dropzone, () => [
        uploadGlyph(),
        h("span", () => "PNG or JPEG only"),
        h(FileUpload.Trigger, () => "Choose image"),
      ]),
      slips(),
      h(FileUpload.HiddenInput),
    ]),
};

/** Point the dropzone at directories: whole folders land as slips. */
export const DirectoryUpload = {
  render: () =>
    h(FileUpload.Root, { directory: true } as any, () => [
      h(FileUpload.Label, () => "Archive"),
      h(FileUpload.Dropzone, () => [
        uploadGlyph(),
        h("span", () => "Drop a folder here"),
        h(FileUpload.Trigger, () => "Choose folder"),
      ]),
      slips(),
      h(FileUpload.HiddenInput),
    ]),
};

/** The paper may arrive already carrying files — the slips start filled. */
export const InitialFiles = {
  render: () => {
    const initial = [
      new File([""], "invoice-2026.pdf", { type: "application/pdf" }),
      new File([""], "receipt.png", { type: "image/png" }),
    ];
    return h(FileUpload.Root, { defaultAcceptedFiles: initial } as any, () => [
      h(FileUpload.Label, () => "Documents"),
      h(FileUpload.Trigger, () => "Choose files"),
      slips(),
      h(FileUpload.HiddenInput),
    ]);
  },
};

/** Oversize or wrong-kind files are turned away; the rejection names the
 * file and the reason. */
export const RejectedFiles = {
  render: () => {
    const Bound = defineComponent({
      name: "RejectedFilesUpload",
      setup() {
        const state = reactive({ rejected: [] as string[] });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "24rem" } }, [
            h(
              FileUpload.Root,
              {
                maxFiles: 2,
                onFileReject: (e: { files: { file: File; errors: { message: string }[] }[] }) =>
                  (state.rejected = e.files.map(
                    (r) => `${r.file.name} — ${r.errors[0]?.message ?? "rejected"}`,
                  )),
              } as any,
              () => [
                h(FileUpload.Label, () => "Small images"),
                h(FileUpload.Dropzone, () => [
                  uploadGlyph(),
                  h("span", () => "Two files, no more"),
                  h(FileUpload.Trigger, () => "Choose files"),
                ]),
                slips(),
                h(FileUpload.HiddenInput),
              ],
            ),
            state.rejected.length
              ? h(
                  "ul",
                  {
                    style: {
                      margin: 0,
                      paddingInlineStart: "1.25rem",
                      fontSize: "var(--bs-font-size-sm)",
                      color: "var(--bs-color-danger)",
                    },
                  },
                  state.rejected.map((line, index) => h("li", { key: index }, line)),
                )
              : null,
          ]);
      },
    });
    return h(Bound);
  },
};

/** Size gates and type gates together: images or PDFs, at least 1 KB and
 * at most 1 MB each. */
export const ErrorHandling = {
  render: () =>
    h(
      FileUpload.Root,
      {
        maxFiles: 3,
        maxFileSize: 1024 * 1024,
        minFileSize: 1024,
        accept: "image/*,application/pdf",
      },
      () => [
        h(FileUpload.Label, () => "Records"),
        h(FileUpload.Dropzone, () => [
          uploadGlyph(),
          h("span", () => "Images or PDFs · 1 KB – 1 MB · up to 3"),
          h(FileUpload.Trigger, () => "Choose files"),
        ]),
        slips(),
        h(FileUpload.HiddenInput),
      ],
    ),
};

/** Under a form name the chosen files ride the hidden inputs on submit. */
export const FormUsage = {
  render: () =>
    h(
      "form",
      {
        onSubmit: (e: Event) => e.preventDefault(),
        style: { display: "grid", gap: "0.75rem", maxWidth: "24rem" },
      },
      [
        h(FileUpload.Root, { maxFiles: 5, name: "files" }, () => [
          h(FileUpload.Label, () => "Enclosures"),
          h(FileUpload.Dropzone, () => [
            uploadGlyph(),
            h("span", () => "They submit with the form"),
            h(FileUpload.Trigger, () => "Choose files"),
          ]),
          slips(),
          h(FileUpload.HiddenInput),
        ]),
        h("button", { type: "submit" }, "Submit"),
      ],
    ),
};
