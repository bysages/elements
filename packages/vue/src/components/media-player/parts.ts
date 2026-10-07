import { defineComponent, h, type SetupContext } from "vue";

import { iconNode } from "../../internal/icon";
import { Select } from "../select";
import { useMediaPlayer } from "./context";
import { formatMediaTime } from "./use-media-controls";

function part(name: string) {
  return defineComponent({
    name: "SMediaPlayer" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            "data-scope": "media-player",
            "data-part": name.toLowerCase(),
          },
          ctx.slots.default?.(),
        );
    },
  });
}

/** The native media element, framed by the shared shell's state machine. */
export const Media = defineComponent({
  name: "SMediaPlayerMedia",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const el = context.kind === "video" ? "video" : "audio";
      const nativeProps: Record<string, unknown> = {
        ...ctx.attrs,
        ref: (value: unknown) => {
          context.media.value = (value as HTMLMediaElement | null) ?? null;
        },
        src: context.sources.length > 0 ? undefined : context.src,
        "data-scope": "media-player",
        "data-part": "media",
        autoplay: context.autoplay,
        loop: context.loop,
        muted: context.muted,
        preload: context.preload,
        "aria-label": context.label,
        onPlay: (event: Event) => context.emit("play", event),
        onPause: (event: Event) => context.emit("pause", event),
        onEnded: (event: Event) => context.emit("ended", event),
        onTimeupdate: (event: Event) => context.emit("timeupdate", event),
        onVolumechange: (event: Event) => context.emit("volumechange", event),
        onRatechange: (event: Event) => context.emit("ratechange", event),
        onError: (event: Event) => context.emit("error", event),
      };

      if (context.kind === "video") {
        nativeProps.poster = context.poster;
        nativeProps.playsInline = context.playsInline;
      }

      return h(el, nativeProps, () => [
        ...context.sources.map((source) =>
          h("source", { key: source.src, src: source.src, type: source.type }),
        ),
        ...context.tracks.map((track) =>
          h("track", {
            key: track.src,
            src: track.src,
            kind: track.kind ?? "subtitles",
            label: track.label,
            srcLang: track.srcLang,
            default: track.default,
          }),
        ),
        ctx.slots.default?.(),
      ]);
    };
  },
});

/** Play and pause share one seal-cut control: the state changes the mark,
 * never the control's place in the hand. */
export const PlayButton = defineComponent({
  name: "SMediaPlayerPlayButton",
  props: {
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const playing = context.controls.playing.value;
      const label = props.label ?? (playing ? "Pause" : "Play");
      return h(
        "button",
        {
          ...ctx.attrs,
          type: "button",
          "data-scope": "media-player",
          "data-part": "play-button",
          "aria-label": label,
          "aria-pressed": playing,
          title: label,
          disabled: context.disabled,
          onClick: () => void context.controls.toggle(),
        },
        iconNode(playing ? "pause" : "play", { width: 16, height: 16 }),
      );
    };
  },
});

/** The elapsed and total time bracket the timeline. */
export const Time = defineComponent({
  name: "SMediaPlayerTime",
  setup(_, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () =>
      h(
        "span",
        {
          ...ctx.attrs,
          "data-scope": "media-player",
          "data-part": "time",
        },
        `${formatMediaTime(context.controls.currentTime.value)} / ${formatMediaTime(
          context.controls.duration.value,
        )}`,
      );
  },
});

/** Seeking writes straight to currentTime; buffered ranges can later
 * ride the same part as a second ink wash. */
export const Timeline = defineComponent({
  name: "SMediaPlayerTimeline",
  props: {
    label: { type: String, default: "Seek" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const duration = context.controls.duration.value;
      const current = context.controls.currentTime.value;
      const progress = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;
      return h("input", {
        ...ctx.attrs,
        type: "range",
        "data-scope": "media-player",
        "data-part": "timeline",
        min: 0,
        max: duration || 0,
        step: 0.1,
        value: current,
        disabled: context.disabled || duration <= 0,
        "aria-label": props.label,
        "aria-valuetext": formatMediaTime(current),
        style: { "--bs-media-progress": `${progress}%` },
        onInput: (event: Event) => {
          context.controls.seek(Number((event.target as HTMLInputElement).value));
        },
      });
    };
  },
});

/** Muting stays at the left of the volume well, the way a hand expects. */
export const MuteButton = defineComponent({
  name: "SMediaPlayerMuteButton",
  props: {
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const muted = context.controls.muted.value || context.controls.volume.value === 0;
      const label = props.label ?? (muted ? "Unmute" : "Mute");
      return h(
        "button",
        {
          ...ctx.attrs,
          type: "button",
          "data-scope": "media-player",
          "data-part": "mute-button",
          "aria-label": label,
          "aria-pressed": muted,
          title: label,
          disabled: context.disabled,
          onClick: () => context.controls.toggleMuted(),
        },
        iconNode(muted ? "volume-x" : "volume-2", { width: 16, height: 16 }),
      );
    };
  },
});

export const Volume = defineComponent({
  name: "SMediaPlayerVolume",
  props: {
    label: { type: String, default: "Volume" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const volume = context.controls.muted.value ? 0 : context.controls.volume.value;
      return h("input", {
        ...ctx.attrs,
        type: "range",
        "data-scope": "media-player",
        "data-part": "volume",
        min: 0,
        max: 1,
        step: 0.01,
        value: volume,
        disabled: context.disabled,
        "aria-label": props.label,
        "aria-valuetext": `${Math.round(volume * 100)}%`,
        style: { "--bs-media-progress": `${volume * 100}%` },
        onInput: (event: Event) => {
          context.controls.setVolume(Number((event.target as HTMLInputElement).value));
        },
      });
    };
  },
});

/** Playback rate is a real choice, not hidden behind native menus. */
export const Rate = defineComponent({
  name: "SMediaPlayerRate",
  props: {
    label: { type: String, default: "Playback speed" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      const value = String(context.controls.playbackRate.value);
      const options = context.playbackRates.map((rate) => ({
        label: `${rate}×`,
        value: String(rate),
      }));
      return h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "media-player",
          "data-part": "rate",
        },
        [
          h(Select, {
            clearable: false,
            disabled: context.disabled,
            options,
            placeholder: props.label,
            size: "sm",
            modelValue: value,
            "onUpdate:modelValue": (next: string) => context.controls.setPlaybackRate(Number(next)),
          }),
        ],
      );
    };
  },
});

/** Text tracks use the browser's native model; the control chooses a
 * track index, while rendering stays with the media element. */
export const Captions = defineComponent({
  name: "SMediaPlayerCaptions",
  props: {
    label: { type: String, default: "Captions" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      if (context.tracks.length === 0) return null;
      const value = String(context.controls.selectedTextTrack.value);
      const options = [
        { label: "Off", value: "-1" },
        ...context.tracks.map((track, index) => ({
          label: track.label ?? `Track ${index + 1}`,
          value: String(index),
        })),
      ];
      return h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "media-player",
          "data-part": "captions",
        },
        [
          h(Select, {
            clearable: false,
            disabled: context.disabled,
            options,
            placeholder: props.label,
            size: "sm",
            modelValue: value,
            "onUpdate:modelValue": (next: string) => context.controls.selectTextTrack(Number(next)),
          }),
        ],
      );
    };
  },
});

/** Picture-in-picture is video-only and capability-detected. */
export const PipButton = defineComponent({
  name: "SMediaPlayerPipButton",
  props: {
    label: { type: String, default: "Toggle picture in picture" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      if (context.kind !== "video") return null;
      return h(
        "button",
        {
          ...ctx.attrs,
          type: "button",
          "data-scope": "media-player",
          "data-part": "pip-button",
          "aria-label": props.label,
          title: props.label,
          disabled: context.disabled || !context.controls.supportsPictureInPicture.value,
          onClick: () => void context.controls.togglePictureInPicture(),
        },
        iconNode("picture-in-picture", { width: 16, height: 16 }),
      );
    };
  },
});

export const FullscreenButton = defineComponent({
  name: "SMediaPlayerFullscreenButton",
  props: {
    label: { type: String, default: "Toggle fullscreen" },
  },
  setup(props, ctx: SetupContext) {
    const context = useMediaPlayer();

    return () => {
      if (context.kind !== "video") return null;
      return h(
        "button",
        {
          ...ctx.attrs,
          type: "button",
          "data-scope": "media-player",
          "data-part": "fullscreen-button",
          "aria-label": props.label,
          title: props.label,
          disabled: context.disabled,
          onClick: () => {
            if (context.root.value) void context.controls.toggleFullscreen(context.root.value);
          },
        },
        iconNode("maximize-2", { width: 16, height: 16 }),
      );
    };
  },
});

/** The stage is the media's own room: video fills it, while the audio
 * element remains invisible because its controls carry the meaning. */
export const Stage = part("Stage");

/** The control rail reads as one instrument, not a pile of loose parts. */
export const Controls = part("Controls");
