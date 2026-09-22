import { defineMcpTool } from "@nuxtjs/mcp-toolkit/server";
import { createError } from "h3";
import { useEvent } from "nitropack/runtime";
import { z } from "zod";

import { getAgentDocument } from "#agent-discovery";

import { isNavigationPath } from "../../utils/content";

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

    // The discovery index resolves in-process: the same markdown the
    // `/raw/<path>.md` route serves, plus the page's frontmatter.
    const event = useEvent();
    const document = await getAgentDocument(event, path);

    if (!document) {
      throw createError({ statusCode: 404, message: "Page not found" });
    }
    if ("redirect" in document) {
      throw createError({
        statusCode: 404,
        message: `${path} is a section, try ${document.redirect}`,
      });
    }

    return {
      path,
      title: document.title,
      markdown: document.markdown,
      url: document.canonicalUrl,
    };
  },
});
