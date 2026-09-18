import type { Meta } from "@storybook/react-vite";

import { Icon } from ".";

const meta: Meta = { title: "Components/Layout/Icon" };
export default meta;

/** A fresh glyph per render — an element created inline keeps every
 * instance its own. */
const drop = (
  <svg viewBox="0 0 24 24">
    <path d="M12 2.5c3.5 4.4 6.5 8.2 6.5 11.4a6.5 6.5 0 1 1-13 0C5.5 10.7 8.5 6.9 12 2.5Z" />
  </svg>
);

/** A named icon rides a sentence: one em of the surrounding type, the
 * text's own ink, and an accessible name through `label`. */
export const Basic = {
  render: () => (
    <p style={{ margin: 0 }}>
      The stroke falls where the light leaves it <Icon label="Ink drop">{drop}</Icon> and the line
      goes on.
    </p>
  ),
};

/** The size steps follow the surrounding font size — same text, same
 * glyphs, three measures. */
export const Sizes = {
  render: () => (
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "var(--bs-space-4)" }}>
      <Icon size="sm" label="Small drop">
        {drop}
      </Icon>
      <Icon size="md" label="Medium drop">
        {drop}
      </Icon>
      <Icon size="lg" label="Large drop">
        {drop}
      </Icon>
    </p>
  ),
};

/** `inherit` takes its measure from the type it sits in — here the
 * serif voice at heading size. */
export const InText = {
  render: () => (
    <h2
      style={{
        margin: 0,
        fontFamily: "var(--bs-font-serif)",
        fontSize: "var(--bs-font-size-xl)",
      }}
    >
      Moonlight fills the vessel <Icon label="Ink drop">{drop}</Icon> and the page keeps still.
    </h2>
  ),
};
