import { useListCollection, type ListCollection } from "@ark-ui/react/collection";
import { Combobox as ArkCombobox } from "@ark-ui/react/combobox";
import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import { useEffect, useState } from "react";

export interface CommandEntry {
  label: string;
  value: string;
  /** Entries sharing a group are listed under one heading. */
  group?: string;
  /** A short affordance note, set as a keycap at the row's end. */
  hint?: string;
}

/**
 * The command palette: a modal sheet at the top of the page carrying a
 * search field over the caller's commands, grouped as a ledger with a
 * keycap hint at each row. The shell is the dialog machinery — scrim,
 * focus trap, Escape — and the searching is the combobox machinery
 * driving our own list: the vessel and the list live inside the sheet,
 * so the combobox renders no separate popup and the machine's content
 * grafts onto the sheet's list.
 */
export interface CommandProps {
  /** The commands on offer, grouped as they arrive. */
  items?: CommandEntry[];
  placeholder?: string;
  /** Whether the palette is up. Supply it to control the palette;
   * changes are reported via `onOpenChange`. */
  open?: boolean;
  /** Whether the shell narrows `items` as the reader types. Turn it off
   * when the caller owns the searching — a ranked engine or a remote
   * source — and hands down the already-narrowed list. */
  autoFilter?: boolean;
  /** The field's text under the caller's control; changes are reported
   * via `onInputValueChange`. */
  inputValue?: string;
  /** What the list whispers when nothing matches. */
  emptyText?: string;
  /** Called with the chosen entry's `value`; the palette closes after. */
  onSelect?: (value: string) => void;
  /** Reports the palette's next state. */
  onOpenChange?: (open: boolean) => void;
  /** Reports the field's live text. */
  onInputValueChange?: (value: string) => void;
}

export function Command({
  items = [],
  placeholder,
  open,
  autoFilter = true,
  inputValue,
  emptyText = "No matching commands",
  onSelect,
  onOpenChange,
  onInputValueChange,
}: CommandProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  // The list has no popup of its own, but the machine still opens and
  // closes its content (outside click on the sheet dims the list);
  // re-entry through the field brings it back.
  const [listOpen, setListOpen] = useState(true);
  // The field's live text, kept so a caller's new list can be
  // re-narrowed against it (the collection's `set` clears the filter).
  const [fieldText, setFieldText] = useState("");

  const { collection, set, filter } = useListCollection({
    initialItems: items.map((entry) => entry.value),
    filter: (value: string, input: string) => {
      const entry = items.find((candidate) => candidate.value === value);
      if (!entry) return false;
      const query = input.toLowerCase();
      return entry.label.toLowerCase().includes(query) || value.toLowerCase().includes(query);
    },
  });

  // The caller's list is live — an index landing after mount or a
  // search that re-ranks per keystroke must reach the collection
  // without a remount.
  useEffect(() => {
    set(items.map((entry) => entry.value));
    if (autoFilter) filter(fieldText);
    // The field's text is read at sync time, not a dependency: re-running
    // per keystroke would fight the machine's own filter call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const currentOpen = open ?? internalOpen;

  useEffect(() => {
    if (currentOpen) setListOpen(true);
  }, [currentOpen]);

  const setOpen = (value: boolean) => {
    if (open === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };

  // Grouped in first-seen order; entries without a group sit directly
  // in the list, ahead of the ledgers.
  const available = new Set<string>(collection.items);
  const groups = new Map<string, CommandEntry[]>();
  for (const entry of items) {
    if (!available.has(entry.value)) continue;
    const key = entry.group ?? "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }

  const row = (entry: CommandEntry) => (
    <ArkCombobox.Item key={entry.value} item={entry.value} asChild>
      <div data-scope="command" data-part="item">
        <ArkCombobox.ItemText asChild>
          <span data-scope="command" data-part="item-label">
            {entry.label}
          </span>
        </ArkCombobox.ItemText>
        {entry.hint ? (
          <span data-scope="command" data-part="item-hint">
            {entry.hint}
          </span>
        ) : undefined}
      </div>
    </ArkCombobox.Item>
  );

  return (
    <ArkDialog.Root open={currentOpen} onOpenChange={(details) => setOpen(details.open)}>
      <Portal>
        <ArkDialog.Backdrop />
        <ArkDialog.Positioner asChild>
          <div data-scope="command" data-part="positioner">
            <ArkDialog.Content asChild>
              <div data-scope="command" data-part="content">
                <ArkCombobox.Root
                  // The machine types its collection as
                  // ListCollection<unknown>; ours is ListCollection<string>
                  // and the two don't relate by variance.
                  collection={collection as ListCollection<unknown>}
                  inputValue={inputValue}
                  open={listOpen}
                  onOpenChange={(details) => setListOpen(details.open)}
                  inputBehavior="autohighlight"
                  loopFocus
                  onInputValueChange={(details) => {
                    setFieldText(details.inputValue);
                    if (autoFilter) filter(details.inputValue);
                    onInputValueChange?.(details.inputValue);
                  }}
                  onValueChange={(details) => {
                    const [first] = details.value;
                    if (first == null) return;
                    onSelect?.(first);
                    setOpen(false);
                  }}
                >
                  <ArkCombobox.Input asChild>
                    <input
                      type="text"
                      placeholder={placeholder}
                      data-scope="command"
                      data-part="input"
                    />
                  </ArkCombobox.Input>
                  <ArkCombobox.Content asChild>
                    <div data-scope="command" data-part="list">
                      {Array.from(groups, ([group, entries]) =>
                        group === "" ? (
                          entries.map(row)
                        ) : (
                          <ArkCombobox.ItemGroup key={group} asChild>
                            <div data-scope="command" data-part="group">
                              <ArkCombobox.ItemGroupLabel asChild>
                                <div data-scope="command" data-part="group-label">
                                  {group}
                                </div>
                              </ArkCombobox.ItemGroupLabel>
                              {entries.map(row)}
                            </div>
                          </ArkCombobox.ItemGroup>
                        ),
                      )}
                      {groups.size === 0 ? (
                        <div data-scope="command" data-part="empty">
                          {emptyText}
                        </div>
                      ) : null}
                    </div>
                  </ArkCombobox.Content>
                </ArkCombobox.Root>
              </div>
            </ArkDialog.Content>
          </div>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

injectComponentStyle("command");
// The scrim is the dialog machinery's backdrop — borrow its stylesheet.
injectComponentStyle("dialog");
