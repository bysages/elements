import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

export type InputGroupPartProps = HTMLAttributes<HTMLDivElement>;

function part(name: string) {
  const Component = ({ children, ...rest }: InputGroupPartProps) => (
    <div {...rest} data-scope="input-group" data-part={name.toLowerCase()}>
      {children}
    </div>
  );
  Component.displayName = "InputGroup" + name;
  return Component;
}

/**
 * Merged controls: attachments and the entry fused into one seal. The
 * Root draws the single hairline and carries the group's focus halo;
 * the Addon is a recessed cell for the reader's fixed words — a scheme,
 * a unit, a quiet button — placed before or after the entry. Put our
 * Input (or Textarea) inside and its own border and halo step aside in
 * favor of the group's; the stylesheet does the merging, the wrapper
 * adds no visuals of its own.
 */
const Root = part("Root");

const Addon = part("Addon");

export const InputGroup = Object.assign(Root, { Root, Addon });

injectComponentStyle("input-group");
