import { Timer as ArkTimer } from "@ark-ui/react/timer";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's Timer, dressed in the paper-and-ink system: monospaced digits
 * that never jitter, quiet action triggers on the control recipe. The API
 * is Ark's own — Root, Area, Control, Item, Separator, ActionTrigger,
 * Context. Unit labels are plain content, not a machine part. */
function TimerRoot(props: ComponentProps<typeof ArkTimer.Root>) {
  injectComponentStyle("timer");
  const id = useElementId("timer", props);

  return <ArkTimer.Root {...props} id={id} />;
}

type TimerFacadeProps = {
  startMs?: number;
  targetMs?: number;
  countdown?: boolean;
  autoStart?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/** The complete timer behind one duration: minute and second digits with
 * start, pause, resume, and reset. Finer intervals and custom faces remain
 * anatomy work. */
function TimerFacade(props: TimerFacadeProps) {
  const { startMs = 0, targetMs, countdown, autoStart, label, className, style } = props;

  return (
    <TimerRoot
      aria-label={label}
      startMs={startMs}
      targetMs={targetMs}
      countdown={countdown}
      autoStart={autoStart}
      className={className}
      style={style}
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
  Omit<typeof ArkTimer, "Root"> & { Root: typeof TimerRoot } = Object.assign(TimerFacade, {
  ...ArkTimer,
  Root: TimerRoot,
}) as typeof TimerFacade & Omit<typeof ArkTimer, "Root"> & { Root: typeof TimerRoot };
