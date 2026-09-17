import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** Whitespace chosen by name: the named steps point at the space ramp so
 * siblings are held apart by one token, never by ad-hoc margins. */
const gapVars: Record<string, string> = {
  none: "0",
  xs: "var(--bs-gap-xs)",
  sm: "var(--bs-gap-sm)",
  md: "var(--bs-gap-md)",
  lg: "var(--bs-gap-lg)",
  xl: "var(--bs-gap-xl)",
};

export interface StackProps {
  direction?: "column" | "row";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  align?: string;
  justify?: string;
}

export const Stack = defineComponent({
  name: "Stack",
  props: {
    direction: { type: String, default: "column" },
    gap: { type: String, default: "md" },
    wrap: { type: Boolean, default: false },
    align: { type: String, default: undefined },
    justify: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const { style, ...attrs } = ctx.attrs;
      return h(
        "div",
        {
          ...attrs,
          style: [
            style as CSSProperties,
            {
              "--bs-stack-gap": gapVars[props.gap] ?? gapVars.md,
              alignItems: props.align,
              justifyContent: props.justify,
              flexWrap: props.wrap ? "wrap" : undefined,
            },
          ],
          "data-scope": "stack",
          "data-part": "root",
          "data-direction": props.direction,
        },
        ctx.slots.default?.(),
      );
    };
  },
});

injectComponentStyle("stack");
