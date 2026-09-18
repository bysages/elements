/**
 * Sketch wobble — the hand-drawn tremble of the 写意 scene. Native SVG,
 * no dependency: a fractal-noise displacement that bends a straight edge
 * like a felt-tip stroke. The module only mounts four filter definitions
 * (four seeds, so siblings wobble differently) and returns a detach; the
 * sketch scene's CSS decides where they apply, and a scene other than
 * sketch references none of them.
 *
 * @module
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const FILTER_COUNT = 4;

let detachWobble: (() => void) | undefined;

/** Mount the wobble filter definitions into `document.body` (SSR is a
 * no-op). Safe to call more than once; returns the detach function. */
export function attachSketchWobble(): () => void {
  detachSketchWobble();
  if (typeof document === "undefined") return () => {};

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  // Reference-only definitions: zero-sized and out of flow.
  svg.style.position = "absolute";
  svg.style.inlineSize = "0";
  svg.style.blockSize = "0";

  for (let i = 0; i < FILTER_COUNT; i++) {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.id = `bs-sketch-wobble-${i + 1}`;
    // Low frequency, so the line sways like a slow brush; the seed per
    // slot makes the sway a different shape in each.
    const noise = document.createElementNS(SVG_NS, "feTurbulence");
    noise.setAttribute("type", "fractalNoise");
    noise.setAttribute("baseFrequency", "0.012");
    noise.setAttribute("numOctaves", "2");
    noise.setAttribute("seed", String(i + 1));
    noise.setAttribute("result", "noise");
    const map = document.createElementNS(SVG_NS, "feDisplacementMap");
    map.setAttribute("in", "SourceGraphic");
    map.setAttribute("in2", "noise");
    map.setAttribute("scale", "1.5");
    filter.append(noise, map);
    svg.append(filter);
  }

  document.body.append(svg);
  detachWobble = () => {
    svg.remove();
  };
  return detachWobble;
}

/** Unmount the wobble filter definitions. */
export function detachSketchWobble(): void {
  detachWobble?.();
  detachWobble = undefined;
}
