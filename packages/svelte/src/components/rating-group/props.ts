import type { RatingGroupRootProps as ArkRatingGroupRootProps } from "@ark-ui/svelte/rating-group";

export type RatingGroupRootProps = ArkRatingGroupRootProps & {
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
};
