import { RatingGroup as ArkRatingGroup } from "@ark-ui/vue/rating-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** RatingGroup, dressed in the paper-and-ink system: a row of quiet
 * seals whose glyphs take the primary pigment as they light up. The parts — Root, Label, Control, Item, HiddenInput (plus the Context and
 * ItemContext render helpers). */
const RatingGroupRoot = defineComponent({
  name: "SRatingGroupRoot",
  props: {
    /** One rung of the control-height ladder every seal stands on. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkRatingGroup.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const RatingGroup: Omit<typeof ArkRatingGroup, "Root"> & {
  Root: typeof RatingGroupRoot;
} = {
  ...ArkRatingGroup,
  Root: RatingGroupRoot,
};

injectComponentStyle("rating-group");
