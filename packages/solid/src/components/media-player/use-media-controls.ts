import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

/** A contiguous span of media the browser has already received. */
export interface MediaRange {
  start: number;
  end: number;
}

/** One alternative encoding offered to the browser before playback. */
export interface MediaSourceOption {
  src: string;
  type?: string;
}

/** A WebVTT track handed to the native text-track model. */
export interface MediaTextTrackOption {
  src: string;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  label?: string;
  srcLang?: string;
  default?: boolean;
}

/** The shared HTMLMediaElement state: one source of truth for both the
 * audio and video faces, so their controls never drift apart. */
export function useMediaControls(media: { current: HTMLMediaElement | null }) {
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [playing, setPlaying] = createSignal(false);
  const [muted, setMuted] = createSignal(false);
  const [volume, setVolumeState] = createSignal(1);
  const [playbackRate, setPlaybackRateState] = createSignal(1);
  const [selectedTextTrack, setSelectedTextTrack] = createSignal(-1);
  const [error, setError] = createSignal(false);

  const readMedia = (element: HTMLMediaElement) => {
    setCurrentTime(element.currentTime || 0);
    setDuration(Number.isFinite(element.duration) ? element.duration : 0);
    setPlaying(!element.paused && !element.ended);
    setMuted(element.muted);
    setVolumeState(element.volume);
    setPlaybackRateState(element.playbackRate);
    setError(false);
  };

  const readTextTracks = (element: HTMLMediaElement) => {
    setSelectedTextTrack(
      Array.from(element.textTracks).findIndex((track) => track.mode === "showing"),
    );
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const seek = (time: number) => {
    const element = media.current;
    if (!element) return;
    const limit = Number.isFinite(element.duration) ? element.duration : Number.MAX_SAFE_INTEGER;
    element.currentTime = clamp(time, 0, limit);
  };

  const setVolume = (value: number) => {
    const element = media.current;
    if (!element) return;
    element.volume = clamp(value, 0, 1);
  };

  const setPlaybackRate = (value: number) => {
    const element = media.current;
    if (!element) return;
    element.playbackRate = value;
  };

  const toggleMuted = () => {
    const element = media.current;
    if (!element) return;
    element.muted = !element.muted;
  };

  const toggle = async () => {
    const element = media.current;
    if (!element) return;
    if (element.paused) await element.play();
    else element.pause();
  };

  const selectTextTrack = (index: number) => {
    const element = media.current;
    if (!element) return;
    Array.from(element.textTracks).forEach((track, trackIndex) => {
      track.mode = trackIndex === index ? "showing" : "disabled";
    });
    setSelectedTextTrack(index);
  };

  const togglePictureInPicture = async () => {
    const pipElement = media.current as
      | (HTMLVideoElement & { requestPictureInPicture?: () => Promise<void> })
      | null;
    if (!pipElement?.requestPictureInPicture) return;
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else await pipElement.requestPictureInPicture();
  };

  const toggleFullscreen = async (root: HTMLElement) => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.requestFullscreen();
  };

  createEffectOnMedia(media, (element) => {
    const updateFromEvent = (event: Event) => {
      readMedia(element);
      setError(event.type === "error");
    };
    const syncTracks = () => {
      readTextTracks(element);
      window.setTimeout(() => readTextTracks(element), 0);
    };
    const events = [
      "loadedmetadata",
      "durationchange",
      "timeupdate",
      "progress",
      "play",
      "pause",
      "ended",
      "waiting",
      "playing",
      "seeking",
      "seeked",
      "volumechange",
      "ratechange",
      "error",
    ] as const;
    for (const event of events) element.addEventListener(event, updateFromEvent);
    element.addEventListener("loadedmetadata", syncTracks);
    element.addEventListener("loadstart", syncTracks);
    readMedia(element);
    readTextTracks(element);

    onCleanup(() => {
      for (const event of events) element.removeEventListener(event, updateFromEvent);
      element.removeEventListener("loadedmetadata", syncTracks);
      element.removeEventListener("loadstart", syncTracks);
      element.pause();
    });
  });

  return {
    currentTime,
    duration,
    error,
    muted,
    playing,
    playbackRate,
    selectedTextTrack,
    seek,
    selectTextTrack,
    setPlaybackRate,
    setVolume,
    toggle,
    toggleFullscreen,
    toggleMuted,
    togglePictureInPicture,
    volume,
  };
}

/** The media element mounts inside a child part, so its reference is
 * observed as a mutable box. */
function createEffectOnMedia(
  media: { current: HTMLMediaElement | null },
  effect: (element: HTMLMediaElement) => void,
) {
  createEffect(() => {
    if (media.current) effect(media.current);
  });
}

/** A compact clock for player chrome: hours only when the media asks
 * for them, stable digits so the time never jitters the controls. */
export function formatMediaTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = String((whole % 3600) % 60).padStart(2, "0");
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${secs}` : `${minutes}:${secs}`;
}

export type MediaControls = ReturnType<typeof useMediaControls>;
export type MediaAccessor<T> = Accessor<T>;
