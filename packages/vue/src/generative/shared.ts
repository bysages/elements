import { createListCollection } from "@ark-ui/vue/select";
import { createToaster } from "@ark-ui/vue/toast";
import { useBoundProp } from "@json-render/vue";
import { h } from "vue";
import type { VNode } from "vue";

import { Stack } from "../components/stack/index";
import { Toaster } from "../components/toast/index";
import { Typography } from "../components/typography/index";

/** What one registry component receives: the spec's props, the rendered
 * children, the named slots, the event bus, and the two-way binding
 * write-back paths. */
export interface GenerativeContext {
  props: any;
  children?: VNode | VNode[];
  slots?: Record<string, (() => VNode[]) | undefined>;
  emit: (event: string) => void;
  bindings?: Record<string, string | undefined>;
}

/** One family's claim in the generative vocabulary: the catalog entry
 * (what the model may compose) rides beside the assembly (how it
 * renders) in the component's own folder. */
export interface GenerativeEntry {
  props: unknown;
  slots?: string[];
  description: string;
  component: (ctx: GenerativeContext) => VNode | VNode[] | string | null;
}

/** Name the entries a family contributes; the identity keeps inference
 * honest at the call site. */
export function defineEntry<T extends Record<string, GenerativeEntry>>(entries: T): T {
  return entries;
}

/** Map a catalog Heading level to a measure — the serif voice stays, the
 * size steps down. */
export const headingClass: Record<string, string> = {
  "1": "text-4xl",
  "2": "text-3xl",
  "3": "text-2xl",
  "4": "text-xl",
};

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
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** The machine keeps its state in the collection's identity, so one
 * option list yields one collection — a fresh one per render would
 * reset the open state under the pointer. */
export type SelectOption = { label: string; value: string };

const collectionCache = new Map<string, ReturnType<typeof createListCollection<SelectOption>>>();

export function collectionFor(options: SelectOption[]) {
  const key = JSON.stringify(options);
  let collection = collectionCache.get(key);
  if (!collection) {
    collection = createListCollection({ items: options });
    collectionCache.set(key, collection);
  }
  return collection;
}

export function stringsFor(items: string[] | undefined) {
  return collectionFor((items ?? []).map((item) => ({ label: item, value: item })));
}

/** A labelled field: the label whispers above, the control answers. */
export function labelled(label: string | undefined, control: VNode) {
  return label
    ? h(Stack, { gap: "xs" }, () => [h(Typography.Label, () => label), control])
    : control;
}

export function slotted(children: VNode | VNode[] | undefined) {
  if (!children) return [];
  return Array.isArray(children) ? children : [children];
}

export function slug(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || value
  );
}

/** The workbench keeps one toaster so generated notices land in the same
 * stack; each entry announces once per title. */
export const workbenchToaster = createToaster({ placement: "bottom-end", max: 4 });
const announced = new Set<string>();

export function announce(kind: string, title: string, description?: string) {
  const key = kind + ":" + title;
  if (announced.has(key)) return;
  announced.add(key);
  workbenchToaster.create({ title, description, type: kind });
}

export { Toaster };
