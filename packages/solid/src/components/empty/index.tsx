import { injectComponentStyle } from "@bysages/core";
import type { Component, JSX } from "solid-js";

/** An empty state: the page holds its breath. Root centers the column,
 * Visual carries the mark, Title and Description carry the ink, Actions
 * the way out. Any subset composes. */
function part<P extends Record<string, unknown>>(name: string, tag: string): Component<P> {
  return ((props: P) => {
    const Tag = tag as "div";
    return (
      <Tag
        {...(props as JSX.HTMLAttributes<HTMLDivElement>)}
        data-scope="empty"
        data-part={name.toLowerCase()}
      />
    );
  }) as Component<P>;
}

const Root = part("Root", "div");
const Visual = part("Visual", "div");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

export const Empty = Object.assign(Root, { Root, Visual, Title, Description, Actions });

injectComponentStyle("empty");
