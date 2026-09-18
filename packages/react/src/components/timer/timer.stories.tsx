import type { Meta } from "@storybook/react-vite";
import { Fragment, useState } from "react";

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

/** The shared face: digit area with labelled units, then start, pause,
 * and reset. */
function Face({
  rootProps,
  units,
  separator = ":",
}: {
  rootProps: any;
  units: Array<{ type: string; label: string }>;
  separator?: string;
}) {
  return (
    <Timer.Root {...rootProps}>
      <Timer.Area>
        {units.map((unit, index) => (
          <Fragment key={unit.type}>
            {index > 0 && <Timer.Separator>{separator}</Timer.Separator>}
            <div style={{ display: "grid", justifyItems: "center", gap: "0.125rem" }}>
              <Timer.Item type={unit.type as any} />
              <span
                style={{
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                }}
              >
                {unit.label}
              </span>
            </div>
          </Fragment>
        ))}
      </Timer.Area>
      <Timer.Control>
        <Timer.ActionTrigger action="start">
          <Glyph d="M7 4.5v15l12-7.5z" /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">
          <Glyph d="M8 5v14M16 5v14" /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">
          <Glyph d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer.Root>
  );
}

/** A stopwatch with tenths: the interval prop tunes the tick finer than
 * seconds. */
export function Interval() {
  return (
    <Face
      rootProps={{ interval: 100, targetMs: 60 * 1000, autoStart: false } as any}
      units={[
        { type: "seconds", label: "sec" },
        { type: "milliseconds", label: "ms" },
      ]}
      separator="."
    />
  );
}

/** The machine speaks as it runs: each tick advances a visible counter,
 * completion is announced. */
export function Events() {
  const [ticks, setTicks] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <Face
        rootProps={
          {
            startMs: 10 * 1000,
            targetMs: 0,
            countdown: true,
            autoStart: false,
            onTick: () => setTicks((t) => t + 1),
            onComplete: () => setDone(true),
          } as any
        }
        units={[{ type: "seconds", label: "sec" }]}
      />
      <output style={{ fontSize: "var(--bs-font-size-sm)" }}>
        {`Ticks: ${ticks}${done ? " — complete" : ""}`}
      </output>
    </div>
  );
}

/** Work and break alternate on one machine: completion swaps the phase
 * and restarts the clock. */
export function Pomodoro() {
  const [working, setWorking] = useState(true);
  const [cycles, setCycles] = useState(0);
  return (
    <Timer.Root
      startMs={(working ? 25 : 5) * 60 * 1000}
      countdown
      autoStart={false}
      onComplete={() => {
        if (!working) setCycles((c) => c + 1);
        setWorking((w) => !w);
      }}
    >
      <p style={{ margin: 0, fontFamily: "var(--bs-font-serif)" }}>
        {working ? "Work session" : "Break session"}
      </p>
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
        <Timer.ActionTrigger action="reset">
          <Glyph d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>
      <output style={{ fontSize: "var(--bs-font-size-sm)" }}>
        {`Completed breaks: ${cycles}`}
      </output>
    </Timer.Root>
  );
}
