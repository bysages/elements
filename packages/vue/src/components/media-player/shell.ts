import { defineComponent, h, ref, watch, type PropType, type SetupContext } from "vue";

import { provideMediaPlayer, type MediaPlayerKind } from "./context";
import {
  useMediaControls,
  type MediaSourceOption,
  type MediaTextTrackOption,
} from "./use-media-controls";

/** Shared props for the audio and video faces. The `kind` is injected by
 * each public face, so callers never choose the element twice. */
export const mediaPlayerProps = {
  label: { type: String, default: "Media player" },
  src: { type: String, default: undefined },
  sources: { type: Array as PropType<MediaSourceOption[]>, default: () => [] },
  tracks: { type: Array as PropType<MediaTextTrackOption[]>, default: () => [] },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  preload: {
    type: String as PropType<"none" | "metadata" | "auto">,
    default: "metadata",
  },
  volume: { type: Number, default: 1 },
  playbackRate: { type: Number, default: 1 },
  playbackRates: {
    type: Array as PropType<number[]>,
    default: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
  },
  disabled: { type: Boolean, default: false },
  poster: { type: String, default: undefined },
  playsInline: { type: Boolean, default: true },
};

/** Native media events the component re-emits after its own state has
 * read the element — so listeners always see the same state as controls. */
export const mediaPlayerEmits = {
  play: (_event: Event) => true,
  pause: (_event: Event) => true,
  ended: (_event: Event) => true,
  timeupdate: (_event: Event) => true,
  volumechange: (_event: Event) => true,
  ratechange: (_event: Event) => true,
  error: (_event: Event) => true,
};

/** The headless shell: it owns the media reference and the shared state
 * machine, while the public parts remain free to compose in any order. */
export const MediaPlayerShell = defineComponent({
  name: "SMediaPlayerShell",
  props: {
    ...mediaPlayerProps,
    kind: { type: String as PropType<MediaPlayerKind>, required: true },
  },
  emits: mediaPlayerEmits,
  setup(props, ctx: SetupContext) {
    const media = ref<HTMLMediaElement | null>(null);
    const root = ref<HTMLElement | null>(null);
    const controls = useMediaControls(media);

    watch(
      media,
      (el) => {
        if (!el) return;
        el.volume = props.volume;
        el.playbackRate = props.playbackRate;
      },
      { immediate: true, flush: "post" },
    );

    watch(
      () => props.volume,
      (value) => controls.setVolume(value),
    );

    watch(
      () => props.playbackRate,
      (value) => controls.setPlaybackRate(value),
    );

    provideMediaPlayer({
      kind: props.kind,
      get label() {
        return props.label;
      },
      get src() {
        return props.src;
      },
      get autoplay() {
        return props.autoplay;
      },
      get loop() {
        return props.loop;
      },
      get muted() {
        return props.muted;
      },
      get preload() {
        return props.preload;
      },
      get disabled() {
        return props.disabled;
      },
      get poster() {
        return props.poster;
      },
      get playsInline() {
        return props.playsInline;
      },
      get sources() {
        return props.sources;
      },
      get tracks() {
        return props.tracks;
      },
      get playbackRates() {
        return props.playbackRates;
      },
      media,
      root,
      controls,
      emit: (event, source) => ctx.emit(event as keyof typeof mediaPlayerEmits, source),
    });

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          ref: root,
          "data-scope": "media-player",
          "data-part": "root",
          "data-kind": props.kind,
          "data-playing": controls.playing.value,
          "data-muted": controls.muted.value,
          "data-waiting": controls.waiting.value,
          "data-error": controls.error.value ? true : undefined,
        },
        ctx.slots.default?.(),
      );
  },
});
