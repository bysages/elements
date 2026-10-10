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

export const Timer: typeof TimerRoot & Omit<typeof ArkTimer, "Root"> & { Root: typeof TimerRoot } =
  defineFamily(TimerRoot, {
    ...ArkTimer,
    Root: TimerRoot,
  });
injectComponentStyle("timer");
