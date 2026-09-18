import type { Meta, StoryObj } from "@storybook/react-vite";

import { Meter } from ".";

const meta: Meta = { title: "Components/Feedback/Meter" };
export default meta;
type Story = StoryObj<typeof Meter>;

/** One measure: the label whispers what it reads, the ink rides the
 * primary, the value text closes the line. */
export const Basic: Story = {
  render: () => <Meter.Root value={62} label="Toner remaining" />,
};

/** At the thresholds the ink changes its pigment: plenty, low, empty. */
export const Levels: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-4)" }}>
      <Meter.Root value={82} label="Toner remaining" level="success" />
      <Meter.Root value={34} label="Toner remaining" level="warning" />
      <Meter.Root value={8} label="Toner remaining" level="danger" />
    </div>
  ),
};

/** Parts compose freely — this one reads a date range in the value
 * text instead of a percentage. */
export const Composed: Story = {
  render: () => (
    <Meter.Root value={5} min={0} max={31} level="warning">
      <Meter.Label>September</Meter.Label>
      <Meter.ValueText>5 / 31 days</Meter.ValueText>
      <Meter.Track />
    </Meter.Root>
  ),
};
