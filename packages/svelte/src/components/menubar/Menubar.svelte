<script lang="ts">
import { Menu as ArkMenu } from "@ark-ui/svelte/menu";
import Portal from "@ark-ui/svelte/portal";

import type { MenubarProps } from "./props";

let { items = [], onSelect, ...rest }: MenubarProps = $props();
</script>

<!-- A desktop-style menu bar: a row of quiet ghost triggers, each
opening the same paper vessel as the menu family. Each trigger is our
own button grafted onto the menu machine's trigger via as-child — the
machine keeps the trigger element (positioning, focus restore,
data-state) while the element wears the menubar scope. The popups keep
the menu parts untouched, so the menu stylesheet dresses them.

Keyboard note: the triggers move between each other with Tab, not
arrow keys — cross-menu arrow traversal is out of scope for this
version. Inside an open menu the machine handles arrows and Escape. -->
<div {...rest} data-scope="menubar" data-part="root" role="menubar">
  {#each items as group (group.label)}
    <ArkMenu.Root positioning={{ placement: "bottom-start" }}>
      <ArkMenu.Trigger>
        {#snippet asChild(props)}
          <button {...props()} type="button" data-scope="menubar" data-part="trigger">
            {group.label}
          </button>
        {/snippet}
      </ArkMenu.Trigger>
      <Portal>
        <ArkMenu.Positioner>
          <ArkMenu.Content>
            {#each group.items as entry (entry.value)}
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
  {/each}
</div>
