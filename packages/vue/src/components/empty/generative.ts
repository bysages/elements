import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Empty } from "./index";

/** The quiet state when a collection holds nothing yet. */
export default defineEntry({
  Empty: {
    props: z.object({ title: z.string().optional(), description: z.string().optional() }),
    slots: ["default"],
    description: "The quiet state when a collection holds nothing yet.",
    component: ({ props, children }) => {
      const tray = () =>
        h(
          "svg",
          {
            width: 48,
            height: 48,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.5,
            "aria-hidden": true,
          },
          [
            h("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
            h("path", {
              d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
            }),
          ],
        );
      return h(Empty.Root, () => [
        h(Empty.Visual, () => tray()),
        props.title != null ? h(Empty.Title, () => props.title!) : null,
        props.description != null ? h(Empty.Description, () => props.description!) : null,
        slotted(children).length ? h(Empty.Actions, () => slotted(children)) : null,
      ]);
    },
  },
});
