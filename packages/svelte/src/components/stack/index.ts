import { injectComponentStyle } from "@bysages/core";

import StackComponent from "./Stack.svelte";

/** Whitespace chosen by name: the named steps point at the space ramp
 * so siblings are held apart by one token, never by ad-hoc margins. */
export const Stack = StackComponent;

export type { StackProps } from "./props";

injectComponentStyle("stack");
