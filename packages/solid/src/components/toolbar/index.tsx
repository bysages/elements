import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

export interface ToolbarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Accessible name when more than one toolbar shares a page. */
  label?: string;
  /** Tools at the leading edge; `children` land here when no start is
   * given. */
  start?: JSX.Element;
  /** Tools at the trailing edge. */
  end?: JSX.Element;
  children?: JSX.Element;
}

/** A workbench rail: the start tools at the leading edge, the end tools
 * at the trailing, the rail itself carrying the toolbar role so
 * assistive tech reads it as one group of commands. */
export const Toolbar = withSelfRoot(function Toolbar(props: ToolbarProps) {
  injectComponentStyle("toolbar");
  const [own, rest] = splitProps(props, ["label", "start", "end", "children"]);
  return (
    <div {...rest} role="toolbar" aria-label={own.label} data-scope="toolbar" data-part="root">
      <div data-scope="toolbar" data-part="group" data-edge="start">
        {own.start ?? own.children}
      </div>
      <Show when={own.end}>
        <div data-scope="toolbar" data-part="group" data-edge="end">
          {own.end}
        </div>
      </Show>
    </div>
  );
});
