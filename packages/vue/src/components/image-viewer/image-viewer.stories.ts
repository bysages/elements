import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { ImageViewer } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Media/Image Viewer" };
export default meta;
type Story = StoryObj<typeof ImageViewer>;

const SAMPLE = "https://picsum.photos/seed/elements-viewer/1600/1000";

/** Open, zoom, quarter-turn, Escape — the machine carries the modal
 * part, the toolbar keeps its own small register under the picture. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () => [
        h(Button, { onClick: () => (state.open = true) }, () => "Open viewer"),
        h(ImageViewer, {
          src: SAMPLE,
          alt: "A photograph from the archive",
          open: state.open,
          "onUpdate:open": (value: boolean) => (state.open = value),
        }),
      ];
    }),
};

/** Without zoom the toolbar keeps only the turn and the close. */
export const NotZoomable: Story = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () => [
        h(
          Button,
          { variant: "outline", onClick: () => (state.open = true) },
          () => "Open (no zoom)",
        ),
        h(ImageViewer, {
          src: SAMPLE,
          alt: "A photograph from the archive",
          zoomable: false,
          open: state.open,
          "onUpdate:open": (value: boolean) => (state.open = value),
        }),
      ];
    }),
};
