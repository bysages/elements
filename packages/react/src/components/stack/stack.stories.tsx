import type { Meta } from "@storybook/react-vite";

import { Stack } from ".";

const meta: Meta = { title: "Components/Layout/Stack" };
export default meta;

const tile = (text: string) => (
  <div
    style={{
      padding: "var(--bs-space-2) var(--bs-space-3)",
      background: "var(--bs-color-surface-3)",
      border: "1px solid var(--bs-color-border)",
      fontSize: "var(--bs-font-size-sm)",
    }}
  >
    {text}
  </div>
);

/** Siblings held apart by one named step — here the default `md`. */
export const Basic = {
  render: () => <Stack>{[tile("First"), tile("Second"), tile("Third")]}</Stack>,
};

/** Turned on its side, the same step holds a row apart. */
export const Row = {
  render: () => <Stack direction="row">{[tile("First"), tile("Second"), tile("Third")]}</Stack>,
};

/** Every named step of the space ramp, holding the same two tiles. */
export const GapSteps = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-4)" }}>
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((step) => (
        <Stack key={step} gap={step}>
          {tile(step)}
          {tile("…")}
        </Stack>
      ))}
    </div>
  ),
};

/** A row that has run out of room lays its overflow down a line. */
export const Wrap = {
  render: () => (
    <div style={{ inlineSize: "24rem" }}>
      <Stack direction="row" wrap>
        {Array.from({ length: 8 }, (_, i) => tile(`Item ${i + 1}`))}
      </Stack>
    </div>
  ),
};
