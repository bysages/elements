import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Toggle } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Toggle" };
export default meta;

function glyph(d: string, filled = false) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: filled ? "currentColor" : "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d })],
  );
}

const BOLD = "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8";
const HEART =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

function boldGlyph() {
  return glyph(BOLD);
}

/** A pressed seal: the glyph sinks into the ink and holds. */
export const Basic = {
  args: {
    label: "Toggle bold",
  },
  render: (args: any) =>
    withState(() => () => h(Toggle.Root, { "aria-label": args.label }, () => boldGlyph())),
};

/** The seal reads its own state: the word beside it names the side. */
export const Context = {
  render: () =>
    h(Toggle.Root, { "aria-label": "Toggle bold" }, () => [
      boldGlyph(),
      h(Toggle.Context as any, null, {
        default: (ctx: { pressed: boolean }) =>
          h(
            "span",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => (ctx.pressed ? "On" : "Off"),
          ),
      }),
    ]),
};

/** The press answers to the caller — the heart fills on command. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ pressed: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `pressed: ${state.pressed}`,
          ),
          h(
            Toggle.Root,
            {
              pressed: state.pressed,
              onPressedChange: (value: boolean) => (state.pressed = value),
              "aria-label": "Toggle favourite",
            } as any,
            () =>
              h(Toggle.Indicator, null, {
                default: () => glyph(HEART, true),
                fallback: () => glyph(HEART),
              } as any),
          ),
        ]);
    }),
};

/** Retired from service: the seal takes no impression. */
export const Disabled = {
  render: () => h(Toggle.Root, { disabled: true, "aria-label": "Toggle bold" }, () => boldGlyph()),
};

/** Two faces, one seal: the indicator swaps glyphs as the state flips. */
export const Indicator = {
  render: () =>
    h(Toggle.Root, { "aria-label": "Toggle favourite" }, () =>
      h(Toggle.Indicator, null, {
        default: () => glyph(HEART, true),
        fallback: () => glyph(HEART),
      } as any),
    ),
};
