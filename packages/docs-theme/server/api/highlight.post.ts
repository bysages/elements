import { createError, defineEventHandler, readBody } from "h3";
import { codeToHtml, type ShikiTransformer } from "shiki";

/** The same shiki output the content pipeline emits — dual palettes on
 * CSS variables so the generated `html[data-theme] .shiki span` rules
 * re-ink it — but computed on demand for source shown outside markdown
 * (the component demos' code tab). The langs are the ones example files
 * are written in. */
const LANGS = new Set(["vue", "ts", "bash", "json"]);

// The theme's vessel paints the panel; shiki's own paper (the inline
// background on the pre) dissolves.
const stripPaper: ShikiTransformer = {
  name: "docs:paper",
  pre(node) {
    delete node.properties.style;
  },
};

export default defineEventHandler(async (event) => {
  const { code, lang } = await readBody(event);
  if (typeof code !== "string" || !code) {
    throw createError({ statusCode: 400, statusMessage: "code is required" });
  }
  if (typeof lang !== "string" || !LANGS.has(lang)) {
    throw createError({ statusCode: 400, statusMessage: "unsupported language" });
  }
  return codeToHtml(code, {
    lang,
    themes: { default: "github-light", dark: "github-dark" },
    defaultColor: "default",
    transformers: [stripPaper],
  });
});
