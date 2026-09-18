import { injectComponentStyle } from "@bysages/core";
import { useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

/** The mark for a source that never arrived: a quiet mountain-and-sun,
 * drawn in the stylesheet's stroke and hidden from the reader. */
function placeholderGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x={3} y={4} width={18} height={16} rx={1.5} />
      <circle cx={9} cy={10} r={1.5} />
      <path d="m5.5 17.5 4.5-5 3 3.5 2.5-3 3 4.5" />
    </svg>
  );
}

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the `fallback` — or the placeholder glyph when the
 * caller has nothing local to say. The frame's size is the consumer's
 * to give. */
export interface ImageProps extends Omit<HTMLAttributes<HTMLElement>, "onError" | "onLoad"> {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
  /** Shown in place of the picture when the source breaks. */
  fallback?: ReactNode;
}

export function Image({
  src,
  alt = "",
  fit = "cover",
  loading = "lazy",
  fallback,
  ...rest
}: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  // A new source starts the wait over — the last picture's state must
  // not stand in for the next one's.
  useEffect(() => setState("loading"), [src]);

  return (
    <figure {...rest} data-scope="image" data-part="root" data-state={state} data-fit={fit}>
      <img
        data-scope="image"
        data-part="img"
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
      />
      {state === "error" ? (
        <div data-scope="image" data-part="fallback">
          {fallback ?? placeholderGlyph()}
        </div>
      ) : null}
    </figure>
  );
}

injectComponentStyle("image");
