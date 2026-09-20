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
  /** Ride a scrolling element of your own instead of the page: the
   * control moors inside that element's corner and watches its
   * scrollTop. The host supplies the positioning context. */
  scrollEl?: () => HTMLElement | null;
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
 * back into an instant jump (a moored control asks the media query
 * directly, since a scroller of its own has no stylesheet to defer to).
 * The button stays mounted either way so the entrance is a transition,
 * never a pop.
 *
 * The control itself is the shared `Button` (outline, square) — the
 * paper, hairline and halo are its; this family owns only the floating
 * and the entrance.
 */
export function BackTop({
  threshold = 400,
  label = "Back to top",
  scrollEl,
  ...rest
}: BackTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = scrollEl?.() ?? null;
    const onScroll = () => setVisible((el ? el.scrollTop : window.scrollY) > threshold);
    onScroll();
    if (el) el.addEventListener("scroll", onScroll, { passive: true });
    else window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (el) el.removeEventListener("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, scrollEl]);

  const toTop = () => {
    const el = scrollEl?.();
    if (!el) {
      window.scrollTo({ top: 0 });
      return;
    }
    // A moored control has no stylesheet contract for smooth scrolling,
    // so the return trip asks the media query itself.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      data-scope="back-top"
      data-part="root"
      data-state={visible ? "shown" : "hidden"}
      {...(scrollEl ? { "data-container": "" } : {})}
    >
      <Button
        {...rest}
        variant="outline"
        square
        size="lg"
        type="button"
        aria-label={label}
        aria-hidden={visible ? undefined : "true"}
        tabIndex={visible ? 0 : -1}
        onClick={toTop}
      >
        {rest.children ?? chevronUp()}
      </Button>
    </div>
  );
}

injectComponentStyle("back-top");
