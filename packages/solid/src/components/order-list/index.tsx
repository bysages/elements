import { injectComponentStyle } from "@bysages/core";
import { For, createSignal, createUniqueId, splitProps, type JSX } from "solid-js";

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
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <For each={paths}>{(d) => <path d={d} />}</For>
    </svg>
  );
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
export function OrderList(props: OrderListProps) {
  injectComponentStyle("order-list");
  const uid = createUniqueId();
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
      data-uid={uid}
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
                    aria-label="Move to top"
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === 0}
                    onClick={() => move(option.value, -index())}
                  >
                    {arrowGlyph(ARROWS.top)}
                  </button>
                  <button
                    type="button"
                    aria-label="Move up"
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === 0}
                    onClick={() => move(option.value, -1)}
                  >
                    {arrowGlyph(ARROWS.up)}
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === rows().length - 1}
                    onClick={() => move(option.value, 1)}
                  >
                    {arrowGlyph(ARROWS.down)}
                  </button>
                  <button
                    type="button"
                    aria-label="Move to bottom"
                    data-scope="order-list"
                    data-part="move"
                    disabled={index() === rows().length - 1}
                    onClick={() => move(option.value, rows().length - 1 - index())}
                  >
                    {arrowGlyph(ARROWS.bottom)}
                  </button>
                </span>
              </li>
            );
          }}
        </For>
      </ol>
    </div>
  );
}
