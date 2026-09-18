import { useSegmentGroup } from "@ark-ui/react/segment-group";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { SegmentGroup } from ".";

const meta: Meta = { title: "Components/Forms/Segment Group" };
export default meta;

const FRAMEWORKS = ["React", "Solid", "Svelte", "Vue"];

function group(extraProps: Record<string, any> = {}, values = FRAMEWORKS) {
  return (
    <SegmentGroup.Root {...extraProps}>
      <SegmentGroup.Indicator />
      {values.map((value) => (
        <SegmentGroup.Item key={value} value={value}>
          <SegmentGroup.ItemText>{value}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  );
}

/** One ink stroke slides beneath the chosen segment. */
export const Basic = {
  args: {
    orientation: "horizontal",
  },
  render: (args: any) => group({ defaultValue: "Vue", orientation: args.orientation }),
};

/** The choice answers to the caller — the group only mirrors it. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          value: {value ?? "none"}
        </output>
        {group({
          value: value ?? undefined,
          onValueChange: (e: { value: string | null }) => setValue(e.value),
        })}
      </div>
    );
  },
};

/** One seal sealed shut: Svelte refuses, its neighbours keep working. */
export const Disabled = {
  render: () => (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      {FRAMEWORKS.map((value) => (
        <SegmentGroup.Item key={value} value={value} disabled={value === "Svelte"}>
          <SegmentGroup.ItemText>{value}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  ),
};

/** Born with a choice, mounted late: the indicator measures its segment
 * on first paint, not after the first click. */
export const Conditional = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <button
          onClick={() => setShow(!show)}
          style={{
            padding: "0.375rem 0.75rem",
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            background: "var(--bs-color-surface-2)",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          {show ? "Hide" : "Show"}
        </button>
        {show ? group({ defaultValue: "React" }) : null}
      </div>
    );
  },
};

/** The machine answers outside its anatomy: the provider owns the group. */
function RootProviderDriver() {
  const segmentGroup = useSegmentGroup({ defaultValue: "React" });
  return (
    <>
      <SegmentGroup.RootProvider value={segmentGroup}>
        <SegmentGroup.Indicator />
        {FRAMEWORKS.map((value) => (
          <SegmentGroup.Item key={value} value={value}>
            <SegmentGroup.ItemText>{value}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.RootProvider>
      <output
        style={{
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-secondary)",
        }}
      >
        selected: {segmentGroup.value ?? "none"}
      </output>
    </>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
