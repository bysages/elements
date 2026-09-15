import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** A small seal of state. Ink is the neutral tone; the four semantic
 * pigments are fixed. Subtle and outline re-register the same pigment. */
export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}

export function Badge(props: BadgeProps) {
  const [own, rest] = splitProps(props, ["tone", "variant"]);
  return (
    <span
      {...rest}
      data-scope="badge"
      data-part="root"
      data-tone={own.tone ?? "ink"}
      data-variant={own.variant ?? "solid"}
    />
  );
}

injectComponentStyle("badge");
