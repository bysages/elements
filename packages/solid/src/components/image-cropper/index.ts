import { ImageCropper as ArkImageCropper } from "@ark-ui/solid/image-cropper";
import { injectComponentStyle } from "@bysages/core";

/** Ark's ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The API is Ark's own — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
export const ImageCropper = ArkImageCropper;

injectComponentStyle("image-cropper");
