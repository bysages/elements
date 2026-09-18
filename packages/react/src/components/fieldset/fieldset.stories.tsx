import { createListCollection } from "@ark-ui/react/select";
import type { Meta } from "@storybook/react-vite";
import { useRef } from "react";

import { Fieldset } from ".";
import { Checkbox } from "../checkbox";
import { Field } from "../field";
import { Select } from "../select";

const meta: Meta = { title: "Components/Forms/Fieldset" };
export default meta;

const checkGlyph = (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 8.5l2.5 2.5L12 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  render: (args: any) => (
    <Fieldset.Root disabled={args.disabled}>
      <Fieldset.Legend>{args.legend}</Fieldset.Legend>
      <Field.Root>
        <Field.Label>{args.nameLabel}</Field.Label>
        <Field.Input placeholder={args.namePlaceholder} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{args.emailLabel}</Field.Label>
        <Field.Input type="email" placeholder={args.emailPlaceholder} />
      </Field.Root>
    </Fieldset.Root>
  ),
};

/** One attribute settles the whole column: every field inside rests
 * behind glass. */
export const Disabled = {
  render: () => (
    <Fieldset.Root disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <Fieldset.HelperText>
        Your address cannot be changed after order confirmation.
      </Fieldset.HelperText>
      <Field.Root>
        <Field.Label>Street</Field.Label>
        <Field.Input defaultValue="123 Main St" />
      </Field.Root>
      <Field.Root>
        <Field.Label>City</Field.Label>
        <Field.Input defaultValue="San Francisco" />
      </Field.Root>
    </Fieldset.Root>
  ),
};

/** The group carries the failed state: the legend's hairline turns
 * cinnabar and the errors speak. */
export const Invalid = {
  render: () => (
    <Fieldset.Root invalid>
      <Fieldset.Legend>Account information</Fieldset.Legend>
      <Fieldset.ErrorText>Please fix the errors below to continue.</Fieldset.ErrorText>
      <Field.Root invalid>
        <Field.Label>Username</Field.Label>
        <Field.Input defaultValue="jo" />
        <Field.ErrorText>Username must be at least 3 characters</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-email" />
        <Field.ErrorText>Please enter a valid email address</Field.ErrorText>
      </Field.Root>
    </Fieldset.Root>
  ),
};

/** The legend doubles as a label: clicking it focuses the composed
 * select-and-input phone field. */
const extensions = createListCollection({
  items: [
    { label: "+1", value: "+1" },
    { label: "+44", value: "+44" },
    { label: "+49", value: "+49" },
    { label: "+41", value: "+41" },
  ],
});

export const PhoneInput = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => setTimeout(() => inputRef.current?.focus());
    return (
      <Fieldset.Root>
        <Fieldset.Legend onClick={focusInput}>Mobile number</Fieldset.Legend>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
          <Field.Root>
            <Select.Root collection={extensions} defaultValue={["+1"]} onValueChange={focusInput}>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="+" />
                </Select.Trigger>
                <Select.Indicator>▾</Select.Indicator>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {extensions.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
              <Select.HiddenSelect />
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <Field.Input ref={inputRef} type="tel" aria-label="Number" placeholder="555-0123" />
          </Field.Root>
        </div>
      </Fieldset.Root>
    );
  },
};

/** Preferences are checkboxes under the same legend — one unit, one
 * submit. */
export const WithCheckbox = {
  render: () => (
    <Fieldset.Root>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      <Checkbox.Root defaultChecked>
        <Checkbox.Control>
          <Checkbox.Indicator>{checkGlyph}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Product updates</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Checkbox.Root>
        <Checkbox.Control>
          <Checkbox.Indicator>{checkGlyph}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Marketing emails</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Fieldset.Root>
  ),
};
