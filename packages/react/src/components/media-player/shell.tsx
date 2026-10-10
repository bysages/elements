import { injectComponentStyle } from "@bysages/core/styling";
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

import { MediaPlayerProvider, type MediaPlayerContext } from "./context";
import { useMediaControls } from "./use-media-controls";

export type MediaPlayerKind = "audio" | "video";

export interface MediaPlayerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onPlay" | "onPause" | "onEnded" | "onTimeUpdate" | "onVolumeChange" | "onRateChange" | "onError"
> {
  label?: string;
  src?: string;
  sources?: import("./use-media-controls").MediaSourceOption[];
  tracks?: import("./use-media-controls").MediaTextTrackOption[];
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
  onPlay?: (event: Event) => void;
  onPause?: (event: Event) => void;
  onEnded?: (event: Event) => void;
  onTimeupdate?: (event: Event) => void;
  onVolumechange?: (event: Event) => void;
  onRatechange?: (event: Event) => void;
  onError?: (event: Event) => void;
}

/** The headless shell: it owns the media reference and the shared state
 * machine, while the public parts remain free to compose in any order. */
export function MediaPlayerShell(
  props: MediaPlayerProps & { kind: MediaPlayerKind; children?: ReactNode },
) {
  injectComponentStyle("media-player");

  const media = useRef<HTMLMediaElement | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  const controls = useMediaControls(media);

  const {
    kind,
    children,
    label = "Media player",
    src,
    sources = [],
    tracks = [],
    autoplay = false,
    loop = false,
    muted = false,
    preload = "metadata",
    volume = 1,
    playbackRate = 1,
    playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
    disabled = false,
    poster,
    playsInline = true,
    onPlay,
    onPause,
    onEnded,
    onTimeupdate,
    onVolumechange,
    onRatechange,
    onError,
    ...rest
  } = props;

  useEffect(() => {
    const element = media.current;
    if (!element) return;
    element.volume = volume;
    element.playbackRate = playbackRate;
  }, [playbackRate, volume]);

  const context: MediaPlayerContext = {
    autoplay,
    controls,
    disabled,
    emit: (event, source) => {
      if (event === "play") onPlay?.(source);
      if (event === "pause") onPause?.(source);
      if (event === "ended") onEnded?.(source);
      if (event === "timeupdate") onTimeupdate?.(source);
      if (event === "volumechange") onVolumechange?.(source);
      if (event === "ratechange") onRatechange?.(source);
      if (event === "error") onError?.(source);
    },
    kind,
    label,
    loop,
    media,
    muted,
    playbackRates,
    playsInline,
    poster,
    preload,
    root,
    sources,
    src,
    tracks,
  };

  return (
    <MediaPlayerProvider value={context}>
      <div
        {...rest}
        ref={root}
        data-scope="media-player"
        data-part="root"
        data-kind={kind}
        data-playing={controls.playing}
        data-muted={controls.muted}
        data-error={controls.error ? true : undefined}
      >
        {children}
      </div>
    </MediaPlayerProvider>
  );
}
