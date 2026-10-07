import { defineFamily } from "../../internal/family";
import AudioComponent from "./Audio.svelte";
import AudioRootComponent from "./AudioRoot.svelte";
import CaptionsComponent from "./Captions.svelte";
import ControlsComponent from "./Controls.svelte";
import FullscreenButtonComponent from "./FullscreenButton.svelte";
import MediaComponent from "./Media.svelte";
import MuteButtonComponent from "./MuteButton.svelte";
import PipButtonComponent from "./PipButton.svelte";
import PlayButtonComponent from "./PlayButton.svelte";
import RateComponent from "./Rate.svelte";
import StageComponent from "./Stage.svelte";
import TimeComponent from "./Time.svelte";
import TimelineComponent from "./Timeline.svelte";
import VideoComponent from "./Video.svelte";
import VideoRootComponent from "./VideoRoot.svelte";
import VolumeComponent from "./Volume.svelte";

/** Audio and video share one instrument: the same state, the same keys,
 * and the same control rhythm, while each face keeps its native element's
 * own semantics. The parts — Root, Stage, Media, Controls, PlayButton,
 * Timeline, Time, MuteButton, Volume, Rate, Captions, PipButton,
 * FullscreenButton. */
export const Audio = defineFamily(AudioComponent, {
  Root: AudioRootComponent,
  Stage: StageComponent,
  Media: MediaComponent,
  Controls: ControlsComponent,
  PlayButton: PlayButtonComponent,
  Timeline: TimelineComponent,
  Time: TimeComponent,
  MuteButton: MuteButtonComponent,
  Volume: VolumeComponent,
  Rate: RateComponent,
});

export const Video = defineFamily(VideoComponent, {
  Root: VideoRootComponent,
  Stage: StageComponent,
  Media: MediaComponent,
  Controls: ControlsComponent,
  PlayButton: PlayButtonComponent,
  Timeline: TimelineComponent,
  Time: TimeComponent,
  MuteButton: MuteButtonComponent,
  Volume: VolumeComponent,
  Rate: RateComponent,
  Captions: CaptionsComponent,
  PipButton: PipButtonComponent,
  FullscreenButton: FullscreenButtonComponent,
});

export { formatMediaTime } from "./use-media-controls.svelte";
export type { MediaSourceOption, MediaTextTrackOption, MediaPlayerProps } from "./props";
