import { useRadioGroup } from "@ark-ui/solid/radio-group";
import { createSignal, For, Show } from "solid-js";

import { RadioGroup } from ".";
import { Fieldset } from "../fieldset";

const meta = { title: "Components/Forms/Radio Group", component: RadioGroup };
export default meta;

const papers = ["Xuan", "Doushu", "Mian"];

function item(paper: string) {
  return (
    <RadioGroup.Item value={paper}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{paper}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  );
}

function paperGroup(extra: Record<string, unknown> = {}, label = "Paper") {
  return (
    <RadioGroup.Root {...extra}>
      <Show when={label}>
        <RadioGroup.Label>{label}</RadioGroup.Label>
      </Show>
      <For each={papers}>{item}</For>
    </RadioGroup.Root>
  );
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <RadioGroup
      items={[
        { value: "xuan", label: "Xuan paper" },
        { value: "silk", label: "Silk" },
        { value: "bamboo", label: "Bamboo slips" },
      ]}
      defaultValue="xuan"
      label="Ground"
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => (
    <RadioGroup.Root defaultValue="xuan">
      <RadioGroup.Label>Ground</RadioGroup.Label>
      <RadioGroup.Item value="xuan">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Xuan paper</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
      <RadioGroup.Item value="silk">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Silk</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>
  ),
};

/** Retired choices: the seals mute, no ink, no pointer. */
export const Disabled = {
  render: () => (
    <div style={{ "max-width": "20rem" }}>
      <RadioGroup.Root defaultValue="Cinnabar" disabled>
        <RadioGroup.Label>Sealed away</RadioGroup.Label>
        {item("Cinnabar")}
        {item("Ultramarine")}
      </RadioGroup.Root>
    </div>
  ),
};

/** The caller owns the choice — the group only mirrors it. */
export const Controlled = {
  render: () => {
    const [value, setValue] = createSignal<string | undefined>();
    return (
      <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
        <output
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          value: {value() ?? "none"}
        </output>
        <RadioGroup.Root
          value={value()}
          onValueChange={(details) => setValue(details.value ?? undefined)}
        >
          <RadioGroup.Label>Paper</RadioGroup.Label>
          <For each={papers}>{item}</For>
        </RadioGroup.Root>
      </div>
    );
  },
};

/** Inked before the first look: a default rides in with the group. */
export const InitialValue = {
  render: () => <div style={{ "max-width": "20rem" }}>{paperGroup({ defaultValue: "Mian" })}</div>,
};

/** The row lies sideways: choices share a baseline. */
export const Orientation = {
  render: () => (
    <div style={{ "max-width": "24rem" }}>
      <RadioGroup.Root orientation="horizontal" defaultValue="Xuan">
        <RadioGroup.Label>Paper</RadioGroup.Label>
        <div style={{ display: "flex", gap: "1rem" }}>
          <For each={papers}>{item}</For>
        </div>
      </RadioGroup.Root>
    </div>
  ),
};

/** Inside a fieldset: the legend asks, the helper and error answer. */
export const WithFieldset = {
  render: () => (
    <Fieldset.Root invalid>
      <Fieldset.Legend>Select a paper</Fieldset.Legend>
      <div style={{ "max-width": "20rem" }}>{paperGroup()}</div>
      <Fieldset.HelperText>The sheet the type is pressed into</Fieldset.HelperText>
      <Fieldset.ErrorText>Choose a paper to continue</Fieldset.ErrorText>
    </Fieldset.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns it, and a
 * readout sits beside the group. */
export const RootProvider = {
  render: () => {
    const RadioDriver = () => {
      const radioGroup = useRadioGroup({ defaultValue: "Xuan" });
      return (
        <>
          <output
            style={{
              display: "block",
              "font-size": "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            value: {radioGroup().value ?? "none"}
          </output>
          <RadioGroup.RootProvider value={radioGroup}>
            <RadioGroup.Label>Paper</RadioGroup.Label>
            <For each={papers}>{item}</For>
          </RadioGroup.RootProvider>
        </>
      );
    };
    return <RadioDriver />;
  },
};
