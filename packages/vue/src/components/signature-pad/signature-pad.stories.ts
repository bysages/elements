import { useSignaturePad } from "@ark-ui/vue/signature-pad";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { SignaturePad } from ".";
import { Field } from "../field";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Signature Pad" };
export default meta;

function undoGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M3 7v6h6M3.5 13a9 9 0 1 0 2-7.5" })],
  );
}

function pad(extraRootProps: Record<string, any> = {}, label = "Sign below") {
  return [
    h(SignaturePad.Label, () => label),
    h(SignaturePad.Control, () => [
      h(SignaturePad.Segment),
      h(SignaturePad.ClearTrigger, () => undoGlyph()),
      h(SignaturePad.Guide),
    ]),
    h(SignaturePad.HiddenInput),
  ];
}

/** Sign below the guide hairline; the clear trigger wipes the paper without
 * leaving the field. */
export const Basic = {
  args: {
    label: "Sign below",
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () => h(SignaturePad.Root, { disabled: args.disabled }, () => pad({}, args.label)),
    ),
};

/** The strokes answer to the caller — the readout counts them. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ paths: [] as string[] });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `paths: ${state.paths.length}`,
          ),
          h(
            SignaturePad.Root,
            {
              paths: state.paths,
              onDraw: (e: { paths: string[] }) => (state.paths = e.paths),
            } as any,
            () => pad(),
          ),
          h(
            "button",
            {
              onClick: () => (state.paths = []),
              style: {
                padding: "0.375rem 0.75rem",
                border: "1px solid var(--bs-color-border)",
                borderRadius: "var(--bs-radius-sm)",
                background: "var(--bs-color-surface-2)",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            "Clear",
          ),
        ]);
    }),
};

/** The finished stroke is developable: draw ends, the signature prints as
 * an image below. */
export const ImagePreview = {
  render: () =>
    withState(() => {
      const state = reactive({ imageUrl: "" });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            SignaturePad.Root,
            {
              onDrawEnd: (e: { getDataUrl: (type: string) => Promise<string> }) =>
                e.getDataUrl("image/png").then((url) => (state.imageUrl = url)),
            } as any,
            () => pad(),
          ),
          h("div", { style: { display: "grid", gap: "0.25rem" } }, [
            h(
              "span",
              {
                style: {
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                  letterSpacing: "var(--bs-tracking-label)",
                },
              },
              "Image preview",
            ),
            state.imageUrl
              ? h("img", {
                  src: state.imageUrl,
                  alt: "Signature",
                  style: {
                    border: "1px solid var(--bs-color-border)",
                    borderRadius: "var(--bs-radius-sm)",
                    background: "var(--bs-color-surface-2)",
                  },
                })
              : null,
          ]),
        ]);
    }),
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () =>
    h(Field.Root, { invalid: true } as any, () => [
      h(SignaturePad.Root, () => pad({}, "Label")),
      h(Field.HelperText, () => "Sign within the guide"),
      h(Field.ErrorText, () => "A signature is required"),
    ]),
};

/** The machine answers outside its anatomy: the provider owns the pad. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "SignaturePadRootProvider",
      setup() {
        const signaturePad = useSignaturePad();
        return () => [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `paths: ${signaturePad.value.paths.length}`,
          ),
          h(SignaturePad.RootProvider as any, { value: signaturePad.value }, () => pad()),
        ];
      },
    };
    return () => h(Driver);
  },
};
