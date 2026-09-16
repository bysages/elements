import { injectComponentStyle } from "@bysages/core";

import KbdComponent from "./Kbd.svelte";

/** A keycap in miniature, riding the type it annotates. */
export const Kbd = KbdComponent;

export type { KbdProps } from "./props";

injectComponentStyle("kbd");
