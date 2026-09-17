import { injectComponentStyle } from "@bysages/core";

import InputGroupRoot from "./InputGroup.svelte";
import InputGroupAddon from "./InputGroupAddon.svelte";

/** Merged controls: attachments and the entry fused into one seal —
 * Root, Addon. */
export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Addon: InputGroupAddon,
});

export type { InputGroupAddonProps, InputGroupProps } from "./props";

injectComponentStyle("input-group");
