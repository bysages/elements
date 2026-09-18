import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { NumberInput } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Number Input" };
export default meta;

function chevron(dir: "up" | "down") {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      {dir === "up" ? <path d="m6 15 6-6 6 6" /> : <path d="m6 9 6 6 6-6" />}
    </svg>
  );
}

function gripGlyph() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M8 5v14M16 5v14" />
    </svg>
  );
}

/** A quiet number control: scrubber grip on the inline start, stepper
 * triggers on the end. */
function control(rootProps: any, label: string, extra: React.ReactNode[] = []) {
  return (
    <NumberInput.Root {...rootProps}>
      <NumberInput.Label>{label}</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Input />
        <NumberInput.Scrubber>{gripGlyph()}</NumberInput.Scrubber>
        <NumberInput.IncrementTrigger aria-label="Increment">
          {chevron("up")}
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger aria-label="Decrement">
          {chevron("down")}
        </NumberInput.DecrementTrigger>
        {extra}
      </NumberInput.Control>
    </NumberInput.Root>
  );
}

export const Basic = {
  args: {
    label: "Quantity",
    min: 0,
    max: 100,
    disabled: false,
  },
  render: (args: any) =>
    control(
      { defaultValue: "42", min: args.min, max: args.max, disabled: args.disabled },
      args.label,
    ),
};

/** Format options ink the value as it rests: here a USD currency. */
export const Formatting = {
  render: () =>
    control(
      { defaultValue: "25", formatOptions: { style: "currency", currency: "USD" } } as any,
      "Price",
    ),
};

/** Fraction digits hold their place: two at rest, up to three while
 * typing. */
export const FractionDigits = {
  render: () =>
    control(
      {
        defaultValue: "1.00",
        formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 3 },
      } as any,
      "Precision",
    ),
};

/** The value clamps to the ruler: zero through ten, no further. */
export const MinMax = {
  render: () => control({ defaultValue: "5", min: 0, max: 10 }, "Steps"),
};

/** Focus the field and the wheel steps the value — the scrubber's
 * companion gesture. */
export const MouseWheel = {
  render: () => control({ defaultValue: "12", allowMouseWheel: true } as any, "Weight"),
};

/** Drag the grip sideways to scrub the value — no keyboard, no
 * triggers. */
export const Scrubber = {
  render: () => (
    <NumberInput.Root defaultValue="32">
      <NumberInput.Label>Drag me</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Scrubber aria-label="Scrub value">{gripGlyph()}</NumberInput.Scrubber>
        <NumberInput.Input />
        <NumberInput.IncrementTrigger aria-label="Increment">
          {chevron("up")}
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger aria-label="Decrement">
          {chevron("down")}
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
  ),
};

/** The live value is readable beside the field — the machine's own
 * text, not a re-format. */
export const ValueText = {
  render: () =>
    control({ defaultValue: "8" }, "Pickles", [
      <NumberInput.ValueText
        key="value-text"
        style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" }}
      />,
    ]),
};

/** A number input inside a field: helper and error text ride along. */
export const WithField = {
  render: () => (
    <Field.Root>
      {control({ defaultValue: "3", min: 1, max: 10 }, "Guests")}
      <Field.HelperText>Up to ten guests per booking.</Field.HelperText>
      <Field.ErrorText>Choose between 1 and 10.</Field.ErrorText>
    </Field.Root>
  ),
};

/** The value answers to the caller — the field only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("10");
    return (
      <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
        {control(
          {
            value,
            min: 0,
            max: 100,
            onValueChange: (e: { value: string }) => setValue(e.value),
          } as any,
          "Controlled",
        )}
        <p style={{ margin: 0, fontSize: "var(--bs-font-size-sm)" }}>Value: {value}</p>
      </div>
    );
  },
};
