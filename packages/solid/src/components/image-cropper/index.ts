import { ImageCropper as ArkImageCropper } from "@ark-ui/solid/image-cropper";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The API is Ark's own — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
function ImageCropperRoot(props: ComponentProps<typeof ArkImageCropper.Root>) {
  const id = useElementId("image-cropper", () => props.id);

  return createComponent(
    ArkImageCropper.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const ImageCropper: typeof ImageCropperRoot &
  Omit<typeof ArkImageCropper, "Root"> & { Root: typeof ImageCropperRoot } = defineFamily(
  ImageCropperRoot,
  {
    ...ArkImageCropper,
    Root: ImageCropperRoot,
  },
);
injectComponentStyle("image-cropper");
