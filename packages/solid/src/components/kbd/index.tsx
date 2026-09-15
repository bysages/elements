import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

/** A keycap in miniature, riding the type it annotates. */
export type KbdProps = JSX.HTMLAttributes<HTMLElement>;

export function Kbd(props: KbdProps) {
  return <kbd {...props} data-scope="kbd" data-part="root" />;
}

injectComponentStyle("kbd");
