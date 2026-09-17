import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h, ref, watch } from "vue";

/** The mark for a source that never arrived: a quiet mountain-and-sun,
 * drawn in the stylesheet's stroke and hidden from the reader. */
function placeholderGlyph() {
  return [
    h("rect", { x: 3, y: 4, width: 18, height: 16, rx: 1.5 }),
    h("circle", { cx: 9, cy: 10, r: 1.5 }),
    h("path", { d: "m5.5 17.5 4.5-5 3 3.5 2.5-3 3 4.5" }),
  ];
}

/** A framed picture: while the source loads, the frame keeps the
 * skeleton's breath; the picture dissolves in when it lands; a broken
 * source leaves the fallback slot — or the placeholder glyph when the
 * caller has nothing local to say. The frame's size is the consumer's
 * to give. */
export interface ImageProps {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
}

export const Image = defineComponent({
  name: "Image",
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    fit: {
      type: String as PropType<ImageProps["fit"]>,
      default: "cover",
    },
    loading: {
      type: String as PropType<ImageProps["loading"]>,
      default: "lazy",
    },
  },
  setup(props, ctx: SetupContext) {
    const state = ref<"loading" | "loaded" | "error">("loading");

    // A new source starts the wait over — the last picture's state must
    // not stand in for the next one's.
    watch(
      () => props.src,
      () => (state.value = "loading"),
    );

    return () =>
      h(
        "figure",
        {
          ...ctx.attrs,
          "data-scope": "image",
          "data-part": "root",
          "data-state": state.value,
          "data-fit": props.fit,
        },
        [
          h("img", {
            "data-scope": "image",
            "data-part": "img",
            src: props.src,
            alt: props.alt,
            loading: props.loading,
            decoding: "async",
            onLoad: () => (state.value = "loaded"),
            onError: () => (state.value = "error"),
          }),
          state.value === "error"
            ? h(
                "div",
                { "data-scope": "image", "data-part": "fallback" },
                ctx.slots.fallback ?? placeholderGlyph,
              )
            : null,
        ],
      );
  },
});

injectComponentStyle("image");
