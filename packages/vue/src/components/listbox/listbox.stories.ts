import {
  createGridCollection,
  createListCollection,
  useListCollection,
} from "@ark-ui/vue/collection";
import { useListboxContext } from "@ark-ui/vue/listbox";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { Listbox } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Listbox" };
export default meta;

const checkGlyph = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true }, [
    h("path", {
      d: "M4 8.5l2.5 2.5L12 5.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

function rows(collection: { items: any[] }) {
  return collection.items.map((item: any) =>
    h(Listbox.Item, { key: item.value, item }, () => [
      h(Listbox.ItemText, () => item.label),
      h(Listbox.ItemIndicator, () => checkGlyph()),
    ]),
  );
}

const pigments = createListCollection({
  items: [
    { label: "Qinghua cobalt", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
    { label: "Zhusha cinnabar", value: "zhusha" },
    { label: "Ochre", value: "ochre" },
    { label: "Ultramarine", value: "ultramarine" },
  ],
});

/** One choice from the ledger: the current row keeps the ink check. */
export const Basic = {
  args: {
    label: "Pigment",
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(
          Listbox.Root,
          { collection: pigments, selectionMode: "single", disabled: args.disabled } as any,
          () => [h(Listbox.Label, () => args.label), h(Listbox.Content, () => rows(pigments))],
        ),
    ),
};

/** Several rows may carry the check at once — days of the week, say. */
export const Multiple = {
  render: () => {
    const days = createListCollection({
      items: [
        { label: "Monday", value: "mon" },
        { label: "Tuesday", value: "tue" },
        { label: "Wednesday", value: "wed" },
        { label: "Thursday", value: "thu" },
        { label: "Friday", value: "fri" },
      ],
    });
    return h(Listbox.Root, { collection: days, selectionMode: "multiple" } as any, () => [
      h(Listbox.Label, () => "Days"),
      h(Listbox.Content, () => rows(days)),
    ]);
  },
};

/** Type to narrow the ledger; empty results say so plainly. */
export const Filtering = {
  render: () => {
    const Driver = defineComponent({
      name: "ListboxFiltering",
      setup() {
        const { collection, filter } = useListCollection({
          initialItems: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
            { label: "Solid", value: "solid" },
            { label: "Next.js", value: "nextjs" },
            { label: "Nuxt.js", value: "nuxtjs" },
          ],
          filter: (itemText: string, filterText: string) =>
            itemText.toLowerCase().includes(filterText.toLowerCase()),
        });
        return () =>
          h(Listbox.Root, { collection: collection.value } as any, () => [
            h(Listbox.Label, () => "Framework"),
            h(Listbox.Input, {
              placeholder: "Search frameworks...",
              onInput: (e: Event) => filter((e.target as HTMLInputElement).value),
            }),
            h(Listbox.Content, () => [
              ...rows(collection.value),
              h(Listbox.Empty, () => "No frameworks found"),
            ]),
          ]);
      },
    });
    return h(Driver);
  },
};

/** The ledger folds into a grid: reactions laid out five to a row. */
export const Grid = {
  render: () => {
    const reactions = createGridCollection({
      items: [
        { label: "😀", value: "grinning" },
        { label: "😍", value: "heart-eyes" },
        { label: "🥳", value: "partying" },
        { label: "😎", value: "sunglasses" },
        { label: "🤩", value: "star-struck" },
        { label: "😂", value: "joy" },
        { label: "🥰", value: "smiling-hearts" },
        { label: "😊", value: "blush" },
        { label: "🤗", value: "hugging" },
        { label: "😇", value: "innocent" },
        { label: "🔥", value: "fire" },
        { label: "✨", value: "sparkles" },
        { label: "💯", value: "hundred" },
        { label: "🎉", value: "tada" },
        { label: "❤️", value: "heart" },
        { label: "👍", value: "thumbs-up" },
        { label: "👏", value: "clap" },
        { label: "🚀", value: "rocket" },
        { label: "⭐", value: "star" },
        { label: "🌈", value: "rainbow" },
      ],
      columnCount: 5,
    });
    return h(Listbox.Root, { collection: reactions } as any, () => [
      h(Listbox.Label, () => "Pick a reaction"),
      h(
        Listbox.Content,
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.25rem",
          },
        },
        () =>
          reactions.items.map((item: any) =>
            h(
              Listbox.Item,
              {
                key: item.value,
                item,
                style: {
                  display: "grid",
                  placeItems: "center",
                  padding: "0.25rem",
                  fontSize: "1.25rem",
                  borderRadius: "var(--bs-radius-sm)",
                  cursor: "pointer",
                },
              },
              () => h(Listbox.ItemText, () => item.label),
            ),
          ),
      ),
    ]);
  },
};

/** Rows fold under their region headings — one ledger, many drawers. */
export const Group = {
  render: () => {
    const cities = createListCollection({
      items: [
        { label: "New York", value: "nyc", region: "North America" },
        { label: "Toronto", value: "yyz", region: "North America" },
        { label: "London", value: "lhr", region: "Europe" },
        { label: "Paris", value: "cdg", region: "Europe" },
        { label: "Tokyo", value: "nrt", region: "Asia Pacific" },
        { label: "Sydney", value: "syd", region: "Asia Pacific" },
      ],
      groupBy: (item: any) => item.region,
    });
    return h(Listbox.Root, { collection: cities, selectionMode: "single" } as any, () => [
      h(Listbox.Label, () => "Region"),
      h(Listbox.Content, () =>
        cities
          .group()
          .map(([region, items]: [string, any[]]) =>
            h(Listbox.ItemGroup, { key: region }, () => [
              h(Listbox.ItemGroupLabel, () => region),
              ...items.map((item) =>
                h(Listbox.Item, { key: item.value, item }, () => [
                  h(Listbox.ItemText, () => item.label),
                  h(Listbox.ItemIndicator, () => checkGlyph()),
                ]),
              ),
            ]),
          ),
      ),
    ]);
  },
};

/** A header above the ledger toggles every row — all, none, or the
 * in-between mark. */
export const SelectAll = {
  render: () => {
    const frameworks = createListCollection({
      items: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
      ],
    });
    const Header = defineComponent({
      name: "SelectAllHeader",
      setup() {
        const listbox = useListboxContext();
        return () =>
          h(
            "button",
            {
              type: "button",
              onClick: () => {
                const current = listbox.value.value;
                listbox.value.setValue(
                  current.length === frameworks.items.length
                    ? []
                    : frameworks.items.map((item: any) => item.value),
                );
              },
              style: {
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                border: "none",
                background: "transparent",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
                cursor: "pointer",
                padding: "0.25rem 0",
              },
            },
            "Select all",
          );
      },
    });
    return h(Listbox.Root, { collection: frameworks, selectionMode: "multiple" } as any, () => [
      h(Header),
      h(Listbox.Content, () => rows(frameworks)),
    ]);
  },
};

/** The ledger lies sideways: album cards travel in a row. */
export const Horizontal = {
  render: () => {
    const albums = createListCollection({
      items: [
        {
          title: "Midnight Dreams",
          artist: "Luna Ray",
          image: "https://picsum.photos/seed/bs-alb-1/300/300",
        },
        {
          title: "Neon Skyline",
          artist: "The Electric",
          image: "https://picsum.photos/seed/bs-alb-2/300/300",
        },
        {
          title: "Acoustic Sessions",
          artist: "Sarah Woods",
          image: "https://picsum.photos/seed/bs-alb-3/300/300",
        },
        {
          title: "Urban Echoes",
          artist: "Metro Collective",
          image: "https://picsum.photos/seed/bs-alb-4/300/300",
        },
      ],
      itemToValue: (item: any) => item.title,
      itemToString: (item: any) => item.title,
    } as any);
    return h(
      Listbox.Root,
      { collection: albums, orientation: "horizontal", selectionMode: "single" } as any,
      () => [
        h(Listbox.Label, () => "Album"),
        h(Listbox.Content, { style: { display: "flex", gap: "0.75rem", overflowX: "auto" } }, () =>
          albums.items.map((item: any) =>
            h(
              Listbox.Item,
              {
                key: item.title,
                item,
                style: {
                  display: "grid",
                  gap: "0.25rem",
                  padding: "0.5rem",
                  border: "1px solid var(--bs-color-border)",
                  borderRadius: "var(--bs-radius-md)",
                  cursor: "pointer",
                  width: "9rem",
                },
              },
              () => [
                h("img", {
                  src: item.image,
                  alt: item.title,
                  width: 136,
                  height: 76,
                  style: { borderRadius: "var(--bs-radius-sm)", objectFit: "cover" },
                }),
                h(Listbox.ItemText, () => item.title),
                h(
                  "span",
                  {
                    style: {
                      fontSize: "var(--bs-font-size-xs)",
                      color: "var(--bs-color-text-tertiary)",
                    },
                  },
                  () => item.artist,
                ),
                h(Listbox.ItemIndicator, () => checkGlyph()),
              ],
            ),
          ),
        ),
      ],
    );
  },
};

/** One row rests behind glass: the enterprise tier will not answer. */
export const DisabledItem = {
  render: () => {
    const plans = createListCollection({
      items: [
        { label: "Free", value: "free" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "enterprise", disabled: true },
        { label: "Custom", value: "custom" },
      ],
    });
    return h(Listbox.Root, { collection: plans, selectionMode: "single" } as any, () => [
      h(Listbox.Label, () => "Plan"),
      h(Listbox.Content, () => rows(plans)),
    ]);
  },
};

/** The label counts along: the machine's own text of what is checked. */
export const ValueText = {
  render: () => {
    const colors = createListCollection({
      items: [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
      ],
    });
    return h(
      Listbox.Root,
      { collection: colors, selectionMode: "multiple", defaultValue: ["red", "blue"] } as any,
      () => [
        h(Listbox.Label, () => [h("span", () => "Colors: "), h(Listbox.ValueText)]),
        h(Listbox.Content, () => rows(colors)),
      ],
    );
  },
};

/** Hold ⌘ or Ctrl and the ledger extends: click, click, click keeps
 * every prior check. */
export const ExtendedSelect = {
  render: () => {
    const frameworks = createListCollection({
      items: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
        { label: "Solid", value: "solid" },
      ],
    });
    return h(Listbox.Root, { collection: frameworks, selectionMode: "extended" } as any, () => [
      h(Listbox.Label, () => "Hold ⌘ or Ctrl to select multiple"),
      h(Listbox.Content, () => rows(frameworks)),
    ]);
  },
};

/** The selection answers to the caller — the rows only mirror. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["md"] });
      const sizes = createListCollection({
        items: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
          { label: "Extra large", value: "xl" },
        ],
      });
      return () =>
        h(
          Listbox.Root,
          {
            collection: sizes,
            selectionMode: "multiple",
            modelValue: state.value,
            onValueChange: (e: { value: string[] }) => (state.value = e.value),
          } as any,
          () => [h(Listbox.Label, () => "Size"), h(Listbox.Content, () => rows(sizes))],
        );
    }),
};
