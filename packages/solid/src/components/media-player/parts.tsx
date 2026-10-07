import { For, Show, splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

import { iconNode } from "../../internal/icon";
import { Select } from "../select";
import { useMediaPlayer } from "./shell";
import { formatMediaTime } from "./use-media-controls";

export type MediaPartProps = JSX.HTMLAttributes<HTMLElement>;
type ButtonPartProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string };
type InputPartProps = JSX.InputHTMLAttributes<HTMLInputElement> & { label?: string };
type DivPartProps = JSX.HTMLAttributes<HTMLDivElement> & { children?: JSX.Element };
type LabeledDivPartProps = DivPartProps & { label?: string };

function part(name: string) {
  function MediaPart(props: DivPartProps) {
    return (
      <div {...props} data-scope="media-player" data-part={name.toLowerCase()}>
        {props.children}
      </div>
    );
  }
  return MediaPart;
}

/** The native media element, framed by the shared shell's state machine. */
export function Media(props: MediaPartProps) {
  const context = useMediaPlayer();
  const element = () => (context.kind === "video" ? "video" : "audio");

  return (
    <Dynamic
      component={element()}
      {...props}
      src={context.sources.length > 0 ? undefined : context.src}
      data-scope="media-player"
      data-part="media"
      autoplay={context.autoplay}
      loop={context.loop}
      muted={context.muted}
      preload={context.preload}
      poster={context.poster}
      playsinline={context.playsInline}
      ref={(value: HTMLMediaElement) => {
        context.media.current = value;
      }}
      aria-label={context.label}
      onPlay={(event: Event) => context.emit("play", event)}
      onPause={(event: Event) => context.emit("pause", event)}
      onEnded={(event: Event) => context.emit("ended", event)}
      onTimeUpdate={(event: Event) => context.emit("timeupdate", event)}
      onVolumeChange={(event: Event) => context.emit("volumechange", event)}
      onRateChange={(event: Event) => context.emit("ratechange", event)}
      onError={(event: Event) => context.emit("error", event)}
    >
      <For each={context.sources}>{(source) => <source src={source.src} type={source.type} />}</For>
      <For each={context.tracks}>
        {(track) => (
          <track
            src={track.src}
            kind={track.kind ?? "subtitles"}
            label={track.label}
            srclang={track.srcLang}
            default={track.default}
          />
        )}
      </For>
    </Dynamic>
  );
}

/** Play and pause share one seal-cut control: the state changes the mark,
 * never the control's place in the hand. */
export function PlayButton(props: ButtonPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  const label = () => local.label ?? (context.controls.playing() ? "Pause" : "Play");
  return (
    <button
      {...rest}
      type="button"
      data-scope="media-player"
      data-part="play-button"
      aria-label={label()}
      aria-pressed={context.controls.playing()}
      title={label()}
      disabled={context.disabled}
      onClick={() => void context.controls.toggle()}
    >
      {iconNode(context.controls.playing() ? "pause" : "play", { width: "16", height: "16" })}
    </button>
  );
}

/** The elapsed and total time bracket the timeline. */
export function Time(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const context = useMediaPlayer();
  return (
    <span {...props} data-scope="media-player" data-part="time">
      {formatMediaTime(context.controls.currentTime())} /{" "}
      {formatMediaTime(context.controls.duration())}
    </span>
  );
}

/** The timeline is the sheet on which the listener writes their place. */
export function Timeline(props: InputPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  const progress = () =>
    context.controls.duration() > 0
      ? (context.controls.currentTime() / context.controls.duration()) * 100
      : 0;
  return (
    <input
      {...rest}
      type="range"
      data-scope="media-player"
      data-part="timeline"
      min={0}
      max={context.controls.duration()}
      step={0.1}
      value={context.controls.currentTime()}
      disabled={context.disabled || context.controls.duration() <= 0}
      aria-label={local.label ?? "Seek"}
      aria-valuetext={formatMediaTime(context.controls.currentTime())}
      style={{ ...(props.style as JSX.CSSProperties), "--bs-media-progress": `${progress()}%` }}
      onInput={(event) => context.controls.seek(Number(event.currentTarget.value))}
    />
  );
}

/** Muting stays at the left of the volume well, the way a hand expects. */
export function MuteButton(props: ButtonPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  const muted = () => context.controls.muted() || context.controls.volume() === 0;
  const label = () => local.label ?? (muted() ? "Unmute" : "Mute");
  return (
    <button
      {...rest}
      type="button"
      data-scope="media-player"
      data-part="mute-button"
      aria-label={label()}
      aria-pressed={muted()}
      title={label()}
      disabled={context.disabled}
      onClick={() => context.controls.toggleMuted()}
    >
      {iconNode(muted() ? "volume-x" : "volume-2", { width: "16", height: "16" })}
    </button>
  );
}

export function Volume(props: InputPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  const volume = () => (context.controls.muted() ? 0 : context.controls.volume());
  return (
    <input
      {...rest}
      type="range"
      data-scope="media-player"
      data-part="volume"
      min={0}
      max={1}
      step={0.01}
      value={volume()}
      disabled={context.disabled}
      aria-label={local.label ?? "Volume"}
      aria-valuetext={`${Math.round(volume() * 100)}%`}
      style={{ ...(props.style as JSX.CSSProperties), "--bs-media-progress": `${volume() * 100}%` }}
      onInput={(event) => context.controls.setVolume(Number(event.currentTarget.value))}
    />
  );
}

/** Playback rate is a real choice, not hidden behind native menus. */
export function Rate(props: LabeledDivPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  return (
    <div {...rest} data-scope="media-player" data-part="rate">
      <Select
        clearable={false}
        disabled={context.disabled}
        options={context.playbackRates.map((rate) => ({ label: `${rate}×`, value: String(rate) }))}
        placeholder={local.label ?? "Playback speed"}
        size="sm"
        value={String(context.controls.playbackRate())}
        onValueChange={(value) => context.controls.setPlaybackRate(Number(value))}
      />
    </div>
  );
}

/** Text tracks use the browser's native model; the control chooses a
 * track index, while rendering stays with the media element. */
export function Captions(props: LabeledDivPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  return (
    <Show when={context.tracks.length > 0}>
      <div {...rest} data-scope="media-player" data-part="captions">
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
          placeholder={local.label ?? "Captions"}
          size="sm"
          value={String(context.controls.selectedTextTrack())}
          onValueChange={(value) => context.controls.selectTextTrack(Number(value))}
        />
      </div>
    </Show>
  );
}

/** Picture-in-picture is video-only and capability-detected. */
export function PipButton(props: ButtonPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  return (
    <Show when={context.kind === "video"}>
      <button
        {...rest}
        type="button"
        data-scope="media-player"
        data-part="pip-button"
        aria-label={local.label ?? "Toggle picture in picture"}
        title={local.label ?? "Toggle picture in picture"}
        disabled={context.disabled}
        onClick={() => void context.controls.togglePictureInPicture()}
      >
        {iconNode("picture-in-picture", { width: "16", height: "16" })}
      </button>
    </Show>
  );
}

/** Fullscreen takes the whole vessel, not just the moving picture. */
export function FullscreenButton(props: ButtonPartProps) {
  const context = useMediaPlayer();
  const [local, rest] = splitProps(props, ["label"]);
  return (
    <button
      {...rest}
      type="button"
      data-scope="media-player"
      data-part="fullscreen-button"
      aria-label={local.label ?? "Toggle fullscreen"}
      title={local.label ?? "Toggle fullscreen"}
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
