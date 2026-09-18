/**
 * Ink ripple — the press feedback of the paper-and-ink register: a wash of
 * the element's own pigment bleeding outward from the press point. The
 * bleed is two-phase, answering the hand rather than the click — it spreads
 * while the pointer holds (`data-ripple="press"`) and dissolves when it
 * lifts (`data-ripple="release"`). A scene retunes the wash through the
 * `--bs-ripple-*` tokens; a register that presses without a wash silences
 * it with a zero opacity.
 *
 * The bleed's CSS lives in the base stylesheet, keyed on
 * `data-motion~="ink-ripple"`; this module watches pointers and marks the
 * phase. Reduced motion collapses the bleed to a state change, as
 * everywhere else in the system.
 *
 * @module
 */

const RIPPLE_SELECTOR = "[data-motion~='ink-ripple']";

/** A wash released before this long still plays out to here before it
 * dissolves — a quick tap earns a visible wave, not a flicker. */
const MIN_PRESS_MS = 225;

let detachPress: (() => void) | undefined;

/** Watch for presses anywhere inside `root` (default: the document) and
 * bleed ink from the press point of the nearest opt-in element. Safe to
 * call more than once; returns the detach function. */
export function attachInkRipple(root?: HTMLElement): () => void {
  detachInkRipple();
  if (typeof document === "undefined") return () => {};

  // The hosts holding a bleed, keyed by pointer id — two fingers on two
  // buttons bleed and release independently.
  const held = new Map<number, { host: HTMLElement; at: number }>();

  const onDown = (event: Event) => {
    // The scope union (Document | HTMLElement) resolves to the generic
    // listener signature, so the pointer payload is narrowed here.
    if (!(event instanceof PointerEvent)) return;
    if (event.pointerType !== "touch" && event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const host = target.closest(RIPPLE_SELECTOR);
    if (!(host instanceof HTMLElement)) return;

    const rect = host.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    host.style.setProperty("--bs-ripple-x", `${px.toFixed(1)}px`);
    host.style.setProperty("--bs-ripple-y", `${py.toFixed(1)}px`);
    // Where the element's center sits relative to the press point — the
    // wash drifts there as it spreads, welling up from the fingertip.
    host.style.setProperty("--bs-ripple-dx", `${(rect.width / 2 - px).toFixed(1)}px`);
    host.style.setProperty("--bs-ripple-dy", `${(rect.height / 2 - py).toFixed(1)}px`);
    // Re-inserting the attribute restarts the press even on a rapid second
    // press while the first wash is still dissolving.
    delete host.dataset.ripple;
    void host.offsetWidth;
    host.dataset.ripple = "press";
    held.set(event.pointerId, { host, at: performance.now() });
  };

  const onUp = (event: Event) => {
    if (!(event instanceof PointerEvent)) return;
    const press = held.get(event.pointerId);
    if (!press) return;
    held.delete(event.pointerId);
    // Honor the minimum visible wash: a release that comes too early is
    // held until the wave has had time to be seen.
    const remain = MIN_PRESS_MS - (performance.now() - press.at);
    if (remain > 0) {
      setTimeout(() => {
        if (press.host.dataset.ripple === "press") press.host.dataset.ripple = "release";
      }, remain);
    } else {
      press.host.dataset.ripple = "release";
    }
  };

  const onAnimationEnd = (event: Event) => {
    // Only the release phase clears itself — the press phase ends while
    // the pointer is still down, and its full wash must stay put.
    if (event.target instanceof HTMLElement && event.target.dataset.ripple === "release") {
      delete event.target.dataset.ripple;
    }
  };

  const scope = root ?? document;
  scope.addEventListener("pointerdown", onDown, { passive: true });
  scope.addEventListener("pointerup", onUp, { passive: true });
  scope.addEventListener("pointercancel", onUp, { passive: true });
  scope.addEventListener("animationend", onAnimationEnd, true);
  detachPress = () => {
    scope.removeEventListener("pointerdown", onDown);
    scope.removeEventListener("pointerup", onUp);
    scope.removeEventListener("pointercancel", onUp);
    scope.removeEventListener("animationend", onAnimationEnd, true);
  };
  return detachPress;
}

/** Stop watching presses. */
export function detachInkRipple(): void {
  detachPress?.();
  detachPress = undefined;
}
