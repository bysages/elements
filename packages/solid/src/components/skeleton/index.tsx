import { injectComponentStyle } from "@bysages/core/styling";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>;

export const Skeleton = withSelfRoot(function Skeleton(props: SkeletonProps) {
  injectComponentStyle("skeleton");
  return <div {...props} data-scope="skeleton" data-part="root" />;
});
