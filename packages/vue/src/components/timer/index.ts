import { Timer as ArkTimer } from "@ark-ui/vue/timer";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The parts — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
const TimerRoot = defineComponent({
  name: "STimerRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("timer", attrs);

    return () => h(ArkTimer.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The complete timer behind one duration: minute and second digits with
 * start, pause, resume, and reset. Finer intervals and custom faces remain
 * anatomy work. */
const TimerFacade = defineComponent({
  name: "STimer",
  props: {
    startMs: { type: Number, default: 0 },
    targetMs: { type: Number, default: undefined },
    countdown: { type: Boolean, default: false },
    autoStart: { type: Boolean, default: false },
    label: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    injectComponentStyle("timer");
    return () =>
      h(
        TimerRoot,
        {
          ...attrs,
          "aria-label": props.label,
          startMs: props.startMs,
          targetMs: props.targetMs,
          countdown: props.countdown,
          autoStart: props.autoStart,
        },
        () => [
          h(ArkTimer.Area, () => [
            h(ArkTimer.Item, { type: "minutes" }),
            h(ArkTimer.Separator, () => ":"),
            h(ArkTimer.Item, { type: "seconds" }),
          ]),
          h(ArkTimer.Control, () => [
            h(ArkTimer.ActionTrigger, { action: "start" }, () => "Start"),
            h(ArkTimer.ActionTrigger, { action: "pause" }, () => "Pause"),
            h(ArkTimer.ActionTrigger, { action: "resume" }, () => "Resume"),
            h(ArkTimer.ActionTrigger, { action: "reset" }, () => "Reset"),
          ]),
        ],
      );
  },
});

export const Timer = defineFamily(TimerFacade, {
  ...ArkTimer,
  Root: TimerRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof TimerFacade &
  Omit<typeof ArkTimer, "Root"> & { Root: typeof TimerRoot };
