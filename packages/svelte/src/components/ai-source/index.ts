import { withSelfRoot } from "../../internal/family";
import AiSourceComponent from "./AiSource.svelte";
import AiSourcesComponent from "./AiSources.svelte";

/** One place the ink came from, and the reading list that gathers
 * them under a response. */
export const AiSource = withSelfRoot(AiSourceComponent);
export const AiSources = withSelfRoot(AiSourcesComponent);
export { AiSource as Source, AiSources as Sources };

export type { SourceProps, SourcesProps } from "./props";
