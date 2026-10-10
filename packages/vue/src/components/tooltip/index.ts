import { Tooltip as ArkTooltip } from "@ark-ui/vue/tooltip";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
/** Tooltip, dressed in the paper-and-ink system: the smallest
 * vessel — a tight chip of ink that dissolves in over its anchor. The parts — Root, Trigger, Positioner, Content, Arrow, ArrowTip. */
const TooltipRoot = defineComponent({
  name: "STooltipRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("tooltip", attrs);

    return () =>
      h(withPresenceRoot(ArkTooltip.Root), withPresenceEnter({ ...attrs, id: id.value }), slots);
  },
}) as unknown as typeof ArkTooltip.Root;

type TooltipPlacement =
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

/** The common path: one name and one sentence, attached to a trigger. */
const TooltipFacade = defineComponent({
  name: "STooltip",
  inheritAttrs: false,
  props: {
    /** The controlled visibility state. */
    open: { type: Boolean, default: undefined },
    /** The initial visibility state for uncontrolled use. */
    defaultOpen: { type: Boolean, default: undefined },
    /** The trigger text; a custom trigger uses the trigger slot. */
    trigger: { type: String, default: undefined },
    /** The tooltip text; custom content uses the content slot. */
    content: { type: String, default: undefined },
    /** Whether interaction is suppressed. */
    disabled: { type: Boolean, default: false },
    /** Where the tooltip sits relative to its trigger. */
    placement: { type: String as PropType<TooltipPlacement>, default: undefined },
  },
  emits: {
    "update:open": (_open: boolean) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("tooltip");

    return () =>
      h(
        TooltipRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          ...(props.placement === undefined ? {} : { positioning: { placement: props.placement } }),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(
            ArkTooltip.Trigger,
            {
              ...(ctx.slots.trigger ? { asChild: true } : {}),
              disabled: props.disabled,
            },
            ctx.slots.trigger ?? (() => props.trigger),
          ),
          h(ArkTooltip.Positioner, () => {
            const renderContent = () => [
              h(ArkTooltip.Arrow, () => h(ArkTooltip.ArrowTip)),
              ctx.slots.content ? ctx.slots.content() : props.content,
            ];
            return h(ArkTooltip.Content, renderContent);
          }),
        ],
      );
  },
});

export const Tooltip = defineFamily(TooltipFacade, {
  ...ArkTooltip,
  Root: TooltipRoot,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof TooltipFacade &
  Omit<typeof ArkTooltip, "Root"> & { Root: typeof TooltipRoot };
