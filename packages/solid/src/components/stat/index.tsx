import { injectComponentStyle } from "@bysages/core";
import { splitProps, type JSX } from "solid-js";

function part(name: string, tag: string) {
  function Component(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const Tag = tag as "div";
    return <Tag {...props} data-scope="stat" data-part={name.toLowerCase()} />;
  }
  return Component;
}

const Root = part("Root", "div");
const Label = part("Label", "p");
const Value = part("Value", "div");
const Description = part("Description", "p");

export interface StatDeltaProps extends JSX.HTMLAttributes<HTMLElement> {
  direction?: "up" | "down" | "flat";
  "data-direction"?: string;
}

/** The delta reads the direction in the fixed semantic pigments; an
 * explicit `data-direction` attribute on the consumer side still wins. */
function Delta(props: StatDeltaProps) {
  const [own, rest] = splitProps(props, ["direction"]);
  return (
    <span
      {...rest}
      data-scope="stat"
      data-part="delta"
      data-direction={rest["data-direction"] ?? own.direction ?? "flat"}
    />
  );
}

export const Stat = Object.assign(Root, { Root, Label, Value, Delta, Description });

injectComponentStyle("stat");
