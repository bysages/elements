import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** A small seal of state. Ink is the neutral tone; the four semantic
 * pigments are fixed. Subtle and outline re-register the same pigment. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

function BadgeImpl({ tone = "ink", variant = "solid", ...rest }: BadgeProps) {
  injectComponentStyle("badge");
  return (
    <span {...rest} data-scope="badge" data-part="root" data-tone={tone} data-variant={variant} />
  );
}

export const Badge = withSelfRoot(BadgeImpl);
