import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Menubar } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Navigation/Menu Bar" };
export default meta;

const menus = [
  {
    label: "File",
    items: [
      { label: "New document", value: "file.new" },
      { label: "Open recent…", value: "file.open", disabled: true },
      { label: "Save", value: "file.save" },
      { label: "Delete draft", value: "file.delete", danger: true },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", value: "edit.undo" },
      { label: "Redo", value: "edit.redo" },
      { label: "Paste without format", value: "edit.paste", disabled: true },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle sidebar", value: "view.sidebar" },
      { label: "Focus mode", value: "view.focus" },
    ],
  },
];

/** A row of quiet triggers; the open vessel is the menu family's paper.
 * Triggers move between each other with Tab. */
export const Basic = {
  render: () =>
    withState(() => {
      const status = ref("Nothing chosen yet.");
      return () => [
        h(Menubar, {
          items: menus,
          onSelect: (value: string) => (status.value = `Chose ${value}`),
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

/** The bar standing in a page: content beneath, the hairline marking
 * where the chrome ends. */
export const InContext = {
  render: () =>
    withState(() => {
      const status = ref("Nothing chosen yet.");
      return () =>
        h(
          "section",
          {
            style:
              "background: var(--bs-color-surface-1); border: 1px solid var(--bs-color-border); border-radius: var(--bs-radius-lg); padding: var(--bs-space-4);",
          },
          [
            h(
              "h2",
              {
                style:
                  "margin: 0 0 var(--bs-space-4); font-family: var(--bs-font-serif); font-size: var(--bs-font-size-lg);",
              },
              "Draft: The paper-and-ink system",
            ),
            h(Menubar, {
              items: menus,
              onSelect: (value: string) => (status.value = `Chose ${value}`),
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
          ],
        );
    }),
};
