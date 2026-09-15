import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

/** A wheel of waiting: one arc of ink turning about its center. Quiet by
 * default — it reports progress without claiming attention. */
export const Spinner = defineComponent({
  name: "Spinner",
  props: {
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      default: "md",
    },
  },
  setup(props, ctx: SetupContext) {
    const size = computed(() => props.size);
    return () =>
      h(
        "span",
        {
          ...ctx.attrs,
          role: "status",
          "aria-label": ctx.attrs["aria-label"] ?? "Loading",
          "data-scope": "spinner",
          "data-part": "root",
          "data-size": size.value,
        },
        [
          h("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true }, [
            h("circle", {
              cx: 12,
              cy: 12,
              r: 9,
              stroke: "currentColor",
              "stroke-opacity": 0.2,
              "stroke-width": 2.5,
            }),
            h("path", {
              d: "M21 12a9 9 0 0 0-9-9",
              stroke: "currentColor",
              "stroke-width": 2.5,
              "stroke-linecap": "round",
            }),
          ]),
          ctx.slots.default?.(),
        ],
      );
  },
});

injectComponentStyle("spinner");
