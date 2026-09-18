import { useSwitch } from "@ark-ui/react/switch";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Switch } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Switch" };
export default meta;

function control() {
  return (
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
  );
}

/** The track rests in the paper's shade and fills flat with ink when on. */
export const Basic = {
  args: {
    overlaysLabel: "Dissolve overlays",
    hairlinesLabel: "Show hairlines",
    motionLabel: "Reduced motion",
  },
  render: (args: any) => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      <Switch.Root defaultChecked>
        {control()}
        <Switch.Label>{args.overlaysLabel}</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
      <Switch.Root>
        {control()}
        <Switch.Label>{args.hairlinesLabel}</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
      <Switch.Root defaultChecked disabled>
        {control()}
        <Switch.Label>{args.motionLabel}</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
  ),
};

/** The caller owns the state — the track only mirrors it. */
export const Controlled = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          checked: {String(checked)}
        </output>
        <Switch.Root
          checked={checked}
          onCheckedChange={(e: { checked: boolean }) => setChecked(e.checked)}
        >
          {control()}
          <Switch.Label>Bleed ink on press</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Root>
      </div>
    );
  },
};

/** The track reads its own state: the label names what the switch does. */
export const Context = {
  render: () => (
    <Switch.Root style={{ maxWidth: "20rem" }}>
      {control()}
      <Switch.Context>
        {(ctx: { checked: boolean }) => (
          <Switch.Label>Overlays are {ctx.checked ? "dissolving" : "sharp"}</Switch.Label>
        )}
      </Switch.Context>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
};

/** A switch retired from service: muted track, no shadow, no pointer. */
export const Disabled = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      <Switch.Root disabled>
        {control()}
        <Switch.Label>Letterpress debossing</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
      <Switch.Root defaultChecked disabled>
        {control()}
        <Switch.Label>Foil stamping</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
  ),
};

/** Born on: the initial state reads checked without a caller. */
export const InitialChecked = {
  render: () => (
    <Switch.Root defaultChecked>
      {control()}
      <Switch.Label>Ragged margins</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns it, and a
 * readout sits beside the switch. */
function RootProviderDriver() {
  const sw = useSwitch({ defaultChecked: true });
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
        checked: {String(sw.checked)}
      </output>
      <Switch.RootProvider value={sw}>
        {control()}
        <Switch.Label>Ink bleed</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
    </>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () => (
    <Field.Root invalid>
      <Switch.Root>
        {control()}
        <Switch.Label>Print run numbering</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
      <Field.HelperText>Numbers each copy in the run</Field.HelperText>
      <Field.ErrorText>Numbering requires a print run</Field.ErrorText>
    </Field.Root>
  ),
};
