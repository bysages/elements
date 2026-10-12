import { Timer as ArkTimer } from "@ark-ui/solid/timer";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The API
 * is Ark's own — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
function TimerRoot(props: ComponentProps<typeof ArkTimer.Root>) {
  const id = useElementId("timer", () => props.id);

  return createComponent(
    ArkTimer.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export interface TimerFacadeProps {
  startMs?: number;
  targetMs?: number;
  countdown?: boolean;
  autoStart?: boolean;
  label?: string;
}

/** The complete timer behind one duration: minute and second digits with
 * start, pause, resume, and reset. Finer intervals and custom faces remain
 * anatomy work. */
function TimerFacade(props: TimerFacadeProps) {
  injectComponentStyle("timer");

  return (
    <TimerRoot
      aria-label={props.label}
      startMs={props.startMs ?? 0}
      targetMs={props.targetMs}
      countdown={props.countdown}
      autoStart={props.autoStart}
    >
      <ArkTimer.Area>
        <ArkTimer.Item type="minutes" />
        <ArkTimer.Separator>:</ArkTimer.Separator>
        <ArkTimer.Item type="seconds" />
      </ArkTimer.Area>
      <ArkTimer.Control>
        <ArkTimer.ActionTrigger action="start">Start</ArkTimer.ActionTrigger>
        <ArkTimer.ActionTrigger action="pause">Pause</ArkTimer.ActionTrigger>
        <ArkTimer.ActionTrigger action="resume">Resume</ArkTimer.ActionTrigger>
        <ArkTimer.ActionTrigger action="reset">Reset</ArkTimer.ActionTrigger>
      </ArkTimer.Control>
    </TimerRoot>
  );
}

export const Timer: typeof TimerFacade &
  Omit<typeof ArkTimer, "Root"> & { Root: typeof TimerRoot } = defineFamily(TimerFacade, {
  ...ArkTimer,
  Root: TimerRoot,
});
injectComponentStyle("timer");
