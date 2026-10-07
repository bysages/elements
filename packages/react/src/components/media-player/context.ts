import { createContext, useContext, type RefObject } from "react";

import type { useMediaControls } from "./use-media-controls";

export type MediaPlayerKind = "audio" | "video";
export type MediaControls = ReturnType<typeof useMediaControls>;

export interface MediaPlayerContext {
  kind: MediaPlayerKind;
  label: string;
  src?: string;
  sources: import("./use-media-controls").MediaSourceOption[];
  tracks: import("./use-media-controls").MediaTextTrackOption[];
  playbackRates: number[];
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  preload: "none" | "metadata" | "auto";
  poster?: string;
  playsInline: boolean;
  disabled: boolean;
  media: RefObject<HTMLMediaElement | null>;
  root: RefObject<HTMLDivElement | null>;
  controls: MediaControls;
  emit: (event: string, source: Event) => void;
}

export const MediaPlayerProvider = createContext<MediaPlayerContext | null>(null);

export function useMediaPlayer() {
  const context = useContext(MediaPlayerProvider);
  if (!context) throw new Error("Media player parts must be used inside Audio.Root or Video.Root");
  return context;
}
