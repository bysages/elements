import type { Meta } from "@storybook/react-vite";

import { Grid } from ".";

const meta: Meta = { title: "Components/Layout/Grid" };
export default meta;

const tile = (n: number) => (
  <div
    key={n}
    style={{
      display: "grid",
      placeItems: "center",
      padding: "var(--bs-space-3)",
      background: "var(--bs-color-surface-3)",
      border: "1px solid var(--bs-color-border)",
      fontSize: "var(--bs-font-size-sm)",
      color: "var(--bs-color-text-secondary)",
    }}
  >
    {n}
  </div>
);

const tiles = (count: number) => Array.from({ length: count }, (_, i) => tile(i + 1));

/** Six cells on a three-track lattice — every track the same measure,
 * whatever its cell holds. */
export const Basic = {
  render: () => <Grid columns={3}>{tiles(6)}</Grid>,
};

/** The default twelve-track lattice, under a section of ink. */
export const TwelveColumns = {
  render: () => <Grid columns={12}>{tiles(12)}</Grid>,
};

/** With `minChildWidth` the container counts the tracks itself: grow
 * and shrink the canvas and the lattice re-counts. */
export const AutoFill = {
  render: () => <Grid minChildWidth="10rem">{tiles(6)}</Grid>,
};

/** A looser step of the ramp between the cells. */
export const Loose = {
  render: () => (
    <Grid columns={3} gap="xl">
      {tiles(3)}
    </Grid>
  ),
};
