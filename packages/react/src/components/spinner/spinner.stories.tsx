import type { Meta } from "@storybook/react-vite";

import { Spinner } from ".";

const meta: Meta = { title: "Components/Feedback/Spinner" };
export default meta;

/** The three sizes on the part ladder, resting beside a line of ink so
 * the scale reads against the text it would accompany. */
export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--bs-space-6)" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <span style={{ color: "var(--bs-color-text-tertiary)" }}>Loading the archive…</span>
    </div>
  ),
};

/** Inline in a sentence: the quiet register lets it ride with the text
 * without claiming a block of its own. */
export const Inline = {
  render: () => (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--bs-space-2)",
        color: "var(--bs-color-text-secondary)",
      }}
    >
      <Spinner size="sm" /> Fetching the letter…
    </p>
  ),
};
