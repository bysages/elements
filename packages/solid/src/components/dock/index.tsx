import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

export interface DockProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The tallest an item swells under the hand — 1 stands still. */
  maxScale?: number;
  /** How far the hand reaches, in px, before an item stops answering. */
  radius?: number;
}

export interface DockItemProps extends JSX.HTMLAttributes<HTMLDivElement> {}

const ITEM = '[data-scope="dock"][data-part="item"]';

/** The magnifying dock: a floating rail whose icons swell toward the
 * hand. The wrapper measures per item and writes --bs-dock-scale; CSS
 * eases the chase, so no spring engine rides along. */
export function DockRoot(props: DockProps) {
  injectComponentStyle("dock");

  const [own, rest] = splitProps(props, ["maxScale", "radius"]);
  const maxScale = () => own.maxScale ?? 1.5;
  const radius = () => own.radius ?? 96;

  const magnify = (event: PointerEvent) => {
    for (const item of (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(ITEM)) {
      const rect = item.getBoundingClientRect();
      const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const t = Math.max(0, 1 - dist / radius());
      item.style.setProperty("--bs-dock-scale", (1 + (maxScale() - 1) * t * t).toFixed(4));
    }
  };

  const reset = (event: PointerEvent) => {
    for (const item of (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(ITEM)) {
      item.style.removeProperty("--bs-dock-scale");
    }
  };

  return (
    <div
      {...rest}
      data-scope="dock"
      data-part="root"
      style={{ ...(rest.style as JSX.CSSProperties), "--bs-dock-max-scale": String(maxScale()) }}
      onPointerMove={magnify}
      onPointerLeave={reset}
    >
      {rest.children}
    </div>
  );
}

/** One moored place in the rail: whatever slots in grows from the
 * floor, never from its center. */
export function DockItem(props: DockItemProps) {
  injectComponentStyle("dock");

  return (
    <div {...props} data-scope="dock" data-part="item">
      {props.children}
    </div>
  );
}

/** The whole family under one handle — Dock.Root, Dock.Item. */
export const Dock = Object.assign(DockRoot, { Root: DockRoot, Item: DockItem });
