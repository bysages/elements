import { useToggleGroup } from "@ark-ui/solid/toggle-group";
import { createSignal, For } from "solid-js";

import { ToggleGroup } from ".";

const meta = {
  title: "Components/Actions/Toggle Group",
  component: ToggleGroup,
};
export default meta;

function icon(d: string) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const alignPaths = {
  left: "M4 4v16M9 8h10M9 12h12M9 16h7",
  center: "M12 4v16M7 8h10M4 12h16M8 16h8",
  right: "M20 4v16M5 8h10M3 12h12M8 16h7",
  justify: "M4 6h16M4 12h16M4 18h16",
};

const textPaths = {
  bold: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 4v6a6 6 0 0 0 12 0V4M4 20h16",
};

function alignItem(align: string) {
  return (
    <ToggleGroup.Item value={align} aria-label={`Align ${align}`}>
      {icon(alignPaths[align as keyof typeof alignPaths])}
    </ToggleGroup.Item>
  );
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <ToggleGroup
      items={[
        { value: "left", label: "Align left", icon: "text-align-start" },
        { value: "center", label: "Align center", icon: "text-align-center" },
        { value: "right", label: "Align right", icon: "text-align-end" },
        {
          value: "justify",
          label: "Align justified",
          icon: "text-align-justify",
        },
      ]}
      defaultValue={["left"]}
      label="Text alignment"
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => (
    <ToggleGroup.Root defaultValue={["left"]} aria-label="Text alignment">
      <For each={Object.keys(alignPaths)}>{alignItem}</For>
    </ToggleGroup.Root>
  ),
};

/** The presses answer to the caller — the group only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = createSignal(["left"]);
    return (
      <div style={{ display: "grid", gap: "0.75rem", "justify-items": "start" }}>
        <output
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          value: {value().join(", ") || "none"}
        </output>
        <ToggleGroup.Root
          value={value()}
          onValueChange={(details) => setValue(details.value)}
          aria-label="Text alignment"
        >
          <For each={Object.keys(alignPaths)}>{alignItem}</For>
        </ToggleGroup.Root>
      </div>
    );
  },
};

/** Several truths at once: bold, italic and underline hold independently. */
export const Multiple = {
  render: () => (
    <ToggleGroup.Root defaultValue={["bold"]} multiple aria-label="Text style">
      <For each={Object.keys(textPaths)}>
        {(value) => (
          <ToggleGroup.Item value={value} aria-label={value}>
            {icon(textPaths[value as keyof typeof textPaths])}
          </ToggleGroup.Item>
        )}
      </For>
    </ToggleGroup.Root>
  ),
};

/** One seal sealed shut: italic refuses, bold and underline keep working. */
export const Disabled = {
  render: () => (
    <ToggleGroup.Root defaultValue={["bold"]} multiple aria-label="Text style">
      <For each={Object.keys(textPaths)}>
        {(value) => (
          <ToggleGroup.Item value={value} aria-label={value} disabled={value === "italic"}>
            {icon(textPaths[value as keyof typeof textPaths])}
          </ToggleGroup.Item>
        )}
      </For>
    </ToggleGroup.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the bench. */
export const RootProvider = {
  render: () => {
    const ToggleGroupDriver = () => {
      const toggleGroup = useToggleGroup({ defaultValue: ["left"] });
      return (
        <>
          <output
            style={{
              "font-size": "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            value: {toggleGroup().value.join(", ") || "none"}
          </output>
          <ToggleGroup.RootProvider value={toggleGroup}>
            <For each={Object.keys(alignPaths)}>{alignItem}</For>
          </ToggleGroup.RootProvider>
        </>
      );
    };
    return <ToggleGroupDriver />;
  },
};
