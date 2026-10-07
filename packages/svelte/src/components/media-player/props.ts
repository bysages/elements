export type MediaPlayerKind = "audio" | "video";

export interface MediaSourceOption {
  src: string;
  type?: string;
}

export interface MediaTextTrackOption {
  src: string;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  label?: string;
  srcLang?: string;
  default?: boolean;
}

export interface MediaPlayerProps {
  label?: string;
  src?: string;
  sources?: MediaSourceOption[];
  tracks?: MediaTextTrackOption[];
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  volume?: number;
  playbackRate?: number;
  playbackRates?: number[];
  disabled?: boolean;
  poster?: string;
  playsInline?: boolean;
  class?: string;
  style?: string;
  id?: string;
  onplay?: (event: Event) => void;
  onpause?: (event: Event) => void;
  onended?: (event: Event) => void;
  ontimeupdate?: (event: Event) => void;
  onvolumechange?: (event: Event) => void;
  onratechange?: (event: Event) => void;
  onerror?: (event: Event) => void;
  [key: string]: unknown;
}
