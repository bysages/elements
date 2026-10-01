import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Dialog } from "./index";

/** A modal sheet over the page; title and description name it, children are its body. */
export default defineEntry({
  Dialog: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      open: z.boolean().optional(),
    }),
    slots: ["default"],
    description:
      "A modal sheet over the page; title and description name it, children are its body.",
    component: ({ props, children }) =>
      h(Dialog.Root, { defaultOpen: props.open ?? true }, () => [
        h(Dialog.Backdrop as never),
        h(Dialog.Positioner, () =>
          h(Dialog.Content, () => [
            props.title != null ? h(Dialog.Title, () => props.title!) : null,
            props.description != null ? h(Dialog.Description, () => props.description!) : null,
            h(Dialog.CloseTrigger, () => "x"),
            ...slotted(children),
          ]),
        ),
      ]),
  },
});
