import { injectComponentStyle } from "@bysages/core";
import SkeletonComponent from "./Skeleton.svelte";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export const Skeleton = SkeletonComponent;

export type { SkeletonProps } from "./props";

injectComponentStyle("skeleton");
