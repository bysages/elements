import { injectComponentStyle } from "@bysages/core/styling";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** A keycap in miniature, riding the type it annotates. */
export type KbdProps = JSX.HTMLAttributes<HTMLElement>;

export const Kbd = withSelfRoot(function Kbd(props: KbdProps) {
  injectComponentStyle("kbd");
  return <kbd {...props} data-scope="kbd" data-part="root" />;
});
