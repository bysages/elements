import { injectComponentStyle } from "@bysages/core";

import BackTopComponent from "./BackTop.svelte";

/** A way home: after the page has scrolled past `threshold`, a small
 * floating control rises at the page's corner and returns the reader to
 * the top. The scroll itself stays native — `window.scrollTo` defers to
 * the stylesheet's `scroll-behavior: smooth`, which reduced motion turns
 * back into an instant jump. The control itself is the shared `Button`
 * (outline, square) — the paper, hairline and halo are its; this family
 * owns only the floating and the entrance. */
export const BackTop = BackTopComponent;

export type { BackTopProps } from "./props";

injectComponentStyle("back-top");
