import { LocaleProvider } from "@ark-ui/react/locale";
import type { Meta } from "@storybook/react-vite";

import { Format as BSFormat } from ".";

const meta: Meta = { title: "Components/Elements/Format" };
export default meta;

/** Format renders bare text — the label/value row is the story's own
 * typesetting, not the component's. */
function row(label: string, value: React.ReactNode) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
      <span
        style={{
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-secondary)",
          minInlineSize: "14ch",
        }}
      >
        {label}
      </span>
      {value}
    </div>
  );
}

function stack(...rows: React.ReactNode[]) {
  return <div style={{ display: "grid", gap: "0.5rem" }}>{rows}</div>;
}

/** The plain numeral, grouped by the reader's own convention. */
export const Number = {
  render: () => stack(row("Plain", <BSFormat.Number value={1450.45} />)),
};

/** Grand totals compressed to their headline. */
export const Compact = {
  render: () => {
    const num = { fontSize: "var(--bs-font-size-lg)" } as const;
    return stack(
      row(
        "Short",
        <span style={num}>
          <BSFormat.Number value={1500000} notation="compact" compactDisplay="short" />
        </span>,
      ),
      row(
        "Long",
        <span style={num}>
          <BSFormat.Number value={1500000} notation="compact" compactDisplay="long" />
        </span>,
      ),
    );
  },
};

/** The same figures retold for another tongue, via the locale context. */
export const Locale = {
  render: () =>
    stack(
      row(
        "de-DE",
        <LocaleProvider locale="de-DE">
          <BSFormat.Number value={1450.45} />
        </LocaleProvider>,
      ),
      row(
        "zh-CN",
        <LocaleProvider locale="zh-CN">
          <BSFormat.Byte value={1450.45} />
        </LocaleProvider>,
      ),
    ),
};

/** A ladder of file sizes, each stepping to its natural unit. */
export const Byte = {
  render: () =>
    stack(
      row("50", <BSFormat.Byte value={50} />),
      row("5 000", <BSFormat.Byte value={5000} />),
      row("5 000 000", <BSFormat.Byte value={5000000} />),
      row("5 000 000 000", <BSFormat.Byte value={5000000000} />),
    ),
};

/** The measure of a byte: decimal counts by thousands, binary by 1024. */
export const ByteUnits = {
  render: () =>
    stack(
      row("Decimal 1024", <BSFormat.Byte value={1024} unitSystem="decimal" />),
      row("Binary 1024", <BSFormat.Byte value={1024} unitSystem="binary" />),
      row("Narrow", <BSFormat.Byte value={50345.53} unitDisplay="narrow" />),
      row("Long", <BSFormat.Byte value={50345.53} unitDisplay="long" />),
    ),
};

/** Time told from now: the same instant reads as distance. */
export const RelativeTime = {
  render: () =>
    stack(
      row("Default", <BSFormat.RelativeTime value={new Date("2026-08-01")} />),
      row("Short", <BSFormat.RelativeTime value={new Date("2026-08-01")} style="short" />),
    ),
};

/** A hour of the day, in twelve-hour dress or riding a full date. */
export const Time = {
  render: () =>
    stack(
      row("12h seconds", <BSFormat.Time value="03:07:19" format="12h" withSeconds />),
      row("With date", <BSFormat.Time value={new Date(2026, 1, 27, 18, 45, 34)} />),
    ),
};
