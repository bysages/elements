import { createListCollection } from "@ark-ui/react/select";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import type { ReactNode } from "react";

import { Select } from ".";

const meta: Meta = { title: "Components/Forms/Select" };
export default meta;

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

const cities = createListCollection({
  items: [
    { label: "Suzhou", value: "suzhou", region: "Jiangnan" },
    { label: "Hangzhou", value: "hangzhou", region: "Jiangnan" },
    { label: "Chengdu", value: "chengdu", region: "Shu" },
    { label: "Chongqing", value: "chongqing", region: "Shu" },
  ],
  groupBy: (item: any) => item.region,
});

function chevronsUpDown() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="m7 9 5-5 5 5M7 15l5 5 5-5" />
    </svg>
  );
}

function checkGlyph() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

function xGlyph() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function rows(collection: { items: readonly { label: string; value: string }[] }) {
  return collection.items.map((item) => (
    <Select.Item key={item.value} item={item}>
      <Select.ItemText>{item.label}</Select.ItemText>
      <Select.ItemIndicator>{checkGlyph()}</Select.ItemIndicator>
    </Select.Item>
  ));
}

function grouped(collection: any) {
  return (collection.group() as [string, { label: string; value: string }[]][]).map(
    ([region, items]) => (
      <Select.ItemGroup key={region}>
        <Select.ItemGroupLabel>{region}</Select.ItemGroupLabel>
        {items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator>{checkGlyph()}</Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.ItemGroup>
    ),
  );
}

function shell(rootProps: any, collection: any, content: ReactNode, placeholder = "Select") {
  return (
    <Select.Root collection={collection} {...rootProps}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.ClearTrigger>{xGlyph()}</Select.ClearTrigger>
        <Select.Indicator>{chevronsUpDown()}</Select.Indicator>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>{content}</Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );
}

/** The trigger is the whole control; the chosen row carries the flat ink
 * fill inside the vessel. */
export const Basic = {
  args: {
    placeholder: "Select",
  },
  render: (args: any) =>
    shell(
      {},
      frameworks,
      [
        <Select.ItemGroup key="frameworks">
          <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
          {rows(frameworks)}
        </Select.ItemGroup>,
      ],
      args.placeholder,
    ),
};

/** The selection answers to state — the trigger mirrors the caller. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<string[]>(["vue"]);
    return shell(
      {
        value,
        onValueChange: (e: { value: string[] }) => {
          setValue(e.value);
        },
      },
      frameworks,
      rows(frameworks),
    );
  },
};

/** The whole field rests: no open, no pick, no highlight. */
export const Disabled = {
  render: () => shell({ disabled: true, defaultValue: ["solid"] }, frameworks, rows(frameworks)),
};

/** Several frameworks at once; every picked row keeps its check. */
export const Multiple = {
  render: () => shell({ multiple: true }, frameworks, rows(frameworks)),
};

/** Past two picks the rest go quiet. */
export const MaxSelected = {
  render: () => {
    const [value, setValue] = useState<string[]>(["react", "solid"]);
    return shell(
      {
        multiple: true,
        value,
        onValueChange: (e: { value: string[] }) => {
          if (e.value.length <= 2) setValue(e.value);
        },
      },
      frameworks,
      rows(frameworks),
    );
  },
};

/** Rows ride in their region groups; the group() split drives the labels. */
export const Grouping = {
  render: () => (
    <Select.Root collection={cities}>
      <Select.Label>City</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select" />
        </Select.Trigger>
        <Select.ClearTrigger>{xGlyph()}</Select.ClearTrigger>
        <Select.Indicator>{chevronsUpDown()}</Select.Indicator>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>{grouped(cities)}</Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
};

/** A long list scrolls inside the vessel; the field never grows. */
export const Overflow = {
  render: () => (
    <Select.Root collection={cities} multiple>
      <Select.Label>City</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select" />
        </Select.Trigger>
        <Select.ClearTrigger>{xGlyph()}</Select.ClearTrigger>
        <Select.Indicator>{chevronsUpDown()}</Select.Indicator>
      </Select.Control>
      <Select.Positioner>
        <Select.Content style={{ maxBlockHeight: "8rem", overflowY: "auto" } as any}>
          {rows(cities)}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
};

/** The popup mounts only on first open and leaves on exit — nothing of the
 * vessel rests in the page. */
export const LazyMount = {
  render: () => shell({ lazyMount: true, unmountOnExit: true }, frameworks, rows(frameworks)),
};

/** The collection itself answers to state: a toggle swaps the rows. */
export const DynamicItems = {
  render: () => {
    const [small, setSmall] = useState(false);
    const collection = small
      ? createListCollection({ items: [{ label: "Vue", value: "vue" }] })
      : frameworks;
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
        <button
          type="button"
          onClick={() => setSmall(!small)}
          style={{
            justifySelf: "start",
            border: "1px solid var(--bs-color-border)",
            background: "var(--bs-color-surface-2)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.5rem",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
            cursor: "pointer",
          }}
        >
          Toggle items
        </button>
        {shell({}, collection, rows(collection))}
      </div>
    );
  },
};
