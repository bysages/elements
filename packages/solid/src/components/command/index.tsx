import { useListCollection } from "@ark-ui/solid/collection";
import { Combobox as ArkCombobox, type ListCollection } from "@ark-ui/solid/combobox";
import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createEffect, createSignal, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export interface CommandEntry {
  label: string;
  value: string;
  /** Entries sharing a group are listed under one heading. */
  group?: string;
  /** A short affordance note, set as a keycap at the row's end. */
  hint?: string;
}

export interface CommandProps {
  /** The commands on offer, grouped as they arrive. */
  items?: CommandEntry[];
  placeholder?: string;
  /** Whether the palette is up. Supply it to control the palette;
   * changes are reported through `onOpenChange`. */
  open?: boolean;
  /** Whether the shell narrows `items` as the reader types. Turn it off
   * when the caller owns the searching — a ranked engine or a remote
   * source — and hands down the already-narrowed list. */
  autoFilter?: boolean;
  /** The field's text under the caller's control; changes are reported
   * through `onInputValueChange`. */
  inputValue?: string;
  /** What the list whispers when nothing matches. */
  emptyText?: string;
  /** Called with the chosen entry's `value`; the palette closes after. */
  onSelect?: (value: string) => void;
  /** The palette's openness changed. */
  onOpenChange?: (open: boolean) => void;
  /** The field's text changed. */
  onInputValueChange?: (value: string) => void;
}

/** A command row: the machine's item grafted onto a vessel of our own,
 * the label riding the machine's item text. */
function Row(props: { entry: CommandEntry }) {
  return (
    <ArkCombobox.Item
      item={props.entry.value}
      asChild={(itemProps) => (
        <div {...itemProps()} data-scope="command" data-part="item">
          <ArkCombobox.ItemText
            asChild={(textProps) => (
              <span {...textProps()} data-scope="command" data-part="item-label">
                {props.entry.label}
              </span>
            )}
          />
          <Show when={props.entry.hint}>
            <span data-scope="command" data-part="item-hint">
              {props.entry.hint}
            </span>
          </Show>
        </div>
      )}
    />
  );
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
export function Command(props: CommandProps) {
  const [own, rest] = splitProps(props, [
    "items",
    "placeholder",
    "open",
    "autoFilter",
    "inputValue",
    "emptyText",
    "onSelect",
    "onOpenChange",
    "onInputValueChange",
  ]);
  const [internalOpen, setInternalOpen] = createSignal(false);
  // The list has no popup of its own, but the machine still opens and
  // closes its content (outside click on the sheet dims the list);
  // re-entry through the field brings it back.
  const [listOpen, setListOpen] = createSignal(true);

  // The field's live text, kept so a caller's new list can be
  // re-narrowed against it (the collection's `set` clears the filter).
  // Never rendered, so it stays a plain variable — reading it inside
  // the collection effect must not track it.
  let fieldText = "";

  const { collection, set, filter } = useListCollection({
    initialItems: (own.items ?? []).map((entry) => entry.value),
    filter: (value: string, input: string) => {
      const entry = (own.items ?? []).find((candidate) => candidate.value === value);
      if (!entry) return false;
      const query = input.toLowerCase();
      return entry.label.toLowerCase().includes(query) || value.toLowerCase().includes(query);
    },
  });

  // The caller's list is live — an index landing after mount or a
  // search that re-ranks per keystroke must reach the collection
  // without a remount.
  createEffect(() => {
    set((own.items ?? []).map((entry) => entry.value));
    if (own.autoFilter ?? true) filter(fieldText);
  });

  const open = () => own.open ?? internalOpen();
  const setOpen = (value: boolean) => {
    if (own.open === undefined) setInternalOpen(value);
    own.onOpenChange?.(value);
  };

  createEffect(() => {
    if (open()) setListOpen(true);
  });

  // Grouped in first-seen order; entries without a group sit directly
  // in the list, ahead of the ledgers.
  const sections = (): Array<{ group: string; entries: CommandEntry[] }> => {
    const available = new Set<string>(collection().items);
    const groups = new Map<string, CommandEntry[]>();
    for (const entry of own.items ?? []) {
      if (!available.has(entry.value)) continue;
      const key = entry.group ?? "";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(entry);
    }
    return Array.from(groups, ([group, entries]) => ({ group, entries }));
  };

  return (
    <ArkDialog.Root {...rest} open={open()} onOpenChange={(details) => setOpen(details.open)}>
      <Portal>
        <ArkDialog.Backdrop />
        <ArkDialog.Positioner
          asChild={(positionerProps) => (
            <div {...positionerProps()} data-scope="command" data-part="positioner">
              <ArkDialog.Content
                asChild={(contentProps) => (
                  <div {...contentProps()} data-scope="command" data-part="content">
                    <ArkCombobox.Root
                      // The machine types its collection as
                      // ListCollection<unknown>; ours is ListCollection<string>
                      // and the two don't relate by variance.
                      collection={collection() as ListCollection<unknown>}
                      inputValue={own.inputValue}
                      open={listOpen()}
                      onOpenChange={(details) => setListOpen(details.open)}
                      // The field re-highlights the first match as the
                      // reader types ("autoHighlight" in older Ark).
                      inputBehavior="autohighlight"
                      loopFocus
                      onInputValueChange={(details) => {
                        fieldText = details.inputValue;
                        if (own.autoFilter ?? true) filter(details.inputValue);
                        own.onInputValueChange?.(details.inputValue);
                      }}
                      onValueChange={(details) => {
                        const [first] = details.value;
                        if (first == null) return;
                        own.onSelect?.(first);
                        setOpen(false);
                      }}
                    >
                      <ArkCombobox.Input
                        asChild={(inputProps) => (
                          <input
                            {...inputProps()}
                            type="text"
                            placeholder={own.placeholder}
                            data-scope="command"
                            data-part="input"
                          />
                        )}
                      />
                      <ArkCombobox.Content
                        asChild={(listProps) => (
                          <div {...listProps()} data-scope="command" data-part="list">
                            <For each={sections()}>
                              {(section) => (
                                <Show
                                  when={section.group !== ""}
                                  fallback={
                                    <For each={section.entries}>
                                      {(entry) => <Row entry={entry} />}
                                    </For>
                                  }
                                >
                                  <ArkCombobox.ItemGroup
                                    asChild={(groupProps) => (
                                      <div {...groupProps()} data-scope="command" data-part="group">
                                        <ArkCombobox.ItemGroupLabel
                                          asChild={(labelProps) => (
                                            <div
                                              {...labelProps()}
                                              data-scope="command"
                                              data-part="group-label"
                                            >
                                              {section.group}
                                            </div>
                                          )}
                                        />
                                        <For each={section.entries}>
                                          {(entry) => <Row entry={entry} />}
                                        </For>
                                      </div>
                                    )}
                                  />
                                </Show>
                              )}
                            </For>
                            <Show when={sections().length === 0}>
                              <div data-scope="command" data-part="empty">
                                {own.emptyText ?? "No matching commands"}
                              </div>
                            </Show>
                          </div>
                        )}
                      />
                    </ArkCombobox.Root>
                  </div>
                )}
              />
            </div>
          )}
        />
      </Portal>
    </ArkDialog.Root>
  );
}

injectComponentStyle("command");
// The scrim is the dialog machinery's backdrop — borrow its stylesheet.
injectComponentStyle("dialog");
