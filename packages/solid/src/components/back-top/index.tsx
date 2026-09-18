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
export function BackTop(props: BackTopProps) {
  const [own, rest] = splitProps(props, ["threshold", "label"]);
  const [visible, setVisible] = createSignal(false);

  const onScroll = () => {
    setVisible(window.scrollY > (own.threshold ?? 400));
  };

  onMount(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
  onCleanup(() => window.removeEventListener("scroll", onScroll));

  return (
    <div data-scope="back-top" data-part="root" data-state={visible() ? "shown" : "hidden"}>
      <Button
        {...rest}
        variant="outline"
        square
        size="lg"
        aria-label={own.label ?? "Back to top"}
        aria-hidden={visible() ? undefined : "true"}
        tabindex={visible() ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0 })}
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
