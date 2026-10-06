import { HoverCard as ArkHoverCard } from "@ark-ui/vue/hover-card";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** HoverCard, dressed in the paper-and-ink system: a preview card
 * that dissolves in over a quiet inline link, never stealing focus. The parts — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
const HoverCardRoot = defineComponent({
  name: "SHoverCardRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("hover-card", attrs);

    return () => h(ArkHoverCard.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkHoverCard.Root;

type HoverCardPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/** The common path: an inline trigger opening a headed preview; the
 * default slot extends the card after its lead. */
const HoverCardFacade = defineComponent({
  name: "SHoverCard",
  inheritAttrs: false,
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    trigger: { type: String, default: undefined },
    content: { type: String, default: undefined },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    placement: { type: String as PropType<HoverCardPlacement>, default: undefined },
  },
  emits: ["update:open"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("hover-card");

    return () =>
      h(
        HoverCardRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          ...(props.placement === undefined ? {} : { positioning: { placement: props.placement } }),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          ctx.slots.trigger
            ? ctx.slots.trigger()
            : h(ArkHoverCard.Trigger, { disabled: props.disabled }, () => props.trigger),
          h(ArkHoverCard.Positioner, () =>
            h(ArkHoverCard.Content, () => [
              h(ArkHoverCard.Arrow, () => h(ArkHoverCard.ArrowTip)),
              h("h3", () => props.label),
              props.description ? h("p", () => props.description) : null,
              props.content ? h("p", () => props.content) : null,
              ctx.slots.default?.(),
            ]),
          ),
        ],
      );
  },
});

export const HoverCard = defineFamily(HoverCardFacade, {
  ...ArkHoverCard,
  Root: HoverCardRoot,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof HoverCardFacade &
  Omit<typeof ArkHoverCard, "Root"> & { Root: typeof HoverCardRoot };
