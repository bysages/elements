import { h } from "vue";
import { z } from "zod";

import { announce, workbenchToaster, Toaster } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Toast } from "./index";

/** A transient notice; render it where the story needs one. */
export default defineEntry({
  Toast: {
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      type: z.string().optional(),
    }),
    description: "A transient notice; render it where the story needs one.",
    component: ({ props }) => {
      announce(props.type ?? "info", props.title, props.description);
      return h(
        Toaster,
        { toaster: workbenchToaster },
        {
          default: (toast: any) => [
            h(Toast.Root, { key: toast.id }, () => [
              h(Toast.Title, () => toast.title),
              toast.description != null ? h(Toast.Description, () => toast.description) : null,
              h(Toast.CloseTrigger, { "aria-label": "Close" }, () => "x"),
            ]),
          ],
        },
      );
    },
  },
});
