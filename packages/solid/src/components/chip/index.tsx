import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export interface ChipProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

export function Chip(props: ChipProps) {
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
}

injectComponentStyle("chip");
