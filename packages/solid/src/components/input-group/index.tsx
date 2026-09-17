import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

/**
 * Merged controls: attachments and the entry fused into one seal. The
 * Root draws the single hairline and carries the group's focus halo;
 * the Addon is a recessed cell for the reader's fixed words — a scheme,
 * a unit, a quiet button — placed before or after the entry. Put our
 * Input (or Textarea) inside and its own border and halo step aside in
 * favor of the group's; the stylesheet does the merging, the wrapper
 * adds no visuals of its own.
 */
function InputGroupRoot(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-scope="input-group" data-part="root" />;
}

function InputGroupAddon(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-scope="input-group" data-part="addon" />;
}

export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Addon: InputGroupAddon,
});

injectComponentStyle("input-group");
