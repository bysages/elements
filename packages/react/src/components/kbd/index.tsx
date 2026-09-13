import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A keycap in miniature, riding the type it annotates. */
export type KbdProps = HTMLAttributes<HTMLElement>;

export function Kbd({ children, ...rest }: KbdProps) {
  return (
    <kbd {...rest} data-scope="kbd" data-part="root">
      {children}
    </kbd>
  );
}

injectComponentStyle("kbd");
