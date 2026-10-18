import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Splitter } from "./index";

/** Resizable panes divided by a draggable rule. */
export default defineEntry({
  Splitter: {
    props: z.object({ orientation: z.enum(["horizontal", "vertical"]).optional() }),
    description: "Resizable panes divided by a draggable rule.",
    component: ({ props }) => {
      const labels = props.panels ?? ["Primary", "Secondary"];
      return h(Splitter, {
        items: labels.map((label: string) => ({ id: slug(label), label })),
        orientation: props.orientation ?? "horizontal",
      });
    },
  },
});
