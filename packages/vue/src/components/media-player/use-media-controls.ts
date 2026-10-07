import { onBeforeUnmount, ref, watch, type Ref } from "vue";

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
export function useMediaControls(media: Ref<HTMLMediaElement | null>) {
  const currentTime = ref(0);
  const duration = ref(0);
  const buffered = ref<MediaRange[]>([]);
  const playing = ref(false);
  const waiting = ref(false);
  const seeking = ref(false);
  const ended = ref(false);
  const error = ref<Event | undefined>();
  const volume = ref(1);
  const muted = ref(false);
  const playbackRate = ref(1);
  const textTrackCount = ref(0);
  const selectedTextTrack = ref(-1);
  const supportsPictureInPicture = ref(false);

  function readMedia(el: HTMLMediaElement) {
    currentTime.value = el.currentTime || 0;
    duration.value = Number.isFinite(el.duration) ? el.duration : 0;
    playing.value = !el.paused && !el.ended;
    ended.value = el.ended;
    muted.value = el.muted;
    volume.value = el.volume;
    playbackRate.value = el.playbackRate;
    buffered.value = Array.from({ length: el.buffered.length }, (_, index) => ({
      start: el.buffered.start(index),
      end: el.buffered.end(index),
    }));
  }

  function readTextTracks(el: HTMLMediaElement) {
    const tracks = Array.from(el.textTracks);
    textTrackCount.value = tracks.length;
    selectedTextTrack.value = tracks.findIndex((track) => track.mode === "showing");
  }

  function selectTextTrack(index: number) {
    const el = media.value;
    if (!el) return;
    Array.from(el.textTracks).forEach((track, trackIndex) => {
      track.mode = trackIndex === index ? "showing" : "disabled";
    });
    selectedTextTrack.value = index;
  }

  async function toggle() {
    const el = media.value;
    if (!el) return;
    if (el.paused) await el.play();
    else el.pause();
  }

  function seek(time: number) {
    const el = media.value;
    if (!el) return;
    const limit = Number.isFinite(el.duration) ? el.duration : Number.MAX_SAFE_INTEGER;
    el.currentTime = Math.min(Math.max(time, 0), limit);
  }

  function setVolume(value: number) {
    const el = media.value;
    if (!el) return;
    el.volume = Math.min(Math.max(value, 0), 1);
  }

  function toggleMuted() {
    const el = media.value;
    if (!el) return;
    el.muted = !el.muted;
  }

  function setPlaybackRate(value: number) {
    const el = media.value;
    if (!el) return;
    el.playbackRate = value;
  }

  async function togglePictureInPicture() {
    const el = media.value as HTMLVideoElement | null;
    if (!el || typeof (el as HTMLVideoElement).requestPictureInPicture !== "function") return;
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else await el.requestPictureInPicture();
  }

  async function toggleFullscreen(root: HTMLElement) {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.requestFullscreen();
  }

  watch(
    media,
    (el, _old, onCleanup) => {
      if (!el) return;

      const updateFromEvent = (event: Event) => {
        readMedia(el);
        waiting.value = event.type === "waiting";
        seeking.value = event.type === "seeking";
        error.value = event.type === "error" ? event : undefined;
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

      // Track lists settle with the resource; a second pass catches the
      // browser finishing the WebVTT parse after media metadata lands.
      const syncTracks = () => {
        readTextTracks(el);
        window.setTimeout(() => readTextTracks(el), 0);
      };

      for (const event of events) el.addEventListener(event, updateFromEvent);
      el.addEventListener("loadedmetadata", syncTracks);
      el.addEventListener("loadstart", syncTracks);

      if (typeof (el as HTMLVideoElement).requestPictureInPicture === "function") {
        supportsPictureInPicture.value = true;
      }

      readMedia(el);
      readTextTracks(el);

      onCleanup(() => {
        for (const event of events) el.removeEventListener(event, updateFromEvent);
        el.removeEventListener("loadedmetadata", syncTracks);
        el.removeEventListener("loadstart", syncTracks);
      });
    },
    { immediate: true, flush: "post" },
  );

  onBeforeUnmount(() => {
    media.value?.pause();
  });

  return {
    buffered,
    currentTime,
    duration,
    ended,
    error,
    muted,
    playing,
    playbackRate,
    seek,
    selectTextTrack,
    selectedTextTrack,
    setPlaybackRate,
    setVolume,
    supportsPictureInPicture,
    textTrackCount,
    toggle,
    toggleFullscreen,
    toggleMuted,
    togglePictureInPicture,
    volume,
    waiting,
  };
}

/** A compact clock for player chrome: hours only when the media asks
 * for them, stable digits so the time never jitters the controls. */
export function formatMediaTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = String(whole % 60).padStart(2, "0");
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${secs}` : `${minutes}:${secs}`;
}
