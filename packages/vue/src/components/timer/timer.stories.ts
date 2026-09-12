import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Timer } from "./index.js";

const meta: Meta = { title: "Components / Timer" };
export default meta;

function glyph(d: string) {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d })],
  );
}

const play = () => glyph("M7 4.5v15l12-7.5z");
const pause = () => glyph("M8 5v14M16 5v14");
const reset = () => glyph("M3 12a9 9 0 1 0 3-6.7M3 4v5h5");

/** The shared face: digit area with labelled units, then start, pause,
 * and reset. */
function face(rootProps: any, units: Array<{ type: string; label: string }>, separator = ":") {
  return h(Timer.Root, rootProps, () => [
    h(Timer.Area, () =>
      units
        .flatMap((unit, index) => [
          index > 0 && h(Timer.Separator, () => separator),
          h("div", { style: { display: "grid", justifyItems: "center", gap: "0.125rem" } }, () => [
            h(Timer.Item, { type: unit.type } as any),
            h(
              "span",
              {
                style: {
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                },
              },
              () => unit.label,
            ),
          ]),
        ])
        .filter(Boolean),
    ),
    h(Timer.Control, () => [
      h(Timer.ActionTrigger, { action: "start" }, () => [play(), "Start"]),
      h(Timer.ActionTrigger, { action: "pause" }, () => [pause(), "Pause"]),
      h(Timer.ActionTrigger, { action: "resume" }, () => "Resume"),
      h(Timer.ActionTrigger, { action: "reset" }, () => [reset(), "Reset"]),
    ]),
  ]);
}

/** A counting-up clock: monospaced digits riding the machine's tick. */
export const Basic = {
  render: () =>
    face({ startMs: 18 * 60 * 1000 + 42 * 1000 }, [
      { type: "minutes", label: "min" },
      { type: "seconds", label: "sec" },
    ]),
};

/** Five minutes falling: the machine stops itself at zero. */
export const Countdown = {
  render: () =>
    face({ startMs: 5 * 60 * 1000, countdown: true, autoStart: false }, [
      { type: "minutes", label: "min" },
      { type: "seconds", label: "sec" },
    ]),
};

/** A stopwatch with tenths: the interval prop tunes the tick finer than
 * seconds. */
export const Interval = {
  render: () =>
    face(
      { interval: 100, targetMs: 60 * 1000, autoStart: false } as any,
      [
        { type: "seconds", label: "sec" },
        { type: "milliseconds", label: "ms" },
      ],
      ".",
    ),
};

/** The machine speaks as it runs: each tick advances a visible counter,
 * completion is announced. */
export const Events = {
  render: () =>
    withState(() => {
      const state = reactive({ ticks: 0, done: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          face(
            {
              startMs: 10 * 1000,
              targetMs: 0,
              countdown: true,
              autoStart: false,
              onTick: () => (state.ticks += 1),
              onComplete: () => (state.done = true),
            } as any,
            [{ type: "seconds", label: "sec" }],
          ),
          h(
            "output",
            { style: { fontSize: "var(--bs-font-size-sm)" } },
            () => `Ticks: ${state.ticks}${state.done ? " — complete" : ""}`,
          ),
        ]);
    }),
};

/** Work and break alternate on one machine: completion swaps the phase
 * and restarts the clock. */
export const Pomodoro = {
  render: () =>
    withState(() => {
      const state = reactive({ working: true, cycles: 0 });
      return () =>
        h(
          Timer.Root,
          {
            startMs: (state.working ? 25 : 5) * 60 * 1000,
            countdown: true,
            autoStart: false,
            onComplete: () => {
              if (!state.working) state.cycles += 1;
              state.working = !state.working;
            },
          } as any,
          () => [
            h("p", { style: { margin: 0, fontFamily: "var(--bs-font-serif)" } }, () =>
              state.working ? "Work session" : "Break session",
            ),
            h(Timer.Area, () => [
              h(Timer.Item, { type: "minutes" }),
              h(Timer.Separator, () => ":"),
              h(Timer.Item, { type: "seconds" }),
            ]),
            h(Timer.Control, () => [
              h(Timer.ActionTrigger, { action: "start" }, () => [play(), "Start"]),
              h(Timer.ActionTrigger, { action: "pause" }, () => [pause(), "Pause"]),
              h(Timer.ActionTrigger, { action: "reset" }, () => [reset(), "Reset"]),
            ]),
            h(
              "output",
              { style: { fontSize: "var(--bs-font-size-sm)" } },
              () => `Completed breaks: ${state.cycles}`,
            ),
          ],
        );
    }),
};
