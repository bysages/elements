import { queryCollection } from "@nuxt/content/server";
import { defineMcpTool } from "@nuxtjs/mcp-toolkit/server";
import { useEvent, useRuntimeConfig } from "nitropack/runtime";
import { z } from "zod";

import { getCollectionsToQuery, getAvailableLocales } from "../../utils/content";

export default defineMcpTool({
  description: `Lists all documentation pages with their titles, paths, and descriptions.

WHEN TO USE: Use this tool to EXPLORE or SEARCH the documentation when you don't know the exact page path — e.g. "find the button component docs", "show me the getting started guide". After finding relevant paths, call get-page for the full content.

WHEN NOT TO USE: If you already know the exact page path, call get-page directly.`,
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  inputSchema: {
    locale: z.string().optional().describe('Filter pages by locale code, e.g. "en" or "zh"'),
  },
  cache: "1h",
  handler: async ({ locale }) => {
    const event = useEvent();
    const available = getAvailableLocales(event);
    const collections = getCollectionsToQuery(locale, available);
    const domain = (useRuntimeConfig(event) as { llms?: { domain?: string } }).llms?.domain;

    const rows = await Promise.all(
      collections.map(async (collection) => {
        // The collection names are runtime-computed (per-locale), so the
        // statically-typed query builder is bridged once, locally.
        const builder = queryCollection(event, collection as never) as unknown as {
          select: (...fields: string[]) => {
            all: () => Promise<Array<{ title?: string; description?: string; path: string }>>;
          };
        };
        return builder.select("title", "description", "path").all();
      }),
    );

    return rows.flat().map((row) => ({
      title: row.title,
      path: row.path,
      description: row.description,
      locale: available.find((code) => row.path === `/${code}` || row.path.startsWith(`/${code}/`)),
      url: domain ? `${domain}${row.path}` : row.path,
    }));
  },
});
