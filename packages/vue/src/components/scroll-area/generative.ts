import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { ScrollArea } from "./index";

/** A region with a quiet custom scrollbar. */
export default defineEntry({
  ScrollArea: {
    props: z.object({}),
    slots: ["default"],
    description: "A region with a quiet custom scrollbar.",
    component: ({ children }) =>
      h(ScrollArea.Root as never, { style: { blockSize: "16rem" } } as never, () => [
        h(ScrollArea.Viewport, () => h(ScrollArea.Content, () => slotted(children))),
        h(ScrollArea.Scrollbar, () => h(ScrollArea.Thumb)),
      ]),
  },
});
