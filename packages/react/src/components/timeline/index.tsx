import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";
import type * as React from "react";

/** A line of moments: Root is the ordered thread, Item one moment on it,
 * Marker the point where the thread passes, Content what the moment
 * holds. The hairline between markers is drawn by the stylesheet. */
function part(name: string, tag: string) {
  const Tag = tag as "ol";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="timeline" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Timeline" + name;
  return Component;
}

function Root({
  orientation = "vertical",
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}) {
  injectComponentStyle("timeline");
  return (
    <ol {...rest} data-scope="timeline" data-part="root" data-orientation={orientation}>
      {children}
    </ol>
  );
}
Root.displayName = "TimelineRoot";

const Item = part("Item", "li");
const Marker = part("Marker", "span");
const Content = part("Content", "div");

export const Timeline = Object.assign(Root, { Root, Item, Marker, Content });

injectComponentStyle("timeline");
