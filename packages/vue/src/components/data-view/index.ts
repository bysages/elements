import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext, VNode } from "vue";
import { computed, defineComponent, h, ref, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";
import { Pagination } from "../pagination";

/** One vessel, two layouts: the caller renders each record through the
 * item slot, the view lays the records out as a ledger or a lattice
 * and — when a page size is given — pages them with the pagination
 * family's own parts rather than a second implementation. */
export const DataView = withSelfRoot(
  defineComponent({
    name: "DataView",
    inheritAttrs: false,
    props: {
      items: { type: Array as PropType<unknown[]>, required: true },
      /** Ledger rows or a lattice of cards. */
      layout: { type: String as PropType<"list" | "grid">, default: "list" },
      /** Records per page; leave unset to show everything at once. */
      pageSize: { type: Number as PropType<number>, default: undefined },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("data-view");
      const messages = useComponentMessages();

      const page = ref(1);
      const pageCount = computed(() =>
        props.pageSize ? Math.max(1, Math.ceil(props.items.length / props.pageSize)) : 1,
      );
      const visible = computed(() =>
        props.pageSize
          ? props.items.slice((page.value - 1) * props.pageSize, page.value * props.pageSize)
          : props.items,
      );
      function renderItem(item: unknown, index: number): VNode {
        const nodes = ctx.slots.item?.({ item, index }) ?? [];
        return h("div", { key: index, "data-scope": "data-view", "data-part": "cell" }, nodes);
      }
      return () =>
        h("div", { ...ctx.attrs, "data-scope": "data-view", "data-part": "root" }, [
          ctx.slots.header?.(),
          h(
            "div",
            {
              "data-scope": "data-view",
              "data-part": "content",
              "data-layout": props.layout,
            },
            visible.value.map((item, index) => renderItem(item, index)),
          ),
          props.pageSize && pageCount.value > 1
            ? h(
                "div",
                { "data-scope": "data-view", "data-part": "pager" },
                h(
                  Pagination.Root,
                  {
                    count: props.items.length,
                    pageSize: props.pageSize ?? 10,
                    page: page.value,
                    siblingCount: 1,
                    "onUpdate:page": (next: number) => (page.value = next),
                  },
                  () => [
                    h(
                      Pagination.PrevTrigger as never,
                      { "aria-label": messages.value.pagination.previous },
                      () => "‹",
                    ),
                    h(Pagination.Context, null, {
                      pages: ({ pages }: { pages: Array<{ type: string; value?: number }> }) =>
                        pages.map((entry, index) =>
                          entry.type === "ellipsis"
                            ? h(
                                Pagination.Ellipsis as never,
                                { key: `e${index}`, index },
                                () => "…",
                              )
                            : h(
                                Pagination.Item as never,
                                {
                                  key: entry.value ?? index,
                                  value: entry.value ?? 0,
                                },
                                () => entry.value,
                              ),
                        ),
                    }),
                    h(
                      Pagination.NextTrigger as never,
                      { "aria-label": messages.value.pagination.next },
                      () => "›",
                    ),
                  ],
                ),
              )
            : null,
        ]);
    },
  }),
);
