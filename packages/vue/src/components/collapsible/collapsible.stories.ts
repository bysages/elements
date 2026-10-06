import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Collapsible } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Collapsible" };
export default meta;

const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M6 4l4 4-4 4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () =>
    h(Collapsible, { label: "What is a design token?" }, () =>
      h(
        "p",
        "A named visual decision — a color, a spacing step, a radius — compiled into a CSS custom property.",
      ),
    ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () =>
    h(Collapsible.Root, {}, () => [
      h(Collapsible.Trigger, () => [
        "What is a design token?",
        h(Collapsible.Indicator, () =>
          h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true }, [
            h("path", {
              d: "M6 4l4 4-4 4",
              stroke: "currentColor",
              "stroke-width": 1.5,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            }),
          ]),
        ),
      ]),
      h(Collapsible.Content, () =>
        h("p", "A named visual decision compiled into a CSS custom property."),
      ),
    ]),
};

/** The panel starts open, resting its content on the page. */
export const InitialOpen = {
  render: () => panel("Already unfolded", { defaultOpen: true }),
};

/** The whole leaf rests: the trigger stays quiet to clicks. */
export const Disabled = {
  render: () => panel("Pinned shut", { disabled: true }),
};

/** The panel mounts only on first open and leaves on exit — nothing of
 * the closed fold rests in the page. */
export const LazyMount = {
  render: () => panel("Mounted on demand", { lazyMount: true, unmountOnExit: true }),
};

/** A fold inside a fold: each layer keeps its own open state. */
export const Nested = {
  render: () =>
    h(
      Collapsible.Root,
      {
        defaultOpen: true,
        style: { inlineSize: "100%", maxInlineSize: "46rem" },
      },
      () => [
        h(Collapsible.Trigger, () => ["Getting started", h(Collapsible.Indicator, chevron)]),
        h(Collapsible.Content, () => [
          h("p", "Welcome. Topics to explore:"),
          h("div", { style: { marginTop: "0.75rem" } }, () => [panel("Installation")]),
        ]),
      ],
    ),
};

/** The fold never fully closes: collapsedHeight keeps a peephole open. */
export const PartialCollapse = {
  render: () => panel("Read more", { collapsedHeight: "3.5rem" } as any),
};

/** The open state answers to the caller — the fold only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h(
          Collapsible.Root,
          {
            open: state.open,
            onOpenChange: (e: { open: boolean }) => (state.open = e.open),
            style: { inlineSize: "100%", maxInlineSize: "46rem" },
          },
          () => [
            h(Collapsible.Trigger, () => ["Controlled fold", h(Collapsible.Indicator, chevron)]),
            h(Collapsible.Content, () => [h("p", BODY)]),
          ],
        );
    }),
};

const BODY =
  "A headless component library for building accessible, high-quality UI components across frameworks — ours dresses its anatomy in paper and ink.";

function panel(label: string, rootProps: any = {}) {
  return h(
    Collapsible.Root,
    { style: { inlineSize: "100%", maxInlineSize: "46rem" }, ...rootProps },
    () => [
      h(Collapsible.Trigger, () => [label, h(Collapsible.Indicator, chevron)]),
      h(Collapsible.Content, () => [h("p", BODY)]),
    ],
  );
}
