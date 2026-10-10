import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import {
  Captions,
  Controls,
  FullscreenButton,
  Media,
  MuteButton,
  PipButton,
  PlayButton,
  Rate,
  Stage,
  Time,
  Timeline,
  Volume,
} from "./parts";
import { MediaPlayerShell } from "./shell";
import type { MediaSourceOption, MediaTextTrackOption } from "./use-media-controls";

/** Audio and video share one instrument: the same state, the same keys,
 * and the same control rhythm, while each face keeps its native element's
 * own semantics. The parts — Root, Stage, Media, Controls, PlayButton,
 * Timeline, Time, MuteButton, Volume, Rate, Captions, PipButton,
 * FullscreenButton. */

const audioProps = {
  /** The accessible name for the whole player. */
  label: { type: String, default: "Media player" },
  /** The primary source; use `sources` instead for codec fallbacks. */
  src: { type: String, default: undefined },
  sources: { type: Array as PropType<MediaSourceOption[]>, default: () => [] },
  tracks: { type: Array as PropType<MediaTextTrackOption[]>, default: () => [] },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  preload: {
    type: String as PropType<"none" | "metadata" | "auto">,
    default: "metadata",
  },
  volume: { type: Number, default: 1 },
  playbackRate: { type: Number, default: 1 },
  playbackRates: {
    type: Array as PropType<number[]>,
    default: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
  },
  disabled: { type: Boolean, default: false },
};

const videoProps = {
  ...audioProps,
  /** A still held on the screen before the first frame lands. */
  poster: { type: String, default: undefined },
  playsInline: { type: Boolean, default: true },
};

const mediaEmits = {
  play: (_event: Event) => true,
  pause: (_event: Event) => true,
  ended: (_event: Event) => true,
  timeupdate: (_event: Event) => true,
  volumechange: (_event: Event) => true,
  ratechange: (_event: Event) => true,
  error: (_event: Event) => true,
};

/** Audio and video share one instrument: the same state, the same keys,
 * and the same control rhythm, while each face keeps its native element's
 * own semantics. The parts — Root, Stage, Media, Controls, PlayButton,
 * Timeline, Time, MuteButton, Volume, Rate, Captions, PipButton,
 * FullscreenButton. */
const AudioRoot = defineComponent({
  name: "AudioRoot",
  props: audioProps,
  emits: mediaEmits,
  setup(props, ctx: SetupContext) {
    injectComponentStyle("media-player");

    return () => h(MediaPlayerShell, { ...ctx.attrs, ...props, kind: "audio" }, ctx.slots);
  },
});

/** The complete audio player: source controls compose into one compact
 * rail, while custom arrangement stays on Audio.Root. */
const AudioFacade = defineComponent({
  name: "Audio",
  props: audioProps,
  emits: mediaEmits,
  setup(props, ctx: SetupContext) {
    injectComponentStyle("media-player");

    return () =>
      h(AudioRoot, { ...ctx.attrs, ...props }, () => [
        h(Stage, () => h(Media)),
        h(Controls, () => [h(PlayButton), h(Timeline), h(Time), h(MuteButton), h(Volume), h(Rate)]),
      ]);
  },
});

/** The video anatomy: Root owns state while the stage, native media and
 * full control set remain rearrangeable. */
const VideoRoot = defineComponent({
  name: "VideoRoot",
  props: videoProps,
  emits: mediaEmits,
  setup(props, ctx: SetupContext) {
    injectComponentStyle("media-player");

    return () => h(MediaPlayerShell, { ...ctx.attrs, ...props, kind: "video" }, ctx.slots);
  },
});

/** The complete video player: source, caption, PiP and fullscreen
 * controls compose under the stage, while Video.Root stays open. */
const VideoFacade = defineComponent({
  name: "Video",
  props: videoProps,
  emits: mediaEmits,
  setup(props, ctx: SetupContext) {
    injectComponentStyle("media-player");

    return () =>
      h(VideoRoot, { ...ctx.attrs, ...props }, () => [
        h(Stage, () => h(Media)),
        h(Controls, () => [
          h(PlayButton),
          h(Timeline),
          h(Time),
          h(MuteButton),
          h(Volume),
          h(Captions),
          h(Rate),
          h(PipButton),
          h(FullscreenButton),
        ]),
      ]);
  },
});

/** Audio and video share one instrument: the same state, the same keys,
 * and the same control rhythm, while each face keeps its native element's
 * own semantics. The parts — Root, Stage, Media, Controls, PlayButton,
 * Timeline, Time, MuteButton, Volume, Rate, Captions, PipButton,
 * FullscreenButton. */
type AudioParts = {
  Root: typeof AudioRoot;
  Stage: typeof Stage;
  Media: typeof Media;
  Controls: typeof Controls;
  PlayButton: typeof PlayButton;
  Timeline: typeof Timeline;
  Time: typeof Time;
  MuteButton: typeof MuteButton;
  Volume: typeof Volume;
  Rate: typeof Rate;
};

export const Audio = defineFamily(AudioFacade, {
  Root: AudioRoot,
  Stage,
  Media,
  Controls,
  PlayButton,
  Timeline,
  Time,
  MuteButton,
  Volume,
  Rate,
}) as typeof AudioFacade & AudioParts;

type VideoParts = AudioParts & {
  Captions: typeof Captions;
  PipButton: typeof PipButton;
  FullscreenButton: typeof FullscreenButton;
};

export const Video = defineFamily(VideoFacade, {
  Root: VideoRoot,
  Stage,
  Media,
  Controls,
  PlayButton,
  Timeline,
  Time,
  MuteButton,
  Volume,
  Rate,
  Captions,
  PipButton,
  FullscreenButton,
}) as typeof VideoFacade & VideoParts;

export type AudioProps = InstanceType<typeof AudioFacade>["$props"];
export type VideoProps = InstanceType<typeof VideoFacade>["$props"];
