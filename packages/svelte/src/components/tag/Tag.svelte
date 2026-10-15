<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("tag");

import InternalIcon from "../../internal/InternalIcon.svelte";
import type { TagProps } from "./props";

let {
  tone = "ink",
  variant = "solid",
  checkable = false,
  checked = $bindable(),
  defaultValue = false,
  closable = false,
  disabled = false,
  onClose,
  children,
  ...rest
}: TagProps = $props();

let internalChecked = $state(defaultValue);
const isChecked = $derived(checkable && (checked ?? internalChecked));

function toggle() {
  if (disabled) return;
  const next = !(checked ?? internalChecked);
  internalChecked = next;
  checked = next;
}

function dismiss(event: MouseEvent) {
  // Removal never reaches the checkable root: closing a tag is not
  // pressing it.
  event.stopPropagation();
  if (disabled) return;
  onClose?.(event);
}
</script>

{#if checkable && closable}
  <!-- A button cannot contain another control. Both actions stay
  siblings so each is independently focusable and announced. -->
  <span
    {...rest}
    data-scope="tag"
    data-part="root"
    data-tone={tone}
    data-variant={variant}
    data-checkable="true"
    data-checked={isChecked || undefined}
    data-disabled={disabled || undefined}
  >
    <button
      type="button"
      data-scope="tag"
      data-part="check"
      aria-pressed={isChecked}
      {disabled}
      onclick={toggle}
    >
      {@render children?.()}
    </button>
    <button
      type="button"
      data-scope="tag"
      data-part="close"
      aria-label="Remove"
      {disabled}
      onclick={dismiss}
    >
      <InternalIcon name="x" />
    </button>
  </span>
{:else if checkable}
  <button
    {...rest}
    type="button"
    data-scope="tag"
    data-part="root"
    data-tone={tone}
    data-variant={variant}
    data-checkable="true"
    data-checked={isChecked || undefined}
    data-disabled={disabled || undefined}
    aria-pressed={isChecked}
    {disabled}
    onclick={toggle}
  >
    {@render children?.()}
  </button>
{:else}
  <span
    {...rest}
    data-scope="tag"
    data-part="root"
    data-tone={tone}
    data-variant={variant}
    data-disabled={disabled || undefined}
    aria-disabled={disabled || undefined}
  >
    {@render children?.()}
    {#if closable}
      <button
        type="button"
        data-scope="tag"
        data-part="close"
        aria-label="Remove"
        {disabled}
        onclick={dismiss}
      >
        <InternalIcon name="x" />
      </button>
    {/if}
  </span>
{/if}
