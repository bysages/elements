import { useDateInput } from "@ark-ui/vue/date-input";
import { parseDate } from "@ark-ui/vue/date-picker";
import { LocaleProvider } from "@ark-ui/vue/locale";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { DateInput } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Date Input" };
export default meta;

function segments() {
  return h(DateInput.SegmentContext, null, {
    default: (segment: any) => h(DateInput.Segment, { segment }),
  });
}

/** The shared anatomy: labelled segmented field with its hidden form
 * input. */
function field(rootProps: any, label: string, extra: any[] = []) {
  return h(DateInput.Root, rootProps, () => [
    h(DateInput.Label, () => label),
    h(DateInput.Control, () => h(DateInput.SegmentGroup, () => segments())),
    ...extra,
    h(DateInput.HiddenInput),
  ]);
}

/** Segmented typing — each part of the date is its own arrow-navigable
 * segment; the focused segment takes the ink. */
export const Basic = {
  args: {
    label: "Date of birth",
  },
  render: (args: any) => withState(() => () => field({}, args.label)),
};

/** The field arrives already written: June fifteenth, resting in its
 * segments. */
export const DefaultValue = {
  render: () => field({ defaultValue: [parseDate("2024-06-15")] } as any, "Date"),
};

/** The value answers to the caller — the segments only mirror. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: [parseDate("2024-06-15")] });
      return () =>
        field(
          {
            modelValue: state.value,
            onValueChange: (e: { value: any }) => (state.value = e.value),
          } as any,
          "Date",
        );
    }),
};

/** The whole field rests behind glass: segments will not answer. */
export const Disabled = {
  render: () => field({ disabled: true, defaultValue: [parseDate("2024-06-15")] } as any, "Date"),
};

/** A plaque rather than a field: the date reads, but does not change. */
export const ReadOnly = {
  render: () => field({ readOnly: true, defaultValue: [parseDate("2024-06-15")] } as any, "Date"),
};

/** The failed state: the hairline turns cinnabar until the value is
 * righted. */
export const Invalid = {
  render: () => field({ invalid: true } as any, "Date"),
};

/** The ruler: only 2024 counts — anything outside is refused. */
export const MinMax = {
  render: () =>
    field(
      { min: parseDate("2024-01-01"), max: parseDate("2024-12-31") } as any,
      "Date (2024 only)",
    ),
};

/** Finer grain: the field grows hour, minute, and second segments. */
export const Granularity = {
  render: () => field({ granularity: "second" } as any, "Date & time"),
};

/** Time only — the same field, hours to seconds, no calendar date. */
export const TimeOnly = {
  render: () => field({ granularity: "second" } as any, "Departure time"),
};

/** A range takes two segment groups: the arrow between them marks the
 * span. */
export const Range = {
  render: () =>
    h(DateInput.Root, { selectionMode: "range" } as any, () => [
      h(DateInput.Label, () => "Date range"),
      h(DateInput.Control, () => [
        h(DateInput.SegmentGroup, { index: 0 }, () => segments()),
        h("span", { style: { color: "var(--bs-color-text-tertiary)" } }, () => "→"),
        h(DateInput.SegmentGroup, { index: 1 }, () => segments()),
      ]),
      h(DateInput.HiddenInput, { index: 0 }),
      h(DateInput.HiddenInput, { index: 1 }),
    ]),
};

/** French conventions: day first, a twenty-four hour clock, and the
 * segments follow. */
export const Localized = {
  render: () =>
    h(LocaleProvider, { locale: "fr-FR" }, () =>
      field({ granularity: "minute", hourCycle: 24 } as any, "Date et heure"),
    ),
};

/** Right-to-left: an Arabic locale with the field mirrored. */
export const RTL = {
  render: () =>
    h(LocaleProvider, { locale: "ar-SA" }, () =>
      h(DateInput.Root, { dir: "rtl" } as any, () => [
        h(DateInput.Label, () => "التاريخ"),
        h(DateInput.Control, () => h(DateInput.SegmentGroup, () => segments())),
        h(DateInput.HiddenInput),
      ]),
    ),
};

/** A checkbox flips zero padding on and off — the fifth stays 05 or
 * becomes 5. */
export const LeadingZeros = {
  render: () =>
    withState(() => {
      const state = reactive({ zeros: true });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "label",
            {
              style: {
                display: "flex",
                gap: "0.375rem",
                alignItems: "center",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            [
              h("input", {
                type: "checkbox",
                checked: state.zeros,
                onChange: (e: Event) => (state.zeros = (e.target as HTMLInputElement).checked),
              }),
              "Force leading zeros",
            ],
          ),
          field(
            {
              defaultValue: [parseDate("2024-06-05")],
              shouldForceLeadingZeros: state.zeros,
            } as any,
            "Date",
          ),
        ]);
    }),
};

/** The api is reachable outside the field: a clear button wipes the
 * segments through the context. */
export const WithClearButton = {
  render: () => {
    const dateInput = useDateInput();
    return h(DateInput.RootProvider, { value: dateInput.value } as any, () => [
      h(DateInput.Label, () => "Date"),
      h(DateInput.Control, () => [
        h(DateInput.SegmentGroup, () => segments()),
        h(
          "button",
          {
            type: "button",
            "aria-label": "Clear date",
            onClick: () => dateInput.value.clearValue(),
            style: {
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.25rem 0.5rem",
              font: "inherit",
              cursor: "pointer",
            },
          },
          "Clear",
        ),
      ]),
      h(DateInput.HiddenInput),
    ]);
  },
};
