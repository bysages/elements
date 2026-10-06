import { injectComponentStyle } from "@bysages/core";
import { For, createSignal, splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../config-provider/use-component-messages";

export interface OrderOption {
  label: string;
  value: string;
}

const ARROWS = {
  up: { name: "chevron-up", rail: "" },
  down: { name: "chevron-down", rail: "" },
  top: { name: "chevron-up", rail: '<path d="M5 4h14"/>' },
  bottom: { name: "chevron-down", rail: '<path d="M5 20h14"/>' },
};

function arrowIcon(arrow: (typeof ARROWS)[keyof typeof ARROWS]) {
  return iconNode(arrow.name, { width: "12", height: "12" }, arrow.rail);
}

export interface OrderListProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
export const OrderList = withSelfRoot(function OrderList(props: OrderListProps) {
  const messages = useComponentMessages();
  injectComponentStyle("order-list");
  const [own, rest] = splitProps(props, ["value", "options", "label", "onValueChange"]);
  const [dragging, setDragging] = createSignal<string | null>(null);
  const [dropLine, setDropLine] = createSignal<{ index: number; before: boolean } | null>(null);

  const rows = () =>
    own.value
      .map((entry) => own.options.find((option) => option.value === entry))
      .filter((option): option is OrderOption => option != null);

  function reset() {
    setDragging(null);
    setDropLine(null);
  }
  function move(entry: string, offset: number) {
    const next = [...own.value];
    const from = next.indexOf(entry);
    const to = Math.max(0, Math.min(next.length - 1, from + offset));
    if (from === to) return;
    next.splice(to, 0, ...next.splice(from, 1));
    own.onValueChange?.(next);
  }
  function drop() {
    const entry = dragging();
    if (entry == null) return;
    const seam = dropLine();
    const from = own.value.indexOf(entry);
    if (seam && seam.index === from) return reset();
    const next = own.value.filter((candidate) => candidate !== entry);
    let at = seam ? (seam.before ? seam.index : seam.index + 1) : next.length;
    if (from < at) at -= 1;
    next.splice(Math.max(0, Math.min(next.length, at)), 0, entry);
    own.onValueChange?.(next);
    reset();
  }
  return (
    <div
      {...rest}
      data-scope="order-list"
      data-part="root"

      onDragLeave={(event) => {
        const host = event.currentTarget as HTMLElement;
        if (!event.relatedTarget || !host.contains(event.relatedTarget as Node)) setDropLine(null);
      }}
    >
      <ol data-scope="order-list" data-part="list" aria-label={own.label}>
        <For each={rows()}>
          {(option, index) => {
            const seam = () =>
              dropLine() && dropLine()!.index === index()
                ? dropLine()!.before
                  ? "top"
                  : "bottom"
                : undefined;
            return (
              <li
                draggable
                aria-roledescription="Sortable item"
                data-scope="order-list"
                data-part="item"
                data-dragging={dragging() === option.value ? "" : undefined}
                data-drop-line={seam()}
                onDragStart={(event) => {
                  setDragging(option.value);
                  event.dataTransfer?.setData("text/plain", option.value);
                  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
                }}
                onDragEnd={reset}
                onDragOver={(event: DragEvent & { currentTarget: HTMLElement }) => {
                  event.preventDefault();
                  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
                  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                  const before = event.clientY < rect.top + rect.height / 2;
                  setDropLine(
                    dragging() != null && !(option.value === dragging() && before)
                      ? { index: index(), before }
                      : null,
                  );
                }}
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
                  <button
                    type="button"
                    aria-label={messages().orderList.toTop}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === 0}
                    onClick={() => move(option.value, -index())}
                  >
                    {arrowIcon(ARROWS.top)}
                  </button>
                  <button
                    type="button"
                    aria-label={messages().orderList.moveUp}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === 0}
                    onClick={() => move(option.value, -1)}
                  >
                    {arrowIcon(ARROWS.up)}
                  </button>
                  <button
                    type="button"
                    aria-label={messages().orderList.moveDown}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === rows().length - 1}
                    onClick={() => move(option.value, 1)}
                  >
                    {arrowIcon(ARROWS.down)}
                  </button>
                  <button
                    type="button"
                    aria-label={messages().orderList.toBottom}
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === rows().length - 1}
                    onClick={() => move(option.value, rows().length - 1 - index())}
                  >
                    {arrowIcon(ARROWS.bottom)}
                  </button>
                </span>
              </li>
            );
          }}
        </For>
      </ol>
    </div>
  );
});
