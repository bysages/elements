<script lang="ts">
import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import Portal from "@ark-ui/svelte/portal";

import { Button } from "../button";
import type { SplitButtonProps } from "./props";

let {
  label,
  items = [],
  variant = "solid",
  tone = "ink",
  size = "md",
  disabled = false,
  onclick,
  onSelect,
  ...rest
}: SplitButtonProps = $props();
</script>

<!-- A primary action with its alternatives one seam away: the main
button fires `onclick`, the fitted arrow opens a paper vessel of the
same register whose entries emit `onSelect` with their value. -->
<div {...rest} data-scope="split-button" data-part="root">
  <Button {variant} {tone} {size} {disabled} onclick={() => onclick?.()}>
    {label}
  </Button>
  <ArkMenu.Root positioning={{ placement: "bottom-end" }}>
    <ArkMenu.Trigger>
      <!-- The arrow is the menu machine's trigger grafting our button
      via as-child — the machine keeps the element (positioning, focus,
      data-state), the button recipe dresses it. The recipe's seals go
      onto the machine's element directly: re-declaring the button
      anatomy here would overwrite the trigger's. -->
      {#snippet asChild(props)}
        <button
          {...props()}
          disabled={disabled}
          aria-label="More actions"
          data-variant={variant}
          data-tone={tone}
          data-size={size}
          data-square="true"
          data-motion="ink-ripple lit"
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      {/snippet}
    </ArkMenu.Trigger>
    <Portal>
      <ArkMenu.Positioner>
        <ArkMenu.Content>
          {#each items as entry (entry.value)}
            <ArkMenu.Item
              value={entry.value}
              disabled={entry.disabled}
              data-danger={entry.danger ? "" : undefined}
              onSelect={() => onSelect?.(entry.value)}
            >
              <ArkMenu.ItemText>{entry.label}</ArkMenu.ItemText>
            </ArkMenu.Item>
          {/each}
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </Portal>
  </ArkMenu.Root>
</div>
