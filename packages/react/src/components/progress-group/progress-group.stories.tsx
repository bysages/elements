import type { Meta } from "@storybook/react-vite";

import { ProgressGroup } from ".";

const meta: Meta = { title: "Components/Feedback/Progress Group" };
export default meta;

/** The house's ledger at a glance: each segment its own pigment, the
 * legend reading them back beneath. */
export const Basic = {
  render: () => (
    <ProgressGroup
      segments={[
        { value: 42, label: "Shelved", pigment: "primary" },
        { value: 28, label: "Catalogued", pigment: "info" },
        { value: 18, label: "Awaiting seal", pigment: "warning" },
        { value: 12, label: "Deferred", pigment: "danger" },
      ]}
    />
  ),
};

/** Without the legend the bar keeps only its segments — the caller
 * tells the story in their own words beside it. */
export const BarOnly = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxInlineSize: "24rem" }}>
      <ProgressGroup
        showLegend={false}
        segments={[
          { value: 60, pigment: "success" },
          { value: 30, pigment: "warning" },
          { value: 10, pigment: "danger" },
        ]}
      />
      <span
        style={{
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-tertiary)",
        }}
      >
        Six in ten entries pass the first reading.
      </span>
    </div>
  ),
};

/** A larger whole leaves the remainder as groove: the bar shows how
 * much of the shelf is still unaccounted for. */
export const PartialWhole = {
  render: () => (
    <ProgressGroup
      max={200}
      segments={[
        { value: 64, label: "Bound", pigment: "success" },
        { value: 48, label: "In press", pigment: "info" },
      ]}
    />
  ),
};
