import { ImageCropper as ArkImageCropper } from "@ark-ui/vue/image-cropper";
import { injectComponentStyle } from "@bysages/core";

/** ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The parts — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
export const ImageCropper = ArkImageCropper;

injectComponentStyle("image-cropper");
