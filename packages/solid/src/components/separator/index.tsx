import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator(props: SeparatorProps) {
  const [own, rest] = splitProps(props, ["orientation", "decorative"]);
  const orientation = () => own.orientation ?? "horizontal";
  return (
    <div
      {...rest}
      role={own.decorative ? "none" : "separator"}
      data-scope="separator"
      data-part="root"
      data-orientation={orientation()}
      aria-orientation={own.decorative ? undefined : orientation()}
    />
  );
}

injectComponentStyle("separator");
