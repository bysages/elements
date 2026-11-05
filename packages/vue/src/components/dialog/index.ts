import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { definePositioner, type FloatingPortalTarget } from "../../internal/floating";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

export type { DialogOpenChangeDetails } from "@ark-ui/vue/dialog";

export type DialogSize = "sm" | "md" | "lg" | "xl";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Dialog" + name,
    inheritAttrs: false,
    setup(_, ctx) {
      injectComponentStyle("dialog");

      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "dialog", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

/** The semantic sheet: `size` names one content measure instead of a caller
 * overriding the sheet's max-width for every dialog. */
const DialogContent = defineComponent({
  name: "SDialogContent",
  inheritAttrs: false,
  props: {
    size: { type: String as PropType<DialogSize>, default: undefined },
  },
  setup(props, ctx) {
    injectComponentStyle("dialog");

    return () => h(ArkDialog.Content, { ...ctx.attrs, "data-size": props.size }, ctx.slots.default);
  },
});

/** A semantic section for the dialog's title and description. */
const Header = part("Header", "header");
/** The dialog's principal content; it may shrink inside narrow sheets. */
const Body = part("Body", "div");
/** The dialog's action row; actions read from start to end. */
const Footer = part("Footer", "footer");

/** Dialog, dressed in the paper-and-ink system: the sheet dissolves
 * in on elevation, the backdrop fades, and nested overlays stack through
 * the shared z-index ladder. The parts — Root, Trigger,
 * Backdrop, Positioner, Content, Title, Description, CloseTrigger. */
const DialogRoot = defineComponent({
  name: "SDialogRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("dialog", attrs);

    return () =>
      h(withPresenceRoot(ArkDialog.Root), withPresenceEnter({ ...attrs, id: id.value }), slots);
  },
}) as unknown as typeof ArkDialog.Root;

/** The common path: name the message, and the vessel, backdrop, close
 * trigger, and open state wiring arrive together. */
const DialogPositioner = definePositioner("SDialogPositioner", ArkDialog.Positioner);

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
    size: { type: String as PropType<DialogSize>, default: "md" },
    portal: { type: [Boolean, String] as PropType<FloatingPortalTarget>, default: true },
  },
  emits: {
    "update:open": (_open: boolean) => true,
  },
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
          h(DialogPositioner, { portal: props.portal }, () =>
            h(DialogContent, { size: props.size }, () => [
              h(Header, () => [
                h(ArkDialog.Title, () => title),
                props.description ? h(ArkDialog.Description, () => props.description) : null,
              ]),
              h(Body, () => [
                props.content ? h("p", () => props.content) : null,
                ctx.slots.default?.(),
              ]),
              h(ArkDialog.CloseTrigger, { "aria-label": "Close" }, () =>
                iconNode("x", { width: 14, height: 14 }),
              ),
            ]),
          ),
        ],
      );
    };
  },
});

export const Dialog = defineFamily(DialogFacade, {
  ...ArkDialog,
  Root: DialogRoot,
  Content: DialogContent,
  Header,
  Body,
  Footer,
} as unknown as {
  Root: Component;
  Content: Component;
} & Record<string, Component>) as typeof DialogFacade &
  Omit<typeof ArkDialog, "Root" | "Content"> & {
    Root: typeof DialogRoot;
    Content: typeof DialogContent;
    Header: Component;
    Body: Component;
    Footer: Component;
  };
