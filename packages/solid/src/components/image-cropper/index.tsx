import { ImageCropper as ArkImageCropper } from "@ark-ui/solid/image-cropper";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createComponent, mergeProps, type ComponentProps } from "solid-js";

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

export interface ImageCropperFacadeProps {
  src: string;
  alt?: string;
}

/** The complete cropper behind one photograph: the viewport, selection
 * frame, corner handles, and ruling grid arrive ready to use. */
function ImageCropperFacade(props: ImageCropperFacadeProps) {
  injectComponentStyle("image-cropper");

  return (
    <ImageCropperRoot>
      <ArkImageCropper.Viewport>
        <ArkImageCropper.Image src={props.src} alt={props.alt} />
        <ArkImageCropper.Selection>
          <For each={["nw", "ne", "se", "sw"] as const}>
            {(position) => (
              <ArkImageCropper.Handle position={position}>
                <div />
              </ArkImageCropper.Handle>
            )}
          </For>
          <ArkImageCropper.Grid axis="horizontal" />
          <ArkImageCropper.Grid axis="vertical" />
        </ArkImageCropper.Selection>
      </ArkImageCropper.Viewport>
    </ImageCropperRoot>
  );
}

export const ImageCropper: typeof ImageCropperFacade &
  Omit<typeof ArkImageCropper, "Root"> & { Root: typeof ImageCropperRoot } = defineFamily(
  ImageCropperFacade,
  {
    ...ArkImageCropper,
    Root: ImageCropperRoot,
  },
);
injectComponentStyle("image-cropper");
