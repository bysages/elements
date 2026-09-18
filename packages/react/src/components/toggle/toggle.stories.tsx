import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Toggle } from ".";

const meta: Meta = { title: "Components/Actions/Toggle" };
export default meta;

function glyph(d: string, filled = false) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const BOLD = "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8";
const HEART =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

function boldGlyph() {
  return glyph(BOLD);
}

/** A pressed seal: the glyph sinks into the ink and holds. */
export const Basic = {
  args: {
    label: "Toggle bold",
  },
  render: (args: any) => <Toggle.Root aria-label={args.label}>{boldGlyph()}</Toggle.Root>,
};

/** The seal reads its own state: the word beside it names the side. */
export const Context = {
  render: () => (
    <Toggle.Root aria-label="Toggle bold">
      {boldGlyph()}
      <Toggle.Context>
        {(ctx: { pressed: boolean }) => (
          <span
            style={{
              fontSize: "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            {ctx.pressed ? "On" : "Off"}
          </span>
        )}
      </Toggle.Context>
    </Toggle.Root>
  ),
};

/** The press answers to the caller — the heart fills on command. */
export const Controlled = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          pressed: {String(pressed)}
        </output>
        <Toggle.Root
          pressed={pressed}
          onPressedChange={(value: boolean) => setPressed(value)}
          aria-label="Toggle favourite"
        >
          <Toggle.Indicator fallback={glyph(HEART)}>{glyph(HEART, true)}</Toggle.Indicator>
        </Toggle.Root>
      </div>
    );
  },
};

/** Retired from service: the seal takes no impression. */
export const Disabled = {
  render: () => (
    <Toggle.Root disabled aria-label="Toggle bold">
      {boldGlyph()}
    </Toggle.Root>
  ),
};

/** Two faces, one seal: the indicator swaps glyphs as the state flips. */
export const Indicator = {
  render: () => (
    <Toggle.Root aria-label="Toggle favourite">
      <Toggle.Indicator fallback={glyph(HEART)}>{glyph(HEART, true)}</Toggle.Indicator>
    </Toggle.Root>
  ),
};
