/** Trigger a client-side download of in-memory data from a plain
 * element — the headless counterpart to a save button. Also exposed:
 * the primitive beneath the component, for custom triggers. */
import { DownloadTrigger as ArkDownloadTrigger } from "@ark-ui/solid/download-trigger";

import { withSelfRoot } from "../../internal/family";

export const DownloadTrigger = withSelfRoot(ArkDownloadTrigger);

export { useDownload } from "@ark-ui/solid/download-trigger";
export type {
  DownloadTriggerBaseProps,
  DownloadTriggerProps,
  DownloadableData,
  UseDownloadProps,
  UseDownloadReturn,
} from "@ark-ui/solid/download-trigger";
