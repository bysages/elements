import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { FloatButton } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Actions/Float Button" };
export default meta;

function glyph(d: string): ReactNode {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const plus = "M12 5v14m-7-7h14";
const compose = "M12 20h9m-1.5-12.5a2.1 2.1 0 0 0-3-3L4 17v3h3Z";
const share = "M12 3v12m0-12 4 4m-4-4-4 4m-4 8v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3";
const trash = "M4 7h16m-9-4h2m-6 4 1 13h8l1-13m-7 4v6m4-6v6";

const statusStyle = {
  marginBlockStart: "var(--bs-space-4)",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
} as const;

/** The moored trigger fans out its actions; each name surfaces beside
 * its button, and clicking one reports through `onClick`. */
export const Basic = {
  render: () => {
    const [status, setStatus] = useState("Nothing chosen yet.");
    return (
      <>
        <FloatButton>
          <FloatButton.Trigger label="Actions">{glyph(plus)}</FloatButton.Trigger>
          <FloatButton.Item label="Compose" onClick={() => setStatus("Compose")}>
            {glyph(compose)}
          </FloatButton.Item>
          <FloatButton.Item label="Share" onClick={() => setStatus("Share")}>
            {glyph(share)}
          </FloatButton.Item>
          <FloatButton.Item label="Delete" onClick={() => setStatus("Delete")}>
            {glyph(trash)}
          </FloatButton.Item>
        </FloatButton>
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </>
    );
  },
};

/** Controlled: an outside hand drives the group; the Trigger reports
 * its own flips back through `onOpenChange`. */
export const ControlledOpen = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("Nothing chosen yet.");
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(!open)}>
          {open ? "Fold the group" : "Unfold the group"}
        </Button>
        <p
          role="status"
          style={{
            ...statusStyle,
            marginBlockStart: "var(--bs-space-4)",
            marginBlockEnd: "var(--bs-space-4)",
          }}
        >
          {status}
        </p>
        <FloatButton open={open} onOpenChange={setOpen} placement="bottom-start">
          <FloatButton.Trigger label="Actions">{glyph(plus)}</FloatButton.Trigger>
          <FloatButton.Item
            label="Compose"
            onClick={() => {
              setStatus("Compose");
              setOpen(false);
            }}
          >
            {glyph(compose)}
          </FloatButton.Item>
        </FloatButton>
      </>
    );
  },
};
