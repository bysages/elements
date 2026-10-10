import { Pagination as ArkPagination } from "@ark-ui/vue/pagination";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */
const PaginationRoot = defineComponent({
  name: "SPaginationRoot",
  props: {
    /** One rung of the control-height ladder every page seal shares. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("pagination");
    const id = useElementId("pagination", attrs);

    return () => {
      const rootProps = { ...attrs, id: id.value, "data-size": props.size };

      return h(ArkPagination.Root, rootProps, slots);
    };
  },
});

const PaginationPrevTrigger = defineComponent({
  name: "SPaginationPrevTrigger",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;

    return () =>
      h(
        ArkPagination.PrevTrigger as never,
        {
          ...attrs,
          "aria-label": consumerLabel ?? messages.value.pagination.previous,
        },
        ctx.slots.default,
      );
  },
});

const PaginationNextTrigger = defineComponent({
  name: "SPaginationNextTrigger",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;

    return () =>
      h(
        ArkPagination.NextTrigger as never,
        {
          ...attrs,
          "aria-label": consumerLabel ?? messages.value.pagination.next,
        },
        ctx.slots.default,
      );
  },
});

/** The complete pagination bar behind one page: count and page size become
 * the visible ladder, with edge semantics left to anatomy. */
const PaginationFacade = defineComponent({
  name: "SPagination",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: undefined },
    count: { type: Number, default: 0 },
    pageSize: { type: Number, default: undefined },
    defaultPageSize: { type: Number, default: undefined },
    siblingCount: { type: Number, default: 1 },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: number) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    return () =>
      h(
        PaginationRoot,
        {
          ...attrs,
          "aria-label": props.label,
          count: props.count,
          defaultPage: props.defaultValue,
          page: props.modelValue,
          pageSize: props.pageSize,
          defaultPageSize: props.defaultPageSize,
          siblingCount: props.siblingCount,
          "onUpdate:page": (page: number) => emit("update:modelValue", page),
        },
        () => [
          h(PaginationPrevTrigger, { "aria-label": "Previous page" }, () =>
            iconNode("chevron-left", { width: 14, height: 14 }),
          ),
          h(ArkPagination.Context, null, {
            default: (pagination: { pages: Array<{ type: string; value?: number }> }) =>
              pagination.pages.map((page, index) =>
                page.type === "page"
                  ? h(
                      ArkPagination.Item as never,
                      { key: page.value, value: page.value },
                      () => page.value,
                    )
                  : h(ArkPagination.Ellipsis, { key: `ellipsis-${index}`, index }, () => "…"),
              ),
          }),
          h(PaginationNextTrigger, { "aria-label": "Next page" }, () =>
            iconNode("chevron-right", { width: 14, height: 14 }),
          ),
        ],
      );
  },
});

export const Pagination = defineFamily(PaginationFacade, {
  ...ArkPagination,
  Root: PaginationRoot,
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
} as unknown as { Root: Component } & Record<string, Component>) as typeof PaginationFacade &
  Omit<typeof ArkPagination, "Root" | "PrevTrigger" | "NextTrigger"> & {
    Root: typeof PaginationRoot;
    PrevTrigger: typeof PaginationPrevTrigger;
    NextTrigger: typeof PaginationNextTrigger;
  };
