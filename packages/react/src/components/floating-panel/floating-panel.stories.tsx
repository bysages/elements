import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { FloatingPanel } from ".";

const meta: Meta = { title: "Components/Overlay/Floating Panel" };
export default meta;

function glyph(d: string) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const AXES = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;

/** The sheet itself: a draggable header with stage seals, a body and the
 * eight resize rims. */
function stage(
  body = "A sheet of paper you can move: drag the header, pull the rim.",
  title = "Notes",
) {
  return (
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header>
            <FloatingPanel.Title>
              {glyph("M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01")}
              {title}
            </FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger stage="minimized">
                {glyph("M5 12h14")}
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized">
                {glyph("M4 9V4h5M20 15v5h-5")}
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="default">
                {glyph("M15 15l-6-6M15 9v6H9")}
              </FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger>
                {glyph("M6 6l12 12M18 6L6 18")}
              </FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>
          <p>{body}</p>
        </FloatingPanel.Body>
        {AXES.map((axis) => (
          <FloatingPanel.ResizeTrigger key={axis} axis={axis} />
        ))}
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  );
}

function panel(
  extraRootProps: Record<string, any> = {},
  text = {
    trigger: "Open panel",
    title: "Notes",
    body: "A sheet of paper you can move: drag the header, pull the rim.",
  },
) {
  return (
    <FloatingPanel.Root {...extraRootProps}>
      <FloatingPanel.Trigger>{text.trigger}</FloatingPanel.Trigger>
      {stage(text.body, text.title)}
    </FloatingPanel.Root>
  );
}

function readout(text: string) {
  return (
    <output style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" }}>
      {text}
    </output>
  );
}

function outsideButton(label: string, onClick: () => void) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.375rem 0.75rem",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        background: "var(--bs-color-surface-2)",
        font: "inherit",
        fontSize: "var(--bs-font-size-sm)",
      }}
    >
      {label}
    </button>
  );
}

/** Toggle the sheet open, drag it by its header, resize it from the rim and
 * stage it small, large or home from the control seals. */
export const Basic = {
  args: {
    triggerText: "Open panel",
    title: "Notes",
    body: "A sheet of paper you can move: drag the header, pull the rim.",
  },
  render: (args: any) =>
    panel({}, { trigger: args.triggerText, title: args.title, body: args.body }),
};

/** The bar reads its own state: the paragraph names the panel open or
 * closed. */
export const Context = {
  render: () => (
    <FloatingPanel.Root>
      <FloatingPanel.Context>
        {(api: { open: boolean }) => readout(`panel is ${api.open ? "open" : "closed"}`)}
      </FloatingPanel.Context>
      <FloatingPanel.Trigger>Open panel</FloatingPanel.Trigger>
      {stage()}
    </FloatingPanel.Root>
  ),
};

/** Openness answers to the caller — the button outside drives the sheet. */
export const ControlledOpen = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        {readout(`open: ${open}`)}
        {outsideButton("Toggle from outside", () => setOpen((v) => !v))}
        {panel({
          open,
          onOpenChange: (e: { open: boolean }) => setOpen(e.open),
        })}
      </div>
    );
  },
};

/** The sheet's place answers to the caller — dragging reports, the caller
 * keeps the truth. */
export const ControlledPosition = {
  render: () => {
    const [position, setPosition] = useState({ x: 200, y: 200 });
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        {readout(`x: ${position.x} · y: ${position.y}`)}
        {panel({
          position,
          onPositionChange: (e: { position: { x: number; y: number } }) => setPosition(e.position),
        })}
      </div>
    );
  },
};

/** The sheet's measure answers to the caller — resizing reports, the
 * caller keeps the truth. */
export const ControlledSize = {
  render: () => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        {readout(`${size.width} × ${size.height}`)}
        {panel({
          size,
          onSizeChange: (e: { size: { width: number; height: number } }) => setSize(e.size),
        })}
      </div>
    );
  },
};

/** The sheet is born where the trigger stands: the anchor rides the
 * trigger's own rect. */
export const AnchorPosition = {
  render: () =>
    panel({
      getAnchorPosition: ({ triggerRect }: { triggerRect: DOMRect | null }) => {
        if (!triggerRect) return { x: 0, y: 0 };
        return {
          x: triggerRect.x + triggerRect.width / 2,
          y: triggerRect.y + triggerRect.height / 2,
        };
      },
    }),
};

/** The sheet is not printed until first asked: lazy mount keeps the DOM
 * clean until the trigger is pulled. */
export const LazyMount = {
  render: () => panel({ lazyMount: true, unmountOnExit: true }),
};
