import { Drawer as ArkDrawer } from "@ark-ui/vue/drawer";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Drawer, dressed in the paper-and-ink system: a full-height sheet
 * cut flush to the edge it rises from, sliding on the machine's translate
 * under the grabber's hand. The parts — Root, Trigger,
 * Backdrop, Positioner, Content, Grabber, GrabberIndicator, Title,
 * Description, CloseTrigger, SwipeArea. */
const DrawerRoot = defineComponent({
  name: "SDrawerRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("drawer", attrs);

    return () => h(ArkDrawer.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkDrawer.Root;

/** The common path: a trigger, grabber, heading, and dismissal come as
 * one sheet; the default slot carries whatever lives below the heading. */
const DrawerFacade = defineComponent({
  name: "SDrawer",
  inheritAttrs: false,
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    trigger: { type: String, default: undefined },
    content: { type: String, default: undefined },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:open"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("drawer");

    return () =>
      h(
        DrawerRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(ArkDrawer.Trigger, { disabled: props.disabled }, () => props.trigger ?? props.label),
          h(ArkDrawer.Backdrop),
          h(ArkDrawer.Positioner, () =>
            h(ArkDrawer.Content, () => [
              h(ArkDrawer.Grabber, () => h(ArkDrawer.GrabberIndicator)),
              h(ArkDrawer.Title, () => props.label),
              props.description ? h(ArkDrawer.Description, () => props.description) : null,
              props.content ? h("p", () => props.content) : null,
              ctx.slots.default?.(),
              h(ArkDrawer.CloseTrigger, { "aria-label": "Close" }, () =>
                iconNode("x", { width: 14, height: 14 }),
              ),
            ]),
          ),
        ],
      );
  },
});

export const Drawer = defineFamily(DrawerFacade, { ...ArkDrawer, Root: DrawerRoot } as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof DrawerFacade &
  Omit<typeof ArkDrawer, "Root"> & { Root: typeof DrawerRoot };
