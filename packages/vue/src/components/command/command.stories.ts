import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Command } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/Command" };
export default meta;

const commands = [
  { label: "New document", value: "file.new", group: "File", hint: "N" },
  { label: "Save", value: "file.save", group: "File", hint: "S" },
  { label: "Export as PDF", value: "file.export", group: "File", hint: "E" },
  { label: "Toggle theme", value: "appearance.theme", group: "Appearance", hint: "T" },
  { label: "Increase density", value: "appearance.density-up", group: "Appearance", hint: "+" },
  { label: "Decrease density", value: "appearance.density-down", group: "Appearance", hint: "-" },
  { label: "Open documentation", value: "help.docs", group: "Help", hint: "?" },
  { label: "Keyboard shortcuts", value: "help.keys", group: "Help", hint: "K" },
];

/** The palette: a sheet at the top of the page, a search over grouped
 * commands, a keycap hint on every row. Choosing one closes the
 * palette. */
export const Basic = {
  render: () =>
    withState(() => {
      const open = ref(false);
      const status = ref("Nothing run yet.");
      return () => [
        h(Button, { onClick: () => ((open.value = true), (status.value = "Palette is up.")) }, [
          "Open command palette",
          h(
            "span",
            {
              style:
                "margin-inline-start: var(--bs-space-2); font-size: var(--bs-font-size-xs); color: var(--bs-color-text-tertiary);",
            },
            "Ctrl K",
          ),
        ]),
        h(Command, {
          items: commands,
          placeholder: "Type a command…",
          open: open.value,
          "onUpdate:open": (value: boolean) => (open.value = value),
          onSelect: (value: string) => (status.value = `Ran ${value}`),
        }),
        h(
          "p",
          {
            role: "status",
            style:
              "margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          () => status.value,
        ),
      ];
    }),
};

/** Typing narrows the ledger across every group; the empty state speaks
 * when nothing answers. */
export const Searching = {
  render: () =>
    withState(() => {
      const open = ref(true);
      return () => [
        h(
          "p",
          {
            style:
              "margin: 0 0 var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          "The palette starts open — type “the”, “app”, or nothing at all.",
        ),
        h(Command, {
          items: commands,
          placeholder: "Type a command…",
          open: open.value,
          "onUpdate:open": (value: boolean) => (open.value = value),
          onSelect: () => (open.value = false),
        }),
      ];
    }),
};
