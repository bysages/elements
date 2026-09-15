import { injectComponentStyle } from "@bysages/core";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  /** Icon-only: the silhouette squares to the control height. */
  square?: boolean;
  /** Render the child element as the button — the recipe rides on it
   * (a router Link, say) instead of wrapping it in a nested <button>. */
  asChild?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "solid",
  tone = "ink",
  size = "md",
  square = false,
  asChild = false,
  disabled = false,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const partProps = {
    ...rest,
    "data-scope": "button",
    "data-part": "root",
    "data-variant": variant,
    "data-tone": tone,
    "data-size": size,
    "data-square": square ? "true" : undefined,
    // Press feedback and pointer light ride motion attributes, so
    // consumers can detach them per element too.
    "data-motion": "ink-ripple lit",
  } as const;

  if (asChild) {
    const child = Children.only(children);
    return isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, partProps)
      : null;
  }

  return (
    <button type={type} disabled={disabled} {...partProps}>
      {children}
    </button>
  );
}

injectComponentStyle("button");
