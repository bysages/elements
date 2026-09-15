import type { H3Event } from "h3";
import { defineNitroPlugin, useRuntimeConfig } from "nitropack/runtime";

/** The generated `/raw/index.md` (served when `/` is not a content
 * document) takes its description from the same `llms` config as
 * `/llms.txt`, so the two agent entry points agree. The hook name comes
 * from `nuxt-agent-discovery`, whose types the bare tsc pass never sees. */
export default defineNitroPlugin((nitroApp) => {
  (
    nitroApp.hooks.hook as (
      name: string,
      fn: (event: H3Event, index: { description?: string }) => void,
    ) => void
  )("agent-discovery:index", (event, index) => {
    const llms = (useRuntimeConfig(event) as { llms?: { description?: string } }).llms;
    index.description ||= llms?.description;
  });
});
