import { defineFamily } from "../../internal/family";
import BreadcrumbRoot from "./Breadcrumb.svelte";
import BreadcrumbCurrent from "./BreadcrumbCurrent.svelte";
import BreadcrumbFacade from "./BreadcrumbFacade.svelte";
import BreadcrumbItem from "./BreadcrumbItem.svelte";
import BreadcrumbLink from "./BreadcrumbLink.svelte";
import BreadcrumbList from "./BreadcrumbList.svelte";
import BreadcrumbSeparator from "./BreadcrumbSeparator.svelte";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
export const Breadcrumb: typeof BreadcrumbFacade & {
  Root: typeof BreadcrumbRoot;
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Current: typeof BreadcrumbCurrent;
  Separator: typeof BreadcrumbSeparator;
} = defineFamily(BreadcrumbFacade, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Current: BreadcrumbCurrent,
  Separator: BreadcrumbSeparator,
});

export type {
  BreadcrumbCurrentProps,
  BreadcrumbItem,
  BreadcrumbFacadeProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./props";
