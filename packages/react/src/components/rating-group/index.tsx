import { RatingGroup as ArkRatingGroup } from "@ark-ui/react/rating-group";
import { injectComponentStyle } from "@bysages/core";

/** Ark's RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose glyphs take the primary pigment as they light up. The API is
 * Ark's own — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */
export const RatingGroup = ArkRatingGroup;

injectComponentStyle("rating-group");
