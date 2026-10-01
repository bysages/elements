import type { BaseComponentProps } from "@json-render/svelte";
import type { Component } from "svelte";

export { headingClass, initials, slug } from "./faces.generated";
export type { SelectOption } from "./faces.generated";

/** What one registry component receives — json-render's own render
 * context. The entry stays a hand-rolled shape because the faces are
 * gathered by glob before the catalog exists, but the context the
 * component runs in is the library's contract, not ours. */
export type GenerativeContext = BaseComponentProps<any>;

/** One family's claim in the generative vocabulary: the catalog entry
 * (what the model may compose) rides beside the assembly (how it
 * renders) in the component's own folder. */
export interface GenerativeEntry {
  props: unknown;
  description: string;
  component: Component<GenerativeContext>;
}

/** Name the entries a family contributes; the identity keeps inference
 * honest at the call site. */
export function defineEntry<T extends Record<string, GenerativeEntry>>(entries: T): T {
  return entries;
}
