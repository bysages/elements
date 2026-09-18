import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { Dialog } from ".";

function vessel(title: string, description: string, ...extra: ReactNode[]) {
  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {extra}
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
}

const meta: Meta = {
  title: "Components/Overlay/Dialog",
};

export default meta;

export const Basic = {
  args: {
    trigger: "Delete item",
    title: "Delete item",
    description: "This action cannot be undone.",
  },
  render: (args: any) => (
    <Dialog.Root>
      <Dialog.Trigger>{args.trigger}</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>{args.title}</Dialog.Title>
          <Dialog.Description>{args.description}</Dialog.Description>
          <p>Removed items stay recoverable for 30 days.</p>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};

/** The dialog answers to state — open and close belong to the caller. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Trigger>Open dialog</Dialog.Trigger>
        {vessel("Controlled", "The page decides when this closes.")}
      </Dialog.Root>
    );
  },
};

/** An alert dialog: the role sharpens screen-reader urgency and the
 * outside click refuses to dismiss. */
export const AlertDialog = {
  render: () => (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger>Discard draft</Dialog.Trigger>
      {vessel("Discard draft?", "Your edits since the last save will be lost.")}
    </Dialog.Root>
  ),
};

/** Non-modal: no backdrop, the page stays live behind the vessel. */
export const NonModal = {
  render: () => (
    <Dialog.Root modal={false}>
      <Dialog.Trigger>Open panel</Dialog.Trigger>
      {vessel("Non-modal panel", "You can keep working while this floats.")}
    </Dialog.Root>
  ),
};

/** The vessel mounts only on first open and leaves on exit. */
export const LazyMount = {
  render: () => (
    <Dialog.Root lazyMount unmountOnExit>
      <Dialog.Trigger>Open lazily</Dialog.Trigger>
      {vessel("Lazy mount", "Nothing of this dialog rests in the page while closed.")}
    </Dialog.Root>
  ),
};

/** Several triggers, one dialog: the launched slot remembers which trigger
 * opened it. */
export const MultipleTriggers = {
  render: () => (
    <Dialog.Root>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Dialog.Trigger value="a">Open A</Dialog.Trigger>
        <Dialog.Trigger value="b">Open B</Dialog.Trigger>
      </div>
      {vessel("Shared dialog", "Either trigger may summon this vessel.")}
    </Dialog.Root>
  ),
};

/** A dialog opening another dialog: stacked vessels share the overlay
 * ladder through the layer index. */
export const Nested = {
  render: () => {
    const [parent, setParent] = useState(false);
    const [child, setChild] = useState(false);
    return (
      <Dialog.Root open={parent} onOpenChange={(e) => setParent(e.open)}>
        <Dialog.Trigger>Open parent</Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Parent dialog</Dialog.Title>
            <Dialog.Description>This vessel opens another above itself.</Dialog.Description>
            <Dialog.Root open={child} onOpenChange={(e) => setChild(e.open)}>
              <Dialog.Trigger>Open child</Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Title>Child dialog</Dialog.Title>
                  <Dialog.Description>The upper vessel.</Dialog.Description>
                  <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
            <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    );
  },
};

/** Opening the dialog moves focus to a chosen row; closing hands it back. */
export const InitialFocus = {
  render: () => (
    <Dialog.Root initialFocusEl={() => document.querySelector<HTMLElement>("[data-autofocus]")}>
      <Dialog.Trigger>Open form</Dialog.Trigger>
      {vessel(
        "Sign in",
        "Focus lands in the first field, not the close button.",
        <input
          data-autofocus
          placeholder="Name"
          style={{
            border: "1px solid var(--bs-color-border)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.375rem 0.5rem",
            font: "inherit",
            background: "var(--bs-color-surface-2)",
            color: "var(--bs-color-text-primary)",
          }}
        />,
      )}
    </Dialog.Root>
  ),
};
