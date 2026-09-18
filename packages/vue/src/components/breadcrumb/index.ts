import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string, tag: string, extra: Record<string, unknown> = {}, fallback?: string) {
  return defineComponent({
    name: "Breadcrumb" + name,
    setup(_, ctx: SetupContext) {
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

const Root = part("Root", "nav", { "aria-label": "Breadcrumb" });
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

injectComponentStyle("breadcrumb");
