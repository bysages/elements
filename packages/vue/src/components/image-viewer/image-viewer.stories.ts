import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { ImageViewer } from ".";
import { Button as ButtonControl } from "../button";
import { Image } from "../image";

const meta: Meta = { title: "Components/Media/Image Viewer" };
export default meta;
type Story = StoryObj<typeof ImageViewer>;

const FULL = "https://picsum.photos/seed/elements-viewer/1600/1000";
const THUMBNAIL = "https://picsum.photos/seed/elements-viewer/480/320";

/** The default trigger is the house preview icon. */
export const Basic: Story = {
  render: () =>
    h(ImageViewer, {
      src: FULL,
      alt: "A photograph from the archive",
    }),
};

/** A headless trigger can dress as any control. */
export const Button: Story = {
  render: () =>
    h(
      ImageViewer,
      {
        src: FULL,
        alt: "A photograph from the archive",
      },
      () => h(ButtonControl, () => "Open viewer"),
    ),
};

/** Without zoom the toolbar keeps only the turn and the close. */
export const NotZoomable: Story = {
  render: () =>
    h(
      ImageViewer,
      {
        src: FULL,
        alt: "A photograph from the archive",
        zoomable: false,
      },
      () =>
        h(ImageViewer.Preview, () =>
          h(Image, {
            src: THUMBNAIL,
            alt: "A photograph from the archive",
            width: 288,
            height: 192,
          }),
        ),
    ),
};
