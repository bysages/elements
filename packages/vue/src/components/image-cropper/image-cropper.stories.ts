import { useImageCropper } from "@ark-ui/vue/image-cropper";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { ImageCropper } from ".";

const meta: Meta = { title: "Components/Forms/Image Cropper" };
export default meta;

const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
const PHOTO_ALT = "A mountain valley under morning light";

// zag positions handles by compass point: n/e/s/w and the four corners
const cornerPositions = ["nw", "ne", "se", "sw"];

/** The framed viewport with its lit selection window, corner seals, and
 * the rule-of-thirds grid. */
function frame(...extra: any[]) {
  return [
    h(ImageCropper.Viewport, () => [
      h(ImageCropper.Image, { src: PHOTO, alt: PHOTO_ALT }),
      h(ImageCropper.Selection, () => [
        cornerPositions.map((position) =>
          h(ImageCropper.Handle, { key: position, position } as any, () => h("div")),
        ),
        h(ImageCropper.Grid, { axis: "horizontal" }),
        h(ImageCropper.Grid, { axis: "vertical" }),
      ]),
    ]),
    ...extra,
  ];
}

function button(label: string, onClick: () => void, active = false) {
  return h(
    "button",
    {
      type: "button",
      onClick,
      style: {
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        background: active ? "var(--bs-color-primary)" : "var(--bs-color-surface-2)",
        color: active ? "var(--bs-color-primary-text)" : "var(--bs-color-text-primary)",
        padding: "0.25rem 0.625rem",
        font: "inherit",
        fontSize: "var(--bs-font-size-sm)",
        cursor: "pointer",
      },
    },
    label,
  );
}

function toolbar(...buttons: any[]) {
  return h("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" } }, buttons);
}

function readout(label: string, value: string) {
  return h(
    "span",
    { style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" } },
    [
      `${label} `,
      h("b", { style: { color: "var(--bs-color-text-primary)", fontWeight: 500 } }, value),
    ],
  );
}

/** Drag the lit window to frame, pull the corner seals to resize; the rule
 * of thirds surfaces only while the frame is being decided. */
export const Basic = {
  render: () => h(ImageCropper.Root, () => frame()),
};

/** The frame locks to a ratio — 16:9, 1:1, or the vertical 9:16 plate. */
export const AspectRatio = {
  render: () => {
    const aspects = [
      { label: "16:9", value: 16 / 9 },
      { label: "1:1", value: 1 },
      { label: "9:16", value: 9 / 16 },
    ];
    const Cropper = defineComponent({
      name: "AspectRatioCropper",
      setup() {
        const state = reactive({ ratio: aspects[0].value });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(
              aspects.map((aspect) =>
                button(
                  aspect.label,
                  () => (state.ratio = aspect.value),
                  state.ratio === aspect.value,
                ),
              ),
            ),
            h(ImageCropper.Root, { aspectRatio: state.ratio } as any, () => frame()),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** The selection itself is cut round: the scrim outside, the circle within. */
export const Circle = {
  render: () => h(ImageCropper.Root, { cropShape: "circle" } as any, () => frame()),
};

/** A fixed crop area: the frame is decided for the caller, the handles
 * step aside, only the photograph pans beneath. */
export const FixedCropArea = {
  render: () =>
    h(ImageCropper.Root, { fixedCropArea: true } as any, () => [
      h(ImageCropper.Viewport, () => [
        h(ImageCropper.Image, { src: PHOTO, alt: PHOTO_ALT }),
        h(ImageCropper.Selection, () => [
          h(ImageCropper.Grid, { axis: "horizontal" }),
          h(ImageCropper.Grid, { axis: "vertical" }),
        ]),
      ]),
    ]),
};

/** Zoom answers to state: the buttons move the photograph, the cropper
 * reports back the level. */
export const ControlledZoom = {
  render: () => {
    const Cropper = defineComponent({
      name: "ControlledZoomCropper",
      setup() {
        const state = reactive({ zoom: 1 });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(
              button("−", () => (state.zoom = Math.max(1, +(state.zoom - 0.1).toFixed(2)))),
              readout("Zoom", `${state.zoom.toFixed(1)}x`),
              button("+", () => (state.zoom = +(state.zoom + 0.1).toFixed(2))),
            ),
            h(
              ImageCropper.Root,
              {
                zoom: state.zoom,
                onZoomChange: (e: { zoom: number }) => (state.zoom = e.zoom),
              } as any,
              () => frame(),
            ),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** Quarter turns: the photograph rotates in steps and the readout keeps
 * the current angle. */
export const Rotation = {
  render: () => {
    const Cropper = defineComponent({
      name: "RotationCropper",
      setup() {
        const state = reactive({ rotation: 0 });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(
              button("↺", () => (state.rotation -= 90)),
              readout("Angle", `${state.rotation}°`),
              button("↻", () => (state.rotation += 90)),
            ),
            h(
              ImageCropper.Root,
              {
                rotation: state.rotation,
                onRotationChange: (e: { rotation: number }) => (state.rotation = e.rotation),
              } as any,
              () => frame(),
            ),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** The photograph may be mirrored on either axis; the active mirror holds
 * the ink fill. */
export const Flip = {
  render: () => {
    const Cropper = defineComponent({
      name: "FlipCropper",
      setup() {
        const state = reactive({ horizontal: false, vertical: false });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(
              button("Flip H", () => (state.horizontal = !state.horizontal), state.horizontal),
              button("Flip V", () => (state.vertical = !state.vertical), state.vertical),
            ),
            h(
              ImageCropper.Root,
              {
                flip: state,
                onFlipChange: (e: { flip: { horizontal: boolean; vertical: boolean } }) =>
                  Object.assign(state, e.flip),
              } as any,
              () => frame(),
            ),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** The frame starts where the caller says — an initial crop rectangle in
 * image pixels. */
export const InitialCrop = {
  render: () =>
    h(ImageCropper.Root, { initialCrop: { x: 50, y: 30, width: 200, height: 120 } } as any, () =>
      frame(),
    ),
};

/** The frame may shrink to 80px or grow to 200px, and no further. */
export const MinMaxSize = {
  render: () =>
    h(
      ImageCropper.Root,
      { minWidth: 80, minHeight: 80, maxWidth: 200, maxHeight: 200 } as any,
      () => frame(),
    ),
};

/** Zoom is fenced between 0.5x and 2x; the buttons and the wheel both
 * stop at the fence. */
export const ZoomLimits = {
  render: () =>
    h(ImageCropper.Root, { minZoom: 0.5, maxZoom: 2, zoomStep: 0.1 } as any, () => frame()),
};

/** The cropper api lives above the component: crop to a data URL and read
 * it back into a preview plate. */
export const CropPreview = {
  render: () => {
    const Cropper = defineComponent({
      name: "CropPreviewCropper",
      setup() {
        const imageCropper = useImageCropper();
        const state = reactive({ preview: null as string | null });
        const crop = async () => {
          const result = await imageCropper.value.getCroppedImage({ output: "dataUrl" });
          if (typeof result === "string") state.preview = result;
        };
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(button("Crop image", crop, true)),
            h(ImageCropper.RootProvider, { value: imageCropper.value } as any, () => [
              h(ImageCropper.Viewport, () => [
                h(ImageCropper.Image, {
                  src: PHOTO,
                  alt: PHOTO_ALT,
                  crossOrigin: "anonymous",
                }),
                h(ImageCropper.Selection, () => [
                  cornerPositions.map((position) =>
                    h(ImageCropper.Handle, { key: position, position } as any, () => h("div")),
                  ),
                  h(ImageCropper.Grid, { axis: "horizontal" }),
                  h(ImageCropper.Grid, { axis: "vertical" }),
                ]),
              ]),
            ]),
            h(
              "div",
              {
                style: {
                  display: "grid",
                  gap: "0.5rem",
                  justifyItems: "start",
                },
              },
              [
                h(
                  "span",
                  {
                    style: {
                      fontSize: "var(--bs-font-size-sm)",
                      color: "var(--bs-color-text-tertiary)",
                    },
                  },
                  "Preview",
                ),
                state.preview
                  ? h("img", {
                      src: state.preview,
                      alt: "Cropped preview",
                      style: {
                        maxWidth: "12rem",
                        borderRadius: "var(--bs-radius-md)",
                        border: "1px solid var(--bs-color-border)",
                      },
                    })
                  : null,
              ],
            ),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** One api, many moves: zoom, quarter turns, the mirror — then reset
 * hands the photograph back to its original posture. */
export const Reset = {
  render: () => {
    const Cropper = defineComponent({
      name: "ResetCropper",
      setup() {
        const imageCropper = useImageCropper();
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            toolbar(
              button("−", () => imageCropper.value.zoomBy(-0.1)),
              button("+", () => imageCropper.value.zoomBy(0.1)),
              button("↺", () => imageCropper.value.rotateBy(-90)),
              button("↻", () => imageCropper.value.rotateBy(90)),
              button("Flip H", () => imageCropper.value.flipHorizontally()),
              button("Reset", () => imageCropper.value.reset()),
            ),
            h(ImageCropper.RootProvider, { value: imageCropper.value } as any, () => frame()),
          ]);
      },
    });
    return h(Cropper);
  },
};

/** Every move reports: zoom, position, and size stream back as the frame
 * is worked. */
export const Events = {
  render: () => {
    const Cropper = defineComponent({
      name: "EventsCropper",
      setup() {
        const state = reactive({ crop: { x: 0, y: 0, width: 0, height: 0 }, zoom: 1 });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
            h(
              ImageCropper.Root,
              {
                onCropChange: (e: { crop: typeof state.crop }) => (state.crop = e.crop),
                onZoomChange: (e: { zoom: number }) => (state.zoom = e.zoom),
              } as any,
              () => frame(),
            ),
            toolbar(
              readout("Zoom", `${state.zoom.toFixed(2)}x`),
              readout("Position", `${Math.round(state.crop.x)}, ${Math.round(state.crop.y)}`),
              readout("Size", `${Math.round(state.crop.width)} × ${Math.round(state.crop.height)}`),
            ),
          ]);
      },
    });
    return h(Cropper);
  },
};
