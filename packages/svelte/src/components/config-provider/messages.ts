import type { ComponentMessages } from "@bysages/core";
import { resolveComponentMessages } from "@bysages/core";

import { useConfig } from "./context";

/** Resolve the nearest provider's locale and overrides into one complete
 * message table; calling the selector keeps each read live with provider
 * props. */
export function useComponentMessages(): () => ComponentMessages {
  const config = useConfig();
  return () => resolveComponentMessages(config.locale ?? "en", config.messages);
}

/** Substitute `{name}` leaves with caller values; unknown leaves stay
 * visible so a typo cannot turn an accessible name silent. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
