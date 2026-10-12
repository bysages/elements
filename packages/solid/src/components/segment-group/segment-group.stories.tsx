import { useSegmentGroup } from "@ark-ui/solid/segment-group";
import { createSignal, For, Show } from "solid-js";

import { SegmentGroup } from ".";

const meta = {
  title: "Components/Forms/Segment Group",
  component: SegmentGroup,
};
export default meta;

const frameworks = ["React", "Solid", "Svelte", "Vue"];

function segment(value: string, disabled = false) {
  return (
    <SegmentGroup.Item value={value} disabled={disabled}>
      <SegmentGroup.ItemText>{value}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  );
}

function group(extra: Record<string, unknown> = {}, values = frameworks) {
  return (
    <SegmentGroup.Root {...extra}>
      <Show when={values.length}>{<SegmentGroup.Indicator />}</Show>
      <For each={values}>{(value) => segment(value)}</For>
    </SegmentGroup.Root>
  );
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <SegmentGroup
      items={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
      defaultValue="week"
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => (
    <SegmentGroup.Root defaultValue="week">
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="day">
        <SegmentGroup.ItemText>Day</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="week">
        <SegmentGroup.ItemText>Week</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  ),
};

/** The choice answers to the caller — the group only mirrors it. */
export const Controlled = {
  render: () => {
    const [value, setValue] = createSignal<string | undefined>();
    return (
      <div style={{ display: "grid", gap: "0.75rem", "justify-items": "start" }}>
        <output
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          value: {value() ?? "none"}
        </output>
        {group({
          value: value(),
          onValueChange: (details: { value: string | null }) =>
            setValue(details.value ?? undefined),
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
      <For each={frameworks}>{(value) => segment(value, value === "Svelte")}</For>
    </SegmentGroup.Root>
  ),
};

/** Born with a choice, mounted late: the indicator measures its segment
 * on first paint, not after the first click. */
export const Conditional = {
  render: () => {
    const [show, setShow] = createSignal(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", "justify-items": "start" }}>
        <button type="button" onClick={() => setShow(!show())}>
          {show() ? "Hide" : "Show"}
        </button>
        <Show when={show()}>{group({ defaultValue: "React" })}</Show>
      </div>
    );
  },
};

/** The machine answers outside its anatomy: the provider owns the group. */
export const RootProvider = {
  render: () => {
    const SegmentDriver = () => {
      const segmentGroup = useSegmentGroup({ defaultValue: "React" });
      return (
        <>
          <SegmentGroup.RootProvider value={segmentGroup}>
            <SegmentGroup.Indicator />
            <For each={frameworks}>{(value) => segment(value)}</For>
          </SegmentGroup.RootProvider>
          <output
            style={{
              "font-size": "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            selected: {segmentGroup().value ?? "none"}
          </output>
        </>
      );
    };
    return <SegmentDriver />;
  },
};
