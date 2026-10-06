import { injectComponentStyle } from "@bysages/core";
import { type DragEvent, type HTMLAttributes, useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../../internal/messages";

export interface OrderOption {
  label: string;
  value: string;
}

type OrderDirection = "up" | "down" | "top" | "bottom";

const ORDER_ICONS: Record<OrderDirection, { name: string; rail?: string }> = {
  up: { name: "chevron-up" },
  down: { name: "chevron-down" },
  top: { name: "chevron-up", rail: `<path d="M5 4h14" />` },
  bottom: { name: "chevron-down", rail: `<path d="M5 20h14" />` },
};

function orderIcon(direction: OrderDirection) {
  const icon = ORDER_ICONS[direction];
  return iconNode(icon.name, { width: 12, height: 12 }, icon.rail ?? "");
}

export interface OrderListProps extends HTMLAttributes<HTMLDivElement> {
  /** The rows in their current order — the value is the order. */
  value: string[];
  /** Every row the ledger knows, in no particular order. */
  options: OrderOption[];
  label?: string;
  onValueChange?: (value: string[]) => void;
}

/** A ledger the reader may rewrite: rows move by grip or by the side
 * arrows, and the group reports the new order as the value itself —
 * the model is the order. Dragging rides the native drag events — a
 * hairline of primary ink marks the seam the row will land on — so
 * touch keeps the buttons as its route. */
function OrderListImpl({ value, options, label, onValueChange, ...rest }: OrderListProps) {
  injectComponentStyle("order-list");
  const messages = useComponentMessages();
  const dragging = useRef<string | null>(null);
  const [dropLine, setDropLine] = useState<{
    index: number;
    before: boolean;
  } | null>(null);

  const rows = value
    .map((entry) => options.find((option) => option.value === entry))
    .filter((option): option is OrderOption => option != null);

  function reset() {
    dragging.current = null;
    setDropLine(null);
  }
  function move(entry: string, offset: number) {
    const next = [...value];
    const from = next.indexOf(entry);
    const to = Math.max(0, Math.min(next.length - 1, from + offset));
    if (from === to) return;
    next.splice(to, 0, ...next.splice(from, 1));
    onValueChange?.(next);
  }
  function drop() {
    const entry = dragging.current;
    if (entry == null) return;
    const seam = dropLine;
    const from = value.indexOf(entry);
    if (seam && seam.index === from) return reset();
    const next = value.filter((candidate) => candidate !== entry);
    let at = seam ? (seam.before ? seam.index : seam.index + 1) : next.length;
    if (from < at) at -= 1;
    next.splice(Math.max(0, Math.min(next.length, at)), 0, entry);
    onValueChange?.(next);
    reset();
  }
  function over(event: DragEvent<HTMLLIElement>, index: number, entry: OrderOption) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    const rect = event.currentTarget.getBoundingClientRect();
    const before = event.clientY < rect.top + rect.height / 2;
    setDropLine(
      dragging.current != null && !(entry.value === dragging.current && before)
        ? { index, before }
        : null,
    );
  }
  return (
    <div
      {...rest}
      data-scope="order-list"
      data-part="root"
      onDragLeave={(event) => {
        const host = event.currentTarget;
        if (!event.relatedTarget || !host.contains(event.relatedTarget as Node)) setDropLine(null);
      }}
    >
      <ol data-scope="order-list" data-part="list" aria-label={label ?? undefined}>
        {rows.map((option, index) => {
          const seam =
            dropLine && dropLine.index === index ? (dropLine.before ? "top" : "bottom") : undefined;
          return (
            <li
              key={option.value}
              draggable
              aria-roledescription="Sortable item"
              data-scope="order-list"
              data-part="item"
              data-dragging={dragging.current === option.value ? "" : undefined}
              data-drop-line={seam}
              onDragStart={(event) => {
                dragging.current = option.value;
                event.dataTransfer?.setData("text/plain", option.value);
                if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={reset}
              onDragOver={(event) => over(event, index, option)}
              onDrop={(event) => {
                event.preventDefault();
                drop();
              }}
            >
              <span data-scope="order-list" data-part="grip" aria-hidden="true">
                ⋮⋮
              </span>
              <span data-scope="order-list" data-part="label">
                {option.label}
              </span>
              <span data-scope="order-list" data-part="controls">
                {(
                  [
                    [messages.orderList.toTop, "top", -index, 0],
                    [messages.orderList.moveUp, "up", -1, 0],
                    [messages.orderList.moveDown, "down", 1, rows.length - 1],
                    [
                      messages.orderList.toBottom,
                      "bottom",
                      rows.length - 1 - index,
                      rows.length - 1,
                    ],
                  ] as const
                ).map(([aria, direction, offset, edge]) => (
                  <button
                    key={aria}
                    type="button"
                    aria-label={aria}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index === edge}
                    onClick={() => move(option.value, offset)}
                  >
                    {orderIcon(direction)}
                  </button>
                ))}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const OrderList = withSelfRoot(OrderListImpl);
