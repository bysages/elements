import { QrCode as ArkQrCode } from "@ark-ui/vue/qr-code";
import { injectComponentStyle } from "@bysages/core";

/** QrCode, dressed in the paper-and-ink system: the pattern prints in
 * ink on the page, with an optional paper badge and a seal-cut download
 * control. The parts — Root, Frame, Pattern, Overlay,
 * DownloadTrigger. */
export const QrCode = ArkQrCode;

injectComponentStyle("qr-code");
