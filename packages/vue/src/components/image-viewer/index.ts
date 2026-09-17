import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, watch } from "vue";
import { Teleport } from "vue";

import { Button } from "../button";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/** The toolbar's line-drawn glyphs, fresh per render. */
const TOOL_GLYPHS = {
  zoomIn: () => [
    h("circle", { cx: 11, cy: 11, r: 7 }),
    h("path", { d: "m16.2 16.2 4.8 4.8" }),
    h("path", { d: "M8 11h6" }),
    h("path", { d: "M11 8v6" }),
  ],
  zoomOut: () => [
    h("circle", { cx: 11, cy: 11, r: 7 }),
    h("path", { d: "m16.2 16.2 4.8 4.8" }),
    h("path", { d: "M8 11h6" }),
  ],
  rotate: () => [
    h("path", { d: "M20.49 12A8.5 8.5 0 1 1 18 6.06" }),
    h("path", { d: "M20.5 3.5v4h-4" }),
  ],
  close: () => [h("path", { d: "m6 6 12 12" }), h("path", { d: "M18 6 6 18" })],
};

/**
 * A lightbox: the picture over a dimmed page, with a small toolbar
 * beneath it. Zoom is the reader's hand (half to three times, clamped),
 * a quarter turn at a time rotates, Escape and the scrim close — the
 * dialog machine carries the modal part. `open` may stay with the
 * caller; left undefined the viewer keeps it to itself.
 */
export interface ImageViewerProps {
  src: string;
  alt?: string;
  open?: boolean;
  zoomable?: boolean;
}

export const ImageViewer = defineComponent({
  name: "ImageViewer",
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    open: { type: Boolean, default: undefined },
    zoomable: { type: Boolean, default: true },
  },
  emits: {
    "update:open": (_value: boolean) => true,
  },
  setup(props, ctx: SetupContext) {
    // Controlled when the caller owns `open`; uncontrolled otherwise —
    // an undefined `open` must not reach the machine, or it would
    // override the machine's own decisions.
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

    function toolButton(label: string, glyph: () => any[], onClick: () => void) {
      return h(
        Button,
        { variant: "ghost", square: true, size: "lg", "aria-label": label, onClick },
        () =>
          h(
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
            glyph(),
          ),
      );
    }

    return () =>
      h(
        ArkDialog.Root,
        {
          // The picture is heavy: nothing of the lightbox rests in the
          // page while it is closed.
          open: isOpen(),
          "onUpdate:open": setOpen,
          lazyMount: true,
          unmountOnExit: true,
        },
        () => [
          h(Teleport, { to: "body" }, [
            h(ArkDialog.Backdrop, { class: "bs-image-viewer-backdrop" }),
            h(ArkDialog.Positioner, { class: "bs-image-viewer-positioner" }, () =>
              h(
                ArkDialog.Content,
                { class: "bs-image-viewer-content", "aria-label": props.alt || "Image preview" },
                () => [
                  h("img", {
                    "data-scope": "image-viewer",
                    "data-part": "viewport",
                    src: props.src,
                    alt: props.alt,
                    style: {
                      transform: `scale(${scale.value}) rotate(${rotation.value}deg)`,
                    },
                  }),
                  h("div", { "data-scope": "image-viewer", "data-part": "toolbar" }, () => [
                    ...(props.zoomable
                      ? [
                          toolButton("Zoom in", TOOL_GLYPHS.zoomIn, () => zoom(SCALE_STEP)),
                          toolButton("Zoom out", TOOL_GLYPHS.zoomOut, () => zoom(-SCALE_STEP)),
                        ]
                      : []),
                    toolButton("Rotate 90 degrees", TOOL_GLYPHS.rotate, rotate),
                    toolButton("Close", TOOL_GLYPHS.close, () => setOpen(false)),
                  ]),
                ],
              ),
            ),
          ]),
        ],
      );
  },
});

injectComponentStyle("image-viewer");
