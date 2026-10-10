import { injectComponentStyle } from "@bysages/core/styling";
import { mergeProps } from "solid-js";
import type { Component, JSX } from "solid-js";

import { useComponentMessages } from "../config-provider/use-component-messages";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
type PartExtra =
  | Record<string, string>
  | ((messages: { breadcrumb: { label: string } }) => Record<string, string>);

function part<P extends Record<string, unknown>>(
  name: string,
  tag: string,
  extra: PartExtra = {},
): Component<P> {
  return ((props: P) => {
    const messages = useComponentMessages();
    const partExtra = typeof extra === "function" ? extra(messages()) : extra;
    const Tag = tag as "nav";
    return (
      <Tag
        {...partExtra}
        {...(props as JSX.HTMLAttributes<HTMLElement>)}
        data-scope="breadcrumb"
        data-part={name.toLowerCase()}
      />
    );
  }) as Component<P>;
}

const Root = part("Root", "nav", (messages) => ({ "aria-label": messages.breadcrumb.label }));
const List = part("List", "ol");
const Item = part("Item", "li");
const Link = part("Link", "a");
const Current = part("Current", "span", { "aria-current": "page" });

// The quiet slash between waymarks, present when the reader passes no
// mark of their own. The default rides beneath the spread, so given
// children win.
const Separator: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span
    {...mergeProps({ children: "/" as JSX.Element }, props)}
    aria-hidden="true"
    data-scope="breadcrumb"
    data-part="separator"
  />
);

export const Breadcrumb = Object.assign(Root, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});

injectComponentStyle("breadcrumb");
