import { injectComponentStyle } from "@bysages/core";
import { createEffect, createSignal, on, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Show } from "solid-js";

/** The mark for a source that never arrived: a quiet mountain-and-sun,
 * drawn in the stylesheet's stroke and hidden from the reader. */
function placeholderGlyph() {
  return (
    <>
      <rect x={3} y={4} width={18} height={16} rx={1.5} />
      <circle cx={9} cy={10} r={1.5} />
      <path d="m5.5 17.5 4.5-5 3 3.5 2.5-3 3 4.5" />
    </>
  );
}

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the `fallback` prop — or the placeholder glyph when the
 * caller has nothing local to say. The frame's size is the consumer's
 * to give. */
export interface ImageProps extends JSX.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
  /** What a broken source leaves instead of the picture. */
  fallback?: JSX.Element;
}

export function Image(props: ImageProps) {
  const [own, rest] = splitProps(props, ["src", "alt", "fit", "loading", "fallback"]);
  const [state, setState] = createSignal<"loading" | "loaded" | "error">("loading");

  // A new source starts the wait over — the last picture's state must
  // not stand in for the next one's.
  createEffect(
    on(
      () => own.src,
      () => setState("loading"),
    ),
  );

  return (
    <figure
      {...rest}
      data-scope="image"
      data-part="root"
      data-state={state()}
      data-fit={own.fit ?? "cover"}
    >
      <img
        data-scope="image"
        data-part="img"
        src={own.src}
        alt={own.alt ?? ""}
        loading={own.loading ?? "lazy"}
        decoding="async"
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
      />
      <Show when={state() === "error"}>
        <div data-scope="image" data-part="fallback">
          {own.fallback ?? placeholderGlyph()}
        </div>
      </Show>
    </figure>
  );
}

injectComponentStyle("image");
