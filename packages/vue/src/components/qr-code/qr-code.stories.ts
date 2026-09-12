import { useQrCode } from "@ark-ui/vue/qr-code";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { RadioGroup } from "../radio-group/index.js";
import { withState } from "../with-state.js";
import { QrCode } from "./index.js";

const meta: Meta = { title: "Components / Qr Code" };
export default meta;

function frame(value: string, extraProps: Record<string, any> = {}) {
  return h(QrCode.Root, { defaultValue: value, ...extraProps }, () => [
    h(QrCode.Frame, () => h(QrCode.Pattern)),
  ]);
}

function sealGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }),
      h("path", { d: "M8.5 12h7M12 8.5v7" }),
    ],
  );
}

/** The code prints in ink; an overlaid paper badge carries a mark, and the
 * download control stays a quiet seal beneath it. */
export const Basic = {
  render: () =>
    h(QrCode.Root, { defaultValue: "https://elements.bysages.com" }, () => [
      h(QrCode.Frame, () => h(QrCode.Pattern)),
      h(QrCode.Overlay, () => sealGlyph()),
      h(
        QrCode.DownloadTrigger,
        { fileName: "qr-code.png", mimeType: "image/png" },
        () => "Download PNG",
      ),
    ]),
};

/** The caller owns the payload — the pattern reprints on command. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "https://elements.bysages.com" });
      return () =>
        h("div", { style: { display: "grid", gap: "1rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => state.value,
          ),
          h(
            QrCode.Root,
            {
              modelValue: state.value,
              onValueChange: (e: { value: string }) => (state.value = e.value),
            } as any,
            () => [h(QrCode.Frame, () => h(QrCode.Pattern))],
          ),
          h(
            "button",
            {
              onClick: () => (state.value = "https://bysages.com"),
              style: {
                padding: "0.375rem 0.75rem",
                border: "1px solid var(--bs-color-border)",
                borderRadius: "var(--bs-radius-sm)",
                background: "var(--bs-color-surface-2)",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            "Point to bysages.com",
          ),
        ]);
    }),
};

/** The quiet seal beneath: the pattern plus a download control. */
export const DownloadTrigger = {
  render: () =>
    h(QrCode.Root, { defaultValue: "https://elements.bysages.com" }, () => [
      h(QrCode.Frame, () => h(QrCode.Pattern)),
      h(
        QrCode.DownloadTrigger,
        { fileName: "qr-code.png", mimeType: "image/png" },
        () => "Download PNG",
      ),
    ]),
};

/** Denser payloads ask for harder correction: the grade rides in with the
 * encoding, and a radio group retunes it live. */
export const ErrorCorrection = {
  render: () =>
    withState(() => {
      const state = reactive({ ecc: "M" as "L" | "M" | "Q" | "H" });
      return () =>
        h("div", { style: { display: "grid", gap: "1rem", justifyItems: "start" } }, [
          frame("https://elements.bysages.com", { encoding: { ecc: state.ecc } }),
          h(
            RadioGroup.Root,
            {
              defaultValue: state.ecc,
              onValueChange: (e: { value: string | null }) => {
                if (e.value) state.ecc = e.value as "L" | "M" | "Q" | "H";
              },
            } as any,
            () => [
              h(RadioGroup.Label, () => "Correction grade"),
              h(
                "div",
                { style: { display: "flex", gap: "0.75rem" } },
                ["L", "M", "Q", "H"].map((level) =>
                  h(RadioGroup.Item, { key: level, value: level }, () => [
                    h(RadioGroup.ItemControl),
                    h(RadioGroup.ItemText, () => level),
                    h(RadioGroup.ItemHiddenInput),
                  ]),
                ),
              ),
            ],
          ),
        ]);
    }),
};

/** Pigment changes the ink, not the pattern: two fills of the same code. */
export const Fill = {
  render: () =>
    h("div", { style: { display: "flex", gap: "1.5rem" } }, [
      h(QrCode.Root, { defaultValue: "https://elements.bysages.com" }, () =>
        h(QrCode.Frame, { style: { fill: "var(--bs-color-primary)" } }, () => h(QrCode.Pattern)),
      ),
      h(QrCode.Root, { defaultValue: "https://elements.bysages.com" }, () =>
        h(QrCode.Frame, { style: { fill: "var(--bs-color-info)" } }, () => h(QrCode.Pattern)),
      ),
    ]),
};

/** A paper badge rides the centre: dense corners stay readable at the
 * highest correction grade. */
export const Overlay = {
  render: () =>
    h(QrCode.Root, { defaultValue: "https://elements.bysages.com", encoding: { ecc: "H" } }, () => [
      h(QrCode.Frame, () => h(QrCode.Pattern)),
      h(QrCode.Overlay, () => sealGlyph()),
    ]),
};

/** The machine answers outside its anatomy: the provider owns the code. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "QrCodeRootProvider",
      setup() {
        const qrCode = useQrCode({ defaultValue: "https://elements.bysages.com" });
        return () =>
          h(QrCode.RootProvider as any, { value: qrCode.value }, () =>
            h(QrCode.Frame, () => h(QrCode.Pattern)),
          );
      },
    };
    return () => h(Driver);
  },
};
