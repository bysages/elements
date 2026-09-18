import { injectComponentStyle } from "@bysages/core";

import WatermarkComponent from "./Watermark.svelte";

/** The paper bears its seal beneath the content: a canvas draws the
 * text once into a tile (rotated, faint, crisp at the screen's pixel
 * density) and the marks layer repeats it over the children. The seal
 * redraws itself when a prop turns — and it never takes a pointer. */
export const Watermark = WatermarkComponent;

export type { WatermarkProps } from "./props";

injectComponentStyle("watermark");
