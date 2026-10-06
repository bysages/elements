import { Toc as ArkToc } from "@ark-ui/vue/toc";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The parts — Root, Title, List, Item, Link, Indicator. */

const TocRoot = defineComponent({
  name: "STocRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("toc", attrs);

    return () => h(ArkToc.Root as never, { ...attrs, id: id.value }, slots);
  },
});

/** The active stroke is decoration; hidden so the list reads as links
 * alone. */
const TocIndicator = defineComponent({
  name: "STocIndicator",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(ArkToc.Indicator, { ...attrs, "aria-hidden": "true" }, slots);
  },
});

/** The content column is the scroller the rail walks — a keyboard
 * reader needs to reach it like any scroll region. */
const TocContent = defineComponent({
  name: "STocContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(ArkToc.Content, { ...attrs, tabindex: 0 }, slots);
  },
});

type TocFacadeItem = { value: string; label: string; depth?: number };

/** The complete rail behind one page: items become anchor rows, the
 * title names the list, and the active stroke follows the scroller. */
const TocFacade = defineComponent({
  name: "SToc",
  props: {
    items: { type: Array as PropType<TocFacadeItem[]>, required: true },
    scrollEl: { type: Function as PropType<() => HTMLElement | null>, default: undefined },
    title: { type: String, default: "On this page" },
  },
  setup(props, { attrs }) {
    injectComponentStyle("toc");

    return () =>
      h(TocRoot, { ...attrs, items: props.items, scrollEl: props.scrollEl } as never, () => [
        h(ArkToc.Nav, () => [
          ...(props.title ? [h(ArkToc.Title, () => props.title)] : []),
          h(ArkToc.List, () => [
            h(TocIndicator),
            ...props.items.map((item) =>
              h(
                ArkToc.Item as never,
                {
                  key: item.value,
                  item,
                  style:
                    item.depth && item.depth > 2
                      ? { paddingInlineStart: `${item.depth - 2}rem` }
                      : undefined,
                },
                () => h(ArkToc.Link, { href: `#${item.value}` }, () => item.label),
              ),
            ),
          ]),
        ]),
      ]);
  },
});

export const Toc = defineFamily(TocFacade, {
  ...ArkToc,
  Root: TocRoot,
  Indicator: TocIndicator,
  Content: TocContent,
}) as unknown as typeof TocFacade & {
  Root: typeof TocRoot;
  Indicator: typeof TocIndicator;
  Content: typeof TocContent;
} & Omit<typeof ArkToc, "Root" | "Indicator" | "Content">;

injectComponentStyle("toc");
