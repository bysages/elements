import type { Component, JSX } from "solid-js";

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
import { MediaPlayerShell, type MediaPlayerKind, type MediaPlayerProps } from "./shell";

function createRoot(kind: MediaPlayerKind) {
  function MediaRoot(props: MediaPlayerProps) {
    return <MediaPlayerShell kind={kind} {...props} />;
  }
  return MediaRoot as Component<MediaPlayerProps>;
}

const AudioRoot = createRoot("audio");
const VideoRoot = createRoot("video");

function facade(props: { Root: Component<MediaPlayerProps>; children: JSX.Element }) {
  function MediaPlayerFacade(current: MediaPlayerProps) {
    return <props.Root {...current}>{props.children}</props.Root>;
  }
  return MediaPlayerFacade as Component<MediaPlayerProps>;
}

/** The complete audio player: source controls compose into one compact
 * rail, while custom arrangement stays on Audio.Root. */
const AudioFacade = facade({
  Root: AudioRoot,
  children: (
    <>
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
    </>
  ),
});

/** The complete video player: source, caption, PiP and fullscreen
 * controls compose under the stage, while Video.Root stays open. */
const VideoFacade = facade({
  Root: VideoRoot,
  children: (
    <>
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
    </>
  ),
});

/** Audio and video share one instrument: the same state, the same keys,
 * and the same control rhythm, while each face keeps its native element's
 * own semantics. The parts — Root, Stage, Media, Controls, PlayButton,
 * Timeline, Time, MuteButton, Volume, Rate, Captions, PipButton,
 * FullscreenButton. */
export const Audio = Object.assign(AudioFacade, {
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
});

export const Video = Object.assign(VideoFacade, {
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
});

export type { MediaPlayerProps };
export { formatMediaTime } from "./use-media-controls";
export type { MediaSourceOption, MediaTextTrackOption } from "./use-media-controls";
