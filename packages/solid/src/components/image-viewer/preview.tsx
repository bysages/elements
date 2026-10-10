import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../config-provider/use-component-messages";

export interface ImageViewerPreviewProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "children"> {
  /** Visible beside the affordance over custom content. */
  label?: string;
  "data-part"?: string;
  /** Custom doorway content; omit it for the default curated icon. */
  children?: JSX.Element;
}

/** The default doorway is the curated preview icon; custom content keeps
 * that icon as its hover and focus affordance. */
export function ImageViewerPreview(props: ImageViewerPreviewProps) {
  injectComponentStyle("image-viewer");
  const messages = useComponentMessages();
  const [own, triggerProps, rest] = splitProps(props, ["label", "children"], ["data-part"]);
  const parts = [triggerProps["data-part"], "preview"].filter(Boolean).join(" ");
  const isIcon = () => own.children == null;

  return (
    <span
      {...rest}
      data-scope="image-viewer"
      data-part={parts}
      {...(isIcon() ? { "data-empty": "true", "aria-label": messages().imageViewer.preview } : {})}
    >
      <Show when={own.children} fallback={iconNode("eye")}>
        {own.children}
        <span data-scope="image-viewer" data-part="preview-overlay" aria-hidden="true">
          {iconNode("eye")}
          <Show when={own.label}>
            <span data-part="preview-label">{own.label}</span>
          </Show>
        </span>
      </Show>
    </span>
  );
}
