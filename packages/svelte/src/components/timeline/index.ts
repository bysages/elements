import { injectComponentStyle } from "@bysages/core";

import TimelineRoot from "./Timeline.svelte";
import TimelineContent from "./TimelineContent.svelte";
import TimelineItem from "./TimelineItem.svelte";
import TimelineMarker from "./TimelineMarker.svelte";

/** A line of moments: Root is the ordered thread, Item one moment on it,
 * Marker the point where the thread passes, Content what the moment
 * holds. The hairline between markers is drawn by the stylesheet. */
export const Timeline = Object.assign(TimelineRoot, {
  Root: TimelineRoot,
  Item: TimelineItem,
  Marker: TimelineMarker,
  Content: TimelineContent,
});

export type {
  TimelineProps,
  TimelineItemProps,
  TimelineMarkerProps,
  TimelineContentProps,
} from "./props";

injectComponentStyle("timeline");
