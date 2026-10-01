import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Result } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Result" };
export default meta;
type Story = StoryObj<typeof Result>;

const action = (variant: string, label: string) =>
  h(Button as any, { variant, tone: "ink", size: "sm" }, () => label);

/** The verdict after the deed: the mark washes in the fixed pigment,
 * the title rides the serif, and the extra carries the way onward. */
export const Success: Story = {
  render: () =>
    withState(
      () => () =>
        h(Result.Root as any, { status: "success" }, () => [
          h(Result.Icon as any),
          h(Result.Title as any, () => "The archive holds your letter"),
          h(
            Result.Description as any,
            () => "A copy has been sealed and shelved; you will hear back once it is read.",
          ),
          h(Result.Extra as any, () => [
            action("solid", "Back to the shelf"),
            action("ghost", "Write another"),
          ]),
        ]),
    ),
};

/** All four fixed pigments, side by side — the same vessel, four
 * verdicts. */
export const Statuses: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", flexWrap: "wrap", gap: "1rem" } }, () =>
          (["success", "warning", "danger", "info"] as const).map((status) =>
            h(Result.Root as any, { key: status, status, style: { flex: "1 1 12rem" } }, () => [
              h(Result.Icon as any),
              h(Result.Title as any, () => status.slice(0, 1).toUpperCase() + status.slice(1)),
              h(Result.Description as any, () => "The fixed pigment speaks the outcome."),
            ]),
          ),
        ),
    ),
};
