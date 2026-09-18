import type { Meta } from "@storybook/react-vite";

import { Watermark } from ".";

const meta: Meta = { title: "Components/Utilities/Watermark" };
export default meta;

function draft() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--bs-space-3)",
        padding: "var(--bs-padding-lg)",
        fontSize: "var(--bs-font-size-sm)",
        lineHeight: "var(--bs-line-height-relaxed)",
        color: "var(--bs-color-text-secondary)",
      }}
    >
      <p>
        The registry holds each entry twice: once in the ledger, once in the seal that marks it as
        the house's own. The mark beneath the words is quiet by design — it claims the page without
        taking the reader's attention.
      </p>
      <p>
        Copies leave the building with the same seal, faint but present, so the paper can always be
        asked where it was made.
      </p>
    </div>
  );
}

/** The default seal: a faint diagonal repeat beneath the flow, drawn
 * once on a canvas and repeated by the marks layer. */
export const Basic = {
  render: () => <Watermark content="BY SAGES · 内部资料">{draft()}</Watermark>,
};

/** The seal answers the caller's hand: a heavier ink, a steeper
 * angle, a larger measure. */
export const Tuned = {
  render: () => (
    <Watermark content="DRAFT · 草稿" opacity={0.12} rotate={-45} fontSize="1.125rem">
      {draft()}
    </Watermark>
  ),
};
