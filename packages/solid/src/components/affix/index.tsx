import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface AffixProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Where the content pins when it reaches the top of the scrolling
   * ancestor — the height of any fixed header it must clear. */
  offsetTop?: string;
  /** Where it pins from the bottom instead, for footers and action bars. */
  offsetBottom?: string;
}

/**
 * A nail: the wrapped content travels with the page until it reaches its
 * offset, then stays put while the page moves on. The semantics are
 * plain `position: sticky` — pinning is relative to the nearest
 * *scrolling* ancestor, so the element works inside a scrollable panel
 * exactly as it does on the page itself, and a parent with
 * `overflow: hidden` clips the pin. Both offsets may be given: the
 * content then holds its place inside that band.
 */
export function Affix(props: AffixProps) {
  const [own, rest] = splitProps(props, ["offsetTop", "offsetBottom"]);
  return (
    <div
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        top: own.offsetTop ?? "0px",
        bottom: own.offsetBottom ?? "0px",
      }}
      data-scope="affix"
      data-part="root"
    />
  );
}

injectComponentStyle("affix");
