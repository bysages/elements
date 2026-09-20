import { injectComponentStyle } from "@bysages/core";
import { onCleanup, onMount, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";

export interface BackTopProps extends JSX.HTMLAttributes<HTMLButtonElement> {
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
export function BackTop(props: BackTopProps) {
  const [own, rest] = splitProps(props, ["threshold", "label", "scrollEl"]);
  const [visible, setVisible] = createSignal(false);

  const scroller = () => own.scrollEl?.() ?? null;

  const onScroll = () => {
    const el = scroller();
    setVisible((el ? el.scrollTop : window.scrollY) > (own.threshold ?? 400));
  };

  // A moored control has no stylesheet contract for smooth scrolling,
  // so the return trip asks the media query itself.
  const toTop = () => {
    const el = scroller();
    if (!el) {
      window.scrollTo({ top: 0 });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  onMount(() => {
    const el = scroller();
    onScroll();
    if (el) el.addEventListener("scroll", onScroll, { passive: true });
    else window.addEventListener("scroll", onScroll, { passive: true });
  });
  onCleanup(() => {
    const el = scroller();
    if (el) el.removeEventListener("scroll", onScroll);
    else window.removeEventListener("scroll", onScroll);
  });

  return (
    <div
      data-scope="back-top"
      data-part="root"
      data-state={visible() ? "shown" : "hidden"}
      {...(scroller() ? { "data-container": "" } : {})}
    >
      <Button
        {...rest}
        variant="outline"
        square
        size="lg"
        aria-label={own.label ?? "Back to top"}
        aria-hidden={visible() ? undefined : "true"}
        tabindex={visible() ? 0 : -1}
        onClick={toTop}
      >
        {rest.children ?? chevronUp()}
      </Button>
    </div>
  );
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
      stroke-width={1.75}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 14 6-6 6 6" />
    </svg>
  );
}

injectComponentStyle("back-top");
