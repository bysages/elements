/** Ark's RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose glyphs take the primary pigment as they light up. The API is
 * Ark's own — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */
import { RatingGroup as ArkRatingGroup } from "@ark-ui/svelte/rating-group";
import { injectComponentStyle } from "@bysages/core";

import RatingGroupRoot from "./RatingGroupRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RatingGroup: Omit<typeof ArkRatingGroup, "Root"> & { Root: typeof RatingGroupRoot } = {
  ...ArkRatingGroup,
  Root: RatingGroupRoot,
};

injectComponentStyle("rating-group");
