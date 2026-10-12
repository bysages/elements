import { useSwitch } from "@ark-ui/solid/switch";
import { createSignal } from "solid-js";

import { Switch } from ".";
import { Field } from "../field";

const meta = { title: "Components/Forms/Switch", component: Switch };
export default meta;

function control() {
  return (
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
  );
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
      <Switch defaultValue={true} label="Dissolve overlays" />
      <Switch label="Show hairlines" />
      <Switch defaultValue={true} label="Reduced motion" disabled />
    </div>
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
      <Switch.Root defaultChecked>
        {control()}
        <Switch.Label>Dissolve overlays</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
      <Switch.Root>
        {control()}
        <Switch.Label>Show hairlines</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
  ),
};

/** The caller owns the state — the track only mirrors it. */
export const Controlled = {
  render: () => {
    const [checked, setChecked] = createSignal(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
        <output
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          checked: {String(checked())}
        </output>
        <Switch.Root checked={checked()} onCheckedChange={(details) => setChecked(details.checked)}>
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
    <Switch.Root style={{ "max-width": "20rem" }}>
      {control()}
      <Switch.Context>
        {(context) => (
          <Switch.Label>Overlays are {context().checked ? "dissolving" : "sharp"}</Switch.Label>
        )}
      </Switch.Context>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
};

/** A switch retired from service: muted track, no shadow, no pointer. */
export const Disabled = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
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
export const RootProvider = {
  render: () => {
    const SwitchDriver = () => {
      const sw = useSwitch({ defaultChecked: true });
      return (
        <>
          <output
            style={{
              display: "block",
              "font-size": "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            checked: {String(sw().checked)}
          </output>
          <Switch.RootProvider value={sw}>
            {control()}
            <Switch.Label>Ink bleed</Switch.Label>
            <Switch.HiddenInput />
          </Switch.RootProvider>
        </>
      );
    };
    return <SwitchDriver />;
  },
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
