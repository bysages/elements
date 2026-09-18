import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import type { ReactNode } from "react";

import { Swap } from ".";

const meta: Meta = { title: "Components/Actions/Swap" };
export default meta;

const ICON_ATTRS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function glyph(...paths: string[]) {
  return (
    <svg {...ICON_ATTRS}>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const GLYPHS = {
  check: "M4 12.5l5 5L20 6.5",
  x: "M6 6l12 12M18 6L6 18",
  play: "M8 5.5v13l11-6.5z",
  pause: "M8 5v14M16 5v14",
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6L4.5 4.5M19.5 19.5L18 18M6 18l-1.5 1.5M19.5 4.5L18 6M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
  sound: "M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14",
  mute: "M11 5 6 9H2v6h4l5 4V5ZM22 9l-6 6M16 9l6 6",
};

/** The seal-cut toggle that carries the swap: the choreography itself is
 * retuned per story through the enter/exit transform variables. */
function SwapToggle({
  label,
  rootVars,
  indicators,
}: {
  label: string;
  rootVars: Record<string, string>;
  indicators: ReactNode;
}) {
  const [swapped, setSwapped] = useState(false);
  return (
    <button
      aria-label={label}
      aria-pressed={swapped}
      onClick={() => setSwapped(!swapped)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        inlineSize: "2.5rem",
        blockSize: "2.5rem",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        background: "var(--bs-color-surface-2)",
        color: "var(--bs-color-text-primary)",
        font: "inherit",
        cursor: "pointer",
        ...rootVars,
      }}
    >
      <Swap.Root swap={swapped}>{indicators}</Swap.Root>
    </button>
  );
}

/** The default move: a quiet crossfade, ink bleeding through paper. */
export const Fade = {
  render: () => (
    <SwapToggle
      label="Toggle check"
      rootVars={{}}
      indicators={
        <>
          <Swap.Indicator type="on">{glyph(GLYPHS.check)}</Swap.Indicator>
          <Swap.Indicator type="off">{glyph(GLYPHS.x)}</Swap.Indicator>
        </>
      }
    />
  ),
};

/** The card of ink turns over on its horizontal axis. */
export const Flip = {
  render: () => (
    <SwapToggle
      label="Toggle playback"
      rootVars={{
        perspective: "12rem",
        "--bs-swap-in": "rotateY(0deg)",
        "--bs-swap-out": "rotateY(180deg)",
      }}
      indicators={
        <>
          <Swap.Indicator type="on">{glyph(GLYPHS.play)}</Swap.Indicator>
          <Swap.Indicator type="off">{glyph(GLYPHS.pause)}</Swap.Indicator>
        </>
      }
    />
  ),
};

/** The sun and moon trade places through a quarter turn. */
export const Rotate = {
  render: () => (
    <SwapToggle
      label="Toggle theme"
      rootVars={{
        "--bs-swap-in": "rotate(0deg) scale(1)",
        "--bs-swap-out": "rotate(180deg) scale(0)",
      }}
      indicators={
        <>
          <Swap.Indicator type="on">{glyph(GLYPHS.sun)}</Swap.Indicator>
          <Swap.Indicator type="off">{glyph(GLYPHS.moon)}</Swap.Indicator>
        </>
      }
    />
  ),
};

/** Volume swells in; silence shrinks away. */
export const Scale = {
  render: () => (
    <SwapToggle
      label="Toggle sound"
      rootVars={{ "--bs-swap-in": "scale(1)", "--bs-swap-out": "scale(0)" }}
      indicators={
        <>
          <Swap.Indicator type="on">{glyph(GLYPHS.sound)}</Swap.Indicator>
          <Swap.Indicator type="off">{glyph(GLYPHS.mute)}</Swap.Indicator>
        </>
      }
    />
  ),
};
