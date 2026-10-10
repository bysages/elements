import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import type { PropType } from "vue";
import { defineComponent, h, ref, watch, type VNode } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Dialog } from "../dialog";
import { ImageViewerPreview } from "./preview";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/** The toolbar's glyphs, drawn from the house icon set. */
const TOOL_ICONS = {
  zoomIn: () => iconNode("zoom-in"),
  zoomOut: () => iconNode("zoom-out"),
  rotate: () => iconNode("rotate-cw"),
  close: () => iconNode("x"),
};

/**
 * Opens the full lightbox from a curated icon by default, or from any
 * wrapped button, image or other doorway. Zoom, rotation, Escape and the scrim
 * stay in the viewer. Anatomy remains available on `ImageViewer.Root`.
 */
export interface ImageViewerProps {
  src: string;
  alt?: string;
  open?: boolean;
  zoomable?: boolean;
  /** The large image handed to the lightbox. */
  width?: string | number;
  /** The large image handed to the lightbox. */
  height?: string | number;
}

const ImageViewerFacade = defineComponent({
  name: "ImageViewer",
  inheritAttrs: false,
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    open: { type: Boolean, default: undefined },
    zoomable: { type: Boolean, default: true },
    width: {
      type: [String, Number] as PropType<ImageViewerProps["width"]>,
      default: undefined,
    },
    height: {
      type: [String, Number] as PropType<ImageViewerProps["height"]>,
      default: undefined,
    },
  },
  emits: {
    "update:open": (_value: boolean) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("image-viewer");
    const messages = useComponentMessages();

    // Controlled when the caller owns `open`; uncontrolled otherwise —
    // an undefined `open` must not reach the machine, or it would
    // override the machine's own decisions.
    const hostId = useElementId("image-viewer", ctx.attrs);
    const localOpen = ref(false);
    const scale = ref(1);
    const rotation = ref(0);

    const isOpen = () => props.open ?? localOpen.value;
    const setOpen = (value: boolean) => {
      if (props.open === undefined) localOpen.value = value;
      ctx.emit("update:open", value);
    };

    // A fresh open starts at rest — the last session's zoom must not
    // leak into the next look.
    watch(isOpen, (open) => {
      if (open) {
        scale.value = 1;
        rotation.value = 0;
      }
    });

    function zoom(step: number) {
      scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value + step));
    }

    function rotate() {
      rotation.value = (rotation.value + 90) % 360;
    }

    function toolIcon(icon: () => VNode) {
      return h(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 1.5,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": true,
        },
        icon(),
      );
    }

    function toolButton(label: string, icon: () => VNode, onClick: () => void) {
      return h(
        Button,
        { variant: "ghost", square: true, size: "lg", "aria-label": label, onClick },
        () => toolIcon(icon),
      );
    }

    // The close rung is the dialog machine's own: the CloseTrigger
    // folds the lightbox, no local handler.
    function closeToolButton(label: string, icon: () => VNode) {
      return h(ArkDialog.CloseTrigger, { asChild: true }, () =>
        h(
          Button,
          {
            variant: "ghost",
            square: true,
            size: "lg",
            "aria-label": label,
            // Restate the recipe names: the close trigger's props
            // ride the same vnode, and the button must keep its own
            // anatomy for the styles.
            "data-scope": "button",
            "data-part": "root",
          },
          () => toolIcon(icon),
        ),
      );
    }

    const triggerContent = ctx.slots.default;

    return () =>
      h(
        withPresenceRoot(ArkDialog.Root),
        withPresenceEnter({
          id: `${hostId.value}:dialog`,
          // The picture is heavy: nothing of the lightbox rests in the
          // page while it is closed.
          open: isOpen(),
          "onUpdate:open": setOpen,
          lazyMount: true,
          unmountOnExit: true,
        }),
        () => [
          h(
            ArkDialog.Trigger,
            {
              asChild: true,
              "data-scope": "image-viewer",
              "data-part": "trigger",
            },
            triggerContent ?? (() => [h(ImageViewerPreview)]),
          ),
          h(ArkDialog.Backdrop, { class: "bs-image-viewer-backdrop" }),
          h(ArkDialog.Positioner, { class: "bs-image-viewer-positioner" }, () =>
            h(
              ArkDialog.Content,
              {
                class: "bs-image-viewer-content",
                "aria-label": props.alt || "Image preview",
                // The content owns the whole screen, so the machine's
                // outside-click never fires — the scrim is always
                // "inside". A bare click on the content itself (the
                // page around the picture and its toolbar) reads as
                // the scrim and closes; clicks on the picture or the
                // tools carry their own targets and stay.
                onClick: (event: MouseEvent) => {
                  if (event.target === event.currentTarget) setOpen(false);
                },
              },
              () => [
                h("img", {
                  "data-scope": "image-viewer",
                  "data-part": "viewport",
                  src: props.src,
                  alt: props.alt,
                  width: props.width,
                  height: props.height,
                  style: [
                    {
                      "--bs-image-viewer-transform": `scale(${scale.value}) rotate(${rotation.value}deg)`,
                    },
                  ],
                }),
                // The tray's children ride an array: an element's function
                // children that return a single vnode are dropped by the
                // runtime in silence.
                h("div", { "data-scope": "image-viewer", "data-part": "toolbar" }, [
                  h(ButtonGroup, () => [
                    ...(props.zoomable
                      ? [
                          toolButton(messages.value.imageViewer.zoomIn, TOOL_ICONS.zoomIn, () =>
                            zoom(SCALE_STEP),
                          ),
                          toolButton(messages.value.imageViewer.zoomOut, TOOL_ICONS.zoomOut, () =>
                            zoom(-SCALE_STEP),
                          ),
                        ]
                      : []),
                    toolButton(messages.value.imageViewer.rotate, TOOL_ICONS.rotate, rotate),
                    closeToolButton(messages.value.imageViewer.close, TOOL_ICONS.close),
                  ]),
                ]),
              ],
            ),
          ),
        ],
      );
  },
});

const viewerParts = {
  ...(Dialog as unknown as Record<string, unknown>),
  Preview: ImageViewerPreview,
} as unknown as Parameters<typeof defineFamily>[1];

export const ImageViewer = defineFamily(
  ImageViewerFacade,
  viewerParts,
) as typeof ImageViewerFacade & (typeof Dialog & { Preview: typeof ImageViewerPreview });
