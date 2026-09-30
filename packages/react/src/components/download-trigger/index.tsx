/** Trigger a client-side download of in-memory data from a plain
 * element — the headless counterpart to a save button. Also exposed:
 * the hook beneath the component, for custom triggers. */
export {
  type DownloadableData,
  DownloadTrigger,
  type DownloadTriggerBaseProps,
  type DownloadTriggerProps,
  type UseDownloadProps,
  type UseDownloadReturn,
  useDownload,
} from "@ark-ui/react/download-trigger";
