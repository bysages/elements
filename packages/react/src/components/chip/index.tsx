import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

export function Chip({ value, max, tone = "ink", variant = "solid", ...rest }: ChipProps) {
  const text = max != null && value > max ? `${max}+` : String(value);
  return (
    <span {...rest} data-scope="chip" data-part="root" data-tone={tone} data-variant={variant}>
      {text}
    </span>
  );
}

injectComponentStyle("chip");
