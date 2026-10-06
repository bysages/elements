import { DownloadTrigger as ArkDownloadTrigger, useDownload } from "@ark-ui/react/download-trigger";

import { withSelfRoot } from "../../internal/family";

/** Trigger a client-side download of in-memory data from a plain
 * element — the headless counterpart to a save button. Also exposed:
 * the hook beneath the component, for custom triggers. */
export type {
  DownloadableData,
  DownloadTriggerBaseProps,
  DownloadTriggerProps,
  UseDownloadProps,
  UseDownloadReturn,
} from "@ark-ui/react/download-trigger";
export { useDownload };
export const DownloadTrigger = withSelfRoot(ArkDownloadTrigger);
