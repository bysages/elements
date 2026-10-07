import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";

import { iconNode } from "../../internal/icon";
import { Select } from "../select";
import { useMediaPlayer } from "./context";
import { formatMediaTime } from "./use-media-controls";

function part(name: string) {
  function MediaPart(props: HTMLAttributes<HTMLDivElement>) {
    return (
      <div {...props} data-scope="media-player" data-part={name.toLowerCase()}>
        {props.children}
      </div>
    );
  }
  return MediaPart;
}

export type MediaPartProps = HTMLAttributes<HTMLElement>;
type ButtonPartProps = ButtonHTMLAttributes<HTMLButtonElement> & { label?: string };
type InputPartProps = InputHTMLAttributes<HTMLInputElement> & { label?: string };
type DivPartProps = HTMLAttributes<HTMLDivElement> & { label?: string };

/** The native media element, framed by the shared shell's state machine. */
export function Media(props: MediaPartProps) {
  const context = useMediaPlayer();
  const Element = context.kind === "video" ? "video" : "audio";
  const nativeProps = {
    ...props,
    src: context.sources.length > 0 ? undefined : context.src,
    "data-scope": "media-player",
    "data-part": "media",
    autoPlay: undefined,
    loop: undefined,
    muted: undefined,
    preload: undefined,
    poster: undefined,
    playsInline: undefined,
    ref: (value: HTMLMediaElement | null) => {
      context.media.current = value;
    },
    "aria-label": context.label,
    onPlay: (event: Event) => context.emit("play", event),
    onPause: (event: Event) => context.emit("pause", event),
    onEnded: (event: Event) => context.emit("ended", event),
    onTimeUpdate: (event: Event) => context.emit("timeupdate", event),
    onVolumeChange: (event: Event) => context.emit("volumechange", event),
    onRateChange: (event: Event) => context.emit("ratechange", event),
    onError: (event: Event) => context.emit("error", event),
  } as Record<string, unknown>;

  if (context.kind === "video") {
    nativeProps.poster = context.poster;
    nativeProps.playsInline = context.playsInline;
  }
  nativeProps.autoPlay = context.autoplay;
  nativeProps.loop = context.loop;
  nativeProps.muted = context.muted;
  nativeProps.preload = context.preload;

  return (
    <Element {...(nativeProps as any)}>
      {context.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
      {context.tracks.map((track) => (
        <track
          key={track.src}
          src={track.src}
          kind={track.kind ?? "subtitles"}
          label={track.label}
          srcLang={track.srcLang}
          default={track.default}
        />
      ))}
    </Element>
  );
}

/** Play and pause share one seal-cut control: the state changes the mark,
 * never the control's place in the hand. */
export function PlayButton({ label, ...props }: ButtonPartProps) {
  const context = useMediaPlayer();
  const text = label ?? (context.controls.playing ? "Pause" : "Play");
  return (
    <button
      {...props}
      type="button"
      data-scope="media-player"
      data-part="play-button"
      aria-label={text}
      aria-pressed={context.controls.playing}
      title={text}
      disabled={context.disabled}
      onClick={() => void context.controls.toggle()}
    >
      {iconNode(context.controls.playing ? "pause" : "play", {
        width: "16",
        height: "16",
      })}
    </button>
  );
}

/** The elapsed and total time bracket the timeline. */
export function Time(props: HTMLAttributes<HTMLSpanElement>) {
  const context = useMediaPlayer();
  return (
    <span {...props} data-scope="media-player" data-part="time">
      {formatMediaTime(context.controls.currentTime)} / {formatMediaTime(context.controls.duration)}
    </span>
  );
}

/** Seeking writes straight to currentTime; buffered ranges can later
 * ride the same part as a second ink wash. */
export function Timeline({ label = "Seek", ...props }: InputPartProps) {
  const context = useMediaPlayer();
  const progress =
    context.controls.duration > 0
      ? Math.min((context.controls.currentTime / context.controls.duration) * 100, 100)
      : 0;
  return (
    <input
      {...props}
      type="range"
      data-scope="media-player"
      data-part="timeline"
      min={0}
      max={context.controls.duration || 0}
      step={0.1}
      value={context.controls.currentTime}
      disabled={context.disabled || context.controls.duration <= 0}
      aria-label={label}
      aria-valuetext={formatMediaTime(context.controls.currentTime)}
      style={
        {
          ...(props.style as CSSProperties),
          "--bs-media-progress": `${progress}%`,
        } as CSSProperties
      }
      onInput={(event) => context.controls.seek(Number(event.currentTarget.value))}
    />
  );
}

/** Muting stays at the left of the volume well, the way a hand expects. */
export function MuteButton({ label, ...props }: ButtonPartProps) {
  const context = useMediaPlayer();
  const muted = context.controls.muted || context.controls.volume === 0;
  const text = label ?? (muted ? "Unmute" : "Mute");
  return (
    <button
      {...props}
      type="button"
      data-scope="media-player"
      data-part="mute-button"
      aria-label={text}
      aria-pressed={muted}
      title={text}
      disabled={context.disabled}
      onClick={() => context.controls.toggleMuted()}
    >
      {iconNode(muted ? "volume-x" : "volume-2", { width: "16", height: "16" })}
    </button>
  );
}

export function Volume({ label = "Volume", ...props }: InputPartProps) {
  const context = useMediaPlayer();
  const volume = context.controls.muted ? 0 : context.controls.volume;
  return (
    <input
      {...props}
      type="range"
      data-scope="media-player"
      data-part="volume"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      disabled={context.disabled}
      aria-label={label}
      aria-valuetext={`${Math.round(volume * 100)}%`}
      style={
        {
          ...(props.style as CSSProperties),
          "--bs-media-progress": `${volume * 100}%`,
        } as CSSProperties
      }
      onInput={(event) => context.controls.setVolume(Number(event.currentTarget.value))}
    />
  );
}

/** Playback rate is a real choice, not hidden behind native menus. */
export function Rate({ label = "Playback speed", ...props }: DivPartProps) {
  const context = useMediaPlayer();
  return (
    <div {...props} data-scope="media-player" data-part="rate">
      <Select
        clearable={false}
        disabled={context.disabled}
        options={context.playbackRates.map((rate) => ({ label: `${rate}×`, value: String(rate) }))}
        placeholder={label}
        size="sm"
        value={String(context.controls.playbackRate)}
        onValueChange={(value) => context.controls.setPlaybackRate(Number(value))}
      />
    </div>
  );
}

/** Text tracks use the browser's native model; the control chooses a
 * track index, while rendering stays with the media element. */
export function Captions({ label = "Captions", ...props }: DivPartProps) {
  const context = useMediaPlayer();
  if (context.tracks.length === 0) return null;
  return (
    <div {...props} data-scope="media-player" data-part="captions">
      <Select
        clearable={false}
        disabled={context.disabled}
        options={[
          { label: "Off", value: "-1" },
          ...context.tracks.map((track, index) => ({
            label: track.label ?? `Track ${index + 1}`,
            value: String(index),
          })),
        ]}
        placeholder={label}
        size="sm"
        value={String(context.controls.selectedTextTrack)}
        onValueChange={(value) => context.controls.selectTextTrack(Number(value))}
      />
    </div>
  );
}

/** Picture-in-picture is video-only and capability-detected. */
export function PipButton({ label = "Toggle picture in picture", ...props }: ButtonPartProps) {
  const context = useMediaPlayer();
  if (context.kind !== "video") return null;
  return (
    <button
      {...props}
      type="button"
      data-scope="media-player"
      data-part="pip-button"
      aria-label={label}
      title={label}
      disabled={context.disabled}
      onClick={() => void context.controls.togglePictureInPicture()}
    >
      {iconNode("picture-in-picture", { width: "16", height: "16" })}
    </button>
  );
}

/** Fullscreen takes the whole vessel, not just the moving picture. */
export function FullscreenButton({
  label = "Toggle fullscreen",
  ...props
}: MediaPartProps & { label?: string }) {
  const context = useMediaPlayer();
  return (
    <button
      {...props}
      type="button"
      data-scope="media-player"
      data-part="fullscreen-button"
      aria-label={label}
      title={label}
      disabled={context.disabled}
      onClick={() => {
        const root = context.root.current;
        if (root) void context.controls.toggleFullscreen(root);
      }}
    >
      {iconNode("maximize-2", { width: "16", height: "16" })}
    </button>
  );
}

export const Stage = part("Stage");
export const Controls = part("Controls");
