<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";

  import Captions from "./Captions.svelte";
  import Controls from "./Controls.svelte";
  import Media from "./Media.svelte";
  import MuteButton from "./MuteButton.svelte";
  import PipButton from "./PipButton.svelte";
  import PlayButton from "./PlayButton.svelte";
  import Rate from "./Rate.svelte";
  import Stage from "./Stage.svelte";
  import Time from "./Time.svelte";
  import Timeline from "./Timeline.svelte";
  import VideoRoot from "./VideoRoot.svelte";
  import Volume from "./Volume.svelte";
  import FullscreenButton from "./FullscreenButton.svelte";
  import type { MediaPlayerProps } from "./props";

  injectComponentStyle("media-player");
  let props: MediaPlayerProps = $props();
</script>

<VideoRoot {...props}>
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
    <Captions />
    <PipButton />
    <FullscreenButton />
  </Controls>
</VideoRoot>

