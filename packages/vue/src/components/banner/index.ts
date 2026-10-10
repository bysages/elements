import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

import { iconNode } from "../../internal/icon";
import { Button } from "../button";
import { useComponentMessages } from "../../internal/messages";

const Root = defineComponent({
  name: "BannerRoot",
  props: {
    status: {
      type: String as PropType<"ink" | "info" | "success" | "warning" | "danger">,
      default: "ink",
    },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("banner");

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          role: props.status === "ink" ? undefined : "status",
          "data-scope": "banner",
          "data-part": "root",
          "data-status": props.status,
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

/** The status pigment's glyph. */
const Icon = part("Icon", "span");
/** The column the title and description stack in. */
const Body = part("Body", "div");
/** The bold serif line — what the notice says at a glance. */
const Title = part("Title", "p");
/** The supporting line, in the quiet register. */
const Description = part("Description", "p");
/** Where the reader answers — the row of buttons a banner may carry. */
const Actions = part("Actions", "div");

/** The quiet close: the shared ghost square carries the native button,
 * cursor and halo; the part rides the wrapper so the anatomy contract
 * holds, and the family keeps only its compact overrides. Dismissal
 * stays the consumer's state. */
const Close = defineComponent({
  name: "BannerClose",
  setup(_, { attrs }: SetupContext) {
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...rootAttrs } = attrs;

    return () =>
      h(
        "span",
        { ...rootAttrs, "data-scope": "banner", "data-part": "close" },
        [
          h(
            Button,
            {
              variant: "ghost",
              square: true,
              size: "sm",
              "aria-label": (consumerLabel as string) ?? messages.value.banner.dismiss,
            },
            () => [iconNode("x")],
          ),
        ],
      );
  },
});

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */

export const Banner = Object.assign(Root, {
  Root,
  Icon,
  Body,
  Title,
  Description,
  Actions,
  Close,
});
