import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

export type { DialogOpenChangeDetails } from "@ark-ui/vue/dialog";

/** Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The parts — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
const DialogRoot = defineComponent({
  name: "SDialogRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("dialog", attrs);

    return () => h(ArkDialog.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkDialog.Root;

/** The common path: name the message, and the vessel, backdrop, close
 * trigger, and open state wiring arrive together. */
const DialogFacade = defineComponent({
  name: "SDialog",
  inheritAttrs: false,
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: undefined },
    trigger: { type: String, default: undefined },
    content: { type: String, default: undefined },
    label: { type: String, default: undefined },
    description: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:open"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("dialog");

    return () => {
      const title = props.label ?? props.trigger;
      return h(
        DialogRoot,
        {
          ...ctx.attrs,
          ...(props.open === undefined ? {} : { open: props.open }),
          ...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen }),
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
        },
        () => [
          h(
            ArkDialog.Trigger,
            { disabled: props.disabled },
            () => props.trigger ?? title ?? "Open",
          ),
          h(ArkDialog.Backdrop),
          h(ArkDialog.Positioner, () =>
            h(ArkDialog.Content, () => [
              h(ArkDialog.Title, () => title),
              props.description ? h(ArkDialog.Description, () => props.description) : null,
              props.content ? h("p", () => props.content) : null,
              ctx.slots.default?.(),
              h(ArkDialog.CloseTrigger, { "aria-label": "Close" }, () => "×"),
            ]),
          ),
        ],
      );
    };
  },
});

export const Dialog = defineFamily(DialogFacade, { ...ArkDialog, Root: DialogRoot } as unknown as {
  Root: Component;
} & Record<string, Component>) as typeof DialogFacade &
  Omit<typeof ArkDialog, "Root"> & { Root: typeof DialogRoot };
