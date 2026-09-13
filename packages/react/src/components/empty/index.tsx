import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** An empty state: the page holds its breath. Root centers the column,
 * Visual carries the mark, Title and Description carry the ink, Actions
 * the way out. Any subset composes. */
function part(name: string, tag: string) {
  const Tag = tag as "div";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="empty" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Empty" + name;
  return Component;
}

const Root = part("Root", "div");
const Visual = part("Visual", "div");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

export const Empty = Object.assign(Root, { Root, Visual, Title, Description, Actions });

injectComponentStyle("empty");
