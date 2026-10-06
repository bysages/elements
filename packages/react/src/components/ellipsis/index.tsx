import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** The overflow knife: text cut at one line, or held to N lines. The
 * primitive only draws the cut — reaching the full text (title,
 * tooltip) stays the consumer's decision. */
export interface EllipsisProps extends HTMLAttributes<HTMLElement> {
  lines?: number;
}

function EllipsisImpl({ lines = 1, ...rest }: EllipsisProps) {
  injectComponentStyle("ellipsis");
  const multiline = lines > 1;
  return (
    <span
      {...rest}
      style={
        multiline
          ? ({
              ...rest.style,
              "--bs-ellipsis-lines": String(lines),
            } as CSSProperties)
          : rest.style
      }
      data-scope="ellipsis"
      data-part="root"
      data-multiline={multiline ? "" : undefined}
    />
  );
}

export const Ellipsis = withSelfRoot(EllipsisImpl);
