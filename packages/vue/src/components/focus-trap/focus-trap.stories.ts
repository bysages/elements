import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { FocusTrap } from ".";
import { Button } from "../button";
import { Input } from "../input";
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
              h(Input, { placeholder: "First stop" }),
              h(Input, { placeholder: "Second stop" }),
              h(Button, { size: "sm", style: { alignSelf: "flex-start" } }, () => "Cycle back"),
            ],
          ),
        ),
    ),
};
