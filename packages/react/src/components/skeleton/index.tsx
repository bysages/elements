import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ ...rest }: SkeletonProps) {
  return <div {...rest} data-scope="skeleton" data-part="root" />;
}

injectComponentStyle("skeleton");
