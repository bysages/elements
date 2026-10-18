import { injectComponentStyle } from "@bysages/core/styling";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { Fragment } from "react";

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

export type BreadcrumbItem = string | { label: string; href?: string };

export interface BreadcrumbFacadeProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The trail, ordered from its origin to the current page. */
  items: BreadcrumbItem[];
  /** Replaces the shared accessible name for the trail. */
  label?: string;
}

function BreadcrumbFacade({ items, label, className, ...rest }: BreadcrumbFacadeProps) {
  const last = items.length - 1;

  return (
    <Root className={className} {...rest} aria-label={rest["aria-label"] ?? label}>
      <List>
        {items.map((item, index) => {
          const text = typeof item === "string" ? item : item.label;
          const href = typeof item === "string" ? undefined : item.href;

          return (
            <Fragment key={`${text}-${index}`}>
              <Item>
                {index === last ? <Current>{text}</Current> : <Link href={href}>{text}</Link>}
              </Item>
              {index < last ? <Separator /> : null}
            </Fragment>
          );
        })}
      </List>
    </Root>
  );
}

BreadcrumbFacade.displayName = "SBreadcrumb";

export const Breadcrumb = Object.assign(BreadcrumbFacade, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});

injectComponentStyle("breadcrumb");
