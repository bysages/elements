import { Marquee as ArkMarquee } from "@ark-ui/svelte/marquee";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Marquee, dressed in the paper-and-ink system: a linear ribbon of
 * seal-cut chips that dissolves into the paper at its edges rather than
 * cutting off. The API is Ark's own — Root, Viewport, Content, Edge, Item. */
export const Marquee = ArkMarquee;

injectComponentStyle("marquee");
