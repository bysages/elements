import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Menu } from ".";

const meta: Meta = { title: "Components/Overlay/Menu" };
export default meta;

function chevronDown() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function checkGlyph() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

function positioner(children: React.ReactNode) {
  return (
    <Menu.Positioner>
      <Menu.Content>{children}</Menu.Content>
    </Menu.Positioner>
  );
}

/** A file menu: one trigger, one vessel dissolving in, items as rows of
 * light with a hairline between courses. */
export const Basic = {
  args: {
    label: "File",
  },
  render: (args: any) => (
    <Menu.Root>
      <Menu.Trigger>
        <span>{args.label}</span>
        <Menu.Indicator>{chevronDown()}</Menu.Indicator>
      </Menu.Trigger>
      {positioner(
        <>
          <Menu.Item value="new-file">New file</Menu.Item>
          <Menu.Item value="open" disabled>
            Open…
          </Menu.Item>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Save</Menu.ItemGroupLabel>
            <Menu.Item value="save">Save</Menu.Item>
            <Menu.Item value="save-as">Save as…</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="export">Export</Menu.Item>
        </>,
      )}
    </Menu.Root>
  ),
};

/** Toggle rows: each carries its own check, independent of the others. */
export const CheckboxItems = {
  render: () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({
      rulers: false,
      grid: true,
      guides: false,
    });
    const item = (key: keyof typeof checked, label: string) => (
      <Menu.CheckboxItem
        value={key}
        checked={checked[key]}
        onCheckedChange={(value: boolean) => setChecked((c) => ({ ...c, [key]: value }))}
      >
        <Menu.ItemIndicator>{checkGlyph()}</Menu.ItemIndicator>
        {label}
      </Menu.CheckboxItem>
    );
    return (
      <Menu.Root>
        <Menu.Trigger>
          <span>View</span>
          <Menu.Indicator>{chevronDown()}</Menu.Indicator>
        </Menu.Trigger>
        {positioner(
          <>
            {item("rulers", "Rulers")}
            {item("grid", "Grid")}
            {item("guides", "Guides")}
          </>,
        )}
      </Menu.Root>
    );
  },
};

/** One radio course: exactly one theme holds the ink at a time. */
export const RadioItems = {
  render: () => {
    const [theme, setTheme] = useState("qinghua");
    const radio = (value: string, label: string) => (
      <Menu.RadioItem value={value}>
        <Menu.ItemIndicator>{checkGlyph()}</Menu.ItemIndicator>
        {label}
      </Menu.RadioItem>
    );
    return (
      <Menu.Root>
        <Menu.Trigger>
          <span>Theme</span>
          <Menu.Indicator>{chevronDown()}</Menu.Indicator>
        </Menu.Trigger>
        {positioner(
          <Menu.RadioItemGroup
            value={theme}
            onValueChange={(e: { value: string }) => setTheme(e.value)}
          >
            {radio("qinghua", "Qinghua cobalt")}
            {radio("celadon", "Celadon")}
            {radio("zhusha", "Zhusha cinnabar")}
          </Menu.RadioItemGroup>,
        )}
      </Menu.Root>
    );
  },
};

/** A course that opens another course: trigger rows nest menus to any
 * depth. */
export const Nested = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        <span>File</span>
        <Menu.Indicator>{chevronDown()}</Menu.Indicator>
      </Menu.Trigger>
      {positioner(
        <>
          <Menu.Item value="new">New file</Menu.Item>
          <Menu.Separator />
          <Menu.Root>
            <Menu.TriggerItem>
              Share
              <Menu.Indicator>{chevronDown()}</Menu.Indicator>
            </Menu.TriggerItem>
            {positioner(
              <>
                <Menu.Item value="email">Email</Menu.Item>
                <Menu.Item value="message">Message</Menu.Item>
              </>,
            )}
          </Menu.Root>
          <Menu.Root>
            <Menu.TriggerItem>
              Export
              <Menu.Indicator>{chevronDown()}</Menu.Indicator>
            </Menu.TriggerItem>
            {positioner(
              <>
                <Menu.Item value="pdf">PDF</Menu.Item>
                <Menu.Item value="png">PNG</Menu.Item>
              </>,
            )}
          </Menu.Root>
        </>,
      )}
    </Menu.Root>
  ),
};

/** Rows as honest anchors: the whole row is the link, not a click handler. */
export const Links = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        <span>Handbook</span>
        <Menu.Indicator>{chevronDown()}</Menu.Indicator>
      </Menu.Trigger>
      {positioner(
        <>
          <Menu.Item value="start" asChild>
            <a href="#getting-started" style={{ color: "inherit", textDecoration: "none" }}>
              Getting started
            </a>
          </Menu.Item>
          <Menu.Item value="install" asChild>
            <a href="#installation" style={{ color: "inherit", textDecoration: "none" }}>
              Installation
            </a>
          </Menu.Item>
          <Menu.Item value="ext-ark" asChild>
            <a
              href="https://ark-ui.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Ark UI ↗
            </a>
          </Menu.Item>
        </>,
      )}
    </Menu.Root>
  ),
};

/** The open state answers to the caller — the page controls the vessel. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Menu.Root
        open={open}
        onOpenChange={(e: { open: boolean }) => {
          setOpen(e.open);
        }}
      >
        <Menu.Trigger>
          <span>Edit</span>
          <Menu.Indicator>{chevronDown()}</Menu.Indicator>
        </Menu.Trigger>
        {positioner(
          <>
            <Menu.Item value="undo">Undo</Menu.Item>
            <Menu.Item value="redo">Redo</Menu.Item>
          </>,
        )}
      </Menu.Root>
    );
  },
};

/** The vessel floats where the pointer pressed: a context menu on any
 * right-click inside the framed area. */
export const ContextMenu = {
  render: () => (
    <Menu.Root positioning={{ placement: "right-start" }}>
      <Menu.ContextTrigger>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            inlineSize: "20rem",
            blockSize: "10rem",
            border: "1px dashed var(--bs-color-border)",
            borderRadius: "var(--bs-radius-lg)",
            color: "var(--bs-color-text-tertiary)",
            fontSize: "var(--bs-font-size-sm)",
            userSelect: "none",
          }}
        >
          Right click here
        </div>
      </Menu.ContextTrigger>
      {positioner(
        <>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="delete" color="var(--bs-color-danger)">
            Delete
          </Menu.Item>
        </>,
      )}
    </Menu.Root>
  ),
};

/** Two triggers, one menu anatomy — each trigger opens its own vessel. */
export const MultipleTriggers = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <Menu.Root>
        <Menu.Trigger>File</Menu.Trigger>
        {positioner(
          <>
            <Menu.Item value="new">New file</Menu.Item>
            <Menu.Item value="open">Open…</Menu.Item>
          </>,
        )}
      </Menu.Root>
      <Menu.Root>
        <Menu.Trigger>Help</Menu.Trigger>
        {positioner(
          <>
            <Menu.Item value="docs">Docs</Menu.Item>
            <Menu.Item value="about">About</Menu.Item>
          </>,
        )}
      </Menu.Root>
    </div>
  ),
};
