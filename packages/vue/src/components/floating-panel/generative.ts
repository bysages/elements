import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { FloatingPanel } from "./index";

/** A draggable floating sheet. */
export default defineEntry({
  FloatingPanel: {
    props: z.object({ title: z.string().optional() }),
    slots: ["default"],
    description: "A draggable floating sheet.",
    component: ({ props, children }) =>
      h(FloatingPanel.Root, { defaultOpen: true }, () => [
        h(FloatingPanel.Trigger, () => props.title ?? "Open panel"),
        h(FloatingPanel.Positioner, () =>
          h(FloatingPanel.Content, () => [
            h(FloatingPanel.DragTrigger, () =>
              h(FloatingPanel.Header, () => [
                h(FloatingPanel.Title, () => props.title ?? "Panel"),
                h(FloatingPanel.Control, () => [
                  h(FloatingPanel.StageTrigger, { stage: "minimized" } as never, () => "-"),
                  h(FloatingPanel.CloseTrigger, () => "x"),
                ]),
              ]),
            ),
            h(FloatingPanel.Body, () => slotted(children)),
          ]),
        ),
      ]),
  },
});
