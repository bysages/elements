import { Toc as ArkToc } from "@ark-ui/vue/toc";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h } from "vue";

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The parts — Root, Title, List, Item, Link, Indicator. */

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

export const Toc: Omit<typeof ArkToc, "Indicator" | "Content"> & {
  Indicator: typeof TocIndicator;
  Content: typeof TocContent;
} = {
  ...ArkToc,
  Indicator: TocIndicator,
  Content: TocContent,
};

injectComponentStyle("toc");
