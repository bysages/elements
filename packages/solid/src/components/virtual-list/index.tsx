import { injectComponentStyle } from "@bysages/core";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { For, createSignal, splitProps, type JSX } from "solid-js";

export interface VirtualListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** The height every row occupies — fixed rows keep it simple. */
  itemHeight?: number;
  /** The viewport height the ledger scrolls within. */
  height?: number | string;
  /** Renders one record into its positioned row. */
  renderItem?: (item: unknown, index: number) => JSX.Element;
}

/** A ledger that only mounts the rows on stage: the viewport keeps its
 * scroll length by a spacer sized from the row height, the rows
 * themselves are positioned against it — a ten-thousand-row list
 * costs the DOM a window, not the ledger. */
export function VirtualList(props: VirtualListProps) {
  injectComponentStyle("virtual-list");
  const [own, rest] = splitProps(props, ["items", "itemHeight", "height", "renderItem", "style"]);
  const restStyle = own.style;
  const [viewport, setViewport] = createSignal<HTMLDivElement | null>(null);
  const virtualizer = createVirtualizer({
    count: own.items.length,
    getScrollElement: () => viewport(),
    estimateSize: () => own.itemHeight ?? 40,
    overscan: 6,
  });
  return (
    <div
      {...rest}
      ref={setViewport}
      data-scope="virtual-list"
      data-part="root"
      style={{
        ...(typeof restStyle === "object" && restStyle ? restStyle : {}),
        "block-size": typeof own.height === "number" ? `${own.height}px` : (own.height ?? "320px"),
      }}
    >
      <div
        data-scope="virtual-list"
        data-part="inner"
        style={{ "block-size": `${virtualizer.getTotalSize()}px`, position: "relative" }}
      >
        <For each={virtualizer.getVirtualItems()}>
          {(row) => (
            <div
              data-scope="virtual-list"
              data-part="row"
              style={{
                position: "absolute",
                top: "0",
                "inset-inline-start": "0",
                "inline-size": "100%",
                transform: `translateY(${row.start}px)`,
                "block-size": `${row.size}px`,
              }}
            >
              {own.renderItem?.(own.items[row.index], row.index)}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
