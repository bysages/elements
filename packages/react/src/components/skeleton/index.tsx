import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

function SkeletonImpl({ ...rest }: SkeletonProps) {
  injectComponentStyle("skeleton");
  return <div {...rest} data-scope="skeleton" data-part="root" />;
}

export const Skeleton = withSelfRoot(SkeletonImpl);
