import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { ImageViewer } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Media/Image Viewer" };
export default meta;

const SAMPLE = "https://picsum.photos/seed/elements-viewer/1600/1000";

/** Open, zoom, quarter-turn, Escape — the machine carries the modal
 * part, the toolbar keeps its own small register under the picture. */
export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open viewer</Button>
        <ImageViewer
          src={SAMPLE}
          alt="A photograph from the archive"
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

/** Without zoom the toolbar keeps only the turn and the close. */
export const NotZoomable = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open (no zoom)
        </Button>
        <ImageViewer
          src={SAMPLE}
          alt="A photograph from the archive"
          zoomable={false}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};
