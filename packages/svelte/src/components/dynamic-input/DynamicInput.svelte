<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("dynamic-input");

import { Button } from "../button";
import { Input } from "../input";
import InternalIcon from "../../internal/InternalIcon.svelte";
import { useComponentMessages } from "../config-provider/messages";
import type { DynamicInputProps } from "./props";

let {
  value = $bindable([""]),
  min = 0,
  max,
  placeholder,
  addLabel = "Add entry",
  size = "md",
  disabled = false,
  invalid = false,
  ...rest
}: DynamicInputProps = $props();

const messages = useComponentMessages();

const canRemove = $derived(value.length > Math.max(min, 1));
const canAdd = $derived(max === undefined || value.length < max);

function update(index: number, next: string) {
  const rows = value.slice();
  rows[index] = next;
  value = rows;
}

function remove(index: number) {
  const rows = value.filter((_, i) => i !== index);
  // Emptied by the last removal, the group resets to one blank row
  // instead of vanishing.
  value = rows.length > 0 ? rows : [""];
}

function add() {
  value = [...value, ""];
}
</script>

<!-- A column of entry rows: one Input per line, each with a quiet remove
seal, and an add row at the tail. The list is controlled — every edit
hands the caller a fresh array, and the bound array stays the only
truth. -->
<div {...rest} data-scope="dynamic-input" data-part="root">
  {#each value as entry, index}
    <div data-scope="dynamic-input" data-part="row">
      <Input
        value={entry}
        {placeholder}
        {disabled}
        {invalid}
        {size}
        oninput={(event) => update(index, event.currentTarget.value)}
      />
      <Button
        variant="ghost"
        square
        {size}
        disabled={disabled || !canRemove}
        aria-label={messages().dynamicEntry.remove}
        onclick={() => remove(index)}
      >
        <InternalIcon name="x" />
      </Button>
    </div>
  {/each}
  <div data-scope="dynamic-input" data-part="add">
    <Button variant="ghost" {size} disabled={disabled || !canAdd} onclick={add}>
      {"+"}{addLabel}
    </Button>
  </div>
</div>

