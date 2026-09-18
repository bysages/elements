import { useListCollection, type ListCollection } from "@ark-ui/vue/collection";
import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, watch, type PropType } from "vue";
import { Teleport } from "vue";

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
  items: CommandEntry[];
  placeholder?: string;
  /** Whether the palette is up. Supply it to control the palette;
   * changes are reported via `update:open`. */
  open?: boolean;
  /** Whether the shell narrows `items` as the reader types. Turn it off
   * when the caller owns the searching — a ranked engine or a remote
   * source — and hands down the already-narrowed list. */
  autoFilter?: boolean;
  /** The field's text under the caller's control; changes are reported
   * via `update:inputValue`. */
  inputValue?: string;
  /** What the list whispers when nothing matches. */
  emptyText?: string;
  /** Called with the chosen entry's `value`; the palette closes after. */
  onSelect?: (value: string) => void;
}

/**
 * The command palette: a modal sheet at the top of the page carrying a
 * search field over the caller's commands, grouped as a ledger with a
 * keycap hint at each row. The shell is the dialog machinery — scrim,
 * focus trap, Escape — and the searching is the combobox machinery
 * driving our own list: the vessel and the list live inside the sheet,
 * so the combobox renders no separate popup and the machine's content
 * grafts onto the sheet's list.
 *
 * The input part carries one `as never`: its prop union outgrows what
 * h() can resolve (TS2590).
 */
export const Command = defineComponent({
  name: "Command",
  props: {
    items: { type: Array as PropType<CommandEntry[]>, default: () => [] },
    placeholder: { type: String, default: undefined },
    open: { type: Boolean, default: undefined },
    autoFilter: { type: Boolean, default: true },
    inputValue: { type: String, default: undefined },
    emptyText: { type: String, default: "No matching commands" },
    onSelect: { type: Function as PropType<(value: string) => void>, default: undefined },
  },
  emits: ["update:open", "update:inputValue"],
  setup(props, ctx: SetupContext) {
    const internalOpen = ref(false);
    // The list has no popup of its own, but the machine still opens and
    // closes its content (outside click on the sheet dims the list);
    // re-entry through the field brings it back.
    const listOpen = ref(true);

    // The field's live text, kept so a caller's new list can be
    // re-narrowed against it (the collection's `set` clears the filter).
    const fieldText = ref("");

    const { collection, set, filter } = useListCollection({
      initialItems: props.items.map((entry) => entry.value),
      filter: (value: string, input: string) => {
        const entry = props.items.find((candidate) => candidate.value === value);
        if (!entry) return false;
        const query = input.toLowerCase();
        return entry.label.toLowerCase().includes(query) || value.toLowerCase().includes(query);
      },
    });

    // The caller's list is live — an index landing after mount or a
    // search that re-ranks per keystroke must reach the collection
    // without a remount.
    watch(
      () => props.items,
      (items) => {
        set(items.map((entry) => entry.value));
        if (props.autoFilter) filter(fieldText.value);
      },
    );

    const setOpen = (value: boolean) => {
      if (props.open === undefined) internalOpen.value = value;
      ctx.emit("update:open", value);
    };

    watch(
      () => props.open ?? internalOpen.value,
      (value) => {
        if (value) listOpen.value = true;
      },
    );

    return () => {
      // Grouped in first-seen order; entries without a group sit
      // directly in the list, ahead of the ledgers.
      const available = new Set<string>(collection.value.items);
      const groups = new Map<string, CommandEntry[]>();
      for (const entry of props.items) {
        if (!available.has(entry.value)) continue;
        const key = entry.group ?? "";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(entry);
      }
      const row = (entry: CommandEntry) =>
        h(
          ArkCombobox.Item,
          {
            key: entry.value,
            item: entry.value,
            asChild: true,
          },
          () =>
            h("div", { "data-scope": "command", "data-part": "item" }, [
              h(ArkCombobox.ItemText, { asChild: true }, () =>
                h("span", { "data-scope": "command", "data-part": "item-label" }, entry.label),
              ),
              entry.hint
                ? h("span", { "data-scope": "command", "data-part": "item-hint" }, entry.hint)
                : undefined,
            ]),
        );

      const renderGroups = () => {
        const nodes = Array.from(groups, ([group, entries]) =>
          group === ""
            ? entries.map(row)
            : h(ArkCombobox.ItemGroup, { key: group, asChild: true }, () =>
                h("div", { "data-scope": "command", "data-part": "group" }, [
                  h(ArkCombobox.ItemGroupLabel, { asChild: true }, () =>
                    h("div", { "data-scope": "command", "data-part": "group-label" }, group),
                  ),
                  ...entries.map(row),
                ]),
              ),
        );
        if (groups.size === 0) {
          nodes.push(h("div", { "data-scope": "command", "data-part": "empty" }, props.emptyText));
        }
        return nodes;
      };

      return h(
        ArkDialog.Root,
        {
          open: props.open ?? internalOpen.value,
          "onUpdate:open": (value: boolean) => setOpen(value),
        },
        () => [
          h(Teleport, { to: "body" }, () => [
            h(ArkDialog.Backdrop),
            h(ArkDialog.Positioner, { asChild: true }, () =>
              h("div", { "data-scope": "command", "data-part": "positioner" }, [
                h(ArkDialog.Content, { asChild: true }, () =>
                  h(
                    "div",
                    { "data-scope": "command", "data-part": "content" },
                    h(
                      ArkCombobox.Root,
                      {
                        // The machine types its collection as
                        // ListCollection<unknown>; ours is ListCollection<string>
                        // and the two don't relate by variance.
                        collection: collection.value as ListCollection<unknown>,
                        inputValue: props.inputValue,
                        open: listOpen.value,
                        "onUpdate:open": (value: boolean) => (listOpen.value = value),
                        autoHighlight: true,
                        loopFocus: true,
                        onInputValueChange: (details: { inputValue: string }) => {
                          fieldText.value = details.inputValue;
                          if (props.autoFilter) filter(details.inputValue);
                          ctx.emit("update:inputValue", details.inputValue);
                        },
                        onValueChange: (details: { value: string[] }) => {
                          const [first] = details.value;
                          if (first == null) return;
                          props.onSelect?.(first);
                          setOpen(false);
                        },
                      },
                      () => [
                        // `as never` sidesteps TS2590 — the input part's
                        // prop union outgrows what h() can resolve.
                        h(ArkCombobox.Input as never, { asChild: true }, () =>
                          h("input", {
                            type: "text",
                            placeholder: props.placeholder,
                            "data-scope": "command",
                            "data-part": "input",
                          }),
                        ),
                        h(ArkCombobox.Content, { asChild: true }, () =>
                          h(
                            "div",
                            { "data-scope": "command", "data-part": "list" },
                            renderGroups(),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ]),
            ),
          ]),
        ],
      );
    };
  },
});

injectComponentStyle("command");
// The scrim is the dialog machinery's backdrop — borrow its stylesheet.
injectComponentStyle("dialog");
