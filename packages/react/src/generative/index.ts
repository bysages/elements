/// <reference types="vite/client" />

import { defineCatalog } from "@json-render/core";
import { defineRegistry } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import type { z } from "zod";

import type { GenerativeEntry } from "./shared";

/** Every family writes its own generative face beside the component —
 * `components/<family>/generative.ts` — and this module is where they
 * meet: one glob picks the faces up, so a family that lands in the
 * package is in the vocabulary without anyone editing this file. */

const modules = import.meta.glob<{ default: Record<string, GenerativeEntry> }>(
  "../components/*/generative.{ts,tsx}",
  { eager: true },
);

const entries: Record<string, GenerativeEntry & { _from: string }> = {};
for (const [file, module] of Object.entries(modules)) {
  const family = file.match(/components\/([^/]+)\/generative\.tsx?/)?.[1] ?? file;
  for (const [name, entry] of Object.entries(module.default ?? {})) {
    if (entries[name]) {
      throw new Error(
        'Two generative faces claim "' + name + '": ' + entries[name]._from + " and " + family,
      );
    }
    entries[name] = { ...entry, _from: family };
  }
}

const faces = Object.fromEntries(
  Object.entries(entries).map(([name, entry]) => [
    name,
    {
      props: entry.props,
      slots: entry.slots,
      description: entry.description,
    },
  ]),
) as Record<string, { props: z.ZodObject; slots?: string[]; description: string }>;

export const catalog = defineCatalog(schema, { components: faces, actions: {} });

const { registry } = defineRegistry(catalog, {
  actions: {},
  components: Object.fromEntries(
    Object.entries(entries).map(([name, entry]) => [name, entry.component]),
  ),
});

export { registry };
