import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, Fragment, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
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

/** One waymark on the trail: a plain label or its linked equivalent. */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** The one-tag trail: plain strings or named waymarks, with the current
 * final waymark rendered as the current page. */
const BreadcrumbFacade = defineComponent({
  name: "SBreadcrumb",
  inheritAttrs: false,
  props: {
    /** The trail, read in order; the last waymark is the current page. */
    items: {
      type: Array as PropType<Array<string | BreadcrumbItem>>,
      required: true,
    },
    /** The trail's accessible name, in place of the shared default. */
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("breadcrumb");

    return () => {
      const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;
      const current = props.items.length - 1;

      return h(Root, { ...attrs, "aria-label": consumerLabel ?? props.label }, () =>
        h(List, () =>
          props.items.map((entry, index) => {
            const item = typeof entry === "string" ? { label: entry } : entry;
            const waymark =
              index === current
                ? h(Current, () => item.label)
                : h(Link, { href: item.href }, () => item.label);

            return h(Fragment, { key: `${index}:${item.label}` }, [
              h(Item, () => waymark),
              index < current ? h(Separator) : null,
            ]);
          }),
        ),
      );
    };
  },
});

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest pass through attributes. */

export const Breadcrumb = defineFamily(BreadcrumbFacade, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});
