import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */
const Root = defineComponent({
  name: "BannerRoot",
  props: {
    status: {
      type: String as PropType<"ink" | "info" | "success" | "warning" | "danger">,
      default: "ink",
    },
  },
  setup(props, ctx: SetupContext) {
    const status = computed(() => props.status);
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          role: status.value === "ink" ? undefined : "status",
          "data-scope": "banner",
          "data-part": "root",
          "data-status": status.value,
        },
        ctx.slots.default?.(),
      );
  },
});

function part(name: string, tag: string) {
  return defineComponent({
    name: "Banner" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "banner", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Icon = part("Icon", "span");
const Body = part("Body", "div");
const Title = part("Title", "p");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

/** The quiet close: a plain square-cut button; dismissal stays the
 * consumer's state. */
const Close = defineComponent({
  name: "BannerClose",
  setup(_, ctx: SetupContext) {
    return () =>
      h(
        "button",
        {
          ...ctx.attrs,
          type: (ctx.attrs.type as string) ?? "button",
          "aria-label": (ctx.attrs["aria-label"] as string) ?? "Dismiss",
          "data-scope": "banner",
          "data-part": "close",
        },
        [
          h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true }, [
            h("path", {
              d: "M4 4l8 8M12 4l-8 8",
              stroke: "currentColor",
              "stroke-width": 1.5,
              "stroke-linecap": "round",
            }),
          ]),
        ],
      );
  },
});

export const Banner = Object.assign(Root, {
  Root,
  Icon,
  Body,
  Title,
  Description,
  Actions,
  Close,
});

injectComponentStyle("banner");
