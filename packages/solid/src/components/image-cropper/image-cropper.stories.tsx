import { ImageCropper } from ".";

const meta = { title: "Components/Media/Image Cropper" };
export default meta;

const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
const PHOTO_ALT = "A mountain valley under morning light";

/** Viewport, selection, handles, and grid arrive ready to use. */
export const Basic = {
  render: () => <ImageCropper src={PHOTO} alt={PHOTO_ALT} />,
};
