import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Popconfirm } from "./index";

/** A confirm-and-cancel bubble before a real action. */
export default defineEntry({
  Popconfirm: {
    props: z.object({
      message: z.string(),
      confirmText: z.string().optional(),
      cancelText: z.string().optional(),
    }),
    description: "A confirm-and-cancel bubble before a real action.",
    component: ({ props, emit }) =>
      h(
        Popconfirm as never,
        {
          message: props.message,
          confirmText: props.confirmText,
          cancelText: props.cancelText,
          onConfirm: () => emit("confirm"),
          onCancel: () => emit("cancel"),
        } as never,
      ),
  },
});
