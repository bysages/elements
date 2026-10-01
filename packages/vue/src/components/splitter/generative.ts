import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Splitter } from "./index";

/** Resizable panes divided by a draggable rule. */
export default defineEntry({
  Splitter: {
    props: z.object({ orientation: z.enum(["horizontal", "vertical"]).optional() }),
    slots: ["default"],
    description: "Resizable panes divided by a draggable rule.",
    component: ({ props }) => {
      const labels = props.panels ?? ["Primary", "Secondary"];
      const room = (label: string, id: string) =>
        h(
          Splitter.Panel as never,
          { id, style: { display: "grid", placeItems: "center", overflow: "hidden" } },
          () => label,
        );
      return h(Splitter.Root as never, { orientation: props.orientation ?? "horizontal" }, () => [
        room(labels[0] ?? "Primary", "a"),
        h(Splitter.ResizeTrigger as never, { id: "a:b", "aria-label": "Resize" }, () =>
          h(Splitter.ResizeTriggerIndicator as never),
        ),
        room(labels[1] ?? "Secondary", "b"),
      ]);
    },
  },
});
