import { useScrollArea } from "@ark-ui/react/scroll-area";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { ScrollArea } from ".";

const meta: Meta = { title: "Components/Layout/Scroll Area" };
export default meta;

const PARAGRAPH =
  "Whitespace is not emptiness but breath. The paper carries the ink and the " +
  "light decides the hierarchy; the scrollbar is a faint crease on the page, " +
  "hidden while silent, summoned by the fingertip.";

const ROOT_STYLE = { height: "12rem", maxWidth: "28rem" };

function prose(count = 3) {
  return Array.from({ length: count }, (_, i) => <p key={i}>{PARAGRAPH}</p>);
}

function area(
  extraProps: Record<string, any> = {},
  content: ReactNode,
  orientations: Array<"vertical" | "horizontal"> = ["vertical"],
) {
  return (
    <ScrollArea.Root {...extraProps}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>{content}</ScrollArea.Content>
      </ScrollArea.Viewport>
      {orientations.map((orientation) => (
        <ScrollArea.Scrollbar key={orientation} orientation={orientation}>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      ))}
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

/** The hairline vessel with ink lanes: scrollbars stay hidden until hover
 * or scroll summons them. */
export const Basic = {
  args: {
    orientation: "vertical",
  },
  render: (args: any) => <div style={ROOT_STYLE}>{area({}, prose(3), [args.orientation])}</div>,
};

/** The page runs both ways: two creases, one per direction. */
export const BothDirections = {
  render: () => (
    <div style={ROOT_STYLE}>
      {area(
        {},
        [
          <p key="0" style={{ width: "50vw" }}>
            {PARAGRAPH}
          </p>,
          <p key="1" style={{ width: "50vw" }}>
            {PARAGRAPH}
          </p>,
          <p key="2" style={{ width: "50vw" }}>
            {PARAGRAPH}
          </p>,
        ],
        ["vertical", "horizontal"],
      )}
    </div>
  ),
};

/** A wide lane reads sideways: only the horizontal crease. */
export const Horizontal = {
  render: () => (
    <div style={{ maxWidth: "28rem" }}>
      {area({}, <p style={{ width: "50vw" }}>{PARAGRAPH}</p>, ["horizontal"])}
    </div>
  ),
};

/** A page within the page: the inner area scrolls on its own crease. */
export const Nested = {
  render: () => (
    <div style={ROOT_STYLE}>
      {area({}, [
        <p key="p">{PARAGRAPH}</p>,
        <div key="n" style={{ height: "8rem", width: "100%" }}>
          {area({}, <p>This is a nested scroll area. {PARAGRAPH}</p>)}
        </div>,
      ])}
    </div>
  ),
};

const BUTTON_STYLE = {
  padding: "0.375rem 0.75rem",
  border: "1px solid var(--bs-color-border)",
  borderRadius: "var(--bs-radius-sm)",
  background: "var(--bs-color-surface-2)",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
};

/** The machine answers outside its anatomy: buttons walk the page through
 * the provider. */
function RootProviderDriver() {
  const scrollArea = useScrollArea();
  const edge = (edge: "top" | "bottom") => () => scrollArea.scrollToEdge({ edge });
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={edge("top")} style={BUTTON_STYLE}>
          Scroll to Top
        </button>
        <button type="button" onClick={edge("bottom")} style={BUTTON_STYLE}>
          Scroll to Bottom
        </button>
      </div>
      <div style={ROOT_STYLE}>
        <ScrollArea.RootProvider value={scrollArea}>
          <ScrollArea.Viewport>
            <ScrollArea.Content>{prose(5)}</ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.RootProvider>
      </div>
    </div>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
