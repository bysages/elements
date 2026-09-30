<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("order-list");

import type { OrderListProps } from "./props";

let { value = $bindable([]), options, label, ...rest }: OrderListProps = $props();

let dragging: string | null = $state(null);
let dropLine: { index: number; before: boolean } | null = $state(null);

const rows = $derived(
  value
    .map((entry) => options.find((option) => option.value === entry))
    .filter((option): option is NonNullable<typeof option> => option != null),
);

function move(entry: string, offset: number) {
  const next = [...value];
  const from = next.indexOf(entry);
  const to = Math.max(0, Math.min(next.length - 1, from + offset));
  if (from === to) return;
  next.splice(to, 0, ...next.splice(from, 1));
  value = next;
}
function reset() {
  dragging = null;
  dropLine = null;
}
function drop() {
  const entry = dragging;
  if (entry == null) return;
  const seam = dropLine;
  const from = value.indexOf(entry);
  if (seam && seam.index === from) return reset();
  const next = value.filter((candidate) => candidate !== entry);
  let at = seam ? (seam.before ? seam.index : seam.index + 1) : next.length;
  if (from < at) at -= 1;
  next.splice(Math.max(0, Math.min(next.length, at)), 0, entry);
  value = next;
  reset();
}
</script>

<!-- A ledger the reader may rewrite: rows move by grip or by the side
arrows, and the group reports the new order as the value itself.
Dragging rides the native drag events — a hairline of primary ink
marks the seam the row will land on. -->
<div
  {...rest}
  role="listbox"
  aria-label={label}
  aria-multiselectable={false}
  data-scope="order-list"
  data-part="root"
  ondragleave={(event) => {
    const host = event.currentTarget as HTMLElement;
    if (!event.relatedTarget || !host.contains(event.relatedTarget as Node)) dropLine = null;
  }}
>
  <ol data-scope="order-list" data-part="list">
    {#each rows as option, index (option.value)}
      <li
        role="option"
        aria-selected="true"
        draggable
        data-scope="order-list"
        data-part="item"
        data-dragging={dragging === option.value ? "" : undefined}
        data-drop-line={dropLine && dropLine.index === index ? (dropLine.before ? "top" : "bottom") : undefined}
        ondragstart={(event) => {
          dragging = option.value;
          event.dataTransfer?.setData("text/plain", option.value);
          if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
        }}
        ondragend={reset}
        ondragover={(event) => {
          event.preventDefault();
          if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
          const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
          const before = event.clientY < rect.top + rect.height / 2;
          dropLine =
            dragging != null && !(option.value === dragging && before)
              ? { index, before }
              : null;
        }}
        ondrop={(event) => {
          event.preventDefault();
          drop();
        }}
      >
        <span data-scope="order-list" data-part="grip" aria-hidden="true">⋮⋮</span>
        <span data-scope="order-list" data-part="label">{option.label}</span>
        <span data-scope="order-list" data-part="controls">
          <button type="button" aria-label="Move to top" data-scope="order-list" data-part="move" disabled={index === 0} onclick={() => move(option.value, -index)}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /><path d="M5 4h14" /></svg>
          </button>
          <button type="button" aria-label="Move up" data-scope="order-list" data-part="move" disabled={index === 0} onclick={() => move(option.value, -1)}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg>
          </button>
          <button type="button" aria-label="Move down" data-scope="order-list" data-part="move" disabled={index === rows.length - 1} onclick={() => move(option.value, 1)}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Move to bottom" data-scope="order-list" data-part="move" disabled={index === rows.length - 1} onclick={() => move(option.value, rows.length - 1 - index)}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /><path d="M5 20h14" /></svg>
          </button>
        </span>
      </li>
    {/each}
  </ol>
</div>