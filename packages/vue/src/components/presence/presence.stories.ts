import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Presence } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Presence" };
export default meta;

/** Mount and unmount in step with the CSS presence animations — the
 * exit always finishes before the node leaves. */
export const Toggle = {
  render: () =>
    withState(() => {
      const state = reactive({ present: true });
      return () => [
        h(
          Button,
          {
            size: "sm",
            onClick: () => (state.present = !state.present),
            style: { marginBlockEnd: "1rem" },
          },
          () => (state.present ? "Unmount" : "Mount"),
        ),
        h(Presence as any, { present: state.present }, () =>
          h(
            "div",
            {
              style: {
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--bs-color-border)",
              },
            },
            () => "The node and its exit animation share one clock.",
          ),
        ),
      ];
    }),
};
