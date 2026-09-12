import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Clipboard } from "./index.js";

const meta: Meta = { title: "Components / Clipboard" };
export default meta;

function copyGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("rect", { x: 9, y: 9, width: 11, height: 11, rx: 1.5 }),
      h("path", {
        d: "M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5",
      }),
    ],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 4.5 4.5L19 7.5" })],
  );
}

function trigger() {
  return h(Clipboard.Trigger, () =>
    h(Clipboard.Indicator, null, {
      default: () => copyGlyph(),
      copied: () => checkGlyph(),
    }),
  );
}

const buttonStyle = {
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  borderRadius: "var(--bs-radius-sm)",
  padding: "0.375rem 0.75rem",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
};

/** Copy the link from the hairline field; the trigger's ink turns bamboo
 * for as long as the machine holds the copied state. */
export const Basic = {
  render: () =>
    h(Clipboard.Root, { defaultValue: "https://ark-ui.com" }, () => [
      h(Clipboard.Label, () => "Copy this link"),
      h(Clipboard.Control, () => [h(Clipboard.Input), trigger()]),
    ]),
};

/** Five seconds of confirmed ink, then the eye returns to rest. */
export const Timeout = {
  render: () =>
    h(Clipboard.Root, { defaultValue: "https://ark-ui.com", timeout: 5000 }, () => [
      h(Clipboard.Label, () => "Copy this link (5 second timeout)"),
      h(Clipboard.Control, () => [h(Clipboard.Input), trigger()]),
    ]),
};

/** The machine answers outside its own anatomy: a composed button copies
 * through the context. */
export const Context = {
  render: () =>
    h(Clipboard.Root, { defaultValue: "https://ark-ui.com" }, () => [
      h(Clipboard.Label, () => "Copy this link"),
      h(Clipboard.Context as any, null, {
        default: (clipboard: { copy: () => void; copied: boolean }) =>
          h("button", { type: "button", onClick: () => clipboard.copy(), style: buttonStyle }, [
            clipboard.copied ? checkGlyph() : copyGlyph(),
            clipboard.copied ? "Copied!" : "Copy",
          ]),
      }),
    ]),
};

/** The value answers to the caller — the field and the copied ink only
 * mirror. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "https://ark-ui.com" });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            Clipboard.Root,
            {
              modelValue: state.value,
              onValueChange: (e: { value: string }) => (state.value = e.value),
            } as any,
            () => [
              h(Clipboard.Label, () => "Copy this link"),
              h(Clipboard.Control, () => [h(Clipboard.Input), trigger()]),
            ],
          ),
          h(
            "button",
            {
              type: "button",
              style: buttonStyle,
              onClick: () => (state.value = "https://chakra-ui.com"),
            },
            "Change URL",
          ),
        ]);
    }),
};

/** Each confirmed copy is counted — the machine reports through the
 * status change. */
export const CopyStatus = {
  render: () =>
    withState(() => {
      const state = reactive({ copyCount: 0 });
      return () =>
        h(
          Clipboard.Root,
          {
            defaultValue: "https://ark-ui.com",
            onStatusChange: (e: { copied: boolean }) => {
              if (e.copied) state.copyCount += 1;
            },
          } as any,
          () => [
            h(Clipboard.Label, () => `Copied ${state.copyCount} times`),
            h(Clipboard.Control, () => [
              h(Clipboard.Input),
              h(Clipboard.Trigger, () =>
                h(Clipboard.Indicator, null, {
                  default: () => copyGlyph(),
                  copied: () => checkGlyph(),
                }),
              ),
            ]),
          ],
        );
    }),
};

/** The label need not repeat the value: the machine's own text of it
 * sits beside the trigger. */
export const ValueText = {
  render: () =>
    h(Clipboard.Root, { defaultValue: "https://ark-ui.com" }, () => [
      h(Clipboard.Control, () => [h(Clipboard.ValueText), trigger()]),
    ]),
};
