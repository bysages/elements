import { useSplitterContext } from "@ark-ui/vue/splitter";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import { Splitter } from "./index.js";

const meta: Meta = { title: "Components / Splitter" };
export default meta;

const panelStyle = {
  display: "grid",
  placeItems: "center",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
  overflow: "hidden",
};

function divider(id: string, label = "Resize") {
  return h(Splitter.ResizeTrigger, { id, "aria-label": label } as any, () =>
    h(Splitter.ResizeTriggerIndicator),
  );
}

function room(id: string) {
  return h(Splitter.Panel, { id, style: panelStyle }, () => id.toUpperCase());
}

/** Two rooms, one divide: drag the seal thumb to re-partition the
 * paper. */
export const Basic = {
  render: () =>
    h(Splitter.Root, { panels: [{ id: "a" }, { id: "b" }] }, () => [
      room("a"),
      divider("a:b"),
      room("b"),
    ]),
};

/** The left wing folds: drag past its floor and it collapses to a
 * sliver. */
export const Collapsible = {
  render: () =>
    h(
      Splitter.Root,
      {
        defaultSize: [15, 20] as any,
        panels: [
          { id: "a", collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
          { id: "b", minSize: 50 },
        ],
      } as any,
      () => [room("a"), divider("a:b"), room("b")],
    ),
};

/** Three rooms, two divides: the middle wing holds the width. */
export const MultiplePanels = {
  render: () =>
    h(
      Splitter.Root,
      {
        panels: [
          { id: "a", minSize: 20 },
          { id: "b", minSize: 40 },
          { id: "c", minSize: 20 },
        ],
        defaultSize: [20, 60, 20] as any,
      },
      () => [
        h(Splitter.Panel, { id: "a", style: panelStyle }, () => "A"),
        divider("a:b"),
        h(Splitter.Panel, { id: "b", style: panelStyle }, () => "B"),
        divider("b:c"),
        h(Splitter.Panel, { id: "c", style: panelStyle }, () => "C"),
      ],
    ),
};

/** Divides inside divides: the center wing runs its own vertical
 * splitter. */
export const Nested = {
  render: () =>
    h(
      Splitter.Root,
      {
        orientation: "horizontal",
        panels: [{ id: "left" }, { id: "center" }, { id: "right" }],
      } as any,
      () => [
        h(Splitter.Panel, { id: "left", style: panelStyle }, () => "Left"),
        divider("left:center"),
        h(Splitter.Panel, { id: "center" }, () =>
          h(
            Splitter.Root,
            { orientation: "vertical", panels: [{ id: "top" }, { id: "bottom" }] } as any,
            () => [
              h(Splitter.Panel, { id: "top", style: panelStyle }, () => "Top"),
              divider("top:bottom"),
              h(Splitter.Panel, { id: "bottom", style: panelStyle }, () => "Bottom"),
            ],
          ),
        ),
        divider("center:right"),
        h(Splitter.Panel, { id: "right", style: panelStyle }, () => "Right"),
      ],
    ),
};

/** The paper cuts sideways: panels stack and the divide travels
 * vertically. */
export const Vertical = {
  render: () =>
    h(
      Splitter.Root,
      {
        orientation: "vertical",
        panels: [{ id: "a" }, { id: "b" }],
        defaultSize: [50, 50] as any,
      },
      () => [room("a"), divider("a:b"), room("b")],
    ),
};

/** The divide answers to the machine: buttons set exact percentages
 * through the context. */
export const Context = {
  render: () => {
    const Driver = defineComponent({
      name: "SplitterButtons",
      setup() {
        const splitter = useSplitterContext();
        const set = (id: string) => splitter.value.resizePanel(id, 10);
        return () =>
          h(
            "button",
            {
              type: "button",
              onClick: () => set("a"),
              style: {
                border: "1px solid var(--bs-color-border)",
                background: "var(--bs-color-surface-2)",
                borderRadius: "var(--bs-radius-sm)",
                padding: "0.25rem 0.625rem",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
                cursor: "pointer",
              },
            },
            "Set A to 10%",
          );
      },
    });
    return h(Splitter.Root, { panels: [{ id: "a" }, { id: "b" }] }, () => [
      h(Splitter.Panel, { id: "a", style: panelStyle }, () => h(Driver)),
      divider("a:b"),
      h(Splitter.Panel, { id: "b", style: panelStyle }, () => "B"),
    ]);
  },
};
