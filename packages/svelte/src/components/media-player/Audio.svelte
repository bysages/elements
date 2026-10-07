<script lang="ts">
  import { injectComponentStyle } from "@bysages/core";

  import AudioRoot from "./AudioRoot.svelte";
  import Controls from "./Controls.svelte";
  import Media from "./Media.svelte";
  import MuteButton from "./MuteButton.svelte";
  import PlayButton from "./PlayButton.svelte";
  import Rate from "./Rate.svelte";
  import Stage from "./Stage.svelte";
  import Time from "./Time.svelte";
  import Timeline from "./Timeline.svelte";
  import Volume from "./Volume.svelte";
  import type { MediaPlayerProps } from "./props";

  injectComponentStyle("media-player");
  let props: MediaPlayerProps = $props();
</script>

<AudioRoot {...props}>
  <Stage>
    <Media />
  </Stage>
  <Controls>
    <PlayButton />
    <Timeline />
    <Time />
    <MuteButton />
    <Volume />
    <Rate />
  </Controls>
</AudioRoot>
