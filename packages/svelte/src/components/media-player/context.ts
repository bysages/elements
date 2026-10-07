import { getContext, setContext } from "svelte";

import type { MediaPlayerKind } from "./props";
import type { MediaControls } from "./use-media-controls.svelte";

export interface MediaPlayerContext {
  kind: MediaPlayerKind;
  label: string;
  src: string | undefined;
  sources: import("./props").MediaSourceOption[];
  tracks: import("./props").MediaTextTrackOption[];
  playbackRates: number[];
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  preload: "none" | "metadata" | "auto";
  poster: string | undefined;
  playsInline: boolean;
  disabled: boolean;
  media: { current: HTMLMediaElement | null };
  root: { current: HTMLDivElement | null };
  controls: MediaControls;
  emit: (event: string, source: Event) => void;
}

const KEY = Symbol("media-player");

export function provideMediaPlayer(context: MediaPlayerContext) {
  setContext(KEY, context);
}

export function useMediaPlayer() {
  const context = getContext<MediaPlayerContext | undefined>(KEY);
  if (!context) throw new Error("Media player parts must be used inside Audio.Root or Video.Root");
  return context;
}
