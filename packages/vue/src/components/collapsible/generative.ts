import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Collapsible } from "./index";

/** One fold: a trigger row and the content beneath. */
export default defineEntry({
  Collapsible: {
    props: z.object({ title: z.string().optional() }),
    slots: ["default"],
    description: "One fold: a trigger row and the content beneath.",
    component: ({ props, children }) =>
      h(Collapsible.Root, { defaultOpen: true }, () => [
        h(Collapsible.Trigger, () => [props.title ?? "Details", h(Collapsible.Indicator)]),
        h(Collapsible.Content, () => slotted(children)),
      ]),
  },
});
