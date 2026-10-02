import { upload } from "@bysages/icons";
import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { glyphNode } from "../../internal/glyph";
import { FileUpload } from "./index";

/** A dropzone that accepts files; accept is a comma list like image/png. */
export default defineEntry({
  FileUpload: {
    props: z.object({
      label: z.string().optional(),
      accept: z.string().optional(),
      multiple: z.boolean().optional(),
    }),
    description: "A dropzone that accepts files; accept is a comma list like image/png.",
    component: ({ props }) => {
      const uploadGlyph = () => glyphNode(upload, { width: 20, height: 20 });
      return labelled(
        props.label,
        h(
          FileUpload.Root as never,
          { accept: props.accept, maxFiles: props.multiple ? 5 : 1 } as never,
          () => [
            h(FileUpload.Dropzone, () => [
              uploadGlyph(),
              h("span", () => "Drop files here or"),
              h(FileUpload.Trigger, () => "Choose files"),
            ]),
            h(FileUpload.HiddenInput as never),
          ],
        ),
      );
    },
  },
});
