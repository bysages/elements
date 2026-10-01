import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { FocusTrap } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/FocusTrap" };
export default meta;

/** Focus stays within the subtree — for containers that live outside
 * the dialog machine but still owe the keyboard a boundary. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(FocusTrap as any, { trapped: true }, () =>
          h(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--bs-color-border)",
              },
            },
            () => [
              h(
                "p",
                { style: { margin: "0", fontSize: "0.875rem" } },
                () => "Tab cannot leave this box.",
              ),
              h("input", { placeholder: "First stop" }),
              h("input", { placeholder: "Second stop" }),
              h(
                "button",
                { style: { alignSelf: "flex-start", padding: "0.375rem 0.75rem" } },
                () => "Cycle back",
              ),
            ],
          ),
        ),
    ),
};
