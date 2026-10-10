import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string) {
  return defineComponent({
    name: "SBrowser" + name,
    inheritAttrs: false,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("browser");

      return () =>
        h(
          "div",
          { ...ctx.attrs, "data-scope": "browser", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root");
const TitleBar = part("Titlebar");
const UrlBar = part("Urlbar");
const Body = part("Body");

/** The three lamps are the system's own fixed pigments — the same
 * semantics reserved for danger, warning, and success. */
const Dots = defineComponent({
  name: "SBrowserDots",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    injectComponentStyle("browser");

    return () =>
      h(
        "div",
        { ...ctx.attrs, "data-scope": "browser", "data-part": "dots" },
        ["danger", "warning", "success"].map((tone) =>
          h("span", { "data-scope": "browser", "data-part": "dot", "data-tone": tone }),
        ),
      );
  },
});

/** A browser window as a vessel: title bar, the three lamps, the
 * address well, and a body that carries whatever the site hangs in
 * it — an iframe, a screenshot, a live page. */
export const Browser = Object.assign(Root, {
  Root,
  TitleBar,
  Dots,
  UrlBar,
  Body,
});
