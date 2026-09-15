import { Highlight as ArkHighlight } from "@ark-ui/vue/highlight";
import { injectComponentStyle } from "@bysages/core";

/** Highlight, dressed in the paper-and-ink system: query hits are
 * strokes of pigment on the page — a quiet tint of the accent behind the
 * ink, never neon. The component renders bare <mark> elements, so the
 * document-wide mark default carries the look. The parts. */
export const Highlight = ArkHighlight;

injectComponentStyle("highlight");
