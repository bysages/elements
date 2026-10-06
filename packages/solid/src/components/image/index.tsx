import { injectComponentStyle } from "@bysages/core";
import { createEffect, createSignal, on, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Show } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";

/** The registry icon for a source that never arrived, hidden from the reader. */
function placeholderIcon() {
  return iconNode("image");
}

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the `fallback` prop — or the placeholder icon when the
 * caller has nothing local to say. The frame's size is the consumer's
 * to give. */
export interface ImageProps extends JSX.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  /** Intrinsic dimensions for the image element, reserving the layout
   * box before bytes arrive. */
  width?: number | string;
  height?: number | string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
  /** What a broken source leaves instead of the picture. */
  fallback?: JSX.Element;
}

export const Image = withSelfRoot(function Image(props: ImageProps) {
  injectComponentStyle("image");
  const [own, rest] = splitProps(props, [
    "src",
    "alt",
    "width",
    "height",
    "fit",
    "loading",
    "fallback",
  ]);
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
        width={own.width}
        height={own.height}
        loading={own.loading ?? "lazy"}
        decoding="async"
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
      />
      <Show when={state() === "error"}>
        <div data-scope="image" data-part="fallback">
          {own.fallback ?? placeholderIcon()}
        </div>
      </Show>
    </figure>
  );
});
