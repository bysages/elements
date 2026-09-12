import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { Drawer } from "./index.js";

const meta: Meta = { title: "Components / Drawer" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6L6 18" })],
  );
}

/** The sheet rises from the bottom edge, grabber first; the page dims
 * behind it. */
export const Basic = {
  render: () =>
    h(Drawer.Root, () => [
      h(Drawer.Trigger, () => "Open drawer"),
      h(Teleport, { to: "body" }, () => [
        h(Drawer.Backdrop),
        h(Drawer.Positioner, () =>
          h(Drawer.Content, () => [
            h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
            h(Drawer.Title, () => "Settings"),
            h(
              Drawer.Description,
              () => "Preferences travel with the sheet — pull the grabber to put them away.",
            ),
            h("p", () => "The rest of the sheet is yours to fill."),
            h(Drawer.CloseTrigger, () => closeGlyph()),
          ]),
        ),
      ]),
    ]),
};
