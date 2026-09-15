import { Marquee as ArkMarquee } from "@ark-ui/vue/marquee";
import { injectComponentStyle } from "@bysages/core";

/** Marquee, dressed in the paper-and-ink system: a linear ribbon of
 * seal-cut chips that dissolves into the paper at its edges rather than
 * cutting off. The parts — Root, Viewport, Content, Edge, Item. */
export const Marquee = ArkMarquee;

injectComponentStyle("marquee");
