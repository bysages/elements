import { createError, defineEventHandler, readBody } from "h3";
import { highlight } from "../../utils/highlight";

/** The same token markup the markdown pipeline emits — class-based
 * tokens with no box of their own, computed on demand for source shown
 * outside markdown (the component demos' code tab). The langs are the
 * ones example files are written in. */
const LANGS = new Set(["vue", "ts", "bash", "json"]);

export default defineEventHandler(async (event) => {
  const { code, lang } = await readBody(event);
  if (typeof code !== "string" || !code) {
    throw createError({ statusCode: 400, statusMessage: "code is required" });
  }
  if (typeof lang !== "string" || !LANGS.has(lang)) {
    throw createError({ statusCode: 400, statusMessage: "unsupported language" });
  }
  return highlight(code, lang).html;
});
