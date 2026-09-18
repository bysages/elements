import { Dialog } from "@ark-ui/react/dialog";
import type { Meta } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { Popover } from ".";

const meta: Meta = { title: "Components/Overlay/Popover" };
export default meta;

function closeGlyph() {
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
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

/** The vessel: trigger on a hairline, the panel dissolving in on
 * elevation with a serif title and a quiet close whisker. */
function vessel(title: string, ...extra: React.ReactNode[]) {
  return (
    <Popover.Positioner>
      <Popover.Content>
        <Popover.CloseTrigger>{closeGlyph()}</Popover.CloseTrigger>
        <Popover.Title>{title}</Popover.Title>
        {extra}
      </Popover.Content>
    </Popover.Positioner>
  );
}

export const Basic = {
  args: {
    trigger: "Notes",
    title: "Reading notes",
    description:
      "Marginalia stay on the paper: this vessel pins to its trigger and dissolves in on elevation.",
  },
  render: (args: any) => (
    <Popover.Root>
      <Popover.Trigger>{args.trigger}</Popover.Trigger>
      {vessel(args.title, <Popover.Description>{args.description}</Popover.Description>)}
    </Popover.Root>
  ),
};

/** A whisker of the same paper points from the vessel to its trigger. */
export const Arrow = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>Notifications</Popover.Trigger>
      {vessel(
        "Notifications",
        <Popover.Description>You have 3 unread messages in your inbox.</Popover.Description>,
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>,
      )}
    </Popover.Root>
  ),
};

/** The vessel may anchor anywhere: here it opens to the left with a
 * custom gutter. */
export const Positioning = {
  render: () => (
    <Popover.Root
      positioning={{ placement: "left-start", offset: { mainAxis: 12, crossAxis: 12 } }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "6rem 1rem" }}>
        <Popover.Trigger>Click me</Popover.Trigger>
      </div>
      {vessel(
        "Left placement",
        <Popover.Description>
          This popover appears on the left with custom offset values.
        </Popover.Description>,
      )}
    </Popover.Root>
  ),
};

/** The vessel borrows the trigger's measure: panel and trigger share one
 * width. */
export const SameWidth = {
  render: () => (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger style={{ minWidth: "14rem" }}>Click me</Popover.Trigger>
      {vessel(
        "Matched width",
        <Popover.Description>
          This popover matches the width of its trigger element.
        </Popover.Description>,
      )}
    </Popover.Root>
  ),
};

/** Anchored to a witness rather than the trigger: the panel pins to the
 * input while the button stays free. */
export const Anchor = {
  render: () => (
    <Popover.Root>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Anchor>
          <input
            placeholder="Type here..."
            style={{
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.375rem 0.625rem",
              font: "inherit",
              width: "12rem",
            }}
          />
        </Popover.Anchor>
      </div>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger>{closeGlyph()}</Popover.CloseTrigger>
          <Popover.Title>Anchored</Popover.Title>
          <Popover.Description>The panel pins to the input, not the button.</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

/** A modal vessel: focus is trapped inside until it is dismissed. */
export const Modal = {
  render: () => (
    <Popover.Root modal>
      <Popover.Trigger>Click me</Popover.Trigger>
      {vessel(
        "Confirm action",
        <Popover.Description>
          Focus is trapped inside this modal popover until dismissed.
        </Popover.Description>,
      )}
    </Popover.Root>
  ),
};

/** A vessel inside a vessel: the nested panel climbs the same overlay
 * ladder and rests above its parent. */
export const Nested = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>Settings</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Settings</Popover.Title>
          <Popover.Description>Manage your preferences and account settings.</Popover.Description>
          <Popover.Root lazyMount unmountOnExit positioning={{ placement: "right" }}>
            <Popover.Trigger>Advanced</Popover.Trigger>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Title>Advanced settings</Popover.Title>
                <Popover.Description>
                  Configure advanced options for power users.
                </Popover.Description>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

const TRIGGER_ITEMS = [
  { id: "share", label: "Share", detail: "Share this item with others via link or email." },
  { id: "export", label: "Export", detail: "Export this item as PDF, CSV, or JSON." },
  { id: "archive", label: "Archive", detail: "Move this item to the archive for later reference." },
];

/** Each trigger names its own vessel: the panel re-inks to match the
 * door you entered by. */
export const MultipleTriggers = {
  render: () => {
    const [activeId, setActiveId] = useState("share");
    const active = TRIGGER_ITEMS.find((i) => i.id === activeId) ?? TRIGGER_ITEMS[0];
    return (
      <Popover.Root
        onTriggerValueChange={(e: { value: string | null }) => setActiveId(e.value ?? "share")}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {TRIGGER_ITEMS.map((item) => (
            <Popover.Trigger key={item.id} value={item.id}>
              {item.label}
            </Popover.Trigger>
          ))}
        </div>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>{active.label}</Popover.Title>
            <Popover.Description>{active.detail}</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    );
  },
};

/** The open state answers to the caller — the vessel only mirrors. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover.Root open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
        <Popover.Trigger>Team members</Popover.Trigger>
        {vessel(
          "Team members",
          <Popover.Description>
            Invite colleagues to collaborate on this project.
          </Popover.Description>,
        )}
      </Popover.Root>
    );
  },
};

/** Clicking outside leaves the vessel open — only its own close whisker
 * puts it away. */
export const DisableOutsideClick = {
  render: () => (
    <Popover.Root closeOnInteractOutside={false}>
      <Popover.Trigger>Click me</Popover.Trigger>
      {vessel(
        "Important notice",
        <Popover.Description>
          This popover stays open when clicking outside. Use the close button to dismiss.
        </Popover.Description>,
      )}
    </Popover.Root>
  ),
};

/** Focus lands on the named field the moment the vessel opens. */
export const InitialFocusEl = {
  render: () => {
    const nameInput = useRef<HTMLInputElement | null>(null);
    return (
      <Popover.Root initialFocusEl={() => nameInput.current}>
        <Popover.Trigger>Update profile</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.CloseTrigger>{closeGlyph()}</Popover.CloseTrigger>
            <Popover.Title>Enter your name</Popover.Title>
            <Popover.Description>Make changes to your profile here.</Popover.Description>
            <div style={{ display: "grid", gap: "0.5rem", marginTop: "0.5rem" }}>
              <input
                placeholder="First name"
                defaultValue="John"
                ref={nameInput}
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.375rem 0.625rem",
                  font: "inherit",
                }}
              />
              <input
                placeholder="Last name"
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.375rem 0.625rem",
                  font: "inherit",
                }}
              />
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    );
  },
};

/** The panel mounts only on first open — nothing of the closed vessel
 * rests in the page. */
export const LazyMount = {
  render: () => (
    <Popover.Root lazyMount>
      <Popover.Trigger>Click me</Popover.Trigger>
      {vessel(
        "Lazy loaded",
        <Popover.Description>
          This content is only mounted when the popover opens.
        </Popover.Description>,
      )}
    </Popover.Root>
  ),
};

/** The machine's state is readable inside the panel — the description
 * names it as the vessel opens and closes. */
export const Context = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger>Click me</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger>{closeGlyph()}</Popover.CloseTrigger>
          <Popover.Title>Status</Popover.Title>
          <Popover.Description>
            <Popover.Context>
              {(api: { open: boolean }) => (
                <span>Popover is {api.open ? "visible" : "hidden"}</span>
              )}
            </Popover.Context>
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

/** A vessel over a dialog: nested dismissible layers stack by the shared
 * overlay ladder, the popover resting above the dialog. */
export const WithDialog = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger>{closeGlyph()}</Dialog.CloseTrigger>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Update your profile information below.</Dialog.Description>
          <Popover.Root lazyMount unmountOnExit>
            <Popover.Trigger>More options</Popover.Trigger>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Arrow>
                  <Popover.ArrowTip />
                </Popover.Arrow>
                <Popover.CloseTrigger>{closeGlyph()}</Popover.CloseTrigger>
                <Popover.Title>Additional settings</Popover.Title>
                <Popover.Description>
                  This popover renders correctly above the dialog.
                </Popover.Description>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};
