import { ImageCropper as ArkImageCropper } from "@ark-ui/react/image-cropper";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** ImageCropper, dressed in the paper-and-ink system: a rounded vessel
 * holding the photograph, one lit selection window framed by light hairlines.
 * The API is Ark's own — Root, Viewport, Image, Selection, Handle, Grid,
 * Context. */
function ImageCropperRoot(props: ComponentProps<typeof ArkImageCropper.Root>) {
  const id = useElementId("image-cropper", props);

  return <ArkImageCropper.Root {...props} id={id} />;
}

export interface ImageCropperFacadeProps {
  src: string;
  alt?: string;
}

/** The complete cropper behind one photograph: viewport, selection frame,
 * corner handles, and ruling grid arrive ready to use. */
function ImageCropperFacade({ src, alt }: ImageCropperFacadeProps) {
  return (
    <ImageCropperRoot>
      <ArkImageCropper.Viewport>
        <ArkImageCropper.Image src={src} alt={alt} />
        <ArkImageCropper.Selection>
          {(["nw", "ne", "se", "sw"] as const).map((position) => (
            <ArkImageCropper.Handle key={position} position={position}>
              <div />
            </ArkImageCropper.Handle>
          ))}
          <ArkImageCropper.Grid axis="horizontal" />
          <ArkImageCropper.Grid axis="vertical" />
        </ArkImageCropper.Selection>
      </ArkImageCropper.Viewport>
    </ImageCropperRoot>
  );
}

export const ImageCropper = Object.assign(ImageCropperFacade, {
  ...ArkImageCropper,
  Root: ImageCropperRoot,
}) as typeof ImageCropperFacade & typeof ArkImageCropper & { Root: typeof ImageCropperRoot };

injectComponentStyle("image-cropper");
