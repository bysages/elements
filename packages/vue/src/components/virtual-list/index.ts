import { injectComponentStyle } from "@bysages/core";
import { useVirtualizer } from "@tanstack/vue-virtual";
import type { CSSProperties, SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";

function toCssLength(length: number | string) {
  return typeof length === "number" ? `${length}px` : length;
}

/** A ledger that only mounts the rows on stage: the viewport keeps its
 * scroll length by a spacer sized from the row height, the rows
 * themselves are positioned against it — a ten-thousand-row list
 * costs the DOM a window, not the ledger. Fixed-height rows keep the
 * arithmetic honest without measurement passes. */
export const VirtualList = withSelfRoot(
  defineComponent({
    name: "VirtualList",
    props: {
      items: { type: Array as PropType<unknown[]>, required: true },
      /** The height every row occupies — fixed rows keep it simple. */
      itemHeight: { type: Number as PropType<number>, default: 40 },
      /** The viewport height the ledger scrolls within. */
      height: { type: [Number, String] as PropType<number | string>, default: 320 },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("virtual-list");

      const viewport = ref<HTMLElement | null>(null);
      const virtualizer = useVirtualizer(
        computed(() => ({
          count: props.items.length,
          getScrollElement: () => viewport.value,
          estimateSize: () => props.itemHeight,
          overscan: 6,
        })),
      );
      return () => {
        const { style, ...attrs } = ctx.attrs;
        return h(
          "div",
          {
            ...attrs,
            ref: viewport,
            tabindex: 0,
            "data-scope": "virtual-list",
            "data-part": "root",
            style: [
              style as CSSProperties,
              { "--bs-virtual-list-height": toCssLength(props.height) },
            ],
          },
          h(
            "div",
            {
              "data-scope": "virtual-list",
              "data-part": "inner",
              style: { "--bs-virtual-list-total": `${virtualizer.value.getTotalSize()}px` },
            },
            virtualizer.value.getVirtualItems().map((row) =>
              h(
                "div",
                {
                  key: String(row.key),
                  "data-scope": "virtual-list",
                  "data-part": "row",
                  style: {
                    "--bs-virtual-list-row-start": `${row.start}px`,
                    "--bs-virtual-list-row-size": `${row.size}px`,
                  },
                },
                ctx.slots.item?.({ item: props.items[row.index], index: row.index }),
              ),
            ),
          ),
        );
      };
    },
  }),
);
