import { injectComponentStyle } from "@bysages/core/styling";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import { useComponentMessages } from "../../internal/messages";

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

function Root({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const messages = useComponentMessages();

  return (
    <nav
      {...rest}
      aria-label={rest["aria-label"] ?? messages.breadcrumb.label}
      data-scope="breadcrumb"
      data-part="root"
    >
      {children}
    </nav>
  );
}
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
