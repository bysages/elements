import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { PageHeader } from "./index";

/** A page's opening: title over description, actions at the trailing edge. */
export default defineEntry({
  PageHeader: {
    props: z.object({ title: z.string().optional(), description: z.string().optional() }),
    slots: ["default", "actions"],
    description: "A page's opening: title over description, actions at the trailing edge.",
    component: ({ props, children, slots }) =>
      h(PageHeader.Root, () => [
        h(PageHeader.Heading, () => [
          props.title != null ? h(PageHeader.Title, () => props.title!) : null,
          slots?.actions?.() ? h(PageHeader.Actions, () => slotted(slots?.actions?.())) : null,
        ]),
        props.description != null ? h(PageHeader.Description, () => props.description!) : null,
        children != null ? h("div", () => slotted(children)) : null,
      ]),
  },
});
