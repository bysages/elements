import { RatingGroup as ArkRatingGroup } from "@ark-ui/solid/rating-group";
import type { RatingGroupRootProps as ArkRatingGroupRootProps } from "@ark-ui/solid/rating-group";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose glyphs take the primary pigment as they light up. The API is
 * Ark's own — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */

type RatingGroupOwnProps = {
  /** One rung of the control-height ladder every seal stands on. */
  size?: "sm" | "md" | "lg";
};

function RatingGroupRoot(props: ArkRatingGroupRootProps & RatingGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkRatingGroup.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RatingGroup: Omit<typeof ArkRatingGroup, "Root"> & { Root: typeof RatingGroupRoot } = {
  ...ArkRatingGroup,
  Root: RatingGroupRoot,
};

injectComponentStyle("rating-group");
