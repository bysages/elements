import { resolveComponentMessages, type ComponentMessages } from "@bysages/core";
import { computed, type Ref } from "vue";

import { useConfig } from "../components/config-provider";

/** Complete wrapper-owned copy for the nearest ConfigProvider, resolved
 * from its locale and partial message overrides. */
export function useComponentMessages(): Readonly<Ref<ComponentMessages>> {
  const config = useConfig();

  return computed(() =>
    resolveComponentMessages(config.value.locale ?? "en", config.value.messages),
  );
}

/** Fill a core message's `{name}`-shaped slots. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (value, key: string) =>
    key in values ? String(values[key]) : value,
  );
}
