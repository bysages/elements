import { resolveComponentMessages, type ComponentMessages } from "@bysages/core";
import { createMemo, useContext } from "solid-js";
import type { Accessor } from "solid-js";

import { ConfigContextKey } from "./index";

/** Wrapper copy is resolved once per locale/messages change and stays
 * reactive through the provider snapshot. */
export function useComponentMessages(): Accessor<ComponentMessages> {
  const config = useContext(ConfigContextKey);
  return createMemo(() => resolveComponentMessages(config().locale ?? "en", config().messages));
}

/** Expand the leaf placeholders shared by core ({name}); unknown keys
 * stay visible instead of silently collapsing. */
export function formatComponentMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}
