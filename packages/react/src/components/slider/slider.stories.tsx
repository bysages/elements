import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Slider } from ".";

const meta: Meta = { title: "Components/Forms/Slider" };
export default meta;

/** One slider anatomy: the labeled heading row, the recessed track with
 * its ink range, one thumb per value. */
function slider(rootProps: any, label: string, values: number[], markers?: number[]) {
  return (
    <Slider.Root {...rootProps}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Slider.Label>{label}</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        {values.map((_, index) => (
          <Slider.Thumb key={index} index={index}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        ))}
      </Slider.Control>
      {markers ? (
        <Slider.MarkerGroup>
          {markers.map((value) => (
            <Slider.Marker key={value} value={value}>
              {String(value)}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      ) : null}
    </Slider.Root>
  );
}

const ROW = { display: "grid", gap: "1.5rem", maxWidth: "20rem" };

/** One thumb, one track, the ink filling left of the seal. */
export const Basic = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  render: (args: any) => (
    <div style={ROW}>
      {slider(
        {
          defaultValue: [40],
          min: args.min,
          max: args.max,
          step: args.step,
          disabled: args.disabled,
        },
        args.label,
        [40],
      )}
    </div>
  ),
};

/** Two thumbs share the track: the ink runs between them. */
export const Range = {
  render: () => <div style={ROW}>{slider({ defaultValue: [30, 60] }, "Band", [30, 60])}</div>,
};

/** The track stands upright; the ink rises from the bottom. */
export const Vertical = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem", height: "10rem", alignItems: "flex-start" }}>
      <Slider.Root orientation="vertical">
        <Slider.Label>Depth</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    </div>
  ),
};

/** The origin sits mid-track: values below it ink leftward, above it
 * rightward. */
export const CenterOrigin = {
  render: () => (
    <div style={ROW}>{slider({ origin: "center", defaultValue: [75] }, "Balance", [75])}</div>
  ),
};

/** The scale may run negative: -10 to 10, resting at 5. */
export const MinMax = {
  render: () => (
    <div style={ROW}>{slider({ min: -10, max: 10, defaultValue: [5] }, "Temperature", [5])}</div>
  ),
};

/** Fine steps: 0.01 between 5 and 10, so the thumb travels in hundredths. */
export const Step = {
  render: () => (
    <div style={ROW}>
      {slider({ step: 0.01, min: 5, max: 10, defaultValue: [7.5] }, "Precision", [7.5])}
    </div>
  ),
};

/** Tick markers ride under the track at every quarter. */
export const WithMarks = {
  render: () => (
    <div style={ROW}>{slider({ defaultValue: [50] }, "Exposure", [50], [0, 25, 50, 75, 100])}</div>
  ),
};

/** Push: dragging one thumb into the other shoves it along. */
export const ThumbCollision = {
  render: () => (
    <div style={ROW}>
      {slider({ thumbCollisionBehavior: "push", defaultValue: [25, 60] }, "Window", [25, 60])}
    </div>
  ),
};

/** Keep-apart: the thumbs hold five steps between them, no overlap. */
export const ThumbOverlap = {
  render: () => (
    <div style={ROW}>
      {slider({ minStepsBetweenThumbs: 5, defaultValue: [25, 60] }, "Spaced", [25, 60])}
    </div>
  ),
};

/** The thumb centers over its value instead of trailing to the edge. */
export const ThumbAlignment = {
  render: () => (
    <div style={ROW}>
      {slider({ thumbAlignment: "center", defaultValue: [50] }, "Centered", [50])}
    </div>
  ),
};

/** The value answers to the caller: the track only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<number[]>([40]);
    return (
      <div style={ROW}>
        {slider(
          {
            value,
            onValueChange: (e: { value: number[] }) => setValue(e.value),
          },
          "Controlled",
          value,
        )}
      </div>
    );
  },
};
