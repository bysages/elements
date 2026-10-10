import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";

const placeholderIcon = iconNode("image");

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the `fallback` — or the placeholder icon when the
 * caller has nothing local to say. The frame's size is the consumer's
 * to give. */
export interface ImageProps extends Omit<HTMLAttributes<HTMLElement>, "onError" | "onLoad"> {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
  /** Intrinsic rendered width, reserved on the image to avoid layout
   * shift while the source loads. */
  width?: number | string;
  /** Intrinsic rendered height, reserved on the image to avoid layout
   * shift while the source loads. */
  height?: number | string;
  /** Shown in place of the picture when the source breaks. */
  fallback?: ReactNode;
}

function ImageImpl({
  src,
  alt = "",
  fit = "cover",
  loading = "lazy",
  width,
  height,
  fallback,
  ...rest
}: ImageProps) {
  injectComponentStyle("image");
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const imageRef = useRef<HTMLImageElement | null>(null);

  // A new source starts the wait over; cached sources may already be
  // complete, so their settled state is read after the element mounts.
  useEffect(() => {
    setState("loading");
    const image = imageRef.current;
    if (image?.complete) setState(image.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <figure {...rest} data-scope="image" data-part="root" data-state={state} data-fit={fit}>
      <img
        ref={imageRef}
        data-scope="image"
        data-part="img"
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
      />
      {state === "error" ? (
        <div data-scope="image" data-part="fallback">
          {fallback ?? placeholderIcon}
        </div>
      ) : null}
    </figure>
  );
}

export const Image = withSelfRoot(ImageImpl);
