import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes } from "react";

/** Whitespace chosen by name: the named steps point at the space ramp so
 * siblings are held apart by one token, never by ad-hoc margins. */
const gapVars: Record<string, string> = {
  none: "0",
  xs: "var(--bs-gap-xs)",
  sm: "var(--bs-gap-sm)",
  md: "var(--bs-gap-md)",
  lg: "var(--bs-gap-lg)",
  xl: "var(--bs-gap-xl)",
};

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "column" | "row";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  align?: string;
  justify?: string;
}

export function Stack({
  direction = "column",
  gap = "md",
  wrap = false,
  align,
  justify,
  ...rest
}: StackProps) {
  const style = {
    ...rest.style,
    "--bs-stack-gap": gapVars[gap] ?? gapVars.md,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : undefined,
  } as CSSProperties;

  return (
    <div {...rest} style={style} data-scope="stack" data-part="root" data-direction={direction} />
  );
}

injectComponentStyle("stack");
