import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

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

export interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
  direction?: "column" | "row";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  align?: string;
  justify?: string;
}

export function Stack(props: StackProps) {
  const [own, rest] = splitProps(props, ["direction", "gap", "wrap", "align", "justify"]);
  return (
    <div
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        "--bs-stack-gap": gapVars[own.gap ?? "md"] ?? gapVars.md,
        "align-items": own.align,
        "justify-content": own.justify,
        "flex-wrap": own.wrap ? "wrap" : undefined,
      }}
      data-scope="stack"
      data-part="root"
      data-direction={own.direction ?? "column"}
    />
  );
}

injectComponentStyle("stack");
