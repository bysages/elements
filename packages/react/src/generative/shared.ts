import { useBoundProp } from "@json-render/react";
import type { BaseComponentProps } from "@json-render/react";
import { createElement, type ReactNode } from "react";

import { Stack } from "../components/stack/index";
import { Typography } from "../components/typography/index";
export { headingClass, initials, slug } from "./faces.generated";

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
  slots?: string[];
  description: string;
  component: (ctx: GenerativeContext) => ReactNode;
}

/** Name the entries a family contributes; the identity keeps inference
 * honest at the call site. */
export function defineEntry<T extends Record<string, GenerativeEntry>>(entries: T): T {
  return entries;
}

export const textVoices = {
  body: Typography.Body,
  lead: Typography.Lead,
  muted: Typography.Muted,
  label: Typography.Label,
} as const;

/** Two-way binding plumbing: the resolved value plus its write-back
 * setter, typed for the family's use. */
export function useBound<T>(value: unknown, path?: string) {
  return useBoundProp<T>(value as T, path);
}

/** A labelled field: the label whispers above, the control answers. */
export function labelled(label: string | undefined, control: ReactNode): ReactNode {
  return label
    ? createElement(Stack, { gap: "xs" }, createElement(Typography.Label, null, label), control)
    : control;
}
