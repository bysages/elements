import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import { Spinner } from "../spinner";

/** A curtain over content that must wait: the blocked region keeps its
 * shape and dims under frosted paper while a quiet wheel reports the
 * wait. Callers own the state; the curtain only answers it. */
export const BlockUI = withSelfRoot(
  defineComponent({
    name: "BlockUI",
    inheritAttrs: false,
    props: {
      /** Whether the curtain is drawn. */
      blocked: { type: Boolean, default: false },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("block-ui");

      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            "data-scope": "block-ui",
            "data-part": "root",
            "data-blocked": props.blocked ? "" : undefined,
            "aria-busy": props.blocked || undefined,
          },
          [
            ctx.slots.default?.(),
            props.blocked
              ? h(
                  "div",
                  { "data-scope": "block-ui", "data-part": "mask" },
                  h(Spinner, { size: "lg" }),
                )
              : null,
          ],
        );
    },
  }),
);
