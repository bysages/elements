/**
 * Ink ripple — the press feedback of the paper-and-ink register. Where
 * Material spreads a hard circle, ink bleeds: a soft wash of the element's
 * own pigment diluting outward from the press point, gone before it draws
 * attention to itself.
 *
 * The bleed's CSS lives in the base stylesheet, keyed on
 * `data-motion~="ink-ripple"`; this module watches presses and marks the
 * press point. Reduced motion collapses the bleed to a state change, as
 * everywhere else in the system.
 *
 * @module
 */

const RIPPLE_SELECTOR = "[data-motion~='ink-ripple']";

let detachPress: (() => void) | undefined;

/** Watch for presses anywhere inside `root` (default: the document) and
 * bleed ink from the press point of the nearest opt-in element. Safe to
 * call more than once; returns the detach function. */
export function attachInkRipple(root?: HTMLElement): () => void {
  detachInkRipple();
  if (typeof document === "undefined") return () => {};

  const onEnd = (event: Event) => {
    if (event.target instanceof HTMLElement) delete event.target.dataset.ripple;
  };

  const onDown = (event: PointerEvent) => {
    if (event.pointerType !== "touch" && event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const host = target.closest(RIPPLE_SELECTOR);
    if (!(host instanceof HTMLElement)) return;

    const rect = host.getBoundingClientRect();
    host.style.setProperty("--bs-ripple-x", `${(event.clientX - rect.left).toFixed(1)}px`);
    host.style.setProperty("--bs-ripple-y", `${(event.clientY - rect.top).toFixed(1)}px`);
    // Re-inserting the attribute restarts the animation even on a
    // rapid second press while the first bleed is still running.
    delete host.dataset.ripple;
    void host.offsetWidth;
    host.dataset.ripple = "run";
  };

  const scope = root ?? document;
  scope.addEventListener("pointerdown", onDown, { passive: true });
  scope.addEventListener("animationend", onEnd, true);
  detachPress = () => {
    scope.removeEventListener("pointerdown", onDown);
    scope.removeEventListener("animationend", onEnd, true);
  };
  return detachPress;
}

/** Stop watching presses. */
export function detachInkRipple(): void {
  detachPress?.();
  detachPress = undefined;
}
