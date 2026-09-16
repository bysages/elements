import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

const imageGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [
      h("rect", { x: 2.5, y: 3.5, width: 11, height: 9 }),
      h("path", { d: "M2.5 10.5 6 7l3 3 2-1.5 2.5 2" }),
      h("circle", { cx: 6, cy: 6, r: 0.75, fill: "currentColor", stroke: "none" }),
    ],
  );

const fileGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [h("path", { d: "M4 2.5h5l3 3V13.5H4z" }), h("path", { d: "M9 2.5v3h3" })],
  );

const removeGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 12,
      height: 12,
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [h("path", { d: "M4 4l8 8M12 4l-8 8" })],
  );

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
export const Attachment = defineComponent({
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
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-scope": "ai",
          "data-part": "attachment",
          "data-status": props.status,
        },
        [
          isImage(props.name) ? imageGlyph() : fileGlyph(),
          h("span", props.name),
          props.size !== undefined ? h("span", humanSize(props.size)) : null,
          h(
            "button",
            {
              type: "button",
              "data-remove": "",
              "aria-label": `Remove ${props.name}`,
              onClick: () => emit("remove"),
            },
            removeGlyph(),
          ),
        ],
      );
  },
});

/** The row the files ride in — a wrapping line of chips. */
export const Attachments = defineComponent({
  name: "AiAttachments",
  setup(_props, { attrs, slots }: SetupContext) {
    return () =>
      h("span", { ...attrs, "data-scope": "ai", "data-part": "attachments" }, slots.default?.());
  },
});

injectComponentStyle("ai");

export { Attachment as AiAttachment, Attachments as AiAttachments };
