import { injectComponentStyle } from "@bysages/core";

import AiSourceComponent from "./AiSource.svelte";
import AiSourcesComponent from "./AiSources.svelte";

/** One place the ink came from, and the reading list that gathers
 * them under a response. */
export const AiSource = AiSourceComponent;
export const AiSources = AiSourcesComponent;

export type { SourceProps, SourcesProps } from "./props";

injectComponentStyle("ai");
