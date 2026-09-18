import { useListCollection } from "@ark-ui/react/collection";
import { useFilter } from "@ark-ui/react/locale";
import type { Meta } from "@storybook/react-vite";
import { useState, type ReactNode } from "react";

import { Combobox } from ".";

const meta: Meta = { title: "Components/Forms/Combobox" };
export default meta;

interface Item {
  label: string;
  value: string;
  continent?: string;
  isNew?: boolean;
}

const chevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const checkGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m4 12.5 5 5L20 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const xGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function itemRows(items: readonly Item[], showNew = false) {
  return items.map((item) => (
    <Combobox.Item key={item.value} item={item}>
      <Combobox.ItemText>
        {showNew && item.isNew ? `Create "${item.label}"` : item.label}
      </Combobox.ItemText>
      <Combobox.ItemIndicator>{checkGlyph()}</Combobox.ItemIndicator>
    </Combobox.Item>
  ));
}

/** Story scaffolding: one fruit combobox whose collection, root props, and
 * item rows vary per story. */
function ComboboxStory({
  label = "Fruit",
  rootProps = {} as Record<string, unknown>,
  initialItems,
  limit,
  inputBehavior,
  groupBy,
  withClear = true,
  rows: rowsFn,
}: {
  label?: string;
  rootProps?: Record<string, unknown>;
  initialItems?: Item[];
  limit?: number;
  inputBehavior?: string;
  groupBy?: (item: Item) => string;
  withClear?: boolean;
  rows?: (collection: {
    items: readonly Item[];
    group: () => Array<[string, Item[]]>;
  }) => ReactNode;
}) {
  const filters = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection<Item>({
    initialItems: initialItems ?? [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
      { label: "Date", value: "date" },
      { label: "Elderberry", value: "elderberry" },
      { label: "Fig", value: "fig" },
    ],
    limit,
    groupBy,
    filter: (item: string, inputValue: string) => filters.contains(item, inputValue),
  });
  const rows = () =>
    rowsFn ? (
      rowsFn(collection)
    ) : (
      <>
        <Combobox.Empty>No results found</Combobox.Empty>
        {itemRows(collection.items)}
      </>
    );
  return (
    <Combobox.Root
      collection={collection}
      inputBehavior={inputBehavior as never}
      onInputValueChange={(details: { inputValue: string }) => filter(details.inputValue)}
      {...rootProps}
    >
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Apple" />
        {withClear ? <Combobox.ClearTrigger>{xGlyph()}</Combobox.ClearTrigger> : null}
        <Combobox.Trigger>{chevronDown()}</Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>{rows()}</Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}

/** Type to filter; the matching strokes take the primary ink while the
 * checked row holds the flat fill. */
export const Basic = {
  args: {
    label: "Fruit",
  },
  render: (args: any) => <ComboboxStory label={args.label} />,
};

/** Several skills can be picked at once; the choice chips sit above the
 * field. */
export const Multiple = {
  render: () => {
    const [picked, setPicked] = useState<string[]>([]);
    return (
      <ComboboxStory
        label="Skills"
        rootProps={{
          multiple: true,
          value: picked,
          onValueChange: (e: { value: string[] }) => setPicked(e.value),
        }}
        initialItems={[
          { label: "JS", value: "js" },
          { label: "TypeScript", value: "ts" },
          { label: "Vue", value: "vue" },
          { label: "React", value: "react" },
          { label: "Svelte", value: "svelte" },
        ]}
      />
    );
  },
};

/** Rows ride in their continent groups; the group() split drives the
 * labels. */
export const Grouping = {
  render: () => (
    <ComboboxStory
      label="Fruit"
      initialItems={[
        { label: "Apple", value: "apple", continent: "Pome" },
        { label: "Pear", value: "pear", continent: "Pome" },
        { label: "Cherry", value: "cherry", continent: "Stone" },
        { label: "Peach", value: "peach", continent: "Stone" },
        { label: "Fig", value: "fig", continent: "Other" },
      ]}
      groupBy={(item: Item) => item.continent ?? "Other"}
      rows={(collection) => (
        <>
          <Combobox.Empty>No results found</Combobox.Empty>
          {collection.group().map(([group, items]: [string, Item[]]) => (
            <Combobox.ItemGroup key={group}>
              <Combobox.ItemGroupLabel>{group}</Combobox.ItemGroupLabel>
              {items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>{checkGlyph()}</Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          ))}
        </>
      )}
    />
  ),
};

/** The selection answers to state — the field mirrors every pick. */
export const Controlled = {
  render: () => {
    const [picked, setPicked] = useState(["banana"]);
    return (
      <ComboboxStory
        rootProps={{
          value: picked,
          onValueChange: (e: { value: string[] }) => setPicked(e.value),
        }}
      />
    );
  },
};

/** Nothing matches? The typed text becomes a creatable row, and picking it
 * plants a permanent option in the list. */
export const Creatable = {
  render: () => {
    const filters = useFilter({ sensitivity: "base" });
    const [typed, setTyped] = useState("");
    const { collection, filter, upsert } = useListCollection<Item>({
      initialItems: [
        { label: "Bug", value: "bug" },
        { label: "Feature", value: "feature" },
        { label: "Enhancement", value: "enhancement" },
        { label: "Documentation", value: "docs" },
      ],
      filter: (item: string, query: string) => filters.contains(item, query),
    });
    const text = typed.trim();
    const exists = collection.items.some((item) => item.label.toLowerCase() === text.toLowerCase());
    const candidate = text && !exists ? { label: text, value: `new:${text}`, isNew: true } : null;
    return (
      <Combobox.Root
        collection={collection}
        onInputValueChange={(details: { inputValue: string }) => {
          setTyped(details.inputValue);
          filter(details.inputValue);
        }}
        onValueChange={(details: { value: string[] }) => {
          details.value.forEach((value) => {
            if (value.startsWith("new:")) {
              const label = value.slice(4);
              upsert(value, { label, value });
            }
          });
        }}
      >
        <Combobox.Label>Issue type</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placeholder="e.g. Apple" />
          <Combobox.ClearTrigger>{xGlyph()}</Combobox.ClearTrigger>
          <Combobox.Trigger>{chevronDown()}</Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No results found</Combobox.Empty>
            {itemRows(collection.items)}
            {candidate ? (
              <Combobox.Item key="create" item={candidate}>
                <Combobox.ItemText>{`Create "${candidate.label}"`}</Combobox.ItemText>
                <Combobox.ItemIndicator>{checkGlyph()}</Combobox.ItemIndicator>
              </Combobox.Item>
            ) : null}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    );
  },
};

/** At most five cities survive the filter. */
export const LimitResults = {
  render: () => (
    <ComboboxStory
      label="City"
      limit={5}
      initialItems={[
        { label: "Suzhou", value: "suzhou" },
        { label: "Hangzhou", value: "hangzhou" },
        { label: "Guangzhou", value: "guangzhou" },
        { label: "Fuzhou", value: "fuzhou" },
        { label: "Suzhou Creek", value: "suzhou-creek" },
        { label: "Xuzhou", value: "xuzhou" },
        { label: "Zhengzhou", value: "zhengzhou" },
      ]}
    />
  ),
};

/** The input autocompletes the first match; the list rests on the page
 * with no popup chrome. */
export const InlineAutocomplete = {
  render: () => (
    <ComboboxStory
      label="Sea Creature"
      inputBehavior="autocomplete"
      rootProps={{ openOnClick: false }}
      withClear={true}
      initialItems={[
        { label: "Dolphin", value: "dolphin" },
        { label: "Dugong", value: "dugong" },
        { label: "Anchovy", value: "anchovy" },
        { label: "Cuttlefish", value: "cuttlefish" },
      ]}
    />
  ),
};
