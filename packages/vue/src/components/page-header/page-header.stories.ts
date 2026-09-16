import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Button, PageHeader } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/PageHeader" };
export default meta;
type Story = StoryObj<typeof PageHeader>;

/** The full face: eyebrow whisper, serif title, one line of description,
 * and the actions resting beside the title. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(PageHeader.Root as any, {}, () => [
          h(PageHeader.Heading, () => [
            h("div", { style: { minWidth: 0 } }, () => [
              h(PageHeader.Title, () => "Ledger of correspondence"),
              h(
                PageHeader.Description,
                () => "Every letter in and out of the house, logged and shelved.",
              ),
            ]),
            h(PageHeader.Actions, () => [
              h(Button as any, { variant: "outline", size: "sm" }, () => "Export"),
              h(Button as any, { size: "sm" }, () => "New letter"),
            ]),
          ]),
        ]),
    ),
};

/** With the eyebrow: the tracked overline sits above the title and names
 * the section the page belongs to. */
export const Eyebrow: Story = {
  render: () =>
    withState(
      () => () =>
        h(PageHeader.Root as any, {}, () => [
          h(PageHeader.Heading, () => [
            h("div", { style: { minWidth: 0 } }, () => [
              h(PageHeader.Eyebrow, () => "Archive · Eastern cabinet"),
              h(PageHeader.Title, () => "Ledger of correspondence"),
              h(
                PageHeader.Description,
                () => "Every letter in and out of the house, logged and shelved.",
              ),
            ]),
          ]),
        ]),
    ),
};

/** Title only — the header can hold its breath when there is nothing
 * more to say. */
export const TitleOnly: Story = {
  render: () =>
    withState(
      () => () => h(PageHeader.Root as any, {}, () => [h(PageHeader.Title, () => "Settings")]),
    ),
};
