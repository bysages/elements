<script lang="ts">
import { Button } from "../button";
import { Input } from "../input";
import type { DynamicInputProps } from "./props";

let {
  value = $bindable([""]),
  min = 0,
  max,
  placeholder,
  addLabel = "Add entry",
  disabled = false,
  invalid = false,
  ...rest
}: DynamicInputProps = $props();

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
        oninput={(event) => update(index, event.currentTarget.value)}
      />
      <Button
        variant="ghost"
        square
        disabled={disabled || !canRemove}
        aria-label={`Remove entry ${index + 1}`}
        onclick={() => remove(index)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </Button>
    </div>
  {/each}
  <div data-scope="dynamic-input" data-part="add">
    <Button variant="ghost" disabled={disabled || !canAdd} onclick={add}>
      {"+"}{addLabel}
    </Button>
  </div>
</div>
