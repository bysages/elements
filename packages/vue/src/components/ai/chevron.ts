import { h } from "vue";

/** The folding chevron the shared indicator turns. */
export const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M6 4l4 4-4 4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);
