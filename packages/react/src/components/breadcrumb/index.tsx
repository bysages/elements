import { injectComponentStyle } from "@bysages/core";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
function part<P extends HTMLAttributes<HTMLElement> = HTMLAttributes<HTMLElement>>(
  name: string,
  tag: string,
  extra: Record<string, string> = {},
  fallback?: ReactNode,
) {
  const Tag = tag as "nav";
  const Component = ({ children, ...rest }: P) => (
    <Tag
      {...extra}
      {...(rest as HTMLAttributes<HTMLElement>)}
      data-scope="breadcrumb"
      data-part={name.toLowerCase()}
    >
      {children ?? fallback}
    </Tag>
  );
  Component.displayName = "Breadcrumb" + name;
  return Component;
}

const Root = part("Root", "nav", { "aria-label": "Breadcrumb" });
const List = part("List", "ol");
const Item = part("Item", "li");
const Link = part<AnchorHTMLAttributes<HTMLAnchorElement>>("Link", "a");
const Current = part("Current", "span", { "aria-current": "page" });
const Separator = part("Separator", "span", { "aria-hidden": "true" }, "/");

export const Breadcrumb = Object.assign(Root, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});

injectComponentStyle("breadcrumb");
