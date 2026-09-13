import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Accordion } from ".";
import { Slider } from "../slider";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Accordion" };
export default meta;

const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

const items = [
  {
    value: "paper",
    title: "What is the paper-and-ink system?",
    body: "Interfaces are warm paper, content is ink, hierarchy is light — never pure white, never a hard pop.",
  },
  {
    value: "tokens",
    title: "Where do visual values come from?",
    body: "Every color, spacing, radius, elevation, and duration resolves from design tokens; a hardcoded pixel is a bug.",
  },
  {
    value: "ark",
    title: "Who owns the interaction?",
    body: "Ark UI's machines own state, ARIA, and positioning; our styles dress the anatomy they render.",
  },
];

/** One row may be open at a time; the open leaf keeps a lit edge while the
 * others rest. */
export const Basic = {
  args: {
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Accordion.Root, { defaultValue: ["paper"], disabled: args.disabled }, () =>
          items.map((item) => leaf(item)),
        ),
    ),
};

/** Collapsible: the open leaf may also be folded — at rest, all rows
 * closed. */
export const Collapsible = {
  render: () =>
    h(Accordion.Root, { defaultValue: ["paper"], collapsible: true }, () =>
      items.map((item) => leaf(item)),
    ),
};

/** Multiple: every leaf keeps its own state; several may rest open. */
export const Multiple = {
  render: () =>
    h(Accordion.Root, { defaultValue: ["paper", "ark"], multiple: true }, () =>
      items.map((item) => leaf(item)),
    ),
};

/** One row rests with a disabled leaf: the trigger stays quiet to clicks. */
export const DisabledItem = {
  render: () =>
    h(Accordion.Root, {}, () =>
      items.map((item) => leaf(item, { disabled: item.value === "tokens" } as any)),
    ),
};

/** The open state answers to the caller — the rows only mirror. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["paper"] });
      return () =>
        h(
          Accordion.Root,
          {
            value: state.value,
            onValueChange: (e: { value: string[] }) => (state.value = e.value),
          },
          () => items.map((item) => leaf(item)),
        );
    }),
};

/** The fold runs sideways: panels open along the horizontal axis. */
export const Horizontal = {
  render: () =>
    h(Accordion.Root, { defaultValue: ["paper"], orientation: "horizontal" }, () =>
      items.map((item) =>
        h(Accordion.Item, { key: item.value, value: item.value }, () => [
          h(Accordion.ItemTrigger, () => item.title),
          h(Accordion.ItemContent, () => [h("p", { style: { textAlign: "center" } }, item.body)]),
        ]),
      ),
    ),
};

/** The panel mounts only on first open and leaves on exit — nothing of
 * the closed leaf rests in the page. */
export const LazyMount = {
  render: () =>
    h(Accordion.Root, { lazyMount: true, unmountOnExit: true }, () =>
      items.map((item) => leaf(item)),
    ),
};

/** A leaf's body may hold its own control — here a recessed slider runs
 * inside the open panel. */
export const WithSlider = {
  render: () =>
    h(Accordion.Root, { defaultValue: ["paper"] }, () =>
      items.map((item) =>
        h(Accordion.Item, { key: item.value, value: item.value }, () => [
          h(Accordion.ItemTrigger, () => [item.title, h(Accordion.ItemIndicator, chevron)]),
          h(Accordion.ItemContent, () => [
            item.value === "paper"
              ? h(Slider.Root, { defaultValue: [40] }, () => [
                  h(Slider.Label, () => "Ink weight"),
                  h(Slider.Control, () => [
                    h(Slider.Track, () => h(Slider.Range)),
                    h(Slider.Thumb, { index: 0 }, () => h(Slider.HiddenInput)),
                  ]),
                ])
              : h("p", item.body),
          ]),
        ]),
      ),
    ),
};

function leaf(item: (typeof items)[number], itemProps: any = {}) {
  return h(Accordion.Item, { key: item.value, value: item.value, ...itemProps }, () => [
    h(Accordion.ItemTrigger, () => [item.title, h(Accordion.ItemIndicator, chevron)]),
    h(Accordion.ItemContent, () => [h("p", item.body)]),
  ]);
}
