<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";

import { Button } from "../button";
import { Input } from "../input";
import type { TransferItem, TransferProps } from "./props";

let {
  value = $bindable([]),
  data,
  titles = ["Source", "Target"],
  searchable = false,
  disabled = false,
  ...rest
}: TransferProps = $props();

let checkedSource = $state(new Set<string>());
let checkedTarget = $state(new Set<string>());
let sourceQuery = $state("");
let targetQuery = $state("");

const target = $derived(new Set(value));

function panelItems(values: TransferItem[], inTarget: boolean, query: string) {
  return values.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) &&
      target.has(item.value) === inTarget,
  );
}

const sourceItems = $derived(panelItems(data, false, sourceQuery));
const targetItems = $derived(panelItems(data, true, targetQuery));

function toggle(set: Set<string>, item: string) {
  if (set.has(item)) set.delete(item);
  else set.add(item);
}

function move(toTarget: boolean) {
  const moving = toTarget ? checkedSource : checkedTarget;
  if (moving.size === 0) return;
  const next = toTarget
    ? [...value, ...moving].filter((item, index, all) => all.indexOf(item) === index)
    : value.filter((item) => !moving.has(item));
  moving.clear();
  value = next;
}
</script>

{#snippet panel(side: "source" | "target", title: string, items: TransferItem[], checked: Set<string>)}
  <div data-scope="transfer" data-part="panel" data-side={side}>
    <div data-scope="transfer" data-part="head">
      <span data-scope="transfer" data-part="title">{title}</span>
      <span data-scope="transfer" data-part="count">{items.length}</span>
    </div>
    {#if searchable}
      <div data-scope="transfer" data-part="search">
        <Input
          size="sm"
          value={side === "source" ? sourceQuery : targetQuery}
          placeholder="Filter…"
          aria-label={`Filter ${title}`}
          oninput={(event) => {
            const query = event.currentTarget.value;
            if (side === "source") sourceQuery = query;
            else targetQuery = query;
          }}
        />
      </div>
    {/if}
    <div data-scope="transfer" data-part="list">
      {#if items.length === 0}
        <p data-scope="transfer" data-part="empty">Nothing here</p>
      {:else}
        {#each items as item (item.value)}
          <ArkCheckbox.Root
            checked={checked.has(item.value)}
            disabled={disabled || item.disabled === true}
            onCheckedChange={() => toggle(checked, item.value)}
          >
            <ArkCheckbox.Control>
              <ArkCheckbox.Indicator>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 5 5L19 7" />
                </svg>
              </ArkCheckbox.Indicator>
            </ArkCheckbox.Control>
            <ArkCheckbox.Label data-part="label">{item.label}</ArkCheckbox.Label>
            <ArkCheckbox.HiddenInput />
          </ArkCheckbox.Root>
        {/each}
      {/if}
    </div>
  </div>
{/snippet}

<!-- Two ledgers and a crossing: items sit in the source column until
the reader checks them and walks them across — and back, the same way.
`value` is the target column's value list; everything else in `data`
stays on the left. -->
<div {...rest} data-scope="transfer" data-part="root">
  {@render panel("source", titles[0], sourceItems, checkedSource)}
  <div data-scope="transfer" data-part="operations">
    <Button
      variant="outline"
      size="sm"
      square
      disabled={checkedSource.size === 0 || disabled}
      aria-label="Move right"
      onclick={() => move(true)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </Button>
    <Button
      variant="outline"
      size="sm"
      square
      disabled={checkedTarget.size === 0 || disabled}
      aria-label="Move left"
      onclick={() => move(false)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5m6-6-6 6 6 6" />
      </svg>
    </Button>
  </div>
  {@render panel("target", titles[1], targetItems, checkedTarget)}
</div>
