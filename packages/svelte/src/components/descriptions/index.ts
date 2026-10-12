import { defineFamily } from "../../internal/family";
import DescriptionsFacade from "./Descriptions.svelte";
import DescriptionsDetail from "./DescriptionsDetail.svelte";
import DescriptionsItem from "./DescriptionsItem.svelte";
import DescriptionsTerm from "./DescriptionsTerm.svelte";

/** A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures. */
export const Descriptions: typeof DescriptionsFacade & {
  Root: typeof DescriptionsFacade;
  Item: typeof DescriptionsItem;
  Term: typeof DescriptionsTerm;
  Detail: typeof DescriptionsDetail;
} = defineFamily(DescriptionsFacade, {
  Root: DescriptionsFacade,
  Item: DescriptionsItem,
  Term: DescriptionsTerm,
  Detail: DescriptionsDetail,
});

export type { DescriptionsPartProps, DescriptionsRootProps } from "./props";
