import { RatingGroup as ArkRatingGroup } from "@ark-ui/vue/rating-group";
import { injectComponentStyle } from "@bysages/core";

/** RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose glyphs take the primary pigment as they light up. The parts — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */
export const RatingGroup = ArkRatingGroup;

injectComponentStyle("rating-group");
