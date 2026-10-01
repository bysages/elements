import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

type Status = "success" | "warning" | "danger" | "info";

const MARK =
  '<g data-for="success"><path d="M20 6 9 17l-5-5"/></g>' +
  '<g data-for="warning"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></g>' +
  '<g data-for="danger"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></g>' +
  '<g data-for="info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>';

const Root = defineComponent({
  name: "SResultRoot",
  props: {
    /** The verdict the operation returned; the fixed pigments speak it. */
    status: { type: String as PropType<Status>, default: "info" },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("result");

    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "result", "data-part": "root", "data-status": props.status },
        ctx.slots.default?.(),
      );
  },
});

/** The mark carries all four verdicts and lets the root choose, so the
 * icon can never drift from the status the root declares. */
const Icon = defineComponent({
  name: "SResultIcon",
  setup(_, ctx: SetupContext) {
    injectComponentStyle("result");

    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "result", "data-part": "icon" },
        ctx.slots.default?.() ??
          h("svg", {
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "aria-hidden": "true",
            innerHTML: MARK,
          }),
      );
  },
});

function part(name: string, tag: "h3" | "p" | "div") {
  return defineComponent({
    name: "SResult" + name,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("result");
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "result", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Title = part("Title", "h3");
const Description = part("Description", "p");
const Extra = part("Extra", "div");

/** A verdict drawn after the deed: the mark washes in the fixed
 * pigment, the title rides the serif, and the extra carries the way
 * onward. Any subset composes. */
export const Result = Object.assign(Root, { Root, Icon, Title, Description, Extra });
