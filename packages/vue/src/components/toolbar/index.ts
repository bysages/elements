import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A workbench rail: the start tools at the leading edge, the end tools
 * at the trailing, the rail itself carrying the toolbar role so assistive
 * tech reads it as one group of commands. The vessel holds; the tools
 * inside stay the caller's own buttons and menus. */
export const Toolbar = withSelfRoot(
  defineComponent({
    name: "Toolbar",
    props: {
      /** Accessible name when more than one toolbar shares a page. */
      label: { type: String, default: undefined },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("toolbar");

      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            role: "toolbar",
            "aria-label": props.label ?? undefined,
            "data-scope": "toolbar",
            "data-part": "root",
          },
          [
            h(
              "div",
              { "data-scope": "toolbar", "data-part": "group", "data-edge": "start" },
              ctx.slots.start?.() ?? ctx.slots.default?.(),
            ),
            ctx.slots.end
              ? h(
                  "div",
                  { "data-scope": "toolbar", "data-part": "group", "data-edge": "end" },
                  ctx.slots.end(),
                )
              : null,
          ],
        );
    },
  }),
);
