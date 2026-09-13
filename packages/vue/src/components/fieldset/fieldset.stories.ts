import { createListCollection } from "@ark-ui/vue/select";
import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Fieldset } from ".";
import { Checkbox } from "../checkbox";
import { Field } from "../field";
import { Select } from "../select";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Fieldset" };
export default meta;

function checkGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": true,
    },
    [
      h("path", {
        d: "M4 8.5l2.5 2.5L12 5.5",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }),
    ],
  );
}

/** A serif legend heading a column of fields — the grouped form unit. */
export const Basic = {
  args: {
    legend: "Contact details",
    nameLabel: "Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email",
    emailPlaceholder: "john@example.com",
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Fieldset.Root, { disabled: args.disabled } as any, () => [
          h(Fieldset.Legend, () => args.legend),
          h(Field.Root, null, () => [
            h(Field.Label, () => args.nameLabel),
            h(Field.Input as any, { placeholder: args.namePlaceholder }),
          ]),
          h(Field.Root, null, () => [
            h(Field.Label, () => args.emailLabel),
            h(Field.Input as any, { type: "email", placeholder: args.emailPlaceholder }),
          ]),
        ]),
    ),
};

/** One attribute settles the whole column: every field inside rests
 * behind glass. */
export const Disabled = {
  render: () =>
    h(Fieldset.Root, { disabled: true }, () => [
      h(Fieldset.Legend, () => "Shipping address"),
      h(Fieldset.HelperText, () => "Your address cannot be changed after order confirmation."),
      h(Field.Root, null, () => [
        h(Field.Label, () => "Street"),
        h(Field.Input as any, { value: "123 Main St" }),
      ]),
      h(Field.Root, null, () => [
        h(Field.Label, () => "City"),
        h(Field.Input as any, { value: "San Francisco" }),
      ]),
    ]),
};

/** The group carries the failed state: the legend's hairline turns
 * cinnabar and the errors speak. */
export const Invalid = {
  render: () =>
    h(Fieldset.Root, { invalid: true }, () => [
      h(Fieldset.Legend, () => "Account information"),
      h(Fieldset.ErrorText, () => "Please fix the errors below to continue."),
      h(Field.Root, { invalid: true }, () => [
        h(Field.Label, () => "Username"),
        h(Field.Input as any, { value: "jo" }),
        h(Field.ErrorText, () => "Username must be at least 3 characters"),
      ]),
      h(Field.Root, { invalid: true }, () => [
        h(Field.Label, () => "Email"),
        h(Field.Input as any, { type: "email", value: "invalid-email" }),
        h(Field.ErrorText, () => "Please enter a valid email address"),
      ]),
    ]),
};

/** The legend doubles as a label: clicking it focuses the composed
 * select-and-input phone field. */
export const PhoneInput = {
  render: () => {
    const extensions = createListCollection({
      items: [
        { label: "+1", value: "+1" },
        { label: "+44", value: "+44" },
        { label: "+49", value: "+49" },
        { label: "+41", value: "+41" },
      ],
    });
    const inputEl = ref<{ $el: HTMLInputElement | null } | null>(null);
    const focusInput = () => setTimeout(() => inputEl.value?.$el?.focus());
    return h(Fieldset.Root, null, () => [
      h(Fieldset.Legend, { onClick: focusInput }, () => "Mobile number"),
      h("div", { style: { display: "flex", alignItems: "flex-start", gap: "0.5rem" } }, [
        h(Field.Root, null, () =>
          h(
            Select.Root,
            {
              collection: extensions,
              defaultValue: ["+1"],
              onValueChange: focusInput,
            } as any,
            () => [
              h(Select.Control, () => [
                h(Select.Trigger, () => h(Select.ValueText, { placeholder: "+" })),
                h(Select.Indicator, () => "▾"),
              ]),
              h(Select.Positioner, () =>
                h(Select.Content, () =>
                  extensions.items.map((item) =>
                    h(Select.Item, { key: item.value, item }, () => [
                      h(Select.ItemText, () => item.label),
                    ]),
                  ),
                ),
              ),
              h(Select.HiddenSelect),
            ],
          ),
        ),
        h(Field.Root, null, () =>
          h(Field.Input as any, {
            ref: inputEl,
            type: "tel",
            "aria-label": "Number",
            placeholder: "555-0123",
          }),
        ),
      ]),
    ]);
  },
};

/** Preferences are checkboxes under the same legend — one unit, one
 * submit. */
export const WithCheckbox = {
  render: () =>
    h(Fieldset.Root, null, () => [
      h(Fieldset.Legend, () => "Email preferences"),
      h(Checkbox.Root, { defaultChecked: true }, () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Product updates"),
        h(Checkbox.HiddenInput),
      ]),
      h(Checkbox.Root, null, () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Marketing emails"),
        h(Checkbox.HiddenInput),
      ]),
    ]),
};
