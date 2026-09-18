import type { Meta } from "@storybook/react-vite";

import { Affix } from ".";

const meta: Meta = { title: "Components/Navigation/Affix" };
export default meta;

function toolbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--bs-space-3)",
        alignItems: "center",
        padding: "var(--bs-space-3) var(--bs-space-4)",
        background: "var(--bs-color-surface-1)",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        fontSize: "var(--bs-font-size-sm)",
        letterSpacing: "var(--bs-tracking-label)",
      }}
    >
      <strong>Reading tools</strong>
      <span style={{ color: "var(--bs-color-text-tertiary)" }}>·</span>
      <span>Contents</span>
      <span>Print</span>
      <span>Share</span>
    </div>
  );
}

function passage(index: number) {
  return (
    <p
      key={index}
      style={{
        margin: "0 0 var(--bs-space-4)",
        color: "var(--bs-color-text-secondary)",
        lineHeight: "var(--bs-line-height-relaxed)",
      }}
    >
      Passage {index} — the tools travel with the reader: once their row reaches the top of the page
      they stay there while the chapters move on underneath.
    </p>
  );
}

/** A toolbar nailed to the top of the page: scroll, and it stays. */
export const Basic = {
  render: () => (
    <div>
      <Affix>{toolbar()}</Affix>
      <div style={{ maxInlineSize: "46rem", paddingBlockStart: "var(--bs-space-6)" }}>
        {Array.from({ length: 16 }, (_, index) => passage(index + 1))}
      </div>
    </div>
  ),
};

/** Both offsets given: the row holds its place inside the band between
 * them — clearing the header, keeping clear of the page's end. */
export const OffsetBottom = {
  render: () => (
    <div>
      <Affix offsetTop="var(--bs-space-12)" offsetBottom="var(--bs-space-4)">
        {toolbar()}
      </Affix>
      <div style={{ maxInlineSize: "46rem", paddingBlockStart: "var(--bs-space-6)" }}>
        {Array.from({ length: 16 }, (_, index) => passage(index + 1))}
      </div>
    </div>
  ),
};
