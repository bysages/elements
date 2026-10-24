<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("mentions");

import { Popover as ArkPopover } from "@ark-ui/svelte/popover";
import { Portal } from "@ark-ui/svelte/portal";

import { useElementId } from "../../internal/id";
import { Icon } from "../icon";
import type { MentionEntry, MentionsVesselProps } from "./props";

let {
  id: explicitId,
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

const generatedId = $props.id();
const id = $derived(useElementId("mentions", generatedId, explicitId));
const popupId = $derived(`${id}:popup`);

type MentionGroup = {
  name: string;
  entries: Array<{ entry: MentionEntry; index: number }>;
};

const groups = $derived.by(() => {
  const ordered: MentionGroup[] = [];
  const byName = new Map<string, MentionGroup>();

  matches.forEach((entry, index) => {
    const name = entry.group ?? "";
    const group = byName.get(name);
    if (group) group.entries.push({ entry, index });
    else {
      const next = { name, entries: [{ entry, index }] };
      byName.set(name, next);
      ordered.push(next);
    }
  });
  return ordered;
});

const activeEntry = $derived(matches[active]);
</script>

<!-- The vessel: the candidates themselves as a floating card. A host
can render its field through the Anchor; the rectangle fallback keeps
the textarea in the host's own anatomy. -->
<ArkPopover.Root
  {id}
  ids={{ content: popupId }}
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
            id={popupId}
            data-scope="mentions"
            data-part="popup"
            data-size={size}
            role="listbox"
            aria-activedescendant={activeEntry && !activeEntry.disabled ? `${popupId}:option-${active}` : undefined}
          >
            {#each groups as group, groupIndex (group.name)}
              {#if group.name}
                <div
                  role="group"
                  aria-labelledby={`${popupId}:group-${groupIndex}`}
                  data-scope="mentions"
                  data-part="group"
                >
                  <div
                    id={`${popupId}:group-${groupIndex}`}
                    data-scope="mentions"
                    data-part="group-label"
                  >
                    {group.name}
                  </div>
                  {#each group.entries as { entry, index } (`${entry.id ?? entry.value}:${index}`)}
                    {@render option(entry, index)}
                  {/each}
                </div>
              {:else}
                {#each group.entries as { entry, index } (`${entry.id ?? entry.value}:${index}`)}
                  {@render option(entry, index)}
                {/each}
              {/if}
            {/each}
          </div>
        {/snippet}
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </Portal>
</ArkPopover.Root>

{#snippet option(entry: MentionEntry, index: number)}
  <div
    id={`${popupId}:option-${index}`}
    role="option"
    aria-selected={index === active && !entry.disabled}
    aria-disabled={entry.disabled ? "true" : undefined}
    tabindex={-1}
    data-scope="mentions"
    data-part="option"
    data-active={index === active && !entry.disabled ? "" : undefined}
    data-disabled={entry.disabled ? "" : undefined}
    onmouseenter={() => {
      if (!entry.disabled) onActiveChange?.(index);
    }}
    onmousedown={(event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      if (!entry.disabled) onInsert?.(entry);
    }}
    onkeydown={(event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (!entry.disabled) onInsert?.(entry);
    }}
  >
    {#if entry.icon}<Icon name={entry.icon} />{/if}
    <span data-scope="mentions" data-part="option-main">
      <span data-scope="mentions" data-part="option-label">{entry.label}</span>
      {#if entry.description}
        <span data-scope="mentions" data-part="option-description">{entry.description}</span>
      {/if}
    </span>
    {#if entry.kind}
      <span data-scope="mentions" data-part="option-kind">{entry.kind}</span>
    {/if}
  </div>
{/snippet}
