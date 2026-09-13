import { useListCollection } from "@ark-ui/vue/combobox";
import { useFilter } from "@ark-ui/vue/locale";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, Teleport, type PropType, reactive } from "vue";

import { Combobox } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Combobox" };
export default meta;

interface Item {
  label: string;
  value: string;
  continent?: string;
  isNew?: boolean;
}

function chevronDown() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );
}

function xGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6 6 18" })],
  );
}

function itemsFrom(collection: { items: Item[] | readonly Item[] }, showNew = false) {
  return collection.items.map((item) =>
    h(Combobox.Item, { key: item.value, item }, () => [
      h(Combobox.ItemText, () => (showNew && item.isNew ? `Create "${item.label}"` : item.label)),
      h(Combobox.ItemIndicator, () => checkGlyph()),
    ]),
  );
}

function control(...children: any[]) {
  return h(Combobox.Control, () => [
    h(Combobox.Input as any, { placeholder: "e.g. Apple" }),
    ...children,
    h(Combobox.Trigger, () => chevronDown()),
  ]);
}

function popup(children: any) {
  return h(Teleport, { to: "body" }, () => [
    h(Combobox.Positioner, () => h(Combobox.Content, () => children)),
  ]);
}

/** Story scaffolding: one fruit combobox whose collection, root props, and
 * item rows vary per story. */
const ComboboxStory = defineComponent({
  name: "ComboboxStory",
  props: {
    rootProps: { type: Object as PropType<Record<string, unknown>>, default: () => ({}) },
    initialItems: { type: Array as PropType<Item[]>, default: undefined },
    limit: { type: Number, default: undefined },
    inputBehavior: { type: String, default: undefined },
    groupBy: { type: Function as unknown as PropType<(item: Item) => string>, default: undefined },
    withClear: { type: Boolean, default: true },
    rows: {
      type: Function as PropType<(collection: { items: Item[] | readonly Item[] }) => any[]>,
      default: undefined,
    },
    label: { type: String, default: "Fruit" },
  },
  setup(props) {
    const filters = useFilter({ sensitivity: "base" });
    const { collection, filter } = useListCollection<Item>({
      initialItems: props.initialItems ?? [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Date", value: "date" },
        { label: "Elderberry", value: "elderberry" },
        { label: "Fig", value: "fig" },
      ],
      limit: props.limit,
      groupBy: props.groupBy,
      filter: (item: string, inputValue: string) => filters.value.contains(item, inputValue),
    });
    const rows = () =>
      props.rows
        ? props.rows(collection.value)
        : h(Combobox.Context, null, {
            default: () => [
              h(Combobox.Empty, () => "No results found"),
              ...itemsFrom(collection.value),
            ],
          });
    return () =>
      h(
        Combobox.Root,
        {
          collection: collection.value,
          inputBehavior: props.inputBehavior,
          onInputValueChange: (details: { inputValue: string }) => filter(details.inputValue),
          ...props.rootProps,
        } as any,
        () => [
          h(Combobox.Label, () => props.label),
          control(...(props.withClear ? [h(Combobox.ClearTrigger, () => xGlyph())] : [])),
          popup(rows()),
        ],
      );
  },
});

/** Type to filter; the matching strokes take the primary ink while the
 * checked row holds the flat fill. */
export const Basic = {
  args: {
    label: "Fruit",
  },
  render: (args: any) => withState(() => () => h(ComboboxStory, { label: args.label } as any)),
};

/** Several skills can be picked at once; the choice chips sit above the
 * field. */
export const Multiple = {
  render: () =>
    withState(() => {
      const state = reactive({ value: [] as string[] });
      return () =>
        h(ComboboxStory, {
          label: "Skills",
          rootProps: {
            multiple: true,
            modelValue: state.value,
            onValueChange: (e: { value: string[] }) => {
              state.value = e.value;
            },
          },
          initialItems: [
            { label: "JS", value: "js" },
            { label: "TypeScript", value: "ts" },
            { label: "Vue", value: "vue" },
            { label: "React", value: "react" },
            { label: "Svelte", value: "svelte" },
          ],
        } as any);
    }),
};

/** Rows ride in their continent groups; the group() split drives the
 * labels. */
export const Grouping = {
  render: () =>
    h(ComboboxStory, {
      label: "Fruit",
      initialItems: [
        { label: "Apple", value: "apple", continent: "Pome" },
        { label: "Pear", value: "pear", continent: "Pome" },
        { label: "Cherry", value: "cherry", continent: "Stone" },
        { label: "Peach", value: "peach", continent: "Stone" },
        { label: "Fig", value: "fig", continent: "Other" },
      ],
      groupBy: (item: Item) => item.continent ?? "Other",
      rows: (collection: any) => [
        h(Combobox.Empty, () => "No results found"),
        ...collection
          .group()
          .map(([group, items]: [string, Item[]]) =>
            h(Combobox.ItemGroup, { key: group }, () => [
              h(Combobox.ItemGroupLabel, () => group),
              ...items.map((item) =>
                h(Combobox.Item, { key: item.value, item }, () => [
                  h(Combobox.ItemText, () => item.label),
                  h(Combobox.ItemIndicator, () => checkGlyph()),
                ]),
              ),
            ]),
          ),
      ],
    } as any),
};

/** The selection answers to state — the field mirrors every pick. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["banana"] });
      return () =>
        h(ComboboxStory, {
          rootProps: {
            modelValue: state.value,
            onValueChange: (e: { value: string[] }) => {
              state.value = e.value;
            },
          },
        } as any);
    }),
};

/** Nothing matches? The typed text becomes a creatable row, and picking it
 * plants a permanent option in the list. */
export const Creatable = {
  render: () => {
    const filters = useFilter({ sensitivity: "base" });
    const CreatableCombobox = defineComponent({
      name: "CreatableCombobox",
      setup() {
        const typed = reactive({ value: "" });
        const { collection, filter, upsert } = useListCollection<Item>({
          initialItems: [
            { label: "Bug", value: "bug" },
            { label: "Feature", value: "feature" },
            { label: "Enhancement", value: "enhancement" },
            { label: "Documentation", value: "docs" },
          ],
          filter: (item: string, query: string) => filters.value.contains(item, query),
        });
        const candidate = () => {
          const text = typed.value.trim();
          const exists = collection.value.items.some(
            (item) => item.label.toLowerCase() === text.toLowerCase(),
          );
          return text && !exists ? { label: text, value: `new:${text}`, isNew: true } : null;
        };
        return () =>
          h(
            Combobox.Root,
            {
              collection: collection.value,
              onInputValueChange: (details: { inputValue: string }) => {
                typed.value = details.inputValue;
                filter(details.inputValue);
              },
              onValueChange: (details: { value: string[] }) => {
                details.value.forEach((value) => {
                  if (value.startsWith("new:")) {
                    const label = value.slice(4);
                    upsert(value, { label, value });
                  }
                });
              },
            } as any,
            () => [
              h(Combobox.Label, () => "Issue type"),
              control(),
              popup(() => [
                h(Combobox.Empty, () => "No results found"),
                ...collection.value.items.map((item) =>
                  h(Combobox.Item, { key: item.value, item }, () => [
                    h(Combobox.ItemText, () => item.label),
                    h(Combobox.ItemIndicator, () => checkGlyph()),
                  ]),
                ),
                ...(candidate()
                  ? [
                      h(Combobox.Item, { key: "create", item: candidate()! }, () => [
                        h(Combobox.ItemText, () => `Create "${candidate()!.label}"`),
                        h(Combobox.ItemIndicator, () => checkGlyph()),
                      ]),
                    ]
                  : []),
              ]),
            ],
          );
      },
    });
    return h(CreatableCombobox);
  },
};

/** At most five cities survive the filter. */
export const LimitResults = {
  render: () =>
    h(ComboboxStory, {
      label: "City",
      limit: 5,
      initialItems: [
        { label: "Suzhou", value: "suzhou" },
        { label: "Hangzhou", value: "hangzhou" },
        { label: "Guangzhou", value: "guangzhou" },
        { label: "Fuzhou", value: "fuzhou" },
        { label: "Suzhou Creek", value: "suzhou-creek" },
        { label: "Xuzhou", value: "xuzhou" },
        { label: "Zhengzhou", value: "zhengzhou" },
      ],
    } as any),
};

/** The input autocompletes the first match; the list rests on the page
 * with no popup chrome. */
export const InlineAutocomplete = {
  render: () =>
    h(ComboboxStory, {
      label: "Sea Creature",
      inputBehavior: "autocomplete",
      rootProps: { openOnClick: false },
      withClear: true,
      initialItems: [
        { label: "Dolphin", value: "dolphin" },
        { label: "Dugong", value: "dugong" },
        { label: "Anchovy", value: "anchovy" },
        { label: "Cuttlefish", value: "cuttlefish" },
      ],
    } as any),
};
