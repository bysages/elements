<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("mentions");

import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { Portal } from "@ark-ui/svelte/portal";

import type { MentionsVesselProps } from "./props";

let {
  open = false,
  matches = [],
  active = 0,
  anchor = null,
  size = "md",
  children,
  onInsert,
  onActiveChange,
  onOpenChange,
}: MentionsVesselProps = $props();
</script>

<!-- The vessel: the candidates themselves as a floating card. A host
can render its field through the Anchor; the rectangle fallback keeps
the textarea in the host's own anatomy. -->
<ArkPopover.Root
  {open}
  positioning={
    children
      ? { placement: "bottom-start" }
      : {
          placement: "bottom-start",
          getAnchorRect: () => anchor?.getBoundingClientRect() ?? null,
        }
  }
  onOpenChange={(details) => onOpenChange?.(details.open)}
>
  {#if children}
    <ArkPopover.Anchor>
      {#snippet asChild(anchorProps)}
        {@render children(anchorProps)}
      {/snippet}
    </ArkPopover.Anchor>
  {/if}
  <Portal>
    <ArkPopover.Positioner>
      <ArkPopover.Content>
        {#snippet asChild(contentProps)}
          <div
            {...contentProps()}
            data-scope="mentions"
            data-part="popup"
            data-size={size}
            role="listbox"
          >
            {#each matches as entry, index (entry.value)}
              <div
                data-scope="mentions"
                data-part="option"
                role="option"
                aria-selected={index === active}
                tabindex={-1}
                data-active={index === active ? "" : undefined}
                onmouseenter={() => onActiveChange?.(index)}
                onmousedown={(event) => event.preventDefault()}
                onclick={() => onInsert?.(entry)}
                onkeydown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onInsert?.(entry);
                }}
              >
                {entry.label}
              </div>
            {/each}
          </div>
        {/snippet}
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</ArkPopover.Root>
