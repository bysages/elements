import type { Meta } from "@storybook/react-vite";

import { Timeline } from ".";

const meta: Meta = { title: "Components/Data/Timeline" };
export default meta;

const moments = [
  {
    title: "The ground is laid",
    body: "Warm paper, ambient shade — the page rests before it speaks.",
  },
  {
    title: "Ink is set",
    body: "Type carries the hierarchy; pigment waits for meaning.",
  },
  {
    title: "Light is timed",
    body: "Shadows trail their fills — light needs time.",
  },
];

export const Basic = {
  render: () => (
    <Timeline.Root style={{ maxWidth: "34rem" }}>
      {moments.map((moment) => (
        <Timeline.Item key={moment.title}>
          <Timeline.Marker />
          <Timeline.Content>
            <p style={{ margin: 0, fontWeight: 600 }}>{moment.title}</p>
            <p style={{ margin: 0 }}>{moment.body}</p>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  ),
};
