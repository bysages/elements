import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** Popover, dressed in the paper-and-ink system: a paper vessel that
 * dissolves in on elevation, anchored to its trigger by a whisker arrow. The parts — Root, Trigger, Anchor, Indicator, Positioner, Content,
 * Title, Description, CloseTrigger, Arrow, ArrowTip. */
const PopoverRoot = defineComponent({
  name: "SPopoverRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("popover", attrs);

    return () =>
      h(withPresenceRoot(ArkPopover.Root), withPresenceEnter({ ...attrs, id: id.value }), slots);
  },
}) as unknown as typeof ArkPopover.Root;

type PopoverPlacement =
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

/** The common path: one anchored vessel with a trigger, title, close
 * rung, and placement already wired. */
const PopoverFacade = defineComponent({
  name: "SPopover",
  inheritAttrs: false,
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    trigger: { type: String, default: undefined },
    content: { type: String, default: undefined },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    placement: { type: String as PropType<PopoverPlacement>, default: undefined },
  },
  emits: ["update:open"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("popover");

    return () =>
      h(
        PopoverRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          ...(props.placement === undefined ? {} : { positioning: { placement: props.placement } }),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(
            ArkPopover.Trigger,
            { ...(ctx.slots.trigger ? { asChild: true } : {}), disabled: props.disabled },
            ctx.slots.trigger ?? (() => props.trigger ?? props.label),
          ),
          h(ArkPopover.Positioner, () =>
            h(ArkPopover.Content, () => [
              h(ArkPopover.CloseTrigger, { "aria-label": "Close" }, () =>
                iconNode("x", { width: 14, height: 14 }),
              ),
              h(ArkPopover.Title, () => props.label),
              props.description ? h(ArkPopover.Description, () => props.description) : null,
              props.content ? h("p", () => props.content) : null,
              ctx.slots.default?.(),
            ]),
          ),
        ],
      );
  },
});

export const Popover = defineFamily(PopoverFacade, {
  ...ArkPopover,
  Root: PopoverRoot,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof PopoverFacade &
  Omit<typeof ArkPopover, "Root"> & { Root: typeof PopoverRoot };
