import { QrCode as ArkQrCode } from "@ark-ui/solid/qr-code";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's QrCode, dressed in the paper-and-ink system: the pattern prints in
 * ink on the page, with an optional paper badge and a seal-cut download
 * control. The API is Ark's own — Root, Frame, Pattern, Overlay,
 * DownloadTrigger. */
function QrCodeRoot(props: ComponentProps<typeof ArkQrCode.Root>) {
  const id = useElementId("qr-code", () => props.id);

  return createComponent(
    ArkQrCode.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const QrCode: typeof QrCodeRoot &
  Omit<typeof ArkQrCode, "Root"> & { Root: typeof QrCodeRoot } = defineFamily(QrCodeRoot, {
  ...ArkQrCode,
  Root: QrCodeRoot,
});
injectComponentStyle("qr-code");
