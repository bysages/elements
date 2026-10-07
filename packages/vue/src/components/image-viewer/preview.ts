import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type VNode } from "vue";

import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../../internal/messages";

/** The default doorway is the curated preview icon; custom content keeps
 * that icon as its hover and focus affordance. */
export const ImageViewerPreview = defineComponent({
  name: "ImageViewerPreview",
  inheritAttrs: false,
  props: {
    /** Visible beside the affordance over custom content. */
    label: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("image-viewer");
    const messages = useComponentMessages();
    const triggerPart = attrs["data-part"];
    const parts = [typeof triggerPart === "string" ? triggerPart : "", "preview"].join(" ").trim();

    return () => {
      const content: VNode[] | undefined = slots.default?.();
      const isIcon = !content?.length;

      return h(
        "span",
        {
          ...attrs,
          "data-scope": "image-viewer",
          "data-part": parts,
          ...(isIcon ? { "data-empty": "true", "aria-label": messages.value.imageViewer.preview } : {}),
        },
        [
          content ?? iconNode("eye"),
          isIcon
            ? null
            : h(
                "span",
                {
                  "data-scope": "image-viewer",
                  "data-part": "preview-overlay",
                  "aria-hidden": true,
                },
                [iconNode("eye"), props.label ? h("span", { "data-part": "preview-label" }, props.label) : null],
              ),
        ],
      );
    };
  },
});

export interface ImageViewerPreviewProps {
  /** Visible beside the affordance over custom content. */
  label?: string;
}
