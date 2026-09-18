import type { Meta } from "@storybook/react-vite";

import { Ellipsis } from ".";

const meta: Meta = { title: "Components/Layout/Ellipsis" };
export default meta;

const title = "A long chapter title walks into a narrow column and leaves its tail at the door";

/** One line, cut where the box ends. The full text is the consumer's to
 * reach — here, a plain title. */
export const Basic = {
  render: () => (
    <div style={{ inlineSize: "20rem" }}>
      <Ellipsis title={title}>{title}</Ellipsis>
    </div>
  ),
};

const prose =
  "The vessel holds the page the way a column holds ink: fully, and only up to its brim. " +
  "Whatever runs past the measure gives way, and the cut is drawn so quietly that the reader " +
  "finishes the sentence from memory instead of the margin.";

/** Two lines and four lines of the same paragraph — the clamp holds
 * the block at N lines and the tail gives way. */
export const Lines = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--bs-space-4)" }}>
      <Ellipsis lines={2}>{prose}</Ellipsis>
      <Ellipsis lines={4}>{prose}</Ellipsis>
    </div>
  ),
};
