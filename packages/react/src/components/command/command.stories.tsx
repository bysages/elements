import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Command, type CommandEntry } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Overlay/Command" };
export default meta;

const commands: CommandEntry[] = [
  { label: "New document", value: "file.new", group: "File", hint: "N" },
  { label: "Save", value: "file.save", group: "File", hint: "S" },
  { label: "Export as PDF", value: "file.export", group: "File", hint: "E" },
  { label: "Toggle theme", value: "appearance.theme", group: "Appearance", hint: "T" },
  { label: "Increase density", value: "appearance.density-up", group: "Appearance", hint: "+" },
  { label: "Decrease density", value: "appearance.density-down", group: "Appearance", hint: "-" },
  { label: "Open documentation", value: "help.docs", group: "Help", hint: "?" },
  { label: "Keyboard shortcuts", value: "help.keys", group: "Help", hint: "K" },
];

/** The palette: a sheet at the top of the page, a search over grouped
 * commands, a keycap hint on every row. Choosing one closes the
 * palette. */
export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("Nothing run yet.");
    return (
      <div>
        <Button
          onClick={() => {
            setOpen(true);
            setStatus("Palette is up.");
          }}
        >
          Open command palette
          <span
            style={{
              marginInlineStart: "var(--bs-space-2)",
              fontSize: "var(--bs-font-size-xs)",
              color: "var(--bs-color-text-tertiary)",
            }}
          >
            Ctrl K
          </span>
        </Button>
        <Command
          items={commands}
          placeholder="Type a command…"
          open={open}
          onOpenChange={setOpen}
          onSelect={(value) => setStatus(`Ran ${value}`)}
        />
        <p
          role="status"
          style={{
            marginBlockStart: "var(--bs-space-4)",
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {status}
        </p>
      </div>
    );
  },
};

/** Typing narrows the ledger across every group; the empty state speaks
 * when nothing answers. */
export const Searching = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <p
          style={{
            margin: "0 0 var(--bs-space-4)",
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          The palette starts open — type “the”, “app”, or nothing at all.
        </p>
        <Command
          items={commands}
          placeholder="Type a command…"
          open={open}
          onOpenChange={setOpen}
          onSelect={() => setOpen(false)}
        />
      </div>
    );
  },
};
