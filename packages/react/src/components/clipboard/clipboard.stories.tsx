import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Clipboard } from ".";

const meta: Meta = { title: "Components/Actions/Clipboard" };
export default meta;

const copyGlyph = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <rect x={9} y={9} width={11} height={11} rx={1.5} />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </svg>
);

const checkGlyph = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

function trigger() {
  return (
    <Clipboard.Trigger>
      <Clipboard.Indicator copied={checkGlyph}>{copyGlyph}</Clipboard.Indicator>
    </Clipboard.Trigger>
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
  args: {
    label: "Copy this link",
  },
  render: (args: any) => (
    <Clipboard.Root defaultValue="https://ark-ui.com">
      <Clipboard.Label>{args.label}</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        {trigger()}
      </Clipboard.Control>
    </Clipboard.Root>
  ),
};

/** Five seconds of confirmed ink, then the eye returns to rest. */
export const Timeout = {
  render: () => (
    <Clipboard.Root defaultValue="https://ark-ui.com" timeout={5000}>
      <Clipboard.Label>Copy this link (5 second timeout)</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        {trigger()}
      </Clipboard.Control>
    </Clipboard.Root>
  ),
};

/** The machine answers outside its own anatomy: a composed button copies
 * through the context. */
export const Context = {
  render: () => (
    <Clipboard.Root defaultValue="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Context>
        {(clipboard: { copy: () => void; copied: boolean }) => (
          <button type="button" onClick={() => clipboard.copy()} style={buttonStyle}>
            {clipboard.copied ? checkGlyph : copyGlyph}
            {clipboard.copied ? "Copied!" : "Copy"}
          </button>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  ),
};

/** The value answers to the caller — the field and the copied ink only
 * mirror. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("https://ark-ui.com");
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <Clipboard.Root value={value} onValueChange={(e: { value: string }) => setValue(e.value)}>
          <Clipboard.Label>Copy this link</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input />
            {trigger()}
          </Clipboard.Control>
        </Clipboard.Root>
        <button type="button" style={buttonStyle} onClick={() => setValue("https://chakra-ui.com")}>
          Change URL
        </button>
      </div>
    );
  },
};

/** Each confirmed copy is counted — the machine reports through the
 * status change. */
export const CopyStatus = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);
    return (
      <Clipboard.Root
        defaultValue="https://ark-ui.com"
        onStatusChange={(e: { copied: boolean }) => {
          if (e.copied) setCopyCount((count) => count + 1);
        }}
      >
        <Clipboard.Label>Copied {copyCount} times</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input />
          <Clipboard.Trigger>
            <Clipboard.Indicator copied={checkGlyph}>{copyGlyph}</Clipboard.Indicator>
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  },
};

/** The label need not repeat the value: the machine's own text of it
 * sits beside the trigger. */
export const ValueText = {
  render: () => (
    <Clipboard.Root defaultValue="https://ark-ui.com">
      <Clipboard.Control>
        <Clipboard.ValueText />
        {trigger()}
      </Clipboard.Control>
    </Clipboard.Root>
  ),
};
