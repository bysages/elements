import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Collapsible } from ".";

const meta: Meta = { title: "Components/Layout/Collapsible" };
export default meta;

const chevron = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BODY =
  "A headless component library for building accessible, high-quality UI components across frameworks — ours dresses its anatomy in paper and ink.";

function panel(label: string, rootProps: any = {}) {
  return (
    <Collapsible.Root style={{ width: "100%", maxWidth: "46rem" }} {...rootProps}>
      <Collapsible.Trigger>
        {label}
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <p>{BODY}</p>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/** The paper folds away behind one trigger; the indicator turns as the
 * panel opens. */
export const Basic = {
  args: {
    label: "What is Ark UI?",
  },
  render: (args: any) => panel(args.label),
};

/** The panel starts open, resting its content on the page. */
export const InitialOpen = {
  render: () => panel("Already unfolded", { defaultOpen: true }),
};

/** The whole leaf rests: the trigger stays quiet to clicks. */
export const Disabled = {
  render: () => panel("Pinned shut", { disabled: true }),
};

/** The panel mounts only on first open and leaves on exit — nothing of
 * the closed fold rests in the page. */
export const LazyMount = {
  render: () => panel("Mounted on demand", { lazyMount: true, unmountOnExit: true }),
};

/** A fold inside a fold: each layer keeps its own open state. */
export const Nested = {
  render: () => (
    <Collapsible.Root defaultOpen style={{ width: "100%", maxWidth: "46rem" }}>
      <Collapsible.Trigger>
        Getting started
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <p>Welcome. Topics to explore:</p>
        <div style={{ marginTop: "0.75rem" }}>{panel("Installation")}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

/** The fold never fully closes: collapsedHeight keeps a peephole open. */
export const PartialCollapse = {
  render: () => panel("Read more", { collapsedHeight: "3.5rem" } as any),
};

/** The open state answers to the caller — the fold only mirrors. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible.Root
        open={open}
        onOpenChange={(e: { open: boolean }) => setOpen(e.open)}
        style={{ width: "100%", maxWidth: "46rem" }}
      >
        <Collapsible.Trigger>
          Controlled fold
          <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p>{BODY}</p>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
};
