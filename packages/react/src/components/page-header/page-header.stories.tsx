import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeader } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Layout/Page Header" };
export default meta;
type Story = StoryObj<typeof PageHeader>;

/** The full face: eyebrow whisper, serif title, one line of description,
 * and the actions resting beside the title. */
export const Basic: Story = {
  render: () => (
    <PageHeader.Root>
      <PageHeader.Heading>
        <div style={{ minWidth: 0 }}>
          <PageHeader.Title>Ledger of correspondence</PageHeader.Title>
          <PageHeader.Description>
            Every letter in and out of the house, logged and shelved.
          </PageHeader.Description>
        </div>
        <PageHeader.Actions>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">New letter</Button>
        </PageHeader.Actions>
      </PageHeader.Heading>
    </PageHeader.Root>
  ),
};

/** With the eyebrow: the tracked overline sits above the title and names
 * the section the page belongs to. */
export const Eyebrow: Story = {
  render: () => (
    <PageHeader.Root>
      <PageHeader.Heading>
        <div style={{ minWidth: 0 }}>
          <PageHeader.Eyebrow>Archive · Eastern cabinet</PageHeader.Eyebrow>
          <PageHeader.Title>Ledger of correspondence</PageHeader.Title>
          <PageHeader.Description>
            Every letter in and out of the house, logged and shelved.
          </PageHeader.Description>
        </div>
      </PageHeader.Heading>
    </PageHeader.Root>
  ),
};

/** Title only — the header can hold its breath when there is nothing
 * more to say. */
export const TitleOnly: Story = {
  render: () => (
    <PageHeader.Root>
      <PageHeader.Title>Settings</PageHeader.Title>
    </PageHeader.Root>
  ),
};
