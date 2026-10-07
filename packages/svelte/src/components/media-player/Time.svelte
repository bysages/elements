<script lang="ts">
  import { useMediaPlayer } from "./context";
  import { formatMediaTime } from "./use-media-controls.svelte";

  let { ...rest }: { [key: string]: unknown } = $props();
  const context = useMediaPlayer();
</script>

<span {...rest} data-scope="media-player" data-part="time">
  {formatMediaTime(context.controls.currentTime)} / {formatMediaTime(context.controls.duration)}
</span>
