<script module lang="ts">
/** The shared HTMLMediaElement state: one source of truth for both the
 * audio and video faces, so their controls never drift apart. */
export function useMediaControls(media: { current: HTMLMediaElement | null }) {
  let currentTime = $state(0);
  let duration = $state(0);
  let playing = $state(false);
  let muted = $state(false);
  let volume = $state(1);
  let playbackRate = $state(1);
  let selectedTextTrack = $state(-1);
  let error = $state(false);

  function readMedia(element: HTMLMediaElement) {
    currentTime = element.currentTime || 0;
    duration = Number.isFinite(element.duration) ? element.duration : 0;
    playing = !element.paused && !element.ended;
    muted = element.muted;
    volume = element.volume;
    playbackRate = element.playbackRate;
    error = false;
  }

  function readTextTracks(element: HTMLMediaElement) {
    selectedTextTrack = Array.from(element.textTracks).findIndex(
      (track) => track.mode === "showing",
    );
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  $effect(() => {
    const element = media.current;
    if (!element) return;

    const updateFromEvent = (event: Event) => {
      readMedia(element);
      error = event.type === "error";
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
  });

  return {
    get currentTime() {
      return currentTime;
    },
    get duration() {
      return duration;
    },
    get playing() {
      return playing;
    },
    get muted() {
      return muted;
    },
    get volume() {
      return volume;
    },
    get playbackRate() {
      return playbackRate;
    },
    get selectedTextTrack() {
      return selectedTextTrack;
    },
    get error() {
      return error;
    },
    seek(time: number) {
      const element = media.current;
      if (!element) return;
      const limit = Number.isFinite(element.duration) ? element.duration : Number.MAX_SAFE_INTEGER;
      element.currentTime = clamp(time, 0, limit);
    },
    setVolume(value: number) {
      const element = media.current;
      if (!element) return;
      element.volume = clamp(value, 0, 1);
    },
    setPlaybackRate(value: number) {
      const element = media.current;
      if (!element) return;
      element.playbackRate = value;
    },
    toggleMuted() {
      const element = media.current;
      if (!element) return;
      element.muted = !element.muted;
    },
    async toggle() {
      const element = media.current;
      if (!element) return;
      if (element.paused) await element.play();
      else element.pause();
    },
    selectTextTrack(index: number) {
      const element = media.current;
      if (!element) return;
      Array.from(element.textTracks).forEach((track, trackIndex) => {
        track.mode = trackIndex === index ? "showing" : "disabled";
      });
      selectedTextTrack = index;
    },
    async togglePictureInPicture() {
      const pipElement = element as HTMLVideoElement & { requestPictureInPicture?: () => Promise<void> };
      if (!pipElement.requestPictureInPicture) return;
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await pipElement.requestPictureInPicture();
    },
    async toggleFullscreen(root: HTMLElement) {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.requestFullscreen();
    },
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

export type MediaControls = ReturnType<typeof useMediaControls>;
</script>
