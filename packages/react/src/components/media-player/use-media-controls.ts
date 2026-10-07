import { useCallback, useEffect, useState, type RefObject } from "react";

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
export function useMediaControls(media: RefObject<HTMLMediaElement | null>) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [selectedTextTrack, setSelectedTextTrack] = useState(-1);
  const [error, setError] = useState(false);

  const readMedia = useCallback((element: HTMLMediaElement) => {
    setCurrentTime(element.currentTime || 0);
    setDuration(Number.isFinite(element.duration) ? element.duration : 0);
    setPlaying(!element.paused && !element.ended);
    setMuted(element.muted);
    setVolumeState(element.volume);
    setPlaybackRateState(element.playbackRate);
    setError(false);
  }, []);

  const readTextTracks = useCallback((element: HTMLMediaElement) => {
    setSelectedTextTrack(
      Array.from(element.textTracks).findIndex((track) => track.mode === "showing"),
    );
  }, []);

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  }, []);

  const seek = useCallback(
    (time: number) => {
      const element = media.current;
      if (!element) return;
      const limit = Number.isFinite(element.duration) ? element.duration : Number.MAX_SAFE_INTEGER;
      element.currentTime = clamp(time, 0, limit);
    },
    [clamp, media],
  );

  const setVolume = useCallback(
    (value: number) => {
      const element = media.current;
      if (!element) return;
      element.volume = clamp(value, 0, 1);
    },
    [clamp, media],
  );

  const setPlaybackRate = useCallback(
    (value: number) => {
      const element = media.current;
      if (!element) return;
      element.playbackRate = value;
    },
    [media],
  );

  const toggleMuted = useCallback(() => {
    const element = media.current;
    if (!element) return;
    element.muted = !element.muted;
  }, [media]);

  const toggle = useCallback(async () => {
    const element = media.current;
    if (!element) return;
    if (element.paused) await element.play();
    else element.pause();
  }, [media]);

  const selectTextTrack = useCallback(
    (index: number) => {
      const element = media.current;
      if (!element) return;
      Array.from(element.textTracks).forEach((track, trackIndex) => {
        track.mode = trackIndex === index ? "showing" : "disabled";
      });
      setSelectedTextTrack(index);
    },
    [media],
  );

  const togglePictureInPicture = useCallback(async () => {
    const element = media.current as
      | (HTMLVideoElement & { requestPictureInPicture?: () => Promise<void> })
      | null;
    if (!element?.requestPictureInPicture) return;
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else await element.requestPictureInPicture();
  }, [media]);

  const toggleFullscreen = useCallback(async (root: HTMLElement) => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.requestFullscreen();
  }, []);

  useEffect(() => {
    const element = media.current;
    if (!element) return;

    const updateFromEvent = (event: Event) => {
      readMedia(element);
      setError(event.type === "error");
      if (event.type === "error") readTextTracks(element);
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

    return () => {
      for (const event of events) element.removeEventListener(event, updateFromEvent);
      element.removeEventListener("loadedmetadata", syncTracks);
      element.removeEventListener("loadstart", syncTracks);
      element.pause();
    };
  }, [media, readMedia, readTextTracks]);

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
