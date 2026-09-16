import { injectComponentStyle } from "@bysages/core";

import BreadcrumbRoot from "./Breadcrumb.svelte";
import BreadcrumbCurrent from "./BreadcrumbCurrent.svelte";
import BreadcrumbItem from "./BreadcrumbItem.svelte";
import BreadcrumbLink from "./BreadcrumbLink.svelte";
import BreadcrumbList from "./BreadcrumbList.svelte";
import BreadcrumbSeparator from "./BreadcrumbSeparator.svelte";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Current: BreadcrumbCurrent,
  Separator: BreadcrumbSeparator,
});

export type {
  BreadcrumbCurrentProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./props";

injectComponentStyle("breadcrumb");
