import { useToggleGroup } from "@ark-ui/react/toggle-group";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { ToggleGroup } from ".";

const meta: Meta = { title: "Components/Actions/Toggle Group" };
export default meta;

const STROKE_ATTRS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ALIGN_PATHS: Record<string, string> = {
  left: "M4 4v16M9 8h10M9 12h12M9 16h7",
  center: "M12 4v16M7 8h10M4 12h16M8 16h8",
  right: "M20 4v16M5 8h10M3 12h12M8 16h7",
  justify: "M4 6h16M4 12h16M4 18h16",
};

const TEXT_PATHS: Record<string, string> = {
  bold: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 4v6a6 6 0 0 0 12 0V4M4 20h16",
};

function icon(d: string) {
  return (
    <svg {...STROKE_ATTRS}>
      <path d={d} />
    </svg>
  );
}

function alignItem(align: string) {
  return (
    <ToggleGroup.Item key={align} value={align} aria-label={`Align ${align}`}>
      {icon(ALIGN_PATHS[align])}
    </ToggleGroup.Item>
  );
}

/** The alignment bench: one seal pressed at rest, the others waiting. */
export const Basic = {
  args: {
    orientation: "horizontal",
    label: "Text alignment",
  },
  render: (args: any) => (
    <ToggleGroup.Root
      defaultValue={["left"]}
      orientation={args.orientation}
      aria-label={args.label}
    >
      {Object.keys(ALIGN_PATHS).map(alignItem)}
    </ToggleGroup.Root>
  ),
};

/** The presses answer to the caller — the group only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<string[]>(["left"]);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          value: {value.join(", ") || "none"}
        </output>
        <ToggleGroup.Root
          value={value}
          onValueChange={(e: { value: string[] }) => setValue(e.value)}
          aria-label="Text alignment"
        >
          {Object.keys(ALIGN_PATHS).map(alignItem)}
        </ToggleGroup.Root>
      </div>
    );
  },
};

/** Several truths at once: bold, italic and underline hold independently. */
export const Multiple = {
  render: () => (
    <ToggleGroup.Root defaultValue={["bold"]} multiple aria-label="Text style">
      {Object.keys(TEXT_PATHS).map((value) => (
        <ToggleGroup.Item key={value} value={value} aria-label={value}>
          {icon(TEXT_PATHS[value])}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  ),
};

/** One seal sealed shut: italic refuses, bold and underline keep working. */
export const Disabled = {
  render: () => (
    <ToggleGroup.Root defaultValue={["bold"]} multiple aria-label="Text style">
      {Object.keys(TEXT_PATHS).map((value) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          aria-label={value}
          disabled={value === "italic"}
        >
          {icon(TEXT_PATHS[value])}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the bench. */
function RootProviderDriver() {
  const toggleGroup = useToggleGroup({ defaultValue: ["left"] });
  return (
    <>
      <output
        style={{
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-secondary)",
        }}
      >
        value: {toggleGroup.value.join(", ") || "none"}
      </output>
      <ToggleGroup.RootProvider value={toggleGroup}>
        {Object.keys(ALIGN_PATHS).map(alignItem)}
      </ToggleGroup.RootProvider>
    </>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
