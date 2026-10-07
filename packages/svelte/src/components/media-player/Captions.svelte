<script lang="ts">
  import { useMediaPlayer } from "./context";
  import { Select } from "../select";

  let { label = "Captions", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const options = $derived([
    { label: "Off", value: "-1" },
    ...context.tracks.map((track, index) => ({
      label: track.label ?? `Track ${index + 1}`,
      value: String(index),
    })),
  ]);
</script>

{#if context.tracks.length > 0}
  <div {...rest} data-scope="media-player" data-part="captions">
    <Select
      clearable={false}
      disabled={context.disabled}
      {options}
      placeholder={label}
      size="sm"
      value={String(context.controls.selectedTextTrack)}
      onValueChange={(value) => context.controls.selectTextTrack(Number(value))}
    />
  </div>
{/if}
