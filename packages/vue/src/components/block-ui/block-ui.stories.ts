import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { BlockUI } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Block UI" };
export default meta;
type Story = StoryObj<typeof BlockUI>;

/** The curtain drawn on command: the ledger keeps its shape under
 * frosted paper while the wheel waits. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const state = reactive({ blocked: true });
      const Host = {
        setup() {
          return () =>
            h(
              "div",
              { style: { display: "grid", gap: "var(--bs-gap-md)", maxInlineSize: "24rem" } },
              [
                h(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => (state.blocked = !state.blocked),
                  },
                  () => (state.blocked ? "Lift the curtain" : "Draw the curtain"),
                ),
                h(BlockUI, { blocked: state.blocked }, () =>
                  h(
                    "div",
                    {
                      style: {
                        padding: "var(--bs-padding-lg)",
                        border: "1px solid var(--bs-color-border)",
                        borderRadius: "var(--bs-radius-md)",
                      },
                    },
                    "Invoices settle every quarter. The ledger holds its shape while the curtain is drawn.",
                  ),
                ),
              ],
            );
        },
      };
      return () => h(Host);
    }),
};

/** A quiet curtain: the wheel can sit out when the wait is known to be
 * short — the frost alone says the region is not taking input. */
export const WithoutSpinner: Story = {
  render: () =>
    withState(
      () => () =>
        h(BlockUI, { blocked: true }, () =>
          h("p", { style: { padding: "var(--bs-padding-lg)" } }, "Draft saved a moment ago."),
        ),
    ),
};
