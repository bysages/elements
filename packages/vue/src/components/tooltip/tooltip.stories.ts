import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Tooltip } from "./index.js";

const meta: Meta = { title: "Components / Tooltip" };
export default meta;

function sealGlyph() {
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
    [h("path", { d: "M12 3v12m0 0-4-4m4 4 4-4M4 20h16" })],
  );
}

function glyph(path: string) {
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
    [h("path", { d: path })],
  );
}

/** Ink answers only when asked: hover raises a quiet label on the
 * paper. */
export const Basic = {
  render: () =>
    h(Tooltip.Root, { positioning: { placement: "bottom-start" } }, () => [
      h(Tooltip.Trigger, () => [sealGlyph(), h("span", () => "Hover me")]),
      h(Tooltip.Positioner, () => h(Tooltip.Content, () => "Ink answers only when asked.")),
    ]),
};

/** A whisker of the same paper points from the label to its trigger. */
export const Arrow = {
  render: () =>
    h(Tooltip.Root, () => [
      h(Tooltip.Trigger, () => "Hover me"),
      h(Tooltip.Positioner, () =>
        h(Tooltip.Content, () => [h(Tooltip.Arrow, () => h(Tooltip.ArrowTip)), "I am a tooltip!"]),
      ),
    ]),
};

/** The label may rest on any side: here it opens to the left with a
 * custom gutter. */
export const Positioning = {
  render: () =>
    h(
      Tooltip.Root,
      { positioning: { placement: "left-start", offset: { mainAxis: 12, crossAxis: 12 } } } as any,
      () => [
        h(
          "div",
          { style: { display: "flex", justifyContent: "flex-end", padding: "6rem 1rem" } },
          () => [h(Tooltip.Trigger, () => "Hover me")],
        ),
        h(Tooltip.Positioner, () => h(Tooltip.Content, () => "I am a tooltip!")),
      ],
    ),
};

/** No waiting: the label rises the moment the pointer arrives. */
export const Delay = {
  render: () =>
    h(Tooltip.Root, { openDelay: 0, closeDelay: 0 } as any, () => [
      h(Tooltip.Trigger, () => "Hover me"),
      h(Tooltip.Positioner, () => h(Tooltip.Content, () => "I am a tooltip!")),
    ]),
};

/** A toolbar of triggers sharing one label — the panel re-inks to name
 * the tool under the pointer. */
export const MultipleTriggers = {
  render: () =>
    withState(() => {
      const tools = [
        {
          id: "bold",
          label: "Bold",
          shortcut: "⌘B",
          path: "M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z",
        },
        { id: "italic", label: "Italic", shortcut: "⌘I", path: "M10 5h8m-6 0-2 14h8m-2-14" },
        {
          id: "underline",
          label: "Underline",
          shortcut: "⌘U",
          path: "M7 4v7a5 5 0 0 0 10 0V4M5 20h14",
        },
        {
          id: "strike",
          label: "Strikethrough",
          shortcut: "⌘⇧X",
          path: "M5 12h14M8 8a4 4 0 0 1 8-1m0 9a4 4 0 0 1-8 1",
        },
      ];
      const state = reactive({ active: null as (typeof tools)[number] | null });
      return () =>
        h(
          Tooltip.Root,
          {
            onTriggerValueChange: (e: { value: string | null }) =>
              (state.active = tools.find((t) => t.id === e.value) ?? null),
          },
          () => [
            h("div", { style: { display: "flex", gap: "0.25rem" } }, () =>
              tools.map((tool) =>
                h(Tooltip.Trigger, { key: tool.id, value: tool.id }, () => glyph(tool.path)),
              ),
            ),
            h(Tooltip.Positioner, () =>
              h(Tooltip.Content, () =>
                state.active
                  ? [
                      state.active.label,
                      h("span", { style: { opacity: 0.7 } }, ` ${state.active.shortcut}`),
                    ]
                  : "Pick a tool",
              ),
            ),
          ],
        );
    }),
};

/** The open state answers to the caller — the label only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      const btn = (label: string, onClick: () => void) =>
        h(
          "button",
          {
            type: "button",
            onClick,
            style: {
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.25rem 0.625rem",
              font: "inherit",
              fontSize: "var(--bs-font-size-sm)",
              cursor: "pointer",
            },
          },
          label,
        );
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          btn("Toggle", () => (state.open = !state.open)),
          h(
            Tooltip.Root,
            { open: state.open, onOpenChange: (e: { open: boolean }) => (state.open = e.open) },
            () => [
              h(Tooltip.Trigger, () => "Hover me"),
              h(Tooltip.Positioner, () => h(Tooltip.Content, () => "I am a tooltip!")),
            ],
          ),
        ]);
    }),
};

/** The machine's state is readable inside the label itself. */
export const Context = {
  render: () =>
    h(Tooltip.Root, () => [
      h(Tooltip.Trigger, () => "Hover me"),
      h(Tooltip.Positioner, () =>
        h(Tooltip.Content, () =>
          h(Tooltip.Context as any, null, {
            default: (api: { open: boolean }) =>
              h("span", () => `Tooltip is ${api.open ? "visible" : "hidden"}`),
          }),
        ),
      ),
    ]),
};

/** Inside a fixed-position ancestor the label still measures against the
 * viewport — the positioning strategy switches to fixed. */
export const WithinFixed = {
  render: () =>
    h(
      "div",
      {
        style: {
          position: "fixed",
          top: "2.5rem",
          left: "2.5rem",
          padding: "2.5rem",
          background: "var(--bs-color-surface-inset)",
          borderRadius: "var(--bs-radius-lg)",
        },
      },
      () => [
        h(Tooltip.Root, { positioning: { strategy: "fixed" } } as any, () => [
          h(Tooltip.Trigger, () => "Hover me"),
          h(Tooltip.Positioner, () => h(Tooltip.Content, () => "I am a tooltip!")),
        ]),
      ],
    ),
};
