import { injectComponentStyle } from "@bysages/core";
import type { Component, JSX } from "solid-js";

/** A line of moments: Root is the ordered thread, Item one moment on it,
 * Marker the point where the thread passes, Content what the moment
 * holds. The hairline between markers is drawn by the stylesheet. */
function part<P extends Record<string, unknown>>(name: string, tag: string): Component<P> {
  return ((props: P) => {
    const Tag = tag as "ol";
    return (
      <Tag {...(props as JSX.HTMLAttributes<HTMLElement>)} data-scope="timeline" data-part={name.toLowerCase()} />
    );
  }) as Component<P>;
}

const Root = part("Root", "ol");
const Item = part("Item", "li");
const Marker = part("Marker", "span");
const Content = part("Content", "div");

export const Timeline = Object.assign(Root, { Root, Item, Marker, Content });

injectComponentStyle("timeline");
