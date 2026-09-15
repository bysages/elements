import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>;

export function Skeleton(props: SkeletonProps) {
  return <div {...props} data-scope="skeleton" data-part="root" />;
}

injectComponentStyle("skeleton");
