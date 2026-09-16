import { injectComponentStyle } from "@bysages/core";

import PageHeaderRoot from "./PageHeader.svelte";
import PageHeaderActions from "./PageHeaderActions.svelte";
import PageHeaderDescription from "./PageHeaderDescription.svelte";
import PageHeaderEyebrow from "./PageHeaderEyebrow.svelte";
import PageHeaderHeading from "./PageHeaderHeading.svelte";
import PageHeaderTitle from "./PageHeaderTitle.svelte";

/** The page's face: an eyebrow whisper, a serif title, one line of
 * description, and the actions resting beside the title on the same
 * baseline. Heading groups title and actions; the rest compose below. */
export const PageHeader = Object.assign(PageHeaderRoot, {
  Root: PageHeaderRoot,
  Heading: PageHeaderHeading,
  Eyebrow: PageHeaderEyebrow,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Actions: PageHeaderActions,
});

export type { PageHeaderPartProps } from "./props";

injectComponentStyle("page-header");
