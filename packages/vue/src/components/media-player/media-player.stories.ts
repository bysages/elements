import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { withState } from "../with-state.js";
import { Audio as AudioPlayer, Video as VideoPlayer } from "./index.js";

const meta: Meta = { title: "Components/Media/Media Player" };
export default meta;

const AUDIO = "https://mdn.github.io/shared-assets/audio/guitar.mp3";
const VIDEO = "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4";
const POSTER =
  "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg";

/** One instrument for both faces: audio keeps a compact rail, video keeps
 * the same rhythm under its stage. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "1.25rem" } }, [
          h(AudioPlayer, {
            src: AUDIO,
            label: "Guitar practice recording",
            style: { inlineSize: "100%" },
          }),
          h(VideoPlayer, {
            src: VIDEO,
            poster: POSTER,
            label: "Tears of Steel sample clip",
            style: { inlineSize: "100%" },
          }),
        ]),
    ),
};

/** The audio face: the media stays silent as chrome; the rail carries
 * play, seek, time, mute, volume and speed. */
export const Audio = {
  render: () =>
    h(AudioPlayer, {
      src: AUDIO,
      label: "Guitar practice recording",
      preload: "metadata",
      style: { inlineSize: "100%" },
    }),
};

/** The video face adds captions, picture-in-picture and fullscreen only
 * when the browser offers the capability. */
export const Video = {
  render: () =>
    h(VideoPlayer, {
      src: VIDEO,
      poster: POSTER,
      label: "Tears of Steel sample clip",
      preload: "metadata",
      style: { inlineSize: "100%" },
    }),
};

/** The anatomy stays open: the shell owns state, while every control can
 * be rearranged or replaced without leaving the design system. */
export const Anatomy = {
  render: () =>
    withState(
      () => () =>
        h(
          VideoPlayer.Root,
          {
            src: VIDEO,
            poster: POSTER,
            label: "Composed video player",
            playbackRates: [0.5, 1, 1.5],
            style: { inlineSize: "100%" },
          },
          () => [
            h(VideoPlayer.Stage, () => h(VideoPlayer.Media)),
            h(VideoPlayer.Controls, () => [
              h(VideoPlayer.PlayButton),
              h(VideoPlayer.Timeline),
              h(VideoPlayer.Time),
              h(VideoPlayer.MuteButton),
              h(VideoPlayer.Volume),
              h(VideoPlayer.Captions),
              h(VideoPlayer.Rate),
              h(VideoPlayer.PipButton),
              h(VideoPlayer.FullscreenButton),
            ]),
          ],
        ),
    ),
};
