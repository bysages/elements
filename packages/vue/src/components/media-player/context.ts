import { inject, provide, type InjectionKey, type Ref } from "vue";

import type { MediaSourceOption, MediaTextTrackOption } from "./use-media-controls";
import type { useMediaControls } from "./use-media-controls";

export type MediaPlayerKind = "audio" | "video";

export interface MediaPlayerContext {
  kind: MediaPlayerKind;
  label: string;
  src?: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  preload: "none" | "metadata" | "auto";
  disabled: boolean;
  poster?: string;
  playsInline: boolean;
  sources: MediaSourceOption[];
  tracks: MediaTextTrackOption[];
  playbackRates: number[];
  media: Ref<HTMLMediaElement | null>;
  root: Ref<HTMLElement | null>;
  controls: ReturnType<typeof useMediaControls>;
  emit: (event: string, source: Event) => void;
}

export const mediaPlayerKey: InjectionKey<MediaPlayerContext> = Symbol("bs-media-player");

export function provideMediaPlayer(context: MediaPlayerContext) {
  provide(mediaPlayerKey, context);
}

export function useMediaPlayer() {
  const context = inject(mediaPlayerKey);
  if (!context) throw new Error("MediaPlayer parts must be mounted inside MediaPlayer.Root");
  return context;
}
