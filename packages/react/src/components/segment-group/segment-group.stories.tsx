import { useSegmentGroup } from "@ark-ui/react/segment-group";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { SegmentGroup } from ".";
import { Button } from "../button";

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

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <SegmentGroup
      defaultValue="week"
      items={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
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
        <Button onClick={() => setShow(!show)} size="sm">
          {show ? "Hide" : "Show"}
        </Button>
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
