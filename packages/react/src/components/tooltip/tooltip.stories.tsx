import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Tooltip } from ".";

const meta: Meta = { title: "Components/Overlay/Tooltip" };
export default meta;

function sealGlyph() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" />
    </svg>
  );
}

function glyph(path: string) {
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
      <path d={path} />
    </svg>
  );
}

/** Ink answers only when asked: hover raises a quiet label on the
 * paper. */
export const Basic = {
  args: {
    placement: "bottom-start",
  },
  render: (args: any) => (
    <Tooltip.Root positioning={{ placement: args.placement }}>
      <Tooltip.Trigger>
        {sealGlyph()}
        <span>Hover me</span>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>Ink answers only when asked.</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

/** A whisker of the same paper points from the label to its trigger. */
export const Arrow = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          I am a tooltip!
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

/** The label may rest on any side: here it opens to the left with a
 * custom gutter. */
export const Positioning = {
  render: () => (
    <Tooltip.Root
      positioning={{ placement: "left-start", offset: { mainAxis: 12, crossAxis: 12 } }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "6rem 1rem" }}>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      </div>
      <Tooltip.Positioner>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

/** No waiting: the label rises the moment the pointer arrives. */
export const Delay = {
  render: () => (
    <Tooltip.Root openDelay={0} closeDelay={0}>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

const TOOLS = [
  {
    id: "bold",
    label: "Bold",
    shortcut: "⌘B",
    path: "M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z",
  },
  { id: "italic", label: "Italic", shortcut: "⌘I", path: "M10 5h8m-6 0-2 14h8m-2-14" },
  {
    id: "underline",
    label: "Underline",
    shortcut: "⌘U",
    path: "M7 4v7a5 5 0 0 0 10 0V4M5 20h14",
  },
  {
    id: "strike",
    label: "Strikethrough",
    shortcut: "⌘⇧X",
    path: "M5 12h14M8 8a4 4 0 0 1 8-1m0 9a4 4 0 0 1-8 1",
  },
];

/** A toolbar of triggers sharing one label — the panel re-inks to name
 * the tool under the pointer. */
export const MultipleTriggers = {
  render: () => {
    const [active, setActive] = useState<(typeof TOOLS)[number] | null>(null);
    return (
      <Tooltip.Root
        onTriggerValueChange={(e: { value: string | null }) =>
          setActive(TOOLS.find((t) => t.id === e.value) ?? null)
        }
      >
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {TOOLS.map((tool) => (
            <Tooltip.Trigger key={tool.id} value={tool.id}>
              {glyph(tool.path)}
            </Tooltip.Trigger>
          ))}
        </div>
        <Tooltip.Positioner>
          <Tooltip.Content>
            {active ? (
              <>
                {active.label}
                <span style={{ opacity: 0.7 }}> {active.shortcut}</span>
              </>
            ) : (
              "Pick a tool"
            )}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    );
  },
};

/** The open state answers to the caller — the label only mirrors. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    const button = (label: string, onClick: () => void) => (
      <button
        type="button"
        onClick={onClick}
        style={{
          border: "1px solid var(--bs-color-border)",
          background: "var(--bs-color-surface-2)",
          borderRadius: "var(--bs-radius-sm)",
          padding: "0.25rem 0.625rem",
          font: "inherit",
          fontSize: "var(--bs-font-size-sm)",
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        {button("Toggle", () => setOpen(!open))}
        <Tooltip.Root open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      </div>
    );
  },
};

/** The machine's state is readable inside the label itself. */
export const Context = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Context>
            {(api: { open: boolean }) => <span>Tooltip is {api.open ? "visible" : "hidden"}</span>}
          </Tooltip.Context>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

/** Inside a fixed-position ancestor the label still measures against the
 * viewport — the positioning strategy switches to fixed. */
export const WithinFixed = {
  render: () => (
    <div
      style={{
        position: "fixed",
        top: "2.5rem",
        left: "2.5rem",
        padding: "2.5rem",
        background: "var(--bs-color-surface-inset)",
        borderRadius: "var(--bs-radius-lg)",
      }}
    >
      <Tooltip.Root positioning={{ strategy: "fixed" }}>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </div>
  ),
};
