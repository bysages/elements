import { withSelfRoot } from "../../internal/family";
import KbdComponent from "./Kbd.svelte";

/** A keycap in miniature, riding the type it annotates. */
export const Kbd = withSelfRoot(KbdComponent);

export type { KbdProps } from "./props";
