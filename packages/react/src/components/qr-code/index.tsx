import { QrCode as ArkQrCode } from "@ark-ui/react/qr-code";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's QrCode, dressed in the paper-and-ink system: the pattern prints in
 * ink on the page, with an optional paper badge and a seal-cut download
 * control. The API is Ark's own — Root, Frame, Pattern, Overlay,
 * DownloadTrigger. */
function QrCodeRoot(props: ComponentProps<typeof ArkQrCode.Root>) {
  injectComponentStyle("qr-code");
  const id = useElementId("qr-code", props);

  return <ArkQrCode.Root {...props} id={id} />;
}

type QrCodeFacadeProps = {
  value?: string;
  defaultValue?: string;
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: string) => void;
};

/** The complete printable code behind one payload. */
function QrCodeFacade(props: QrCodeFacadeProps) {
  const { value, defaultValue, className, style, onValueChange } = props;

  return (
    <QrCodeRoot
      defaultValue={defaultValue}
      value={value}
      className={className}
      style={style}
      onValueChange={(event: { value: string }) => onValueChange?.(event.value)}
    >
      <ArkQrCode.Frame>
        <ArkQrCode.Pattern />
      </ArkQrCode.Frame>
    </QrCodeRoot>
  );
}

export const QrCode: typeof QrCodeFacade &
  Omit<typeof ArkQrCode, "Root"> & { Root: typeof QrCodeRoot } = Object.assign(QrCodeFacade, {
  ...ArkQrCode,
  Root: QrCodeRoot,
}) as typeof QrCodeFacade & Omit<typeof ArkQrCode, "Root"> & { Root: typeof QrCodeRoot };
