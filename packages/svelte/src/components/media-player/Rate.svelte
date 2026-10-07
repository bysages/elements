<script lang="ts">
  import { useMediaPlayer } from "./context";
  import { Select } from "../select";

  let { label = "Playback speed", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const options = $derived(
    context.playbackRates.map((rate) => ({ label: `${rate}×`, value: String(rate) }))
  );
</script>

<div {...rest} data-scope="media-player" data-part="rate">
  <Select
    clearable={false}
    disabled={context.disabled}
    {options}
    placeholder={label}
    size="sm"
    value={String(context.controls.playbackRate)}
    onValueChange={(value) => context.controls.setPlaybackRate(Number(value))}
  />
</div>
