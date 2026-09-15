import { injectComponentStyle } from "@bysages/core";
import { mergeProps } from "solid-js";
import type { Component, JSX } from "solid-js";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
function part<P extends Record<string, unknown>>(
  name: string,
  tag: string,
  extra: Record<string, string> = {},
): Component<P> {
  return ((props: P) => {
    const Tag = tag as "nav";
    return (
      <Tag
        {...extra}
        {...(props as JSX.HTMLAttributes<HTMLElement>)}
        data-scope="breadcrumb"
        data-part={name.toLowerCase()}
      />
    );
  }) as Component<P>;
}

const Root = part("Root", "nav", { "aria-label": "Breadcrumb" });
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
