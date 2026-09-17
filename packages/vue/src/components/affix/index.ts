import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

export interface AffixProps {
  /** Where the content pins when it reaches the top of the scrolling
   * ancestor — the height of any fixed header it must clear. */
  offsetTop?: string;
  /** Where it pins from the bottom instead, for footers and action bars. */
  offsetBottom?: string;
}

/**
 * A nail: the wrapped content travels with the page until it reaches its
 * offset, then stays put while the page moves on. The semantics are
 * plain `position: sticky` — pinning is relative to the nearest
 * *scrolling* ancestor, so the element works inside a scrollable panel
 * exactly as it does on the page itself, and a parent with
 * `overflow: hidden` clips the pin. Both offsets may be given: the
 * content then holds its place inside that band.
 */
export const Affix = defineComponent({
  name: "Affix",
  props: {
    offsetTop: { type: String, default: "0px" },
    offsetBottom: { type: String, default: "0px" },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const { style, ...attrs } = ctx.attrs;
      return h(
        "div",
        {
          ...attrs,
          style: [style as CSSProperties, { top: props.offsetTop, bottom: props.offsetBottom }],
          "data-scope": "affix",
          "data-part": "root",
        },
        ctx.slots.default?.(),
      );
    };
  },
});

injectComponentStyle("affix");
