import { withSelfRoot } from "../../internal/family";
import SkeletonComponent from "./Skeleton.svelte";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export const Skeleton = withSelfRoot(SkeletonComponent);

export type { SkeletonProps } from "./props";
