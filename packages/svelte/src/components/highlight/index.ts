import { Highlight as ArkHighlight } from "@ark-ui/svelte/highlight";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Highlight, dressed in the paper-and-ink system: query hits are
 * strokes of pigment on the page — a quiet tint of the accent behind the
 * ink, never neon. The component renders bare <mark> elements, so the
 * document-wide mark default carries the look. The API is Ark's own. */
export const Highlight = ArkHighlight;

injectComponentStyle("highlight");
