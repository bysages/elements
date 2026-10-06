import { QrCode as ArkQrCode } from "@ark-ui/svelte/qr-code";

import { defineFamily } from "../../internal/family";
import QrCodeFacade from "./QrCode.svelte";
import QrCodeRoot from "./QrCodeRoot.svelte";

/** Ark's QrCode, dressed in the paper-and-ink system: the pattern prints in
 * ink on the page, with an optional paper badge and a seal-cut download
 * control. The API is Ark's own — Root, Frame, Pattern, Overlay,
 * DownloadTrigger. */
export const QrCode: typeof QrCodeFacade &
  Omit<typeof ArkQrCode, "Root"> & {
    Root: typeof QrCodeRoot;
  } = defineFamily(QrCodeFacade, {
  ...ArkQrCode,
  Root: QrCodeRoot,
});
