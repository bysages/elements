import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export interface ChipProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

export const Chip = withSelfRoot(function Chip(props: ChipProps) {
  injectComponentStyle("chip");
  const [own, rest] = splitProps(props, ["value", "max", "tone", "variant"]);
  return (
    <span
      {...rest}
      data-scope="chip"
      data-part="root"
      data-tone={own.tone ?? "ink"}
      data-variant={own.variant ?? "solid"}
    >
      {own.max != null && own.value > own.max ? `${own.max}+` : String(own.value)}
    </span>
  );
});
