import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Menubar, type MenubarGroup } from ".";

const meta: Meta = { title: "Components/Navigation/Menu Bar" };
export default meta;

const menus: MenubarGroup[] = [
  {
    label: "File",
    items: [
      { label: "New document", value: "file.new" },
      { label: "Open recent…", value: "file.open", disabled: true },
      { label: "Save", value: "file.save" },
      { label: "Delete draft", value: "file.delete", danger: true },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", value: "edit.undo" },
      { label: "Redo", value: "edit.redo" },
      { label: "Paste without format", value: "edit.paste", disabled: true },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle sidebar", value: "view.sidebar" },
      { label: "Focus mode", value: "view.focus" },
    ],
  },
];

const statusStyle = {
  marginBlockStart: "var(--bs-space-4)",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
} as const;

/** A row of quiet triggers; the open vessel is the menu family's paper.
 * Triggers move between each other with Tab. */
export const Basic = {
  render: () => {
    const [status, setStatus] = useState("Nothing chosen yet.");
    return (
      <div>
        <Menubar items={menus} onSelect={(value) => setStatus(`Chose ${value}`)} />
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </div>
    );
  },
};

/** The bar standing in a page: content beneath, the hairline marking
 * where the chrome ends. */
export const InContext = {
  render: () => {
    const [status, setStatus] = useState("Nothing chosen yet.");
    return (
      <section
        style={{
          background: "var(--bs-color-surface-1)",
          border: "1px solid var(--bs-color-border)",
          borderRadius: "var(--bs-radius-lg)",
          padding: "var(--bs-space-4)",
        }}
      >
        <h2
          style={{
            margin: "0 0 var(--bs-space-4)",
            fontFamily: "var(--bs-font-serif)",
            fontSize: "var(--bs-font-size-lg)",
          }}
        >
          Draft: The paper-and-ink system
        </h2>
        <Menubar items={menus} onSelect={(value) => setStatus(`Chose ${value}`)} />
        <p role="status" style={statusStyle}>
          {status}
        </p>
      </section>
    );
  },
};
