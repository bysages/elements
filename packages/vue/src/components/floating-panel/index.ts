import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/vue/floating-panel";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The parts — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
const FloatingPanelRoot = defineComponent({
  name: "SFloatingPanelRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("floating-panel", attrs);

    return () =>
      h(
        withPresenceRoot(ArkFloatingPanel.Root),
        withPresenceEnter({ ...attrs, id: id.value }),
        slots,
      );
  },
});

const resizeAxes = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;

/** The common path: a headed, draggable, resizable panel with stage and
 * close rungs; the default slot fills the body. */
const FloatingPanelFacade = defineComponent({
  name: "SFloatingPanel",
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
    injectComponentStyle("floating-panel");

    return () =>
      h(
        FloatingPanelRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          disabled: props.disabled,
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(ArkFloatingPanel.Trigger, () => props.trigger ?? props.label),
          h(ArkFloatingPanel.Positioner, () =>
            h(ArkFloatingPanel.Content, () => [
              h(ArkFloatingPanel.DragTrigger, () =>
                h(ArkFloatingPanel.Header, () => [
                  h(ArkFloatingPanel.Title, () => props.label),
                  h(ArkFloatingPanel.Control, () => [
                    h(ArkFloatingPanel.StageTrigger, { stage: "minimized" }, () =>
                      iconNode("minus"),
                    ),
                    h(ArkFloatingPanel.StageTrigger, { stage: "maximized" }, () =>
                      iconNode("maximize-2"),
                    ),
                    h(
                      ArkFloatingPanel.StageTrigger,
                      { stage: "default", "aria-label": "Restore" },
                      () => iconNode("minimize-2"),
                    ),
                    h(ArkFloatingPanel.CloseTrigger, { "aria-label": "Close" }, () =>
                      iconNode("x"),
                    ),
                  ]),
                ]),
              ),
              h(ArkFloatingPanel.Body, () => [
                props.description ? h("p", () => props.description) : null,
                props.content ? h("p", () => props.content) : null,
                ctx.slots.default?.(),
              ]),
              ...resizeAxes.map((axis) => h(ArkFloatingPanel.ResizeTrigger, { key: axis, axis })),
            ]),
          ),
        ],
      );
  },
});

export const FloatingPanel = defineFamily(FloatingPanelFacade, {
  ...ArkFloatingPanel,
  Root: FloatingPanelRoot,
} as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof FloatingPanelFacade &
  Omit<typeof ArkFloatingPanel, "Root"> & { Root: typeof FloatingPanelRoot };
