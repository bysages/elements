import type { Meta } from "@storybook/react-vite";

import { BackTop } from ".";

const meta: Meta = { title: "Components/Navigation/Back Top" };
export default meta;

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
      Passage {index} — the page travels far enough for the way home to earn its keep. Keep
      scrolling and the little tile rises at the corner of the paper.
    </p>
  );
}

/** After the threshold, the tile rises at the page corner; clicking it
 * returns the reader to the top, smoothly unless motion is reduced. */
export const Basic = {
  render: () => (
    <div>
      <p
        style={{
          margin: "0 0 var(--bs-space-6)",
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-tertiary)",
        }}
      >
        Scroll down — the control rises past 400px.
      </p>
      {Array.from({ length: 30 }, (_, index) => passage(index + 1))}
      <BackTop />
    </div>
  ),
};

/** A larger threshold: the tile waits until the reader is properly
 * lost. */
export const CustomThreshold = {
  render: () => (
    <div>
      <p
        style={{
          margin: "0 0 var(--bs-space-6)",
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-tertiary)",
        }}
      >
        This one waits for 1200px.
      </p>
      {Array.from({ length: 30 }, (_, index) => passage(index + 1))}
      <BackTop threshold={1200} label="Return to the beginning" />
    </div>
  ),
};
