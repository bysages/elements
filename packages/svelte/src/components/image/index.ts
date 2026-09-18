import { injectComponentStyle } from "@bysages/core";

import ImageComponent from "./Image.svelte";

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the fallback snippet — or the placeholder glyph when
 * the caller has nothing local to say. The frame's size is the
 * consumer's to give. */
export const Image = ImageComponent;

export type { ImageProps } from "./props";

injectComponentStyle("image");
