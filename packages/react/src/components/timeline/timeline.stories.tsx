import type { Meta } from "@storybook/react-vite";

import { Timeline } from ".";

const meta: Meta = { title: "Components/Data/Timeline" };
export default meta;

const ink = { color: "var(--bs-color-text-primary)", fontWeight: "var(--bs-font-weight-medium)" };
const time = { color: "var(--bs-color-text-tertiary)", fontSize: "var(--bs-font-size-sm)" };

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

/** Content composes freely: this one carries only a title and a time,
 * the register staying as quiet as the thread. */
export const Compact = {
  render: () => (
    <Timeline.Root style={{ maxInlineSize: "24rem" }}>
      {(
        [
          ["Doors open", "2026-09-14 08:30"],
          ["First reading", "2026-09-14 09:00"],
          ["Closing remarks", "2026-09-14 11:30"],
        ] as const
      ).map(([title, when]) => (
        <Timeline.Item key={title}>
          <Timeline.Marker />
          <Timeline.Content>
            <span style={ink}>{title}</span>
            <span style={{ ...time, marginInlineStart: "var(--bs-space-2)" }}>{when}</span>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  ),
};
