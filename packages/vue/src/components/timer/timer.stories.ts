import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Timer } from "./index.js";

const meta: Meta = { title: "Components / Timer" };
export default meta;

function glyph(d: string) {
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
    [h("path", { d })],
  );
}

/** A counting-up clock: monospaced digits, one quiet start control. */
export const Basic = {
  render: () =>
    h(Timer.Root, { startMs: 18 * 60 * 1000 + 42 * 1000 }, () => [
      h(Timer.Area, () => [
        h(Timer.Item, { type: "hours" }),
        h(Timer.Separator, () => ":"),
        h(Timer.Item, { type: "minutes" }),
        h(Timer.Separator, () => ":"),
        h(Timer.Item, { type: "seconds" }),
      ]),
      h(Timer.Control, () => [
        h(Timer.ActionTrigger, { action: "start" }, () => [glyph("M7 4.5v15l12-7.5z"), "Start"]),
        h(Timer.ActionTrigger, { action: "pause" }, () => [glyph("M8 5v14M16 5v14"), "Pause"]),
        h(Timer.ActionTrigger, { action: "resume" }, () => "Resume"),
      ]),
    ]),
};

/** A countdown with a target — the machine stops and announces completion
 * on its own. */
export const Countdown = {
  render: () =>
    h(
      Timer.Root,
      { startMs: 5 * 60 * 1000, targetMs: 0, countdown: true, autoStart: false },
      () => [
        h(Timer.Area, () => [
          h(Timer.Item, { type: "minutes" }),
          h(Timer.Separator, () => ":"),
          h(Timer.Item, { type: "seconds" }),
        ]),
        h(Timer.Control, () => [
          h(Timer.ActionTrigger, { action: "start" }, () => [glyph("M7 4.5v15l12-7.5z"), "Start"]),
          h(Timer.ActionTrigger, { action: "pause" }, () => [glyph("M8 5v14M16 5v14"), "Pause"]),
          h(Timer.ActionTrigger, { action: "resume" }, () => "Resume"),
        ]),
      ],
    ),
};
