import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Empty } from "./index";

/** The quiet state when a collection holds nothing yet. */
export default defineEntry({
  Empty: {
    props: z.object({ title: z.string().optional(), description: z.string().optional() }),
    slots: ["default"],
    description: "The quiet state when a collection holds nothing yet.",
    component: ({ props, children }) => {
      const tray = () => iconNode("inbox", { width: 48, height: 48 });
      return h(Empty.Root, () => [
        h(Empty.Visual, () => tray()),
        props.title != null ? h(Empty.Title, () => props.title!) : null,
        props.description != null ? h(Empty.Description, () => props.description!) : null,
        slotted(children).length ? h(Empty.Actions, () => slotted(children)) : null,
      ]);
    },
  },
});
