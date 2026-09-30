import { injectComponentStyle } from "@bysages/core";
import { type DragEvent, type HTMLAttributes, useRef, useState } from "react";

export interface OrderOption {
  label: string;
  value: string;
}

const ARROWS: Record<string, string[]> = {
  up: ["m18 15-6-6-6 6"],
  down: ["m6 9 6 6 6-6"],
  top: ["m18 15-6-6-6 6", "M5 4h14"],
  bottom: ["m6 9 6 6 6-6", "M5 20h14"],
};

function arrowGlyph(paths: string[]) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={12}
      height={12}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
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
export function OrderList({ value, options, label, onValueChange, ...rest }: OrderListProps) {
  injectComponentStyle("order-list");
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
      role="listbox"
      aria-label={label ?? undefined}
      aria-multiselectable={false}
      data-scope="order-list"
      data-part="root"
      onDragLeave={(event) => {
        const host = event.currentTarget;
        if (!event.relatedTarget || !host.contains(event.relatedTarget as Node)) setDropLine(null);
      }}
    >
      <ol data-scope="order-list" data-part="list">
        {rows.map((option, index) => {
          const seam =
            dropLine && dropLine.index === index ? (dropLine.before ? "top" : "bottom") : undefined;
          return (
            <li
              key={option.value}
              role="option"
              aria-selected
              draggable
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
                    ["Move to top", ARROWS.top, -index, 0],
                    ["Move up", ARROWS.up, -1, 0],
                    ["Move down", ARROWS.down, 1, rows.length - 1],
                    ["Move to bottom", ARROWS.bottom, rows.length - 1 - index, rows.length - 1],
                  ] as const
                ).map(([aria, paths, offset, edge]) => (
                  <button
                    key={aria}
                    type="button"
                    aria-label={aria}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index === edge}
                    onClick={() => move(option.value, offset)}
                  >
                    {arrowGlyph([...paths])}
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
