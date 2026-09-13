import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Field } from "../field/index.js";
import { withState } from "../with-state.js";
import { NumberInput } from "./index.js";

const meta: Meta = { title: "Components / Number Input" };
export default meta;

function chevron(dir: "up" | "down") {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [dir === "up" ? h("path", { d: "m6 15 6-6 6 6" }) : h("path", { d: "m6 9 6 6 6-6" })],
  );
}

function gripGlyph() {
  return h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M8 5v14M16 5v14" })],
  );
}

/** A quiet number control: scrubber grip on the inline start, stepper
 * triggers on the end. */
function control(rootProps: any, label: string, extra: any[] = []) {
  return h(NumberInput.Root, rootProps, () => [
    h(NumberInput.Label, () => label),
    h(NumberInput.Control, () => [
      h(NumberInput.Input as any),
      h(NumberInput.Scrubber, () => gripGlyph()),
      h(NumberInput.IncrementTrigger, { "aria-label": "Increment" }, () => chevron("up")),
      h(NumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () => chevron("down")),
      ...extra,
    ]),
  ]);
}

export const Basic = {
  args: {
    label: "Quantity",
    min: 0,
    max: 100,
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        control(
          { defaultValue: "42", min: args.min, max: args.max, disabled: args.disabled },
          args.label,
        ),
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
  render: () =>
    h(NumberInput.Root, { defaultValue: "32" }, () => [
      h(NumberInput.Label, () => "Drag me"),
      h(NumberInput.Control, () => [
        h(NumberInput.Scrubber, { "aria-label": "Scrub value" }, () => gripGlyph()),
        h(NumberInput.Input as any),
        h(NumberInput.IncrementTrigger, { "aria-label": "Increment" }, () => chevron("up")),
        h(NumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () => chevron("down")),
      ]),
    ]),
};

/** The live value is readable beside the field — the machine's own
 * text, not a re-format. */
export const ValueText = {
  render: () =>
    control({ defaultValue: "8" }, "Pickles", [
      h(NumberInput.ValueText, {
        style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" },
      }),
    ]),
};

/** A number input inside a field: helper and error text ride along. */
export const WithField = {
  render: () =>
    h(Field.Root, () => [
      control({ defaultValue: "3", min: 1, max: 10 }, "Guests"),
      h(Field.HelperText, () => "Up to ten guests per booking."),
      h(Field.ErrorText, () => "Choose between 1 and 10."),
    ]),
};

/** The value answers to the caller — the field only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "10" });
      return () =>
        h("div", { style: { display: "grid", gap: "0.5rem", justifyItems: "start" } }, [
          control(
            {
              modelValue: state.value,
              min: 0,
              max: 100,
              onValueChange: (e: { value: string }) => (state.value = e.value),
            } as any,
            "Controlled",
          ),
          h(
            "p",
            { style: { margin: 0, fontSize: "var(--bs-font-size-sm)" } },
            () => `Value: ${state.value}`,
          ),
        ]);
    }),
};
