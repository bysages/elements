import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. The react package's asChild has
 * no solid equivalent — compose a control around `<Button>` instead. */
export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  /** Icon-only: the silhouette squares to the control height. */
  square?: boolean;
}

export function Button(props: ButtonProps) {
  const [own, rest] = splitProps(props, ["variant", "tone", "size", "square", "type", "disabled"]);
  return (
    <button
      {...rest}
      type={own.type ?? "button"}
      disabled={own.disabled}
      data-scope="button"
      data-part="root"
      data-variant={own.variant ?? "solid"}
      data-tone={own.tone ?? "ink"}
      data-size={own.size ?? "md"}
      data-square={own.square ? "true" : undefined}
      // Press feedback and pointer light ride motion attributes, so
      // consumers can detach them per element too.
      data-motion="ink-ripple lit"
    />
  );
}

injectComponentStyle("button");
