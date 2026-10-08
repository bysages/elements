import { Toc as ArkToc } from "@ark-ui/vue/toc";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, onMounted, ref, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

type TocItem = { value: string; label: string; depth?: number };

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The parts — Root, Title, List, Item, Link, Indicator. */

const TocRoot = defineComponent({
  name: "STocRoot",
  props: {
    items: { type: Array as PropType<TocItem[]>, default: undefined },
    scrollEl: { type: Function as PropType<() => HTMLElement | null>, default: undefined },
    "scroll-el": { type: Function as PropType<() => HTMLElement | null>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const scrollEl = props.scrollEl ?? props["scroll-el"];
    const id = useElementId("toc", attrs);
    const isMounted = ref(false);

    onMounted(() => {
      isMounted.value = true;
    });

    return () =>
      h(
        ArkToc.Root as never,
        {
          key: isMounted.value ? "ready" : "initial",
          ...attrs,
          id: id.value,
          ...(props.items ? { items: props.items } : {}),
          ...(scrollEl ? { scrollEl } : {}),
        },
        slots,
      );
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

/** The complete rail behind one page: items become anchor rows, the
 * title names the list, and the active stroke follows the scroller. */
const TocFacade = defineComponent({
  name: "SToc",
  props: {
    items: { type: Array as PropType<TocItem[]>, required: true },
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
              h(ArkToc.Item as never, { key: item.value, item }, () =>
                h(ArkToc.Link, { href: `#${item.value}` }, () => item.label),
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
