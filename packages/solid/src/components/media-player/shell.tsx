import { injectComponentStyle } from "@bysages/core";
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
  splitProps,
  type JSX,
} from "solid-js";

import { useMediaControls } from "./use-media-controls";

export type MediaPlayerKind = "audio" | "video";

type MediaEventName =
  | "onPlay"
  | "onPause"
  | "onEnded"
  | "onTimeupdate"
  | "onVolumechange"
  | "onRatechange"
  | "onError";

export interface MediaPlayerProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  MediaEventName | "onPlay" | "onPause"
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

export interface MediaPlayerContext {
  readonly kind: MediaPlayerKind;
  readonly label: string;
  readonly src: string | undefined;
  readonly sources: import("./use-media-controls").MediaSourceOption[];
  readonly tracks: import("./use-media-controls").MediaTextTrackOption[];
  readonly playbackRates: number[];
  readonly autoplay: boolean;
  readonly loop: boolean;
  readonly muted: boolean;
  readonly preload: "none" | "metadata" | "auto";
  readonly poster: string | undefined;
  readonly playsInline: boolean;
  readonly disabled: boolean;
  readonly media: { current: HTMLMediaElement | null };
  readonly root: { current: HTMLDivElement | null };
  readonly controls: ReturnType<typeof useMediaControls>;
  readonly emit: (event: string, source: Event) => void;
}

const MediaPlayerProvider = createContext<MediaPlayerContext>();

export function useMediaPlayer() {
  const context = useContext(MediaPlayerProvider);
  if (!context) throw new Error("Media player parts must be used inside Audio.Root or Video.Root");
  return context;
}

/** The headless shell: it owns the media reference and the shared state
 * machine, while the public parts remain free to compose in any order. */
export function MediaPlayerShell(props: MediaPlayerProps & { kind: MediaPlayerKind }) {
  injectComponentStyle("media-player");

  const [local, rest] = splitShellProps(props);
  const [mediaElement, setMediaElement] = createSignal<HTMLMediaElement | null>(null);
  const media = {
    get current() {
      return mediaElement();
    },
    set current(value: HTMLMediaElement | null) {
      setMediaElement(value);
    },
  };
  const root: { current: HTMLDivElement | null } = { current: null };
  const controls = useMediaControls(media);

  createEffect(() => {
    const element = media.current;
    if (!element) return;
    element.volume = local.volume ?? 1;
    element.playbackRate = local.playbackRate ?? 1;
  });

  const context: MediaPlayerContext = {
    get autoplay() {
      return local.autoplay ?? false;
    },
    controls,
    get disabled() {
      return local.disabled ?? false;
    },
    emit: (event, source) => {
      if (event === "play") local.onPlay?.(source);
      if (event === "pause") local.onPause?.(source);
      if (event === "ended") local.onEnded?.(source);
      if (event === "timeupdate") local.onTimeupdate?.(source);
      if (event === "volumechange") local.onVolumechange?.(source);
      if (event === "ratechange") local.onRatechange?.(source);
      if (event === "error") local.onError?.(source);
    },
    kind: local.kind,
    get label() {
      return local.label ?? "Media player";
    },
    get loop() {
      return local.loop ?? false;
    },
    media,
    get muted() {
      return local.muted ?? false;
    },
    get playbackRates() {
      return local.playbackRates ?? [0.5, 0.75, 1, 1.25, 1.5, 2];
    },
    get playsInline() {
      return local.playsInline ?? true;
    },
    get poster() {
      return local.poster;
    },
    get preload() {
      return local.preload ?? "metadata";
    },
    root,
    get sources() {
      return local.sources ?? [];
    },
    get src() {
      return local.src;
    },
    get tracks() {
      return local.tracks ?? [];
    },
  };

  return (
    <MediaPlayerProvider.Provider value={context}>
      <div
        {...rest}
        ref={(element) => {
          root.current = element;
        }}
        data-scope="media-player"
        data-part="root"
        data-kind={local.kind}
        data-playing={controls.playing()}
        data-muted={controls.muted()}
        data-error={controls.error() ? "" : undefined}
      >
        {local.children}
      </div>
    </MediaPlayerProvider.Provider>
  );
}

function splitShellProps(props: MediaPlayerProps & { kind: MediaPlayerKind }) {
  return splitProps(props, [
    "kind",
    "children",
    "label",
    "src",
    "sources",
    "tracks",
    "autoplay",
    "loop",
    "muted",
    "preload",
    "volume",
    "playbackRate",
    "playbackRates",
    "disabled",
    "poster",
    "playsInline",
    "onPlay",
    "onPause",
    "onEnded",
    "onTimeupdate",
    "onVolumechange",
    "onRatechange",
    "onError",
  ]);
}
