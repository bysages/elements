import { resolveComponentMessages, type ComponentMessages } from "@bysages/core";
import { useMemo } from "react";

import { useConfig } from "../components/config-provider";

/** Complete wrapper-owned copy for the nearest ConfigProvider, resolved
 * from its locale and partial message overrides. */
export function useComponentMessages(): ComponentMessages {
  const config = useConfig();

  return useMemo(
    () => resolveComponentMessages(config.locale ?? "en", config.messages),
    [config.locale, config.messages],
  );
}

/** Fill a core message's `{name}`-shaped slots. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
