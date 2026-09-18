import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The overflow knife: text cut at one line, or held to N lines. The
 * primitive only draws the cut — reaching the full text (title,
 * tooltip) stays the consumer's decision. */
export interface EllipsisProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  lines?: number;
}

export function Ellipsis(props: EllipsisProps) {
  const [own, rest] = splitProps(props, ["lines"]);
  const multiline = () => (own.lines ?? 1) > 1;
  return (
    <span
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        ...(multiline() ? { "--bs-ellipsis-lines": String(own.lines) } : {}),
      }}
      data-scope="ellipsis"
      data-part="root"
      data-multiline={multiline() ? "" : undefined}
    />
  );
}

injectComponentStyle("ellipsis");
