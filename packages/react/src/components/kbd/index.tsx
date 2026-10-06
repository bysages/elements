import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** A keycap in miniature, riding the type it annotates. */
export type KbdProps = HTMLAttributes<HTMLElement>;

function KbdImpl({ children, ...rest }: KbdProps) {
  injectComponentStyle("kbd");
  return (
    <kbd {...rest} data-scope="kbd" data-part="root">
      {children}
    </kbd>
  );
}

export const Kbd = withSelfRoot(KbdImpl);
