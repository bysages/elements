import { Pagination as ArkPagination } from "@ark-ui/vue/pagination";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

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

    return () => h(ArkPagination.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

const PaginationPrevTrigger = defineComponent({
  name: "SPaginationPrevTrigger",
  setup(_, ctx: SetupContext) {
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;

    return () =>
      h(
        ArkPagination.PrevTrigger as never,
        { ...attrs, "aria-label": consumerLabel ?? messages.value.pagination.previous },
        ctx.slots.default,
      );
  },
});

const PaginationNextTrigger = defineComponent({
  name: "SPaginationNextTrigger",
  setup(_, ctx: SetupContext) {
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...attrs } = ctx.attrs;

    return () =>
      h(
        ArkPagination.NextTrigger as never,
        { ...attrs, "aria-label": consumerLabel ?? messages.value.pagination.next },
        ctx.slots.default,
      );
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the localized
 * triggers stay interchangeable with Ark's own parts. */
export const Pagination: Omit<typeof ArkPagination, "Root" | "PrevTrigger" | "NextTrigger"> & {
  Root: typeof PaginationRoot;
  PrevTrigger: typeof PaginationPrevTrigger;
  NextTrigger: typeof PaginationNextTrigger;
} = {
  ...ArkPagination,
  Root: PaginationRoot,
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
};
