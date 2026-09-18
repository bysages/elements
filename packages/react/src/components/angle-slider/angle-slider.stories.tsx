import { useAngleSlider } from "@ark-ui/react/angle-slider";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { AngleSlider } from ".";

const meta: Meta = { title: "Components/Forms/Angle Slider" };
export default meta;

const MARKS = [0, 45, 90, 135, 180, 225, 270, 315];

function markGroup() {
  return (
    <AngleSlider.MarkerGroup>
      {MARKS.map((value) => (
        <AngleSlider.Marker key={value} value={value} />
      ))}
    </AngleSlider.MarkerGroup>
  );
}

function dial(label: string): ReactNode[] {
  return [
    <div key="head" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <AngleSlider.Label>{label}</AngleSlider.Label>
      <AngleSlider.ValueText />
    </div>,
    <AngleSlider.Control key="control">
      {markGroup()}
      <AngleSlider.Thumb>
        <AngleSlider.HiddenInput />
      </AngleSlider.Thumb>
    </AngleSlider.Control>,
  ];
}

/** The dial: eight marks of the compass rose, the thumb dragged around the
 * circle. */
export const Basic = {
  args: {
    label: "Rotation",
  },
  render: (args: any) => <AngleSlider.Root defaultValue={45}>{dial(args.label)}</AngleSlider.Root>,
};

/** The dial reads its own state: the label names the current bearing. */
export const Context = {
  render: () => (
    <AngleSlider.Root>
      <AngleSlider.Context>
        {(ctx: { value: number }) => <AngleSlider.Label>{ctx.value} degrees</AngleSlider.Label>}
      </AngleSlider.Context>
      <AngleSlider.Control>
        {markGroup()}
        <AngleSlider.Thumb>
          <AngleSlider.HiddenInput />
        </AngleSlider.Thumb>
      </AngleSlider.Control>
      <AngleSlider.ValueText />
    </AngleSlider.Root>
  ),
};

/** The bearing answers to the caller — the dial only mirrors it. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState(45);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" }}
        >
          {value}°
        </output>
        <AngleSlider.Root value={value} onValueChange={(e: { value: number }) => setValue(e.value)}>
          {dial("Rotation")}
        </AngleSlider.Root>
      </div>
    );
  },
};

/** A dial retired from service: no drag, no keys. */
export const Disabled = {
  render: () => (
    <AngleSlider.Root disabled defaultValue={45}>
      {dial("Rotation")}
    </AngleSlider.Root>
  ),
};

/** Fifteen degrees at a time: the thumb lands on every spoke. */
export const Step = {
  render: () => <AngleSlider.Root step={15}>{dial("15 Step")}</AngleSlider.Root>,
};

/** The machine answers outside its anatomy: the provider owns the dial. */
function RootProviderDriver() {
  const angleSlider = useAngleSlider({ defaultValue: 90 });
  return (
    <AngleSlider.RootProvider value={angleSlider}>{dial("Rotation")}</AngleSlider.RootProvider>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
