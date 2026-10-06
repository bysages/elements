import { Highlight as ArkHighlight } from "@ark-ui/react/highlight";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { withSelfRoot } from "../../internal/family";

/** Ark's Highlight, dressed in the paper-and-ink system: query hits are
 * strokes of pigment on the page — a quiet tint of the accent behind the
 * ink, never neon. The component renders bare <mark> elements, so the
 * document-wide mark default carries the look. The API is Ark's own. */
function HighlightRoot(props: ComponentProps<typeof ArkHighlight>) {
  return <ArkHighlight {...props} />;
}

export const Highlight = withSelfRoot(HighlightRoot as unknown as typeof ArkHighlight);

injectComponentStyle("highlight");
