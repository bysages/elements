import { injectComponentStyle } from "@bysages/core";

import DescriptionsRoot from "./Descriptions.svelte";
import DescriptionsDetail from "./DescriptionsDetail.svelte";
import DescriptionsItem from "./DescriptionsItem.svelte";
import DescriptionsTerm from "./DescriptionsTerm.svelte";

/** A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures. */
export const Descriptions = Object.assign(DescriptionsRoot, {
  Root: DescriptionsRoot,
  Item: DescriptionsItem,
  Term: DescriptionsTerm,
  Detail: DescriptionsDetail,
});

export type { DescriptionsPartProps, DescriptionsRootProps } from "./props";

injectComponentStyle("descriptions");
