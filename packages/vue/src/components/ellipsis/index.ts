import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The overflow knife: text cut at one line, or held to N lines. The
 * primitive only draws the cut — reaching the full text (title,
 * tooltip) stays the consumer's decision. */
export interface EllipsisProps {
  lines?: number;
}

export const Ellipsis = defineComponent({
  name: "Ellipsis",
  props: {
    lines: { type: Number, default: 1 },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const { style, ...attrs } = ctx.attrs;
      const multiline = props.lines > 1;
      return h(
        "span",
        {
          ...attrs,
          style: [
            style as CSSProperties,
            multiline ? { "--bs-ellipsis-lines": String(props.lines) } : {},
          ],
          "data-scope": "ellipsis",
          "data-part": "root",
          "data-multiline": multiline ? "" : undefined,
        },
        ctx.slots.default?.(),
      );
    };
  },
});

injectComponentStyle("ellipsis");
