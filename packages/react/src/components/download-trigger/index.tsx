/** Trigger a client-side download of in-memory data from a plain
 * element — the headless counterpart to a save button. Also exposed:
 * the hook beneath the component, for custom triggers. */
export {
  DownloadTrigger,
  type DownloadTriggerBaseProps,
  type DownloadTriggerProps,
} from "@ark-ui/react/download-trigger";

export {
  useDownload,
  type DownloadableData,
  type UseDownloadProps,
  type UseDownloadReturn,
} from "@ark-ui/react/download-trigger";
