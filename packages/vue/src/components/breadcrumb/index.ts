import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { useComponentMessages } from "../../internal/messages";

function part(name: string, tag: string, extra: Record<string, unknown> = {}, fallback?: string) {
  return defineComponent({
    name: "Breadcrumb" + name,
    inheritAttrs: false,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("breadcrumb");

      return () =>
        h(
          tag,
          {
            ...extra,
            ...ctx.attrs,
            "data-scope": "breadcrumb",
            "data-part": name.toLowerCase(),
          },
          ctx.slots.default?.() ?? fallback,
        );
    },
  });
}

const Root = defineComponent({
  name: "BreadcrumbRoot",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    injectComponentStyle("breadcrumb");
    const messages = useComponentMessages();

    return () => {
      const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;

      return h(
        "nav",
        {
          ...attrs,
          "aria-label": consumerLabel ?? messages.value.breadcrumb.label,
          "data-scope": "breadcrumb",
          "data-part": "root",
        },
        ctx.slots.default?.(),
      );
    };
  },
});
const List = part("List", "ol");
const Item = part("Item", "li");
const Link = part("Link", "a");
const Current = part("Current", "span", { "aria-current": "page" });
const Separator = part("Separator", "span", { "aria-hidden": "true" }, "/");

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */

export const Breadcrumb = Object.assign(Root, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});
