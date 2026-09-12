import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { Popover } from "./index.js";

const meta: Meta = { title: "Components / Popover" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 6 12 12M18 6 6 18" })],
  );
}

/** An anchored vessel: trigger on a hairline, the panel dissolving in on
 * elevation with a serif title and a quiet close whisker. */
export const Basic = {
  render: () =>
    h(Popover.Root, () => [
      h(Popover.Trigger, () => "Notes"),
      h(Teleport, { to: "body" }, () => [
        h(Popover.Positioner, () =>
          h(Popover.Content, () => [
            h(Popover.CloseTrigger, () => closeGlyph()),
            h(Popover.Title, () => "Reading notes"),
            h(
              Popover.Description,
              () =>
                "Marginalia stay on the paper: this vessel pins to its trigger and dissolves in on elevation.",
            ),
          ]),
        ),
      ]),
    ]),
};
