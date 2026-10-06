import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name when more than one toolbar shares a page. */
  label?: string;
  /** Tools at the leading edge; `children` land here when no start is
   * given. */
  start?: ReactNode;
  /** Tools at the trailing edge. */
  end?: ReactNode;
  children?: ReactNode;
}

/** A workbench rail: the start tools at the leading edge, the end tools
 * at the trailing, the rail itself carrying the toolbar role so
 * assistive tech reads it as one group of commands. */
function ToolbarImpl({ label, start, end, children, ...rest }: ToolbarProps) {
  injectComponentStyle("toolbar");
  return (
    <div
      {...rest}
      role="toolbar"
      aria-label={label ?? undefined}
      data-scope="toolbar"
      data-part="root"
    >
      <div data-scope="toolbar" data-part="group" data-edge="start">
        {start ?? children}
      </div>
      {end ? (
        <div data-scope="toolbar" data-part="group" data-edge="end">
          {end}
        </div>
      ) : null}
    </div>
  );
}

export const Toolbar = withSelfRoot(ToolbarImpl);
