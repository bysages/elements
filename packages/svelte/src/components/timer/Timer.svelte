<script lang="ts">
import { Timer as ArkTimer } from "@ark-ui/svelte/timer";

import TimerRoot from "./TimerRoot.svelte";

let {
  startMs = 0,
  autoStart = false,
  interval,
  countdown = false,
  children,
  ...rest
}: {
  startMs?: number;
  autoStart?: boolean;
  interval?: number;
  countdown?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").TimerRootProps = $props();
</script>

<TimerRoot {startMs} {autoStart} {interval} {countdown} {...rest}>
  <ArkTimer.Area>
    <ArkTimer.ValueText />
  </ArkTimer.Area>
  <ArkTimer.Control>
    <ArkTimer.StartTrigger>Start</ArkTimer.StartTrigger>
    <ArkTimer.PauseTrigger>Pause</ArkTimer.PauseTrigger>
    <ArkTimer.ResetTrigger>Reset</ArkTimer.ResetTrigger>
  </ArkTimer.Control>
  {@render children?.()}
</TimerRoot>
