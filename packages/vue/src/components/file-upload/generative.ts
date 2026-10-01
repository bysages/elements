import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
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
      const upload = () =>
        h(
          "svg",
          {
            width: 20,
            height: 20,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.75,
            "aria-hidden": true,
          },
          [h("path", { d: "M12 16V5m0 0-4 4m4-4 4 4M5 19h14" })],
        );
      return labelled(
        props.label,
        h(
          FileUpload.Root as never,
          { accept: props.accept, maxFiles: props.multiple ? 5 : 1 } as never,
          () => [
            h(FileUpload.Dropzone, () => [
              upload(),
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
