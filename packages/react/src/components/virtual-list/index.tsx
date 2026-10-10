import { injectComponentStyle } from "@bysages/core/styling";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type CSSProperties, type HTMLAttributes, type ReactNode, useRef } from "react";

import { withSelfRoot } from "../../internal/family";

export interface VirtualListProps extends HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** The height every row occupies — fixed rows keep it simple. */
  itemHeight?: number;
  /** The viewport height the ledger scrolls within. */
  height?: number | string;
  /** Renders one record into its positioned row. */
  renderItem?: (item: unknown, index: number) => ReactNode;
}

function toCssLength(length: number | string) {
  return typeof length === "number" ? `${length}px` : length;
}

/** A ledger that only mounts the rows on stage: the viewport keeps its
 * scroll length by a spacer sized from the row height, the rows
 * themselves are positioned against it — a ten-thousand-row list
 * costs the DOM a window, not the ledger. */
function VirtualListImpl({
  items,
  itemHeight = 40,
  height = 320,
  renderItem,
  ...rest
}: VirtualListProps) {
  injectComponentStyle("virtual-list");
  const viewport = useRef<HTMLDivElement | null>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => viewport.current,
    estimateSize: () => itemHeight,
    overscan: 6,
  });
  return (
    <div
      {...rest}
      ref={viewport}
      tabIndex={0}
      data-scope="virtual-list"
      data-part="root"
      style={
        {
          ...(rest.style as CSSProperties),
          "--bs-virtual-list-height": toCssLength(height),
        } as CSSProperties
      }
    >
      <div
        data-scope="virtual-list"
        data-part="inner"
        style={{ "--bs-virtual-list-total": `${virtualizer.getTotalSize()}px` } as CSSProperties}
      >
        {virtualizer.getVirtualItems().map((row) => (
          <div
            key={String(row.key)}
            data-scope="virtual-list"
            data-part="row"
            style={
              {
                "--bs-virtual-list-row-start": `${row.start}px`,
                "--bs-virtual-list-row-size": `${row.size}px`,
              } as CSSProperties
            }
          >
            {renderItem?.(items[row.index], row.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualList = withSelfRoot(VirtualListImpl);
