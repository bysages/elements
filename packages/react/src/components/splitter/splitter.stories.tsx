import { useSplitterContext } from "@ark-ui/react/splitter";
import type { Meta } from "@storybook/react-vite";

import { Splitter } from ".";

const meta: Meta = { title: "Components/Layout/Splitter" };
export default meta;

const PANEL_STYLE = {
  display: "grid",
  placeItems: "center",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
  overflow: "hidden",
};

function divider(id: `${string}:${string}` | `${string}:` | `:${string}`, label = "Resize") {
  return (
    <Splitter.ResizeTrigger id={id} aria-label={label}>
      <Splitter.ResizeTriggerIndicator />
    </Splitter.ResizeTrigger>
  );
}

function room(id: string) {
  return (
    <Splitter.Panel id={id} style={PANEL_STYLE}>
      {id.toUpperCase()}
    </Splitter.Panel>
  );
}

/** Two rooms, one divide: drag the seal thumb to re-partition the
 * paper. */
export const Basic = {
  render: () => (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      {room("a")}
      {divider("a:b")}
      {room("b")}
    </Splitter.Root>
  ),
};

/** The left wing folds: drag past its floor and it collapses to a
 * sliver. */
export const Collapsible = {
  render: () => (
    <Splitter.Root
      panels={[
        { id: "a", collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
        { id: "b", minSize: 50 },
      ]}
      defaultSize={[15, 20]}
    >
      {room("a")}
      {divider("a:b")}
      {room("b")}
    </Splitter.Root>
  ),
};

/** Three rooms, two divides: the middle wing holds the width. */
export const MultiplePanels = {
  render: () => (
    <Splitter.Root
      panels={[
        { id: "a", minSize: 20 },
        { id: "b", minSize: 40 },
        { id: "c", minSize: 20 },
      ]}
      defaultSize={[20, 60, 20]}
    >
      <Splitter.Panel id="a" style={PANEL_STYLE}>
        A
      </Splitter.Panel>
      {divider("a:b")}
      <Splitter.Panel id="b" style={PANEL_STYLE}>
        B
      </Splitter.Panel>
      {divider("b:c")}
      <Splitter.Panel id="c" style={PANEL_STYLE}>
        C
      </Splitter.Panel>
    </Splitter.Root>
  ),
};

/** Divides inside divides: the center wing runs its own vertical
 * splitter. */
export const Nested = {
  render: () => (
    <Splitter.Root
      orientation="horizontal"
      panels={[{ id: "left" }, { id: "center" }, { id: "right" }]}
    >
      <Splitter.Panel id="left" style={PANEL_STYLE}>
        Left
      </Splitter.Panel>
      {divider("left:center")}
      <Splitter.Panel id="center">
        <Splitter.Root orientation="vertical" panels={[{ id: "top" }, { id: "bottom" }]}>
          <Splitter.Panel id="top" style={PANEL_STYLE}>
            Top
          </Splitter.Panel>
          {divider("top:bottom")}
          <Splitter.Panel id="bottom" style={PANEL_STYLE}>
            Bottom
          </Splitter.Panel>
        </Splitter.Root>
      </Splitter.Panel>
      {divider("center:right")}
      <Splitter.Panel id="right" style={PANEL_STYLE}>
        Right
      </Splitter.Panel>
    </Splitter.Root>
  ),
};

/** The paper cuts sideways: panels stack and the divide travels
 * vertically. */
export const Vertical = {
  render: () => (
    <Splitter.Root
      orientation="vertical"
      panels={[{ id: "a" }, { id: "b" }]}
      defaultSize={[50, 50]}
    >
      {room("a")}
      {divider("a:b")}
      {room("b")}
    </Splitter.Root>
  ),
};

const BUTTON_STYLE = {
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  borderRadius: "var(--bs-radius-sm)",
  padding: "0.25rem 0.625rem",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
  cursor: "pointer",
};

/** The divide answers to the machine: buttons set exact percentages
 * through the context. */
function ResizeDriver() {
  const splitter = useSplitterContext();
  return (
    <button type="button" onClick={() => splitter.resizePanel("a", 10)} style={BUTTON_STYLE}>
      Set A to 10%
    </button>
  );
}

export const Context = {
  render: () => (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel id="a" style={PANEL_STYLE}>
        <ResizeDriver />
      </Splitter.Panel>
      {divider("a:b")}
      <Splitter.Panel id="b" style={PANEL_STYLE}>
        B
      </Splitter.Panel>
    </Splitter.Root>
  ),
};
