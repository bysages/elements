import { useRadioGroup } from "@ark-ui/vue/radio-group";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { RadioGroup } from ".";
import { Fieldset } from "../fieldset";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Radio Group" };
export default meta;

const papers = ["Xuan", "Doushu", "Mian"];

function item(paper: string) {
  return h(RadioGroup.Item, { key: paper, value: paper }, () => [
    h(RadioGroup.ItemControl),
    h(RadioGroup.ItemText, () => paper),
    h(RadioGroup.ItemHiddenInput),
  ]);
}

function paperGroup(extraProps: Record<string, any> = {}, label = "Paper") {
  return h(RadioGroup.Root, extraProps, () => [
    h(RadioGroup.Label, () => label),
    ...papers.map(item),
  ]);
}

/** A column of full-circle seals; the chosen one fills flat with ink. */
export const Basic = {
  args: {
    label: "Paper",
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h("div", { style: { maxWidth: "20rem" } }, [
          paperGroup({ defaultValue: "Doushu", disabled: args.disabled }, args.label),
        ]),
    ),
};

/** Retired choices: the seals mute, no ink, no pointer. */
export const Disabled = {
  render: () =>
    h("div", { style: { maxWidth: "20rem" } }, [
      h(RadioGroup.Root, { defaultValue: "Cinnabar", disabled: true }, () => [
        h(RadioGroup.Label, () => "Sealed away"),
        item("Cinnabar"),
        item("Ultramarine"),
      ]),
    ]),
};

/** The caller owns the choice — the group only mirrors it. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: null as string | null });
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
            () => `value: ${state.value ?? "none"}`,
          ),
          h(
            RadioGroup.Root,
            {
              modelValue: state.value,
              onValueChange: (e: { value: string | null }) => (state.value = e.value),
            } as any,
            () => [h(RadioGroup.Label, () => "Paper"), ...papers.map(item)],
          ),
        ]);
    }),
};

/** Inked before the first look: a default rides in with the group. */
export const InitialValue = {
  render: () => h("div", { style: { maxWidth: "20rem" } }, [paperGroup({ defaultValue: "Mian" })]),
};

/** The row lies sideways: choices share a baseline. */
export const Orientation = {
  render: () =>
    h("div", { style: { maxWidth: "24rem" } }, [
      h(RadioGroup.Root, { orientation: "horizontal", defaultValue: "Xuan" }, () => [
        h(RadioGroup.Label, () => "Paper"),
        h("div", { style: { display: "flex", gap: "1rem" } }, papers.map(item)),
      ]),
    ]),
};

/** Inside a fieldset: the legend asks, the helper and error answer. */
export const WithFieldset = {
  render: () =>
    h(Fieldset.Root, { invalid: true } as any, () => [
      h(Fieldset.Legend, () => "Select a paper"),
      h("div", { style: { maxWidth: "20rem" } }, [paperGroup()]),
      h(Fieldset.HelperText, () => "The sheet the type is pressed into"),
      h(Fieldset.ErrorText, () => "Choose a paper to continue"),
    ]),
};

/** The machine answers outside its anatomy: the provider owns it, and a
 * readout sits beside the group. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "RadioGroupRootProvider",
      setup() {
        const radioGroup = useRadioGroup({ defaultValue: "Xuan" });
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
            () => `value: ${radioGroup.value.value ?? "none"}`,
          ),
          h(RadioGroup.RootProvider as any, { value: radioGroup.value }, () => [
            h(RadioGroup.Label, () => "Paper"),
            ...papers.map(item),
          ]),
        ];
      },
    };
    return () => h(Driver);
  },
};
