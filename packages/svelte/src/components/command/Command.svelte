<script lang="ts">
import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";
import { useListCollection } from "@ark-ui/svelte/collection";
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import Portal from "@ark-ui/svelte/portal";
import { untrack } from "svelte";

import type { CommandEntry, CommandProps } from "./props";

let {
  items = [],
  placeholder,
  open = $bindable(false),
  autoFilter = true,
  inputValue,
  emptyText = "No matching commands",
  onSelect,
  onOpenChange,
  onInputValueChange,
}: CommandProps = $props();

// The list has no popup of its own, but the machine still opens and
// closes its content (outside click on the sheet dims the list);
// re-entry through the field brings it back.
let listOpen = $state(true);

// The field's live text, kept so a caller's new list can be
// re-narrowed against it (the collection's `set` clears the filter).
let fieldText = $state("");

const { collection, set, filter } = useListCollection<string>({
  initialItems: items.map((entry) => entry.value),
  filter: (value, input) => {
    const entry = items.find((candidate) => candidate.value === value);
    if (!entry) return false;
    const query = input.toLowerCase();
    return entry.label.toLowerCase().includes(query) || value.toLowerCase().includes(query);
  },
});

// The caller's list is live — an index landing after mount or a search
// that re-ranks per keystroke must reach the collection without a
// remount. Only `items` re-runs this; the field text is read through
// untrack so a keystroke does not rebuild the collection.
$effect(() => {
  const values = items.map((entry) => entry.value);
  untrack(() => {
    set(values);
    if (autoFilter) filter(fieldText);
  });
});

// A fresh palette opens with its list up.
$effect(() => {
  if (open) listOpen = true;
});

function setOpen(value: boolean) {
  open = value;
  onOpenChange?.(value);
}

function onFieldInput(details: { inputValue: string }) {
  fieldText = details.inputValue;
  if (autoFilter) filter(details.inputValue);
  onInputValueChange?.(details.inputValue);
}

function pick(details: { value: string[] }) {
  const [first] = details.value;
  if (first == null) return;
  onSelect?.(first);
  setOpen(false);
}

// Grouped in first-seen order; entries without a group sit directly in
// the list, ahead of the ledgers.
const available = $derived(new Set<string>(collection().items));
const groups = $derived.by(() => {
  const map = new Map<string, CommandEntry[]>();
  for (const entry of items) {
    if (!available.has(entry.value)) continue;
    const key = entry.group ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }
  return map;
});
</script>

{#snippet row(entry: CommandEntry)}
  <ArkCombobox.Item item={entry.value}>
    {#snippet asChild(itemProps)}
      <div {...itemProps()} data-scope="command" data-part="item">
        <ArkCombobox.ItemText>
          {#snippet asChild(textProps)}
            <span {...textProps()} data-scope="command" data-part="item-label">
              {entry.label}
            </span>
          {/snippet}
        </ArkCombobox.ItemText>
        {#if entry.hint}
          <span data-scope="command" data-part="item-hint">{entry.hint}</span>
        {/if}
      </div>
    {/snippet}
  </ArkCombobox.Item>
{/snippet}

<!-- The command palette: a modal sheet at the top of the page carrying
a search field over the caller's commands, grouped as a ledger with a
keycap hint at each row. The shell is the dialog machinery — scrim,
focus trap, Escape — and the searching is the combobox machinery
driving our own list: the vessel and the list live inside the sheet,
so the combobox renders no separate popup and the machine's content
grafts onto the sheet's list. -->
<ArkDialog.Root {open} onOpenChange={(details) => setOpen(details.open)}>
  <Portal>
    <ArkDialog.Backdrop />
    <ArkDialog.Positioner>
      {#snippet asChild(positionerProps)}
        <div {...positionerProps()} data-scope="command" data-part="positioner">
          <ArkDialog.Content>
            {#snippet asChild(contentProps)}
              <div {...contentProps()} data-scope="command" data-part="content">
                <ArkCombobox.Root
                  collection={collection}
                  {inputValue}
                  open={listOpen}
                  onOpenChange={(details) => (listOpen = details.open)}
                  autoHighlight
                  loopFocus
                  onInputValueChange={onFieldInput}
                  onValueChange={pick}
                >
                  <ArkCombobox.Input>
                    {#snippet asChild(inputProps)}
                      <input
                        {...inputProps()}
                        type="text"
                        placeholder={placeholder}
                        data-scope="command"
                        data-part="input"
                      />
                    {/snippet}
                  </ArkCombobox.Input>
                  <ArkCombobox.Content>
                    {#snippet asChild(listProps)}
                      <div {...listProps()} data-scope="command" data-part="list">
                        {#each [...groups] as [group, entries] (group)}
                          {#if group === ""}
                            {#each entries as entry (entry.value)}
                              {@render row(entry)}
                            {/each}
                          {:else}
                            <ArkCombobox.ItemGroup>
                              {#snippet asChild(groupProps)}
                                <div {...groupProps()} data-scope="command" data-part="group">
                                  <ArkCombobox.ItemGroupLabel>
                                    {#snippet asChild(labelProps)}
                                      <div
                                        {...labelProps()}
                                        data-scope="command"
                                        data-part="group-label"
                                      >
                                        {group}
                                      </div>
                                    {/snippet}
                                  </ArkCombobox.ItemGroupLabel>
                                  {#each entries as entry (entry.value)}
                                    {@render row(entry)}
                                  {/each}
                                </div>
                              {/snippet}
                            </ArkCombobox.ItemGroup>
                          {/if}
                        {/each}
                        {#if groups.size === 0}
                          <div data-scope="command" data-part="empty">{emptyText}</div>
                        {/if}
                      </div>
                    {/snippet}
                  </ArkCombobox.Content>
                </ArkCombobox.Root>
              </div>
            {/snippet}
          </ArkDialog.Content>
        </div>
      {/snippet}
    </ArkDialog.Positioner>
  </Portal>
</ArkDialog.Root>
