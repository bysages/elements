import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

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
      h(FileUpload.ItemGroup, () =>
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
      ),
      h(FileUpload.HiddenInput),
    ]),
};
