import { defineMcpTool } from "@nuxtjs/mcp-toolkit/server";
import { useEvent } from "nitropack/runtime";
import { z } from "zod";

import { listAgentPages } from "#agent-discovery";

import { getAvailableLocales } from "../../utils/content";

export default defineMcpTool({
  description: `Lists all available documentation pages with their basic information.

WHEN TO USE: Use this tool when you need to EXPLORE or SEARCH for documentation about a topic but don't know the exact page path. Common scenarios:
- "Find documentation about markdown features" - explore available guides
- "Show me all getting started guides" - browse introductory content
- User asks general questions without specifying exact pages
- You need to understand the overall documentation structure

WHEN NOT TO USE: If you already know the specific page path (e.g., "/en/guide/installation"), use get-page directly instead.

WORKFLOW: This tool returns page titles, paths, and URLs. After finding relevant pages, use get-page to retrieve the full content of specific pages that match the user's needs.

OUTPUT: Returns a structured list with:
- title: Human-readable page name
- path: Exact path for use with get-page
- locale: The locale the page belongs to, when the site is multilingual
- url: Full URL for reference`,
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
    const localeOf = (path: string) =>
      available.find((code) => path === `/${code}` || path.startsWith(`/${code}/`));

    // Landing pages (`/`, `/en`) are not documentation, and never were
    // listed here.
    const isLanding = (path: string) => path === "/" || available.includes(path.slice(1));

    const pages = await listAgentPages(event);

    return pages
      .filter((page) => !isLanding(page.route))
      .map((page) => ({
        title: page.title,
        path: page.route,
        locale: localeOf(page.route),
        url: page.url,
      }))
      .filter((page) => !locale || !available.includes(locale) || page.locale === locale);
  },
});
