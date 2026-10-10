import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { formatMessage, useComponentMessages } from "../../internal/messages";
import { Button } from "../button";

const imageIcon = () => iconNode("image");

const fileIcon = () => iconNode("file");

const removeIcon = () => iconNode("x", { width: 12, height: 12 });

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];

const isImage = (name: string) => IMAGE_EXTS.includes(name.split(".").pop()?.toLowerCase() ?? "");

const humanSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unit = -1;
  do {
    value /= 1024;
    unit += 1;
  } while (value >= 1024 && unit < units.length - 1);
  return `${value.toFixed(1)} ${units[unit]}`;
};

/** One file riding the prompt: its glyph by extension, its name and
 * human size, and a quiet way to take it back off. Uploading reads as
 * a dashed ghost, error as danger ink. */
export const Attachment = withSelfRoot(
  defineComponent({
    name: "AiAttachment",
    props: {
      /** The file's name — it picks the glyph by extension. */
      name: { type: String, required: true },
      /** The file's size in bytes, when known — rendered human. */
      size: { type: Number, default: undefined },
      /** The upload's state on the wire. */
      status: {
        type: String as PropType<"uploading" | "ready" | "error">,
        default: "ready",
      },
    },
    emits: { remove: () => true },
    setup(props, { emit, attrs }: SetupContext) {
      injectComponentStyle("ai");
      const messages = useComponentMessages();
      const { "aria-label": consumerLabel, ...rootAttrs } = attrs;

      return () =>
        h(
          "span",
          {
            ...rootAttrs,
            "data-scope": "ai",
            "data-part": "attachment",
            "data-status": props.status,
          },
          [
            isImage(props.name) ? imageIcon() : fileIcon(),
            h("span", props.name),
            props.size !== undefined ? h("span", humanSize(props.size)) : null,
            h(
              Button,
              {
                variant: "ghost",
                square: true,
                size: "sm",
                "aria-label":
                  consumerLabel ??
                  formatMessage(messages.value.ai.removeAttachment, { name: props.name }),
                onClick: () => emit("remove"),
              },
              () => [removeIcon()],
            ),
          ],
        );
    },
  }),
);

/** The row the files ride in — a wrapping line of chips. */
export const Attachments = withSelfRoot(
  defineComponent({
    name: "AiAttachments",
    setup(_props, { attrs, slots }: SetupContext) {
      return () =>
        h("span", { ...attrs, "data-scope": "ai", "data-part": "attachments" }, slots.default?.());
    },
  }),
);
export { Attachment as AiAttachment, Attachments as AiAttachments };
