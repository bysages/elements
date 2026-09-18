import { createGridCollection, useListCollection } from "@ark-ui/react/collection";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Listbox, createListCollection } from ".";

const meta: Meta = { title: "Components/Forms/Listbox" };
export default meta;

const checkGlyph = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 8.5l2.5 2.5L12 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function rows(collection: { items: any[] }) {
  return collection.items.map((item: any) => (
    <Listbox.Item key={item.value} item={item}>
      <Listbox.ItemText>{item.label}</Listbox.ItemText>
      <Listbox.ItemIndicator>{checkGlyph()}</Listbox.ItemIndicator>
    </Listbox.Item>
  ));
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
  render: (args: any) => (
    <Listbox.Root collection={pigments} selectionMode="single" disabled={args.disabled}>
      <Listbox.Label>{args.label}</Listbox.Label>
      <Listbox.Content>{rows(pigments)}</Listbox.Content>
    </Listbox.Root>
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
    return (
      <Listbox.Root collection={days} selectionMode="multiple">
        <Listbox.Label>Days</Listbox.Label>
        <Listbox.Content>{rows(days)}</Listbox.Content>
      </Listbox.Root>
    );
  },
};

/** Type to narrow the ledger; empty results say so plainly. */
export const Filtering = {
  render: () => {
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
    return (
      <Listbox.Root collection={collection}>
        <Listbox.Label>Framework</Listbox.Label>
        <Listbox.Input
          placeholder="Search frameworks..."
          onChange={(e) => filter(e.target.value)}
        />
        <Listbox.Content>
          {rows(collection)}
          <Listbox.Empty>No frameworks found</Listbox.Empty>
        </Listbox.Content>
      </Listbox.Root>
    );
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
    return (
      <Listbox.Root collection={reactions}>
        <Listbox.Label>Pick a reaction</Listbox.Label>
        <Listbox.Content
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.25rem",
          }}
        >
          {reactions.items.map((item: any) => (
            <Listbox.Item
              key={item.value}
              item={item}
              style={{
                display: "grid",
                placeItems: "center",
                padding: "0.25rem",
                fontSize: "1.25rem",
                borderRadius: "var(--bs-radius-sm)",
                cursor: "pointer",
              }}
            >
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>
    );
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
    return (
      <Listbox.Root collection={cities} selectionMode="single">
        <Listbox.Label>Region</Listbox.Label>
        <Listbox.Content>
          {cities.group().map(([region, items]: [string, any[]]) => (
            <Listbox.ItemGroup key={region}>
              <Listbox.ItemGroupLabel>{region}</Listbox.ItemGroupLabel>
              {items.map((item) => (
                <Listbox.Item key={item.value} item={item}>
                  <Listbox.ItemText>{item.label}</Listbox.ItemText>
                  <Listbox.ItemIndicator>{checkGlyph()}</Listbox.ItemIndicator>
                </Listbox.Item>
              ))}
            </Listbox.ItemGroup>
          ))}
        </Listbox.Content>
      </Listbox.Root>
    );
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
    return (
      <Listbox.Root collection={frameworks} selectionMode="multiple">
        <Listbox.Context>
          {(listbox) => (
            <button
              type="button"
              onClick={() => {
                const current = listbox.value;
                listbox.setValue(
                  current.length === frameworks.items.length
                    ? []
                    : frameworks.items.map((item: any) => item.value),
                );
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                border: "none",
                background: "transparent",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
                cursor: "pointer",
                padding: "0.25rem 0",
              }}
            >
              Select all
            </button>
          )}
        </Listbox.Context>
        <Listbox.Content>{rows(frameworks)}</Listbox.Content>
      </Listbox.Root>
    );
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
    return (
      <Listbox.Root collection={albums} orientation="horizontal" selectionMode="single">
        <Listbox.Label>Album</Listbox.Label>
        <Listbox.Content style={{ display: "flex", gap: "0.75rem", overflowX: "auto" }}>
          {albums.items.map((item: any) => (
            <Listbox.Item
              key={item.title}
              item={item}
              style={{
                display: "grid",
                gap: "0.25rem",
                padding: "0.5rem",
                border: "1px solid var(--bs-color-border)",
                borderRadius: "var(--bs-radius-md)",
                cursor: "pointer",
                width: "9rem",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                width={136}
                height={76}
                style={{ borderRadius: "var(--bs-radius-sm)", objectFit: "cover" }}
              />
              <Listbox.ItemText>{item.title}</Listbox.ItemText>
              <span
                style={{
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                }}
              >
                {item.artist}
              </span>
              <Listbox.ItemIndicator>{checkGlyph()}</Listbox.ItemIndicator>
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>
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
    return (
      <Listbox.Root collection={plans} selectionMode="single">
        <Listbox.Label>Plan</Listbox.Label>
        <Listbox.Content>{rows(plans)}</Listbox.Content>
      </Listbox.Root>
    );
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
    return (
      <Listbox.Root collection={colors} selectionMode="multiple" defaultValue={["red", "blue"]}>
        <Listbox.Label>
          <span>Colors: </span>
          <Listbox.ValueText />
        </Listbox.Label>
        <Listbox.Content>{rows(colors)}</Listbox.Content>
      </Listbox.Root>
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
    return (
      <Listbox.Root collection={frameworks} selectionMode="extended">
        <Listbox.Label>Hold ⌘ or Ctrl to select multiple</Listbox.Label>
        <Listbox.Content>{rows(frameworks)}</Listbox.Content>
      </Listbox.Root>
    );
  },
};

/** The selection answers to the caller — the rows only mirror. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState(["md"]);
    const sizes = createListCollection({
      items: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra large", value: "xl" },
      ],
    });
    return (
      <Listbox.Root
        collection={sizes}
        selectionMode="multiple"
        value={value}
        onValueChange={(e: { value: string[] }) => setValue(e.value)}
      >
        <Listbox.Label>Size</Listbox.Label>
        <Listbox.Content>{rows(sizes)}</Listbox.Content>
      </Listbox.Root>
    );
  },
};
