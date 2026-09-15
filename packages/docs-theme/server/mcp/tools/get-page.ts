import { defineMcpTool } from "@nuxtjs/mcp-toolkit/server";
import { createError } from "h3";
import { useEvent, useRuntimeConfig } from "nitropack/runtime";
import { z } from "zod";

import { isNavigationPath } from "../../utils/content";

/** The same bytes the `/raw/<path>.md` route serves, fetched in-process —
 * one markdown pipeline, maintained by the Content module's llms
 * integration, never re-implemented here. */
export default defineMcpTool({
  description: `Retrieves the full markdown content of one documentation page.

WHEN TO USE: Use this tool when you know the EXACT page path (from list-pages, or given by the user) and need its full content — API details, code examples, usage guidance.

WHEN NOT TO USE: If you don't know the exact path, call list-pages first.`,
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  inputSchema: {
    path: z.string().describe("The page path from list-pages, e.g. /docs/components/button"),
  },
  cache: "1h",
  handler: async ({ path }) => {
    if (!path.startsWith("/") || path.includes("..") || isNavigationPath(path)) {
      throw createError({ statusCode: 404, message: "Page not found" });
    }

    const event = useEvent();
    const raw = path === "/" ? "/raw/index.md" : `/raw${path}.md`;

    const markdown = await event.$fetch<string>(raw, { responseType: "text" }).catch(() => {
      throw createError({ statusCode: 404, message: "Page not found" });
    });

    const domain = (useRuntimeConfig(event) as { llms?: { domain?: string } }).llms?.domain;

    return {
      path,
      title: /^#\s+(.+)$/m.exec(markdown)?.[1],
      markdown,
      url: domain ? `${domain}${path}` : path,
    };
  },
});
