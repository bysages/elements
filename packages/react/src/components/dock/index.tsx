import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** The tallest an item swells under the hand — 1 stands still. */
  maxScale?: number;
  /** How far the hand reaches, in px, before an item stops answering. */
  radius?: number;
  children?: ReactNode;
}

export interface DockItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const ITEM = '[data-scope="dock"][data-part="item"]';

/** The magnifying dock: a floating rail whose icons swell toward the
 * hand. The wrapper measures per item and writes --bs-dock-scale; CSS
 * eases the chase, so no spring engine rides along. */
export function DockRoot({ maxScale = 1.5, radius = 96, children, ...rest }: DockProps) {
  injectComponentStyle("dock");

  const magnify = (event: React.PointerEvent<HTMLDivElement>) => {
    for (const item of event.currentTarget.querySelectorAll<HTMLElement>(ITEM)) {
      const rect = item.getBoundingClientRect();
      const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const t = Math.max(0, 1 - dist / radius);
      item.style.setProperty("--bs-dock-scale", (1 + (maxScale - 1) * t * t).toFixed(4));
    }
  };

  const reset = (event: React.PointerEvent<HTMLDivElement>) => {
    for (const item of event.currentTarget.querySelectorAll<HTMLElement>(ITEM)) {
      item.style.removeProperty("--bs-dock-scale");
    }
  };

  return (
    <div
      {...rest}
      data-scope="dock"
      data-part="root"
      style={{ ...rest.style, "--bs-dock-max-scale": maxScale } as CSSProperties}
      onPointerMove={magnify}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}

/** One moored place in the rail: whatever slots in grows from the
 * floor, never from its center. */
export function DockItem({ children, ...rest }: DockItemProps) {
  injectComponentStyle("dock");

  return (
    <div {...rest} data-scope="dock" data-part="item">
      {children}
    </div>
  );
}

/** The whole family under one handle — Dock.Root, Dock.Item. */
export const Dock = Object.assign(DockRoot, { Root: DockRoot, Item: DockItem });
