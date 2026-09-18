<script lang="ts">
import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import Portal from "@ark-ui/svelte/portal";

import type { MentionsVesselProps } from "./props";

let {
  open = false,
  matches = [],
  active = 0,
  anchor = null,
  onInsert,
  onActiveChange,
  onOpenChange,
}: MentionsVesselProps = $props();
</script>

<!-- The vessel: the candidates themselves as a floating card. The
anchor is virtual — a live rectangle off the host's field — so a host
keeps its own anatomy (the textarea rides where the host puts it) and
the vessel still points at the right place. -->
<ArkPopover.Root
  {open}
  positioning={{
    placement: "bottom-start",
    getAnchorRect: () => anchor?.getBoundingClientRect() ?? null,
  }}
  onOpenChange={(details) => onOpenChange?.(details.open)}
>
  <Portal>
    <ArkPopover.Positioner>
      <ArkPopover.Content>
        {#snippet asChild(contentProps)}
          <div {...contentProps()} data-scope="mentions" data-part="popup">
            {#each matches as entry, index (entry.value)}
              <div
                data-scope="mentions"
                data-part="option"
                data-active={index === active ? "" : undefined}
                onmouseenter={() => onActiveChange?.(index)}
                onmousedown={(event) => event.preventDefault()}
                onclick={() => onInsert?.(entry)}
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
