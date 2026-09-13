/**
 * Lighting engine — the dynamic half of the light pipeline. Every elevation
 * token computes its shadow from four CSS variables (`--bs-light-x/-y`,
 * `--bs-light-reach`, `--bs-shadow-ink`), so writing those variables re-lights
 * the whole interface and every component follows without owning any shadow
 * code of its own.
 *
 * `setLight` places the key light once (a scene's bundled light, or an
 * application's choice). `attachDynamicLight` lets the pointer carry it:
 * the element under the cursor is lit locally, its shadow leaning away from
 * the pointer as the light would cast it.
 *
 * @module
 */

export interface LightState {
  /** Shadow offset along x — the direction the light pushes away from. */
  x?: string;
  /** Shadow offset along y. */
  y?: string;
  /** How far shadows spread; multiplies every elevation's reach. */
  reach?: number;
  /** Shadow hue, any CSS color (themes use oklch). */
  ink?: string;
}

const ROOT_VARS = ["--bs-light-x", "--bs-light-y", "--bs-light-reach", "--bs-shadow-ink"] as const;

/** Place the key light on the document root. Omitted parts keep their
 * current value. Inline styles set here outrank scene and theme defaults. */
export function setLight(state: LightState): void {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  if (state.x !== undefined) style.setProperty("--bs-light-x", state.x);
  if (state.y !== undefined) style.setProperty("--bs-light-y", state.y);
  if (state.reach !== undefined) style.setProperty("--bs-light-reach", String(state.reach));
  if (state.ink !== undefined) style.setProperty("--bs-shadow-ink", state.ink);
}

/** Read the key light currently in force on the document root. */
export function getLight(): LightState {
  if (typeof document === "undefined") return {};
  const style = document.documentElement.style;
  const state: LightState = {};
  const x = style.getPropertyValue("--bs-light-x");
  const y = style.getPropertyValue("--bs-light-y");
  const reach = style.getPropertyValue("--bs-light-reach");
  const ink = style.getPropertyValue("--bs-shadow-ink");
  if (x) state.x = x;
  if (y) state.y = y;
  if (reach) state.reach = Number(reach);
  if (ink) state.ink = ink;
  return state;
}

/** Remove the inline light so theme and scene declarations take over. */
export function resetLight(): void {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  for (const name of ROOT_VARS) style.removeProperty(name);
}

/** Elements carrying `data-motion~="lit"` follow the pointer: their local
 * light leans toward the cursor and their shadow leans away. */
const LIT_SELECTOR = "[data-motion~='lit']";

let detachPointer: (() => void) | undefined;

export interface DynamicLightOptions {
  /** Largest shadow shift, in px, when the pointer sits at an element's
   * edge. Defaults to 3 — enough to feel alive, never enough to wobble. */
  strength?: number;
}

/** Let the pointer carry the light across every lit element. Skips touch
 * pointers and honors `prefers-reduced-motion`; safe to call more than
 * once (the previous listener is replaced). Returns the detach function. */
export function attachDynamicLight(options: DynamicLightOptions = {}): () => void {
  detachDynamicLight();
  if (typeof document === "undefined") return () => {};

  const strength = options.strength ?? 3;
  let frame = 0;
  let lastEvent: PointerEvent | undefined;

  const apply = () => {
    frame = 0;
    const event = lastEvent;
    lastEvent = undefined;
    if (!event || event.pointerType === "touch") return;

    const target = event.target;
    if (!(target instanceof Element)) return;
    const lit = target.closest(LIT_SELECTOR);
    const previous = document.querySelector(`${LIT_SELECTOR}[style]`);

    if (lit instanceof HTMLElement) {
      // Shift the light toward the pointer, clamp to ±strength: the
      // shadow cast on the far side leans the same amount away.
      const rect = lit.getBoundingClientRect();
      const dx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const dy = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      lit.style.setProperty(
        "--bs-light-x",
        `${(Math.max(-1, Math.min(1, dx)) * strength).toFixed(2)}px`,
      );
      lit.style.setProperty(
        "--bs-light-y",
        `${(Math.max(-1, Math.min(1, dy)) * strength).toFixed(2)}px`,
      );
    } else if (previous instanceof HTMLElement) {
      previous.style.removeProperty("--bs-light-x");
      previous.style.removeProperty("--bs-light-y");
    }
  };

  const onMove = (event: PointerEvent) => {
    lastEvent = event;
    if (!frame) frame = requestAnimationFrame(apply);
  };

  const reduced =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced?.matches) return () => {};

  document.addEventListener("pointermove", onMove, { passive: true });
  detachPointer = () => document.removeEventListener("pointermove", onMove);
  return detachPointer;
}

/** Stop the pointer from carrying the light and clear any local shifts. */
export function detachDynamicLight(): void {
  detachPointer?.();
  detachPointer = undefined;
  if (typeof document !== "undefined") {
    for (const lit of document.querySelectorAll(LIT_SELECTOR)) {
      if (lit instanceof HTMLElement) {
        lit.style.removeProperty("--bs-light-x");
        lit.style.removeProperty("--bs-light-y");
      }
    }
  }
}
