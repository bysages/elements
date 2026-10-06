<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("transfer");

import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";

import { Button } from "../button";
import InternalIcon from "../../internal/InternalIcon.svelte";
import { Input } from "../input";
import { formatMessage, useComponentMessages } from "../config-provider/messages";
import type { TransferItem, TransferProps } from "./props";

let {
  value = $bindable([]),
  data,
  titles = ["Source", "Target"],
  searchable = false,
  disabled = false,
  ...rest
}: TransferProps = $props();

const messages = useComponentMessages();

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
          placeholder={formatMessage(messages().transfer.filter, { name: title ?? "" })}
          aria-label={formatMessage(messages().transfer.filter, { name: title ?? "" })}
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
                <InternalIcon name="check" />
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
      aria-label={messages().transfer.moveRight}
      onclick={() => move(true)}
    >
      <InternalIcon name="arrow-right" />
    </Button>
    <Button
      variant="outline"
      size="sm"
      square
      disabled={checkedTarget.size === 0 || disabled}
      aria-label={messages().transfer.moveLeft}
      onclick={() => move(false)}
    >
      <InternalIcon name="arrow-left" />
    </Button>
  </div>
  {@render panel("target", titles[1], targetItems, checkedTarget)}
</div>
