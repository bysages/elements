import { RatingGroup as ArkRatingGroup } from "@ark-ui/vue/rating-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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
    const id = useElementId("rating-group", attrs);
    injectComponentStyle("rating-group");

    return () => h(ArkRatingGroup.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete whole-star rating behind one numeric value. */
const RatingGroupFacade = defineComponent({
  name: "SRatingGroup",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    label: { type: String, default: undefined },
    count: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    /** One rung of the control-height ladder every seal stands on. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("rating-group");

    return () =>
      h(
        RatingGroupRoot,
        {
          ...attrs,
          count: props.count,
          disabled: props.disabled,
          readOnly: props.readOnly,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: number | null) => emit("update:modelValue", value ?? 0),
        },
        () => [
          ...(props.label ? [h(ArkRatingGroup.Label, () => props.label)] : []),
          h(ArkRatingGroup.Control, () => [
            h(ArkRatingGroup.Context, null, {
              default: ({ items }: { items: number[] }) =>
                items.map((item) =>
                  h(
                    ArkRatingGroup.Item,
                    { key: item, index: item },
                    {
                      default: () => iconNode("star"),
                    },
                  ),
                ),
            }),
            h(ArkRatingGroup.HiddenInput),
          ]),
        ],
      );
  },
});

type RatingGroupParts = Omit<typeof ArkRatingGroup, "Root"> & {
  Root: typeof RatingGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const RatingGroup = defineFamily(RatingGroupFacade, {
  ...ArkRatingGroup,
  Root: RatingGroupRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof RatingGroupFacade &
  RatingGroupParts;
