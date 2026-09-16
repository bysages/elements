import { LocaleProvider } from "@ark-ui/vue/locale";
import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Format as BSFormat } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Format" };
export default meta;

/** Format renders bare text — the label/value row is the story's own
 * typesetting, not the component's. */
function row(label: string, value: () => any) {
  return h("div", { style: { display: "flex", gap: "0.75rem", alignItems: "baseline" } }, [
    h(
      "span",
      {
        style: {
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-secondary)",
          minInlineSize: "14ch",
        },
      },
      label,
    ),
    value(),
  ]);
}

function stack(...rows: any[]) {
  return () => h("div", { style: { display: "grid", gap: "0.5rem" } }, rows);
}

const NUM = { style: { fontSize: "var(--bs-font-size-lg)" } } as const;

/** The plain numeral, grouped by the reader's own convention. */
export const Number = {
  args: {
    locale: undefined,
  },
  render: (args: { locale?: string }) =>
    stack(row("Plain", () => h(BSFormat.Number, { value: 1450.45, locale: args.locale }))),
};

/** Grand totals compressed to their headline. */
export const Compact = {
  render: () =>
    stack(
      row("Short", () =>
        h(BSFormat.Number, {
          value: 1500000,
          notation: "compact",
          compactDisplay: "short",
          ...NUM,
        }),
      ),
      row("Long", () =>
        h(BSFormat.Number, { value: 1500000, notation: "compact", compactDisplay: "long", ...NUM }),
      ),
    ),
};

/** The same figures retold for another tongue, via the locale context. */
export const Locale = {
  render: () =>
    stack(
      row("de-DE", () =>
        h(LocaleProvider, { locale: "de-DE" }, () => h(BSFormat.Number, { value: 1450.45 })),
      ),
      row("zh-CN", () =>
        h(LocaleProvider, { locale: "zh-CN" }, () => h(BSFormat.Byte, { value: 1450.45 })),
      ),
    ),
};

/** A ladder of file sizes, each stepping to its natural unit. */
export const Byte = {
  render: () =>
    stack(
      row("50", () => h(BSFormat.Byte, { value: 50 })),
      row("5 000", () => h(BSFormat.Byte, { value: 5000 })),
      row("5 000 000", () => h(BSFormat.Byte, { value: 5000000 })),
      row("5 000 000 000", () => h(BSFormat.Byte, { value: 5000000000 })),
    ),
};

/** The measure of a byte: decimal counts by thousands, binary by 1024. */
export const ByteUnits = {
  render: () =>
    stack(
      row("Decimal 1024", () => h(BSFormat.Byte, { value: 1024, unitSystem: "decimal" })),
      row("Binary 1024", () => h(BSFormat.Byte, { value: 1024, unitSystem: "binary" })),
      row("Narrow", () => h(BSFormat.Byte, { value: 50345.53, unitDisplay: "narrow" })),
      row("Long", () => h(BSFormat.Byte, { value: 50345.53, unitDisplay: "long" })),
    ),
};

/** Time told from now: the same instant reads as distance. */
export const RelativeTime = {
  render: () =>
    stack(
      row("Default", () => h(BSFormat.RelativeTime, { value: new Date("2026-08-01") })),
      row("Short", () =>
        h(BSFormat.RelativeTime, { value: new Date("2026-08-01"), style: "short" }),
      ),
    ),
};

/** A hour of the day, in twelve-hour dress or riding a full date. */
export const Time = {
  render: () =>
    stack(
      row("12h seconds", () =>
        h(BSFormat.Time, { value: "03:07:19", format: "12h", withSeconds: true }),
      ),
      row("With date", () => h(BSFormat.Time, { value: new Date(2026, 1, 27, 18, 45, 34) })),
    ),
};
