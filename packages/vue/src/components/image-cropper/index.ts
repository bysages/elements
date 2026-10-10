import { ImageCropper as ArkImageCropper } from "@ark-ui/vue/image-cropper";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The parts — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
const ImageCropperRoot = defineComponent({
  name: "SImageCropperRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("image-cropper", attrs);

    return () => h(ArkImageCropper.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The complete cropper behind one photograph: the viewport, selection
 * frame, corner handles, and ruling grid arrive ready to use. */
const ImageCropperFacade = defineComponent({
  name: "SImageCropper",
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    injectComponentStyle("image-cropper");

    return () =>
      h(ImageCropperRoot, attrs, () => [
        h(ArkImageCropper.Viewport, () => [
          h(ArkImageCropper.Image as never, { src: props.src, alt: props.alt }),
          h(ArkImageCropper.Selection, () => [
            ...["nw", "ne", "se", "sw"].map((position) =>
              h(ArkImageCropper.Handle as never, { key: position, position }, () => h("div")),
            ),
            h(ArkImageCropper.Grid, { axis: "horizontal" }),
            h(ArkImageCropper.Grid, { axis: "vertical" }),
          ]),
        ]),
      ]);
  },
});

export const ImageCropper = defineFamily(ImageCropperFacade, {
  ...ArkImageCropper,
  Root: ImageCropperRoot,
}) as unknown as typeof ImageCropperFacade &
  Omit<typeof ArkImageCropper, "Root"> & { Root: typeof ImageCropperRoot };

injectComponentStyle("image-cropper");
