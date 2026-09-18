import { useSignaturePad } from "@ark-ui/react/signature-pad";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { SignaturePad } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Signature Pad" };
export default meta;

function undoGlyph() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M3 7v6h6M3.5 13a9 9 0 1 0 2-7.5" />
    </svg>
  );
}

function pad(label = "Sign below") {
  return (
    <>
      <SignaturePad.Label>{label}</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>{undoGlyph()}</SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
      <SignaturePad.HiddenInput value="" />
    </>
  );
}

/** Sign below the guide hairline; the clear trigger wipes the paper without
 * leaving the field. */
export const Basic = {
  args: {
    label: "Sign below",
    disabled: false,
  },
  render: (args: any) => (
    <SignaturePad.Root disabled={args.disabled}>{pad(args.label)}</SignaturePad.Root>
  ),
};

/** The strokes answer to the caller — the readout counts them. */
export const Controlled = {
  render: () => {
    const [paths, setPaths] = useState<string[]>([]);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          paths: {paths.length}
        </output>
        <SignaturePad.Root paths={paths} onDraw={(e) => setPaths(e.paths)}>
          {pad()}
        </SignaturePad.Root>
        <button
          onClick={() => setPaths([])}
          style={{
            padding: "0.375rem 0.75rem",
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            background: "var(--bs-color-surface-2)",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};

/** The finished stroke is developable: draw ends, the signature prints as
 * an image below. */
export const ImagePreview = {
  render: () => {
    const [imageUrl, setImageUrl] = useState("");
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <SignaturePad.Root
          onDrawEnd={(e) => e.getDataUrl("image/png").then((url) => setImageUrl(url))}
        >
          {pad()}
        </SignaturePad.Root>
        <div style={{ display: "grid", gap: "0.25rem" }}>
          <span
            style={{
              fontSize: "var(--bs-font-size-xs)",
              color: "var(--bs-color-text-tertiary)",
              letterSpacing: "var(--bs-tracking-label)",
            }}
          >
            Image preview
          </span>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Signature"
              style={{
                border: "1px solid var(--bs-color-border)",
                borderRadius: "var(--bs-radius-sm)",
                background: "var(--bs-color-surface-2)",
              }}
            />
          ) : null}
        </div>
      </div>
    );
  },
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () => (
    <Field.Root invalid>
      <SignaturePad.Root>{pad("Label")}</SignaturePad.Root>
      <Field.HelperText>Sign within the guide</Field.HelperText>
      <Field.ErrorText>A signature is required</Field.ErrorText>
    </Field.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the pad. */
function RootProviderDriver() {
  const signaturePad = useSignaturePad();
  return (
    <>
      <output
        style={{
          fontSize: "var(--bs-font-size-sm)",
          color: "var(--bs-color-text-secondary)",
        }}
      >
        paths: {signaturePad.paths.length}
      </output>
      <SignaturePad.RootProvider value={signaturePad}>{pad()}</SignaturePad.RootProvider>
    </>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
