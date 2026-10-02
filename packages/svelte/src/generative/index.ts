/// <reference types="vite/client" />

import { defineCatalog } from "@json-render/core";
import { defineRegistry } from "@json-render/svelte";
import { schema } from "@json-render/svelte/schema";
import type { z } from "zod";

import type { GenerativeEntry } from "./shared";

/** Every family writes its own generative face beside the component —
 * `components/<family>/generative/` — and this module is where they
 * meet: one glob picks the faces up, so a family that lands in the
 * package is in the vocabulary without anyone editing this file. */

const modules = import.meta.glob<{ default: Record<string, GenerativeEntry> }>(
  "../components/*/generative/index.ts",
  { eager: true },
);

const entries: Record<string, GenerativeEntry & { _from: string }> = {};
for (const [file, module] of Object.entries(modules)) {
  const family = file.match(/components\/([^/]+)\/generative\/index\.ts/)?.[1] ?? file;
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
      description: entry.description,
    },
  ]),
) as Record<string, { props: z.ZodObject; description: string }>;

export const catalog = defineCatalog(schema, { components: faces, actions: {} });

const { registry } = defineRegistry(catalog, {
  actions: {},
  components: Object.fromEntries(
    Object.entries(entries).map(([name, entry]) => [name, entry.component]),
  ),
});

/** Which family each face came home from. A family may speak under
 * several names - Layout plus its parts, Bento plus its cell - and the
 * palette groups by provenance, never by guessing from the name. */
export const faceFamilies: Record<string, string> = Object.fromEntries(
  Object.entries(entries).map(([name, entry]) => [name, entry._from]),
);

export { registry };
