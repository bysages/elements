import { useDateInput } from "@ark-ui/react/date-input";
import { parseDate } from "@ark-ui/react/date-picker";
import { LocaleProvider } from "@ark-ui/react/locale";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { DateInput } from ".";

const meta: Meta = { title: "Components/Forms/Date Input" };
export default meta;

function segments() {
  return (
    <DateInput.SegmentContext>
      {(segment) => <DateInput.Segment segment={segment} />}
    </DateInput.SegmentContext>
  );
}

/** The shared anatomy: labelled segmented field with its hidden form
 * input. */
function field(rootProps: any, label: string, extra: ReactNode[] = []) {
  return (
    <DateInput.Root {...rootProps}>
      <DateInput.Label>{label}</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>{segments()}</DateInput.SegmentGroup>
      </DateInput.Control>
      {extra}
      <DateInput.HiddenInput />
    </DateInput.Root>
  );
}

/** Segmented typing — each part of the date is its own arrow-navigable
 * segment; the focused segment takes the ink. */
export const Basic = {
  args: {
    label: "Date of birth",
  },
  render: (args: any) => field({}, args.label),
};

/** The field arrives already written: June fifteenth, resting in its
 * segments. */
export const DefaultValue = {
  render: () => field({ defaultValue: [parseDate("2024-06-15")] }, "Date"),
};

/** The value answers to the caller — the segments only mirror. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState([parseDate("2024-06-15")]);
    return field({ value, onValueChange: (e: any) => setValue(e.value) }, "Date");
  },
};

/** The whole field rests behind glass: segments will not answer. */
export const Disabled = {
  render: () => field({ disabled: true, defaultValue: [parseDate("2024-06-15")] }, "Date"),
};

/** A plaque rather than a field: the date reads, but does not change. */
export const ReadOnly = {
  render: () => field({ readOnly: true, defaultValue: [parseDate("2024-06-15")] }, "Date"),
};

/** The failed state: the hairline turns cinnabar until the value is
 * righted. */
export const Invalid = {
  render: () => field({ invalid: true }, "Date"),
};

/** The ruler: only 2024 counts — anything outside is refused. */
export const MinMax = {
  render: () =>
    field({ min: parseDate("2024-01-01"), max: parseDate("2024-12-31") }, "Date (2024 only)"),
};

/** Finer grain: the field grows hour, minute, and second segments. */
export const Granularity = {
  render: () => field({ granularity: "second" }, "Date & time"),
};

/** Time only — the same field, hours to seconds, no calendar date. */
export function TimeOnly() {
  return (
    <DateInput.Root granularity="second">
      <DateInput.Label>Departure time</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  );
}

/** A range takes two segment groups: the arrow between them marks the
 * span. */
export const Range = {
  render: () => (
    <DateInput.Root selectionMode="range">
      <DateInput.Label>Date range</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup index={0}>{segments()}</DateInput.SegmentGroup>
        <span style={{ color: "var(--bs-color-text-tertiary)" }}>→</span>
        <DateInput.SegmentGroup index={1}>{segments()}</DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput index={0} />
      <DateInput.HiddenInput index={1} />
    </DateInput.Root>
  ),
};

/** French conventions: day first, a twenty-four hour clock, and the
 * segments follow. */
export const Localized = {
  render: () => (
    <LocaleProvider locale="fr-FR">
      {field({ granularity: "minute", hourCycle: 24 }, "Date et heure")}
    </LocaleProvider>
  ),
};

/** Right-to-left: an Arabic locale with the field mirrored. */
export const RTL = {
  render: () => (
    <LocaleProvider locale="ar-SA">
      <DateInput.Root dir="rtl">
        <DateInput.Label>التاريخ</DateInput.Label>
        <DateInput.Control>
          <DateInput.SegmentGroup>{segments()}</DateInput.SegmentGroup>
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </LocaleProvider>
  ),
};

/** A checkbox flips zero padding on and off — the fifth stays 05 or
 * becomes 5. */
export const LeadingZeros = {
  render: () => {
    const [zeros, setZeros] = useState(true);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <label
          style={{
            display: "flex",
            gap: "0.375rem",
            alignItems: "center",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          <input type="checkbox" checked={zeros} onChange={(e) => setZeros(e.target.checked)} />
          Force leading zeros
        </label>
        {field(
          {
            defaultValue: [parseDate("2024-06-05")],
            shouldForceLeadingZeros: zeros,
          },
          "Date",
        )}
      </div>
    );
  },
};

/** The api is reachable outside the field: a clear button wipes the
 * segments through the context. */
function ClearButtonDriver() {
  const dateInput = useDateInput();
  return (
    <DateInput.RootProvider value={dateInput}>
      <DateInput.Label>Date</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>{segments()}</DateInput.SegmentGroup>
        <button
          type="button"
          aria-label="Clear date"
          onClick={() => dateInput.clearValue()}
          style={{
            border: "1px solid var(--bs-color-border)",
            background: "var(--bs-color-surface-2)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.5rem",
            font: "inherit",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  );
}

export const WithClearButton = {
  render: () => <ClearButtonDriver />,
};
