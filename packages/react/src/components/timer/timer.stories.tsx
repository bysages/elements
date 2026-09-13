import type { Meta } from "@storybook/react-vite";

import { Timer } from ".";

const meta: Meta = { title: "Components/Data/Timer" };
export default meta;

function Glyph({ d }: { d: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/** A counting-up clock: monospaced digits, one quiet start control. */
export function Basic() {
  return (
    <Timer.Root startMs={18 * 60 * 1000 + 42 * 1000}>
      <Timer.Area>
        <Timer.Item type="hours" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="minutes" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="seconds" />
      </Timer.Area>
      <Timer.Control>
        <Timer.ActionTrigger action="start">
          <Glyph d="M7 4.5v15l12-7.5z" /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">
          <Glyph d="M8 5v14M16 5v14" /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      </Timer.Control>
    </Timer.Root>
  );
}

/** A countdown with a target — the machine stops and announces completion
 * on its own. */
export function Countdown() {
  return (
    <Timer.Root startMs={5 * 60 * 1000} targetMs={0} countdown autoStart={false}>
      <Timer.Area>
        <Timer.Item type="minutes" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="seconds" />
      </Timer.Area>
      <Timer.Control>
        <Timer.ActionTrigger action="start">
          <Glyph d="M7 4.5v15l12-7.5z" /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">
          <Glyph d="M8 5v14M16 5v14" /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      </Timer.Control>
    </Timer.Root>
  );
}
