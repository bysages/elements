import { useRadioGroup } from "@ark-ui/react/radio-group";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { RadioGroup } from ".";
import { Fieldset } from "../fieldset";

const meta: Meta = { title: "Components/Forms/Radio Group" };
export default meta;

const papers = ["Xuan", "Doushu", "Mian"];

function item(paper: string) {
  return (
    <RadioGroup.Item key={paper} value={paper}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{paper}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  );
}

function paperGroup(extraProps: Record<string, any> = {}, label = "Paper") {
  return (
    <RadioGroup.Root {...extraProps}>
      <RadioGroup.Label>{label}</RadioGroup.Label>
      {papers.map(item)}
    </RadioGroup.Root>
  );
}

/** A column of full-circle seals; the chosen one fills flat with ink. */
export const Basic = {
  args: {
    label: "Paper",
    disabled: false,
  },
  render: (args: any) => (
    <div style={{ maxWidth: "20rem" }}>
      {paperGroup({ defaultValue: "Doushu", disabled: args.disabled }, args.label)}
    </div>
  ),
};

/** Retired choices: the seals mute, no ink, no pointer. */
export const Disabled = {
  render: () => (
    <div style={{ maxWidth: "20rem" }}>
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
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          {`value: ${value ?? "none"}`}
        </output>
        <RadioGroup.Root
          value={value}
          onValueChange={(e: { value: string | null }) => setValue(e.value)}
        >
          <RadioGroup.Label>Paper</RadioGroup.Label>
          {papers.map(item)}
        </RadioGroup.Root>
      </div>
    );
  },
};

/** Inked before the first look: a default rides in with the group. */
export const InitialValue = {
  render: () => <div style={{ maxWidth: "20rem" }}>{paperGroup({ defaultValue: "Mian" })}</div>,
};

/** The row lies sideways: choices share a baseline. */
export const Orientation = {
  render: () => (
    <div style={{ maxWidth: "24rem" }}>
      <RadioGroup.Root orientation="horizontal" defaultValue="Xuan">
        <RadioGroup.Label>Paper</RadioGroup.Label>
        <div style={{ display: "flex", gap: "1rem" }}>{papers.map(item)}</div>
      </RadioGroup.Root>
    </div>
  ),
};

/** Inside a fieldset: the legend asks, the helper and error answer. */
export const WithFieldset = {
  render: () => (
    <Fieldset.Root invalid>
      <Fieldset.Legend>Select a paper</Fieldset.Legend>
      <div style={{ maxWidth: "20rem" }}>{paperGroup()}</div>
      <Fieldset.HelperText>The sheet the type is pressed into</Fieldset.HelperText>
      <Fieldset.ErrorText>Choose a paper to continue</Fieldset.ErrorText>
    </Fieldset.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns it, and a
 * readout sits beside the group. */
export const RootProvider = {
  render: () => {
    const radioGroup = useRadioGroup({ defaultValue: "Xuan" });
    return (
      <>
        <output
          style={{
            display: "block",
            fontSize: "var(--bs-font-size-sm)",
            marginBottom: "0.5rem",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          {`value: ${radioGroup.value ?? "none"}`}
        </output>
        <RadioGroup.RootProvider value={radioGroup}>
          <RadioGroup.Label>Paper</RadioGroup.Label>
          {papers.map(item)}
        </RadioGroup.RootProvider>
      </>
    );
  },
};
