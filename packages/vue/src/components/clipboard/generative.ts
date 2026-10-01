import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Clipboard } from "./index";

/** Copies a value at a click and confirms. */
export default defineEntry({
  Clipboard: {
    props: z.object({ value: z.string().optional(), label: z.string().optional() }),
    description: "Copies a value at a click and confirms.",
    component: ({ props }) => {
      const copy = () =>
        h(
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
          [
            h("rect", { x: 9, y: 9, width: 11, height: 11, rx: 1.5 }),
            h("path", {
              d: "M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5",
            }),
          ],
        );
      const check = () =>
        h(
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
          [h("path", { d: "m5 12.5 4.5 4.5L19 7.5" })],
        );
      return h(
        Clipboard.Root as never,
        { defaultValue: props.value ?? "https://elements.bysages.com" },
        () => [
          props.label != null ? h(Clipboard.Label, () => props.label!) : null,
          h(Clipboard.Control, () => [
            h(Clipboard.ValueText as never),
            h(Clipboard.Trigger, () =>
              h(Clipboard.Indicator, null, { default: () => copy(), copied: () => check() }),
            ),
          ]),
        ],
      );
    },
  },
});
