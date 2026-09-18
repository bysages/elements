import { injectComponentStyle } from "@bysages/core";
import { useEffect, useState } from "react";
import type { HTMLAttributes } from "react";

import { Button } from "../button";

export interface BackTopProps extends HTMLAttributes<HTMLButtonElement> {
  /** How far the reader must have travelled (px) before the affordance
   * appears. */
  threshold?: number;
  /** The accessible name; the control is icon-only by default. */
  label?: string;
}

/** The single glyph a way-home control needs: one stroke pointing up. */
function chevronUp() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 14 6-6 6 6" />
    </svg>
  );
}

/**
 * A way home: after the page has scrolled past `threshold`, a small
 * floating control rises at the page's corner and returns the reader to
 * the top. The scroll itself stays native — `window.scrollTo` defers to
 * the stylesheet's `scroll-behavior: smooth`, which reduced motion turns
 * back into an instant jump. The button stays mounted either way so the
 * entrance is a transition, never a pop.
 *
 * The control itself is the shared `Button` (outline, square) — the
 * paper, hairline and halo are its; this family owns only the floating
 * and the entrance.
 */
export function BackTop({ threshold = 400, label = "Back to top", ...rest }: BackTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div data-scope="back-top" data-part="root" data-state={visible ? "shown" : "hidden"}>
      <Button
        {...rest}
        variant="outline"
        square
        size="lg"
        type="button"
        aria-label={label}
        aria-hidden={visible ? undefined : "true"}
        tabIndex={visible ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        {rest.children ?? chevronUp()}
      </Button>
    </div>
  );
}

injectComponentStyle("back-top");
