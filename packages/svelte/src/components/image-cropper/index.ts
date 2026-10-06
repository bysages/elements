import { ImageCropper as ArkImageCropper } from "@ark-ui/svelte/image-cropper";

import { defineFamily } from "../../internal/family";
import ImageCropperFacade from "./ImageCropper.svelte";
import ImageCropperRoot from "./ImageCropperRoot.svelte";

/** Ark's ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The API is Ark's own — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
export const ImageCropper: typeof ImageCropperFacade &
  Omit<typeof ArkImageCropper, "Root"> & {
    Root: typeof ImageCropperRoot;
  } = defineFamily(ImageCropperFacade, {
  ...ArkImageCropper,
  Root: ImageCropperRoot,
});
