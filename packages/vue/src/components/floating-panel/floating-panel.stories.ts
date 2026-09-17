import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, Teleport } from "vue";

import { FloatingPanel } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/Floating Panel" };
export default meta;

function glyph(d: string) {
  return h(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d })],
  );
}

const AXES = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;

/** The sheet itself: a draggable header with stage seals, a body and the
 * eight resize rims. */
function stage(
  body = "A sheet of paper you can move: drag the header, pull the rim.",
  title = "Notes",
) {
  return h(Teleport, { to: "body" }, () => [
    h(FloatingPanel.Positioner, () =>
      h(FloatingPanel.Content, () => [
        h(FloatingPanel.DragTrigger, () =>
          h(FloatingPanel.Header, () => [
            h(FloatingPanel.Title, () => [
              glyph("M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01"),
              title,
            ]),
            h(FloatingPanel.Control, () => [
              h(FloatingPanel.StageTrigger, { stage: "minimized" }, () => glyph("M5 12h14")),
              h(FloatingPanel.StageTrigger, { stage: "maximized" }, () =>
                glyph("M4 9V4h5M20 15v5h-5"),
              ),
              h(FloatingPanel.StageTrigger, { stage: "default" }, () =>
                glyph("M15 15l-6-6M15 9v6H9"),
              ),
              h(FloatingPanel.CloseTrigger, () => glyph("M6 6l12 12M18 6L6 18")),
            ]),
          ]),
        ),
        h(FloatingPanel.Body, () => h("p", () => body)),
        ...AXES.map((axis) => h(FloatingPanel.ResizeTrigger, { key: axis, axis })),
      ]),
    ),
  ]);
}

function panel(
  extraRootProps: Record<string, any> = {},
  text = {
    trigger: "Open panel",
    title: "Notes",
    body: "A sheet of paper you can move: drag the header, pull the rim.",
  },
) {
  const Host = {
    name: "FloatingPanelStage",
    setup() {
      return () =>
        h(FloatingPanel.Root, extraRootProps, () => [
          h(FloatingPanel.Trigger, () => text.trigger),
          stage(text.body, text.title),
        ]);
    },
  };
  return () => h(Host);
}

function readout(text: string) {
  return h(
    "output",
    { style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" } },
    () => text,
  );
}

function outsideButton(label: string, onClick: () => void) {
  return h(
    "button",
    {
      onClick,
      style: {
        padding: "0.375rem 0.75rem",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        background: "var(--bs-color-surface-2)",
        font: "inherit",
        fontSize: "var(--bs-font-size-sm)",
      },
    },
    label,
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
    withState(() => panel({}, { trigger: args.triggerText, title: args.title, body: args.body })),
};

/** The bar reads its own state: the paragraph names the panel open or
 * closed. */
export const Context = {
  render: () =>
    h(FloatingPanel.Root, () => [
      h(FloatingPanel.Context as any, null, {
        default: (api: { open: boolean }) => readout(`panel is ${api.open ? "open" : "closed"}`),
      }),
      h(FloatingPanel.Trigger, () => "Open panel"),
      stage(),
    ]),
};

/** Openness answers to the caller — the button outside drives the sheet. */
export const ControlledOpen = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          readout(`open: ${state.open}`),
          outsideButton("Toggle from outside", () => (state.open = !state.open)),
          panel({
            open: state.open,
            onOpenChange: (e: { open: boolean }) => (state.open = e.open),
          })(),
        ]);
    }),
};

/** The sheet's place answers to the caller — dragging reports, the caller
 * keeps the truth. */
export const ControlledPosition = {
  render: () =>
    withState(() => {
      const state = reactive({ position: { x: 200, y: 200 } });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          readout(`x: ${state.position.x} · y: ${state.position.y}`),
          panel({
            position: state.position,
            onPositionChange: (e: { position: { x: number; y: number } }) =>
              (state.position = e.position),
          })(),
        ]);
    }),
};

/** The sheet's measure answers to the caller — resizing reports, the
 * caller keeps the truth. */
export const ControlledSize = {
  render: () =>
    withState(() => {
      const state = reactive({ size: { width: 400, height: 300 } });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          readout(`${state.size.width} × ${state.size.height}`),
          panel({
            size: state.size,
            onSizeChange: (e: { size: { width: number; height: number } }) => (state.size = e.size),
          })(),
        ]);
    }),
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
