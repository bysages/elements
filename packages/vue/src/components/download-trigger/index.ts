import { DownloadTrigger as ArkDownloadTrigger } from "@ark-ui/vue/download-trigger";

import { withSelfRoot } from "../../internal/family";

/** Trigger a client-side download of in-memory data from a plain
 * element — the headless counterpart to a save button. Also exposed:
 * the composable beneath the component, for custom triggers. */
export const DownloadTrigger = withSelfRoot(ArkDownloadTrigger);

export type { DownloadTriggerBaseProps, DownloadTriggerProps } from "@ark-ui/vue/download-trigger";

export {
  useDownload,
  type DownloadableData,
  type UseDownloadProps,
  type UseDownloadReturn,
} from "@ark-ui/vue/download-trigger";
