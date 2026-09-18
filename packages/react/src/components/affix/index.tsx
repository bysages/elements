import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/**
 * A nail: the wrapped content travels with the page until it reaches its
 * offset, then stays put while the page moves on. The semantics are
 * plain `position: sticky` — pinning is relative to the nearest
 * *scrolling* ancestor, so the element works inside a scrollable panel
 * exactly as it does on the page itself, and a parent with
 * `overflow: hidden` clips the pin. Both offsets may be given: the
 * content then holds its place inside that band.
 */
export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
  /** Where the content pins when it reaches the top of the scrolling
   * ancestor — the height of any fixed header it must clear. */
  offsetTop?: string;
  /** Where it pins from the bottom instead, for footers and action bars. */
  offsetBottom?: string;
}

export function Affix({ offsetTop = "0px", offsetBottom = "0px", ...rest }: AffixProps) {
  return (
    <div
      {...rest}
      style={{ ...rest.style, top: offsetTop, bottom: offsetBottom }}
      data-scope="affix"
      data-part="root"
    />
  );
}

injectComponentStyle("affix");
