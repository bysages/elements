import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

function part(name: string, tag: string) {
  const Tag = tag as "div";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="stat" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Stat" + name;
  return Component;
}

const Root = part("Root", "div");
const Label = part("Label", "p");
const Value = part("Value", "div");
const Description = part("Description", "p");

export interface StatDeltaProps extends HTMLAttributes<HTMLElement> {
  direction?: "up" | "down" | "flat";
  "data-direction"?: string;
}

/** The delta reads the direction in the fixed semantic pigments; an
 * explicit `data-direction` attribute on the consumer side still wins. */
const Delta = ({ direction = "flat", children, ...rest }: StatDeltaProps) => (
  <span
    {...rest}
    data-scope="stat"
    data-part="delta"
    data-direction={rest["data-direction"] ?? direction}
  >
    {children}
  </span>
);

export const Stat = Object.assign(Root, { Root, Label, Value, Delta, Description });

injectComponentStyle("stat");
