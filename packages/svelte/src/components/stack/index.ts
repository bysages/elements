import { withSelfRoot } from "../../internal/family";
import StackComponent from "./Stack.svelte";

/** Whitespace chosen by name: the named steps point at the space ramp
 * so siblings are held apart by one token, never by ad-hoc margins. */
export const Stack = withSelfRoot(StackComponent);

export type { StackProps } from "./props";
