import type { Meta } from "@storybook/react-vite";

import { Audio as AudioPlayer, Video as VideoPlayer } from ".";

const meta: Meta = { title: "Components/Media/Media Player" };
export default meta;

const AUDIO = "https://mdn.github.io/shared-assets/audio/guitar.mp3";
const VIDEO = "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4";
const POSTER =
  "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg";

/** One instrument for both faces: audio keeps a compact rail, video keeps
 * the same rhythm under its stage. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <AudioPlayer src={AUDIO} label="Guitar practice recording" style={{ inlineSize: "100%" }} />
      <VideoPlayer
        src={VIDEO}
        poster={POSTER}
        label="Tears of Steel sample clip"
        style={{ inlineSize: "100%" }}
      />
    </div>
  ),
};

/** The audio face: the media stays silent as chrome; the rail carries
 * play, seek, time, mute, volume and speed. */
export const Audio = {
  render: () => (
    <AudioPlayer
      src={AUDIO}
      label="Guitar practice recording"
      preload="metadata"
      style={{ inlineSize: "100%" }}
    />
  ),
};

/** The video face adds captions, picture-in-picture and fullscreen only
 * when the browser offers the capability. */
export const Video = {
  render: () => (
    <VideoPlayer
      src={VIDEO}
      poster={POSTER}
      label="Tears of Steel sample clip"
      preload="metadata"
      style={{ inlineSize: "100%" }}
    />
  ),
};

/** The anatomy stays open: the shell owns state, while every control can
 * be rearranged or replaced without leaving the design system. */
export const Anatomy = {
  render: () => (
    <VideoPlayer.Root
      src={VIDEO}
      poster={POSTER}
      label="Composed video player"
      playbackRates={[0.5, 1, 1.5]}
      style={{ inlineSize: "100%" }}
    >
      <VideoPlayer.Stage>
        <VideoPlayer.Media />
      </VideoPlayer.Stage>
      <VideoPlayer.Controls>
        <VideoPlayer.PlayButton />
        <VideoPlayer.Timeline />
        <VideoPlayer.Time />
        <VideoPlayer.MuteButton />
        <VideoPlayer.Volume />
        <VideoPlayer.Captions />
        <VideoPlayer.Rate />
        <VideoPlayer.PipButton />
        <VideoPlayer.FullscreenButton />
      </VideoPlayer.Controls>
    </VideoPlayer.Root>
  ),
};
