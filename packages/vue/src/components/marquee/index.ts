import { Marquee as ArkMarquee } from "@ark-ui/vue/marquee";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Marquee, dressed in the paper-and-ink system: a linear ribbon of
 * seal-cut chips that dissolves into the paper at its edges rather than
 * cutting off. The parts — Root, Viewport, Content, Edge, Item. */
const MarqueeRoot = defineComponent({
  name: "SMarqueeRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("marquee", attrs);

    return () => h(ArkMarquee.Root, { ...attrs, id: id.value }, slots);
  },
});

type MarqueeItem = string | { label: string };

/** The complete ribbon behind a list of short marks. */
const MarqueeFacade = defineComponent({
  name: "SMarquee",
  props: {
    items: { type: Array as PropType<MarqueeItem[]>, required: true },
    spacing: { type: String, default: undefined },
    speed: { type: Number, default: undefined },
    label: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    injectComponentStyle("marquee");
    return () => {
      const items = props.items.map((item) => (typeof item === "string" ? item : item.label));
      return h(
        MarqueeRoot,
        {
          ...attrs,
          "aria-label": props.label,
          spacing: props.spacing,
          speed: props.speed,
        },
        () =>
          h(ArkMarquee.Viewport, () =>
            h(ArkMarquee.Content, () =>
              items.map((item, index) =>
                h(ArkMarquee.Item, { key: `${item}-${index}` }, () => [
                  h("svg", {
                    width: 16,
                    height: 16,
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    "aria-hidden": "true",
                    innerHTML: '<path d="M12 3 3 9l9 12 9-12-9-6Z" />',
                  }),
                  h("span", () => item),
                ]),
              ),
            ),
          ),
      );
    };
  },
});

export const Marquee = defineFamily(MarqueeFacade, {
  ...ArkMarquee,
  Root: MarqueeRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof MarqueeFacade &
  Omit<typeof ArkMarquee, "Root"> & { Root: typeof MarqueeRoot };
