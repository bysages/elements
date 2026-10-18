import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { FileUpload } from "./index";

/** A dropzone that accepts files; multiple raises the accepted count. */
export default defineEntry({
  FileUpload: {
    props: z.object({
      label: z.string().optional(),
      accept: z.string().optional(),
      multiple: z.boolean().optional(),
    }),
    description: "A dropzone that accepts files; multiple raises the accepted count.",
    component: ({ props }) =>
      h(FileUpload, {
        label: props.label,
        maxFiles: props.multiple ? 5 : 1,
        ...(props.accept ? { accept: props.accept } : {}),
      }),
  },
});
