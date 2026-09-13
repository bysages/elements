import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

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

const Root = part("Root", "ol");
const Item = part("Item", "li");
const Marker = part("Marker", "span");
const Content = part("Content", "div");

export const Timeline = Object.assign(Root, { Root, Item, Marker, Content });

injectComponentStyle("timeline");
