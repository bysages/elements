import { Pagination as ArkPagination } from "@ark-ui/vue/pagination";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Pagination: Omit<typeof ArkPagination, "Root"> & { Root: typeof PaginationRoot } = {
  ...ArkPagination,
  Root: PaginationRoot,
};
