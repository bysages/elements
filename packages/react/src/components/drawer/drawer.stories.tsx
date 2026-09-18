import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { Drawer } from ".";

const meta: Meta = { title: "Components/Overlay/Drawer" };
export default meta;

const closeGlyph = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/** The sheet's anatomy: trigger, dimmed page, rising vessel with its
 * grabber and close glyph. */
function sheet(title: string, ...extra: ReactNode[]) {
  return (
    <>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Title>{title}</Drawer.Title>
          {extra}
          <Drawer.CloseTrigger>{closeGlyph}</Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </>
  );
}

/** The sheet rises from the bottom edge, grabber first; the page dims
 * behind it. */
export const Basic = {
  args: {
    triggerLabel: "Open drawer",
    title: "Settings",
    description: "Preferences travel with the sheet — pull the grabber to put them away.",
  },
  render: (args: any) => (
    <Drawer.Root>
      <Drawer.Trigger>{args.triggerLabel}</Drawer.Trigger>
      {sheet(
        args.title,
        <Drawer.Description>{args.description}</Drawer.Description>,
        <p>The rest of the sheet is yours to fill.</p>,
      )}
    </Drawer.Root>
  ),
};

/** The sheet drags between resting heights: 25%, 50%, and full. */
export const SnapPoints = {
  render: () => (
    <Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <Drawer.Trigger>Open sheet</Drawer.Trigger>
      {sheet("Snap points", <p>Drag the grabber between quarter, half, and full height.</p>)}
    </Drawer.Root>
  ),
};

/** Without the backdrop the page stays live; the sheet borrows its light
 * instead of dimming yours. */
export const NonModal = {
  render: () => (
    <Drawer.Root modal={false}>
      <Drawer.Trigger>Open panel</Drawer.Trigger>
      {sheet("Non-modal sheet", <p>The page behind keeps its click.</p>)}
    </Drawer.Root>
  ),
};

/** The sheet rests inside the page: the page itself indents to make
 * room, an indent background carrying the shade behind it. Zag gives the
 * indent parts no anatomy attributes, so the presentation is composed
 * here from the machine's open state. */
export const IndentBackground = {
  render: () => {
    const [open, setOpen] = useState(false);
    const indentStyle: React.CSSProperties = {
      position: "relative",
      zIndex: 0,
      minHeight: "16rem",
      background: "var(--bs-color-surface-1)",
      transformOrigin: "center top",
      transition:
        "transform var(--bs-duration-slow) var(--bs-ease-out), border-radius var(--bs-duration-base) var(--bs-ease-out)",
    };
    const indented: React.CSSProperties = {
      ...indentStyle,
      transform: "scale(0.97) translateY(0.5rem)",
      borderTopLeftRadius: "var(--bs-radius-lg)",
      borderTopRightRadius: "var(--bs-radius-lg)",
    };
    return (
      <Drawer.Stack>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "16rem",
            maxWidth: "42rem",
            margin: "0 auto",
            borderRadius: "var(--bs-radius-lg)",
            border: "1px solid var(--bs-color-border)",
            contain: "layout",
          }}
        >
          <Drawer.IndentBackground
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--bs-color-gray-925)",
            }}
          />
          <Drawer.Root modal={false} open={open} onOpenChange={(e: any) => setOpen(e.open)}>
            <Drawer.Indent style={open ? indented : indentStyle}>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  minHeight: "16rem",
                }}
              >
                <Drawer.Trigger>Open drawer</Drawer.Trigger>
              </div>
            </Drawer.Indent>
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Grabber>
                  <Drawer.GrabberIndicator />
                </Drawer.Grabber>
                <Drawer.Title>Indented page</Drawer.Title>
                <p>The page behind indents rather than dims.</p>
                <Drawer.CloseTrigger>{closeGlyph}</Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </div>
      </Drawer.Stack>
    );
  },
};

/** The drawer opens another drawer — stacked sheets climb the same
 * overlay ladder as stacked dialogs. */
export const Nested = {
  render: () => {
    const [parent, setParent] = useState(false);
    const [child, setChild] = useState(false);
    return (
      <Drawer.Root open={parent} onOpenChange={(e: any) => setParent(e.open)}>
        <Drawer.Trigger>Open first</Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber>
              <Drawer.GrabberIndicator />
            </Drawer.Grabber>
            <Drawer.Title>First sheet</Drawer.Title>
            <Drawer.Root open={child} onOpenChange={(e: any) => setChild(e.open)}>
              <Drawer.Trigger>Open second</Drawer.Trigger>
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Grabber>
                    <Drawer.GrabberIndicator />
                  </Drawer.Grabber>
                  <Drawer.Title>Second sheet</Drawer.Title>
                  <p>The upper sheet.</p>
                  <Drawer.CloseTrigger>{closeGlyph}</Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Drawer.Root>
            <Drawer.CloseTrigger>{closeGlyph}</Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    );
  },
};

/** Two triggers, one sheet — either door opens the same vessel. */
export const MultipleTriggers = {
  render: () => (
    <Drawer.Root>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Drawer.Trigger value="a">Open A</Drawer.Trigger>
        <Drawer.Trigger value="b">Open B</Drawer.Trigger>
      </div>
      {sheet("Shared sheet", <p>Either trigger may summon this sheet.</p>)}
    </Drawer.Root>
  ),
};

/** Drag from the sheet's leading edge: a swipe toward `end` puts it
 * away. */
export const SwipeDirection = {
  render: () => (
    <Drawer.Root swipeDirection="end">
      <Drawer.Trigger>Open side sheet</Drawer.Trigger>
      {sheet("Side sheet", <p>Swipe right to dismiss.</p>)}
    </Drawer.Root>
  ),
};

/** One anatomy, four edges: the sheet rises from whichever edge
 * `swipeDirection` names. */
export const Directions = {
  render: () => {
    const edges = { down: "bottom", up: "top", start: "left", end: "right" } as const;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--bs-space-3)" }}>
        {(Object.keys(edges) as Array<keyof typeof edges>).map((direction) => (
          <Drawer.Root key={direction} swipeDirection={direction}>
            <Drawer.Trigger>From the {edges[direction]}</Drawer.Trigger>
            {sheet(
              `The ${edges[direction]} sheet`,
              <Drawer.Description>The same anatomy serves every edge.</Drawer.Description>,
            )}
          </Drawer.Root>
        ))}
      </div>
    );
  },
};

/** Without a grabber the sheet becomes a plain panel — content may be
 * scrolled instead of dragged. */
export const NonDraggable = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger>Open panel</Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Plain panel</Drawer.Title>
          <p>No grabber, no drag — just a quiet vessel.</p>
          <Drawer.CloseTrigger>{closeGlyph}</Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
};

/** Long content scrolls inside the sheet; the drag yields to the
 * scroll. */
export const Scrollable = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger>Open long sheet</Drawer.Trigger>
      {sheet(
        "Long sheet",
        <div style={{ maxHeight: "50vh", overflowY: "auto", paddingRight: "0.5rem" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>Paragraph {i + 1} of the scroll.</p>
          ))}
        </div>,
      )}
    </Drawer.Root>
  ),
};

/** The open state answers to the caller — the sheet only mirrors. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Drawer.Root open={open} onOpenChange={(e: any) => setOpen(e.open)}>
        <Drawer.Trigger>Open drawer</Drawer.Trigger>
        {sheet("Controlled", <p>The page decides.</p>)}
      </Drawer.Root>
    );
  },
};
