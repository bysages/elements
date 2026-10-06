import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

function ChipImpl({ value, max, tone = "ink", variant = "solid", ...rest }: ChipProps) {
  injectComponentStyle("chip");
  const text = max != null && value > max ? `${max}+` : String(value);
  return (
    <span {...rest} data-scope="chip" data-part="root" data-tone={tone} data-variant={variant}>
      {text}
    </span>
  );
}

export const Chip = withSelfRoot(ChipImpl);
