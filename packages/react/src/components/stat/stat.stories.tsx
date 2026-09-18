import type { Meta } from "@storybook/react-vite";

import { Stat } from ".";

const meta: Meta = { title: "Components/Data/Stat" };
export default meta;

/** One figure with its label, delta, and a whisper of context. */
export const Basic = {
  render: () => (
    <Stat.Root>
      <Stat.Label>Letters received</Stat.Label>
      <Stat.Value>12,480</Stat.Value>
      <Stat.Delta direction="up">↑ 4.2%</Stat.Delta>
      <Stat.Description>Against last quarter</Stat.Description>
    </Stat.Root>
  ),
};

/** A row of figures: the tabular values align, the deltas read the
 * direction in the fixed pigments. */
export const Row = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--bs-space-10)", flexWrap: "wrap" }}>
      <Stat.Root>
        <Stat.Label>Letters received</Stat.Label>
        <Stat.Value>12,480</Stat.Value>
        <Stat.Delta direction="up">↑ 4.2%</Stat.Delta>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Letters answered</Stat.Label>
        <Stat.Value>11,932</Stat.Value>
        <Stat.Delta direction="up">↑ 2.8%</Stat.Delta>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Overdue replies</Stat.Label>
        <Stat.Value>548</Stat.Value>
        <Stat.Delta direction="down">↓ 1.1%</Stat.Delta>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>In transit</Stat.Label>
        <Stat.Value>126</Stat.Value>
        <Stat.Delta>· steady</Stat.Delta>
      </Stat.Root>
    </div>
  ),
};
