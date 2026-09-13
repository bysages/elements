import { injectComponentStyle } from "@bysages/core";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "solid",
  tone = "ink",
  size = "md",
  disabled = false,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}
      data-scope="button"
      data-part="root"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      // Press feedback and pointer light ride motion attributes, so
      // consumers can detach them per element too.
      data-motion="ink-ripple lit"
    >
      {children}
    </button>
  );
}

injectComponentStyle("button");
