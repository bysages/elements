import { DownloadTrigger } from "@ark-ui/vue/download-trigger";
import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";

/** A control that hands the user a file. */
export default defineEntry({
  DownloadTrigger: {
    props: z.object({
      label: z.string().optional(),
      fileName: z.string().optional(),
      data: z.string().optional(),
    }),
    description: "A control that hands the user a file.",
    component: ({ props }) =>
      h(
        DownloadTrigger as never,
        {
          fileName: props.fileName ?? "elements.txt",
          mimeType: "text/plain",
          source: props.data ?? "Elements — paper and ink.\n",
        } as never,
        () => props.label ?? "Download",
      ),
  },
});
