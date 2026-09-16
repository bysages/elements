import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Banner, Button } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Banner" };
export default meta;
type Story = StoryObj<typeof Banner>;

/** The page-level notice in its ink register: title, description, and
 * the way out resting in the actions row. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Banner.Root as any, {}, () => [
          h(Banner.Body, () => [
            h(Banner.Title, () => "Scheduled maintenance"),
            h(
              Banner.Description,
              () => "The reading room closes early this Friday, at four in the afternoon.",
            ),
            h(Banner.Actions, () => [
              h(Button as any, { variant: "outline", size: "sm" }, () => "View schedule"),
            ]),
          ]),
          h(Banner.Close as any),
        ]),
    ),
};

/** The four semantic pigments, each spoken across the full measure. */
export const Statuses: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-3)" } }, [
          h(Banner.Root as any, { status: "info" }, () => [
            h(Banner.Body, () => [
              h(Banner.Title, () => "New catalogue online"),
              h(Banner.Description, () => "Search now covers the manuscripts wing."),
            ]),
          ]),
          h(Banner.Root as any, { status: "success" }, () => [
            h(Banner.Body, () => [
              h(Banner.Title, () => "Delivery complete"),
              h(Banner.Description, () => "The autumn acquisitions arrived this morning."),
            ]),
          ]),
          h(Banner.Root as any, { status: "warning" }, () => [
            h(Banner.Body, () => [
              h(Banner.Title, () => "Two letters unanswered"),
              h(Banner.Description, () => "The registry flags correspondence past thirty days."),
            ]),
          ]),
          h(Banner.Root as any, { status: "danger" }, () => [
            h(Banner.Body, () => [
              h(Banner.Title, () => "East wing closed"),
              h(Banner.Description, () => "Shelving is under repair; requests held until Monday."),
            ]),
          ]),
        ]),
    ),
};

/** Dismissal is the consumer's state — the close only reports the click. */
export const Dismissible: Story = {
  render: () => {
    const open = ref(true);
    return withState(
      () => () =>
        open.value
          ? h(Banner.Root as any, { status: "warning" }, () => [
              h(Banner.Body, () => [
                h(Banner.Title, () => "Two letters unanswered"),
                h(Banner.Description, () => "The registry flags correspondence past thirty days."),
              ]),
              h(Banner.Close as any, { onClick: () => (open.value = false) }),
            ])
          : h(
              Button as any,
              { variant: "outline", size: "sm", onClick: () => (open.value = true) },
              () => "Bring the notice back",
            ),
    );
  },
};
