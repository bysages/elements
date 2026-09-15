import { injectComponentStyle } from "@bysages/core";
import EmptyRoot from "./Empty.svelte";
import EmptyVisual from "./EmptyVisual.svelte";
import EmptyTitle from "./EmptyTitle.svelte";
import EmptyDescription from "./EmptyDescription.svelte";
import EmptyActions from "./EmptyActions.svelte";

/** An empty state: the page holds its breath. Root centers the column,
 * Visual carries the mark, Title and Description carry the ink, Actions
 * the way out. Any subset composes. */
export const Empty = Object.assign(EmptyRoot, {
  Root: EmptyRoot,
  Visual: EmptyVisual,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Actions: EmptyActions,
});

export type { EmptyProps, EmptyPartProps, EmptyTitleProps, EmptyDescriptionProps } from "./props";

injectComponentStyle("empty");
