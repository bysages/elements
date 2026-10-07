import type { Meta } from "@storybook/react-vite";

import { ImageViewer } from ".";
import { Button as ButtonControl } from "../button";
import { Image } from "../image";

const meta: Meta = { title: "Components/Media/Image Viewer" };
export default meta;

const FULL = "https://picsum.photos/seed/elements-viewer/1600/1000";
const THUMBNAIL = "https://picsum.photos/seed/elements-viewer/480/320";

/** The default trigger is the house preview icon. */
export const Basic = {
  render: () => <ImageViewer src={FULL} alt="A photograph from the archive" />,
};

/** A headless trigger can dress as any control. */
export const Button = {
  render: () => (
    <ImageViewer src={FULL} alt="A photograph from the archive">
      <ButtonControl>Open viewer</ButtonControl>
    </ImageViewer>
  ),
};

/** Without zoom the toolbar keeps only the turn and the close. */
export const NotZoomable = {
  render: () => (
    <ImageViewer src={FULL} alt="A photograph from the archive" zoomable={false}>
      <ImageViewer.Preview>
        <Image src={THUMBNAIL} alt="A photograph from the archive" width={288} height={192} />
      </ImageViewer.Preview>
    </ImageViewer>
  ),
};
