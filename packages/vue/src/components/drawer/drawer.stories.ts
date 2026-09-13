import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, Teleport } from "vue";

import { withState } from "../with-state.js";
import { Drawer } from "./index.js";

const meta: Meta = { title: "Components / Drawer" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6L6 18" })],
  );
}

/** The sheet's anatomy: trigger, dimmed page, rising vessel with its
 * grabber and close glyph. */
function sheet(title: string, ...extra: any[]) {
  return [
    h(Teleport, { to: "body" }, () => [
      h(Drawer.Backdrop),
      h(Drawer.Positioner, () =>
        h(Drawer.Content, () => [
          h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
          h(Drawer.Title, () => title),
          ...extra,
          h(Drawer.CloseTrigger, () => closeGlyph()),
        ]),
      ),
    ]),
  ];
}

function trigger(label: string) {
  return h(Drawer.Trigger, () => label);
}

/** The sheet rises from the bottom edge, grabber first; the page dims
 * behind it. */
export const Basic = {
  args: {
    triggerLabel: "Open drawer",
    title: "Settings",
    description: "Preferences travel with the sheet — pull the grabber to put them away.",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Drawer.Root, () => [
          trigger(args.triggerLabel),
          ...sheet(
            args.title,
            h(Drawer.Description, () => args.description),
            h("p", () => "The rest of the sheet is yours to fill."),
          ),
        ]),
    ),
};

/** The sheet drags between resting heights: 25%, 50%, and full. */
export const SnapPoints = {
  render: () =>
    h(Drawer.Root, { snapPoints: [0.25, 0.5, 1], defaultSnapPoint: 0.5 } as any, () => [
      trigger("Open sheet"),
      ...sheet(
        "Snap points",
        h("p", () => "Drag the grabber between quarter, half, and full height."),
      ),
    ]),
};

/** Without the backdrop the page stays live; the sheet borrows its light
 * instead of dimming yours. */
export const NonModal = {
  render: () =>
    h(Drawer.Root, { modal: false } as any, () => [
      trigger("Open panel"),
      ...sheet(
        "Non-modal sheet",
        h("p", () => "The page behind keeps its click."),
      ),
    ]),
};

/** The sheet rests inside the page: the page itself indents to make
 * room, an indent background carrying the shade behind it. Zag gives the
 * indent parts no anatomy attributes, so the presentation is composed
 * here from the machine's open state. */
export const IndentBackground = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      const indentStyle = {
        position: "relative",
        zIndex: 0,
        minBlockSize: "16rem",
        background: "var(--bs-color-surface-1)",
        transformOrigin: "center top",
        transition:
          "transform var(--bs-duration-slow) var(--bs-ease-out), border-radius var(--bs-duration-base) var(--bs-ease-out)",
      };
      const indented = {
        ...indentStyle,
        transform: "scale(0.97) translateY(0.5rem)",
        borderTopLeftRadius: "var(--bs-radius-lg)",
        borderTopRightRadius: "var(--bs-radius-lg)",
      };
      return () =>
        h(Drawer.Stack, () => [
          h(
            "div",
            {
              style: {
                position: "relative",
                overflow: "hidden",
                minBlockSize: "16rem",
                maxWidth: "42rem",
                margin: "0 auto",
                borderRadius: "var(--bs-radius-lg)",
                border: "1px solid var(--bs-color-border)",
                contain: "layout",
              },
            },
            () => [
              h(Drawer.IndentBackground, {
                style: {
                  position: "absolute",
                  inset: 0,
                  background: "var(--bs-color-gray-925)",
                },
              } as any),
              h(
                Drawer.Root,
                {
                  modal: false,
                  open: state.open,
                  onOpenChange: (e: { open: boolean }) => (state.open = e.open),
                },
                () => [
                  h(Drawer.Indent, { style: state.open ? indented : indentStyle } as any, () =>
                    h(
                      "div",
                      {
                        style: {
                          display: "grid",
                          placeItems: "center",
                          minBlockSize: "16rem",
                        },
                      },
                      () => [trigger("Open drawer")],
                    ),
                  ),
                  h(Drawer.Positioner, () =>
                    h(Drawer.Content, () => [
                      h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
                      h(Drawer.Title, () => "Indented page"),
                      h("p", () => "The page behind indents rather than dims."),
                      h(Drawer.CloseTrigger, () => closeGlyph()),
                    ]),
                  ),
                ],
              ),
            ],
          ),
        ]);
    }),
};

/** The drawer opens another drawer — stacked sheets climb the same
 * overlay ladder as stacked dialogs. */
export const Nested = {
  render: () => {
    const state = reactive({ parent: false, child: false });
    return () =>
      h(
        Drawer.Root,
        {
          open: state.parent,
          onOpenChange: (e: { open: boolean }) => (state.parent = e.open),
        },
        () => [
          trigger("Open first"),
          h(Teleport, { to: "body" }, () => [
            h(Drawer.Backdrop),
            h(Drawer.Positioner, () =>
              h(Drawer.Content, () => [
                h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
                h(Drawer.Title, () => "First sheet"),
                h(Drawer.Root, () => [
                  h(Drawer.Trigger, () => "Open second"),
                  h(Teleport, { to: "body" }, () => [
                    h(Drawer.Positioner, () =>
                      h(Drawer.Content, () => [
                        h(Drawer.Grabber, () => h(Drawer.GrabberIndicator)),
                        h(Drawer.Title, () => "Second sheet"),
                        h("p", () => "The upper sheet."),
                        h(Drawer.CloseTrigger, () => closeGlyph()),
                      ]),
                    ),
                  ]),
                ]),
                h(Drawer.CloseTrigger, () => closeGlyph()),
              ]),
            ),
          ]),
        ],
      );
  },
};

/** Two triggers, one sheet — either door opens the same vessel. */
export const MultipleTriggers = {
  render: () =>
    h(Drawer.Root, () => [
      h("div", { style: { display: "flex", gap: "0.75rem" } }, () => [
        h(Drawer.Trigger, { value: "a" }, () => "Open A"),
        h(Drawer.Trigger, { value: "b" }, () => "Open B"),
      ]),
      ...sheet(
        "Shared sheet",
        h("p", () => "Either trigger may summon this sheet."),
      ),
    ]),
};

/** Drag from the sheet's leading edge: a swipe toward `end` puts it
 * away. */
export const SwipeDirection = {
  render: () =>
    h(Drawer.Root, { swipeDirection: "end" } as any, () => [
      trigger("Open side sheet"),
      ...sheet(
        "Side sheet",
        h("p", () => "Swipe right to dismiss."),
      ),
    ]),
};

/** Without a grabber the sheet becomes a plain panel — content may be
 * scrolled instead of dragged. */
export const NonDraggable = {
  render: () =>
    h(Drawer.Root, () => [
      trigger("Open panel"),
      h(Teleport, { to: "body" }, () => [
        h(Drawer.Backdrop),
        h(Drawer.Positioner, () =>
          h(Drawer.Content, () => [
            h(Drawer.Title, () => "Plain panel"),
            h("p", () => "No grabber, no drag — just a quiet vessel."),
            h(Drawer.CloseTrigger, () => closeGlyph()),
          ]),
        ),
      ]),
    ]),
};

/** Long content scrolls inside the sheet; the drag yields to the
 * scroll. */
export const Scrollable = {
  render: () =>
    h(Drawer.Root, () => [
      trigger("Open long sheet"),
      ...sheet(
        "Long sheet",
        h("div", { style: { maxHeight: "50vh", overflowY: "auto", paddingRight: "0.5rem" } }, () =>
          Array.from({ length: 12 }, (_, i) =>
            h("p", { key: i }, `Paragraph ${i + 1} of the scroll.`),
          ),
        ),
      ),
    ]),
};

/** The open state answers to the caller — the sheet only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h(
          Drawer.Root,
          {
            open: state.open,
            onOpenChange: (e: { open: boolean }) => (state.open = e.open),
          },
          () => [
            trigger("Open drawer"),
            ...sheet(
              "Controlled",
              h("p", () => "The page decides."),
            ),
          ],
        );
    }),
};
