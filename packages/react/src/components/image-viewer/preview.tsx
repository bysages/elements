import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../../internal/messages";

export interface ImageViewerPreviewProps extends Omit<ComponentProps<"span">, "children"> {
  /** Visible beside the affordance over custom content. */
  label?: string;
  "data-part"?: string;
  /** Custom doorway content; omit it for the default curated icon. */
  children?: ReactNode;
}

/** The default doorway is the curated preview icon; custom content keeps
 * that icon as its hover and focus affordance. */
export function ImageViewerPreview({
  label,
  children,
  "data-part": dataPart,
  ...rest
}: ImageViewerPreviewProps) {
  injectComponentStyle("image-viewer");
  const messages = useComponentMessages();
  const parts = [dataPart, "preview"].filter(Boolean).join(" ");
  const isIcon = children == null;

  return (
    <span
      {...rest}
      data-scope="image-viewer"
      data-part={parts}
      {...(isIcon ? { "data-empty": "true", "aria-label": messages.imageViewer.preview } : {})}
    >
      {children ?? iconNode("eye")}
      {isIcon ? null : (
        <span data-scope="image-viewer" data-part="preview-overlay" aria-hidden>
          {iconNode("eye")}
          {label ? <span data-part="preview-label">{label}</span> : null}
        </span>
      )}
    </span>
  );
}
