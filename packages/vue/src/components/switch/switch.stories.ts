import { useSwitch } from "@ark-ui/vue/switch";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Field } from "../field/index.js";
import { withState } from "../with-state.js";
import { Switch } from "./index.js";

const meta: Meta = { title: "Components / Switch" };
export default meta;

function control() {
  return h(Switch.Control, () => h(Switch.Thumb));
}

/** The track rests in the paper's shade and fills flat with ink when on. */
export const Basic = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "20rem" } }, [
      h(Switch.Root, { defaultChecked: true }, () => [
        control(),
        h(Switch.Label, () => "Dissolve overlays"),
        h(Switch.HiddenInput),
      ]),
      h(Switch.Root, () => [
        control(),
        h(Switch.Label, () => "Show hairlines"),
        h(Switch.HiddenInput),
      ]),
      h(Switch.Root, { defaultChecked: true, disabled: true }, () => [
        control(),
        h(Switch.Label, () => "Reduced motion"),
        h(Switch.HiddenInput),
      ]),
    ]),
};

/** The caller owns the state — the track only mirrors it. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ checked: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "20rem" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `checked: ${state.checked}`,
          ),
          h(
            Switch.Root,
            {
              checked: state.checked,
              onCheckedChange: (e: { checked: boolean }) => (state.checked = e.checked),
            } as any,
            () => [control(), h(Switch.Label, () => "Bleed ink on press"), h(Switch.HiddenInput)],
          ),
        ]);
    }),
};

/** The track reads its own state: the label names what the switch does. */
export const Context = {
  render: () =>
    h(Switch.Root, { style: { maxWidth: "20rem" } }, () => [
      control(),
      h(Switch.Context as any, null, {
        default: (ctx: { checked: boolean }) =>
          h(Switch.Label, () => `Overlays are ${ctx.checked ? "dissolving" : "sharp"}`),
      }),
      h(Switch.HiddenInput),
    ]),
};

/** A switch retired from service: muted track, no shadow, no pointer. */
export const Disabled = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "20rem" } }, [
      h(Switch.Root, { disabled: true }, () => [
        control(),
        h(Switch.Label, () => "Letterpress debossing"),
        h(Switch.HiddenInput),
      ]),
      h(Switch.Root, { defaultChecked: true, disabled: true }, () => [
        control(),
        h(Switch.Label, () => "Foil stamping"),
        h(Switch.HiddenInput),
      ]),
    ]),
};

/** Born on: the initial state reads checked without a caller. */
export const InitialChecked = {
  render: () =>
    h(Switch.Root, { defaultChecked: true }, () => [
      control(),
      h(Switch.Label, () => "Ragged margins"),
      h(Switch.HiddenInput),
    ]),
};

/** The machine answers outside its anatomy: the provider owns it, and a
 * readout sits beside the switch. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "SwitchRootProvider",
      setup() {
        const sw = useSwitch({ defaultChecked: true });
        return () => [
          h(
            "output",
            {
              style: {
                display: "block",
                fontSize: "var(--bs-font-size-sm)",
                marginBottom: "0.5rem",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `checked: ${sw.value.checked}`,
          ),
          h(Switch.RootProvider as any, { value: sw.value }, () => [
            control(),
            h(Switch.Label, () => "Ink bleed"),
            h(Switch.HiddenInput),
          ]),
        ];
      },
    };
    return () => h(Driver);
  },
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () =>
    h(Field.Root, { invalid: true } as any, () => [
      h(Switch.Root, () => [
        control(),
        h(Switch.Label, () => "Print run numbering"),
        h(Switch.HiddenInput),
      ]),
      h(Field.HelperText, () => "Numbers each copy in the run"),
      h(Field.ErrorText, () => "Numbering requires a print run"),
    ]),
};
