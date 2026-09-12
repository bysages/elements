import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { FloatingPanel } from "./index.js";

const meta: Meta = { title: "Components / Floating Panel" };
export default meta;

function glyph(d: string) {
  return h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d })],
  );
}

/** Toggle the sheet open, drag it by its header, resize it from the rim and
 * stage it small, large or home from the control seals. */
export const Basic = {
  render: () =>
    h(FloatingPanel.Root, () => [
      h(FloatingPanel.Trigger, () => "Open panel"),
      h(Teleport, { to: "body" }, () => [
        h(FloatingPanel.Positioner, () =>
          h(FloatingPanel.Content, () => [
            h(FloatingPanel.DragTrigger, () =>
              h(FloatingPanel.Header, () => [
                h(FloatingPanel.Title, () => [
                  glyph("M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01"),
                  "Notes",
                ]),
                h(FloatingPanel.Control, () => [
                  h(FloatingPanel.StageTrigger, { stage: "minimized" }, () => glyph("M5 12h14")),
                  h(FloatingPanel.StageTrigger, { stage: "maximized" }, () =>
                    glyph("M4 9V4h5M20 15v5h-5"),
                  ),
                  h(FloatingPanel.StageTrigger, { stage: "default" }, () =>
                    glyph("M15 15l-6-6M15 9v6H9"),
                  ),
                  h(FloatingPanel.CloseTrigger, () => glyph("M6 6l12 12M18 6L6 18")),
                ]),
              ]),
            ),
            h(FloatingPanel.Body, () =>
              h("p", () => "A sheet of paper you can move: drag the header, pull the rim."),
            ),
            ...(["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const).map((axis) =>
              h(FloatingPanel.ResizeTrigger, { key: axis, axis }),
            ),
          ]),
        ),
      ]),
    ]),
};
