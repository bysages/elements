import type { Meta } from "@storybook/react-vite";

import { Masonry } from ".";

const meta: Meta = { title: "Components/Layout/Masonry" };
export default meta;

const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];

const stone = (n: number) => (
  <div
    key={n}
    style={{
      display: "grid",
      placeItems: "center",
      blockSize: `${heights[n % heights.length]}rem`,
      background: "var(--bs-color-surface-3)",
      border: "1px solid var(--bs-color-border)",
      fontSize: "var(--bs-font-size-sm)",
      color: "var(--bs-color-text-secondary)",
    }}
  >
    {n + 1}
  </div>
);

/** Uneven heights flow down each column before crossing to the next —
 * the wall reads column-first. */
export const Basic = {
  render: () => <Masonry>{heights.map((_, i) => stone(i))}</Masonry>,
};

/** The same wall at two and at four columns. */
export const Columns = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-6)" }}>
      {[2, 4].map((columns) => (
        <Masonry key={columns} columns={columns}>
          {heights.map((_, i) => stone(i))}
        </Masonry>
      ))}
    </div>
  ),
};
