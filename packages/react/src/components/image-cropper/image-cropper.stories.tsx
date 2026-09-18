import { useImageCropper } from "@ark-ui/react/image-cropper";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { ImageCropper } from ".";

const meta: Meta = { title: "Components/Media/Image Cropper" };
export default meta;

const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
const PHOTO_ALT = "A mountain valley under morning light";

// zag positions handles by compass point: n/e/s/w and the four corners
const CORNER_POSITIONS = ["nw", "ne", "se", "sw"];

/** The framed viewport with its lit selection window, corner seals, and
 * the rule-of-thirds grid. */
function frame(...extra: React.ReactNode[]) {
  return (
    <>
      <ImageCropper.Viewport>
        <ImageCropper.Image src={PHOTO} alt={PHOTO_ALT} />
        <ImageCropper.Selection>
          {CORNER_POSITIONS.map((position) => (
            <ImageCropper.Handle key={position} position={position as any}>
              <div />
            </ImageCropper.Handle>
          ))}
          <ImageCropper.Grid axis="horizontal" />
          <ImageCropper.Grid axis="vertical" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
      {extra}
    </>
  );
}

function button(label: string, onClick: () => void, active = false) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        background: active ? "var(--bs-color-primary)" : "var(--bs-color-surface-2)",
        color: active ? "var(--bs-color-primary-text)" : "var(--bs-color-text-primary)",
        padding: "0.25rem 0.625rem",
        font: "inherit",
        fontSize: "var(--bs-font-size-sm)",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function toolbar(...buttons: React.ReactNode[]) {
  return <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>{buttons}</div>;
}

function readout(label: string, value: string) {
  return (
    <span style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
      {label} <b style={{ color: "var(--bs-color-text-primary)", fontWeight: 500 }}>{value}</b>
    </span>
  );
}

/** Drag the lit window to frame, pull the corner seals to resize; the rule
 * of thirds surfaces only while the frame is being decided. */
export const Basic = {
  render: () => <ImageCropper.Root>{frame()}</ImageCropper.Root>,
};

/** The frame locks to a ratio — 16:9, 1:1, or the vertical 9:16 plate. */
export const AspectRatio = {
  render: () => {
    const aspects = [
      { label: "16:9", value: 16 / 9 },
      { label: "1:1", value: 1 },
      { label: "9:16", value: 9 / 16 },
    ];
    const [ratio, setRatio] = useState(aspects[0].value);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(
          aspects.map((aspect) =>
            button(aspect.label, () => setRatio(aspect.value), ratio === aspect.value),
          ),
        )}
        <ImageCropper.Root aspectRatio={ratio}>{frame()}</ImageCropper.Root>
      </div>
    );
  },
};

/** The selection itself is cut round: the scrim outside, the circle within. */
export const Circle = {
  render: () => <ImageCropper.Root cropShape="circle">{frame()}</ImageCropper.Root>,
};

/** A fixed crop area: the frame is decided for the caller, the handles
 * step aside, only the photograph pans beneath. */
export const FixedCropArea = {
  render: () => (
    <ImageCropper.Root fixedCropArea>
      <ImageCropper.Viewport>
        <ImageCropper.Image src={PHOTO} alt={PHOTO_ALT} />
        <ImageCropper.Selection>
          <ImageCropper.Grid axis="horizontal" />
          <ImageCropper.Grid axis="vertical" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  ),
};

/** Zoom answers to state: the buttons move the photograph, the cropper
 * reports back the level. */
export const ControlledZoom = {
  render: () => {
    const [zoom, setZoom] = useState(1);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(
          button("−", () => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))),
          readout("Zoom", `${zoom.toFixed(1)}x`),
          button("+", () => setZoom((z) => +(z + 0.1).toFixed(2))),
        )}
        <ImageCropper.Root zoom={zoom} onZoomChange={(e: { zoom: number }) => setZoom(e.zoom)}>
          {frame()}
        </ImageCropper.Root>
      </div>
    );
  },
};

/** Quarter turns: the photograph rotates in steps and the readout keeps
 * the current angle. */
export const Rotation = {
  render: () => {
    const [rotation, setRotation] = useState(0);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(
          button("↺", () => setRotation((r) => r - 90)),
          readout("Angle", `${rotation}°`),
          button("↻", () => setRotation((r) => r + 90)),
        )}
        <ImageCropper.Root
          rotation={rotation}
          onRotationChange={(e: { rotation: number }) => setRotation(e.rotation)}
        >
          {frame()}
        </ImageCropper.Root>
      </div>
    );
  },
};

/** The photograph may be mirrored on either axis; the active mirror holds
 * the ink fill. */
export const Flip = {
  render: () => {
    const [flip, setFlip] = useState({ horizontal: false, vertical: false });
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(
          button(
            "Flip H",
            () => setFlip((f) => ({ ...f, horizontal: !f.horizontal })),
            flip.horizontal,
          ),
          button("Flip V", () => setFlip((f) => ({ ...f, vertical: !f.vertical })), flip.vertical),
        )}
        <ImageCropper.Root
          flip={flip}
          onFlipChange={(e: { flip: { horizontal: boolean; vertical: boolean } }) =>
            setFlip(e.flip)
          }
        >
          {frame()}
        </ImageCropper.Root>
      </div>
    );
  },
};

/** The frame starts where the caller says — an initial crop rectangle in
 * image pixels. */
export const InitialCrop = {
  render: () => (
    <ImageCropper.Root initialCrop={{ x: 50, y: 30, width: 200, height: 120 }}>
      {frame()}
    </ImageCropper.Root>
  ),
};

/** The frame may shrink to 80px or grow to 200px, and no further. */
export const MinMaxSize = {
  render: () => (
    <ImageCropper.Root minWidth={80} minHeight={80} maxWidth={200} maxHeight={200}>
      {frame()}
    </ImageCropper.Root>
  ),
};

/** Zoom is fenced between 0.5x and 2x; the buttons and the wheel both
 * stop at the fence. */
export const ZoomLimits = {
  render: () => (
    <ImageCropper.Root minZoom={0.5} maxZoom={2} zoomStep={0.1}>
      {frame()}
    </ImageCropper.Root>
  ),
};

/** The cropper api lives above the component: crop to a data URL and read
 * it back into a preview plate. */
export const CropPreview = {
  render: () => {
    const [preview, setPreview] = useState<string | null>(null);
    const cropper = useImageCropper();
    const crop = async () => {
      const result = await cropper.getCroppedImage({ output: "dataUrl" });
      if (typeof result === "string") setPreview(result);
    };
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(button("Crop image", crop, true))}
        <ImageCropper.RootProvider value={cropper}>
          <ImageCropper.Viewport>
            <ImageCropper.Image src={PHOTO} alt={PHOTO_ALT} crossOrigin="anonymous" />
            <ImageCropper.Selection>
              {CORNER_POSITIONS.map((position) => (
                <ImageCropper.Handle key={position} position={position as any}>
                  <div />
                </ImageCropper.Handle>
              ))}
              <ImageCropper.Grid axis="horizontal" />
              <ImageCropper.Grid axis="vertical" />
            </ImageCropper.Selection>
          </ImageCropper.Viewport>
        </ImageCropper.RootProvider>
        <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
          <span
            style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}
          >
            Preview
          </span>
          {preview ? (
            <img
              src={preview}
              alt="Cropped preview"
              style={{
                maxWidth: "12rem",
                borderRadius: "var(--bs-radius-md)",
                border: "1px solid var(--bs-color-border)",
              }}
            />
          ) : null}
        </div>
      </div>
    );
  },
};

/** One api, many moves: zoom, quarter turns, the mirror — then reset
 * hands the photograph back to its original posture. */
export const Reset = {
  render: () => {
    const cropper = useImageCropper();
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        {toolbar(
          button("−", () => cropper.zoomBy(-0.1)),
          button("+", () => cropper.zoomBy(0.1)),
          button("↺", () => cropper.rotateBy(-90)),
          button("↻", () => cropper.rotateBy(90)),
          button("Flip H", () => cropper.flipHorizontally()),
          button("Reset", () => cropper.reset()),
        )}
        <ImageCropper.RootProvider value={cropper}>{frame()}</ImageCropper.RootProvider>
      </div>
    );
  },
};

/** Every move reports: zoom, position, and size stream back as the frame
 * is worked. */
export const Events = {
  render: () => {
    const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [zoom, setZoom] = useState(1);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        <ImageCropper.Root
          onCropChange={(e: { crop: typeof crop }) => setCrop(e.crop)}
          onZoomChange={(e: { zoom: number }) => setZoom(e.zoom)}
        >
          {frame()}
        </ImageCropper.Root>
        {toolbar(
          readout("Zoom", `${zoom.toFixed(2)}x`),
          readout("Position", `${Math.round(crop.x)}, ${Math.round(crop.y)}`),
          readout("Size", `${Math.round(crop.width)} × ${Math.round(crop.height)}`),
        )}
      </div>
    );
  },
};
