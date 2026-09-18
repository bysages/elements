import { useQrCode } from "@ark-ui/react/qr-code";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { QrCode } from ".";
import { RadioGroup } from "../radio-group";

const meta: Meta = { title: "Components/Media/Qr Code" };
export default meta;

function frame(value: string, extraProps: Record<string, any> = {}) {
  return (
    <QrCode.Root defaultValue={value} {...extraProps}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  );
}

function sealGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <rect x={4} y={4} width={16} height={16} rx={3} />
      <path d="M8.5 12h7M12 8.5v7" />
    </svg>
  );
}

/** The code prints in ink; an overlaid paper badge carries a mark, and the
 * download control stays a quiet seal beneath it. */
export const Basic = {
  args: {
    value: "https://www.bysages.com/",
  },
  render: (args: any) => (
    <QrCode.Root value={args.value}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>{sealGlyph()}</QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  ),
};

/** The caller owns the payload — the pattern reprints on command. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("https://www.bysages.com/");
    return (
      <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          {value}
        </output>
        <QrCode.Root value={value} onValueChange={(e: { value: string }) => setValue(e.value)}>
          <QrCode.Frame>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode.Root>
        <button
          onClick={() => setValue("https://bysages.com")}
          style={{
            padding: "0.375rem 0.75rem",
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            background: "var(--bs-color-surface-2)",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          Point to bysages.com
        </button>
      </div>
    );
  },
};

/** The quiet seal beneath: the pattern plus a download control. */
export const DownloadTrigger = {
  render: () => (
    <QrCode.Root defaultValue="https://www.bysages.com/">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  ),
};

/** Denser payloads ask for harder correction: the grade rides in with the
 * encoding, and a radio group retunes it live. */
export const ErrorCorrection = {
  render: () => {
    const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("M");
    return (
      <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
        {frame("https://www.bysages.com/", { encoding: { ecc } })}
        <RadioGroup.Root
          defaultValue={ecc}
          onValueChange={(e: { value: string | null }) => {
            if (e.value) setEcc(e.value as "L" | "M" | "Q" | "H");
          }}
        >
          <RadioGroup.Label>Correction grade</RadioGroup.Label>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {["L", "M", "Q", "H"].map((level) => (
              <RadioGroup.Item key={level} value={level}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{level}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </div>
        </RadioGroup.Root>
      </div>
    );
  },
};

/** Pigment changes the ink, not the pattern: two fills of the same code. */
export const Fill = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <QrCode.Root defaultValue="https://www.bysages.com/">
        <QrCode.Frame style={{ fill: "var(--bs-color-primary)" }}>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <QrCode.Root defaultValue="https://www.bysages.com/">
        <QrCode.Frame style={{ fill: "var(--bs-color-info)" }}>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
    </div>
  ),
};

/** A paper badge rides the centre: dense corners stay readable at the
 * highest correction grade. */
export const Overlay = {
  render: () => (
    <QrCode.Root defaultValue="https://www.bysages.com/" encoding={{ ecc: "H" }}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>{sealGlyph()}</QrCode.Overlay>
    </QrCode.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the code. */
export const RootProvider = {
  render: () => {
    const qrCode = useQrCode({ defaultValue: "https://www.bysages.com/" });
    return (
      <QrCode.RootProvider value={qrCode}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
    );
  },
};
