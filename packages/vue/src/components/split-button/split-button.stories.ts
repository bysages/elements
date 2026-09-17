import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { SplitButton } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Split Button" };
export default meta;

const items = [
  { label: "Save as…", value: "save-as" },
  { label: "Export…", value: "export" },
  { label: "Delete draft", value: "delete", danger: true },
];

/** The main button fires, the fitted arrow opens the alternatives;
 * danger rows tint in the vessel like the menu family's. */
export const Basic = {
  render: () =>
    withState(() => {
      const status = ref("Nothing chosen yet.");
      return () => [
        h(SplitButton, {
          label: "Save",
          items,
          onClick: () => (status.value = "Saved."),
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

/** Both halves keep one register: the outline variant draws the hairline
 * across the seam too. */
export const Outline = {
  render: () =>
    withState(() => {
      const status = ref("Nothing chosen yet.");
      return () => [
        h(SplitButton, {
          label: "Export",
          variant: "outline",
          size: "sm",
          items: [
            { label: "Export as PDF", value: "pdf" },
            { label: "Export as CSV", value: "csv" },
            { label: "Export as JSON", value: "json" },
          ],
          onClick: () => (status.value = "Exported."),
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
