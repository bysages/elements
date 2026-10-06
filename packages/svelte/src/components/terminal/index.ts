import { withSelfRoot } from "../../internal/family";
import TerminalComponent from "./Terminal.svelte";

/** A quiet console: the transcript above, the prompt line below. */
export const Terminal = withSelfRoot(TerminalComponent);

export type { TerminalProps } from "./props";
