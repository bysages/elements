import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A small seal of state. Ink is the neutral tone; the four semantic
 * pigments are fixed. Subtle and outline re-register the same pigment. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

export function Badge({ tone = "ink", variant = "solid", ...rest }: BadgeProps) {
  return (
    <span {...rest} data-scope="badge" data-part="root" data-tone={tone} data-variant={variant} />
  );
}

injectComponentStyle("badge");
