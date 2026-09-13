import { useScrollArea } from "@ark-ui/vue/scroll-area";
import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ScrollArea } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Scroll Area" };
export default meta;

const paragraph =
  "Whitespace is not emptiness but breath. The paper carries the ink and the " +
  "light decides the hierarchy; the scrollbar is a faint crease on the page, " +
  "hidden while silent, summoned by the fingertip.";

const prose = (count = 3) => Array.from({ length: count }, (_, i) => h("p", { key: i }, paragraph));

const ROOT_STYLE = { height: "12rem", maxWidth: "28rem" };

function area(
  extraProps: Record<string, any> = {},
  content: any,
  orientations: Array<"vertical" | "horizontal"> = ["vertical"],
) {
  return h(ScrollArea.Root, extraProps, () => [
    h(ScrollArea.Viewport, () => h(ScrollArea.Content, () => content)),
    ...orientations.map((orientation) =>
      h(ScrollArea.Scrollbar, { key: orientation, orientation }, () => h(ScrollArea.Thumb)),
    ),
    h(ScrollArea.Corner),
  ]);
}

/** The hairline vessel with ink lanes: scrollbars stay hidden until hover
 * or scroll summons them. */
export const Basic = {
  args: {
    orientation: "vertical",
  },
  render: (args: any) =>
    withState(
      () => () => h("div", { style: ROOT_STYLE }, [area({}, prose(3), [args.orientation])]),
    ),
};

/** The page runs both ways: two creases, one per direction. */
export const BothDirections = {
  render: () =>
    h("div", { style: ROOT_STYLE }, [
      area(
        {},
        [
          h("p", { style: { width: "50vw" } }, paragraph),
          h("p", { style: { width: "50vw" } }, paragraph),
          h("p", { style: { width: "50vw" } }, paragraph),
        ],
        ["vertical", "horizontal"],
      ),
    ]),
};

/** A wide lane reads sideways: only the horizontal crease. */
export const Horizontal = {
  render: () =>
    h("div", { style: { maxWidth: "28rem" } }, [
      area({}, h("p", { style: { width: "50vw" } }, paragraph), ["horizontal"]),
    ]),
};

/** A page within the page: the inner area scrolls on its own crease. */
export const Nested = {
  render: () =>
    h("div", { style: ROOT_STYLE }, [
      area({}, [
        h("p", () => paragraph),
        h("div", { style: { height: "8rem", width: "100%" } }, [
          area(
            {},
            h("p", () => "This is a nested scroll area. " + paragraph),
          ),
        ]),
      ]),
    ]),
};

/** The machine answers outside its anatomy: buttons walk the page through
 * the provider. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "ScrollAreaRootProvider",
      setup() {
        const scrollArea = useScrollArea();
        const edge = (edge: "top" | "bottom") => () => scrollArea.value.scrollToEdge({ edge });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem" } }, [
            h("div", { style: { display: "flex", gap: "0.5rem" } }, [
              h(
                "button",
                {
                  onClick: edge("top"),
                  style: {
                    padding: "0.375rem 0.75rem",
                    border: "1px solid var(--bs-color-border)",
                    borderRadius: "var(--bs-radius-sm)",
                    background: "var(--bs-color-surface-2)",
                    font: "inherit",
                    fontSize: "var(--bs-font-size-sm)",
                  },
                },
                "Scroll to Top",
              ),
              h(
                "button",
                {
                  onClick: edge("bottom"),
                  style: {
                    padding: "0.375rem 0.75rem",
                    border: "1px solid var(--bs-color-border)",
                    borderRadius: "var(--bs-radius-sm)",
                    background: "var(--bs-color-surface-2)",
                    font: "inherit",
                    fontSize: "var(--bs-font-size-sm)",
                  },
                },
                "Scroll to Bottom",
              ),
            ]),
            h("div", { style: ROOT_STYLE }, [
              h(ScrollArea.RootProvider as any, { value: scrollArea.value }, () => [
                h(ScrollArea.Viewport, () => h(ScrollArea.Content, () => prose(5))),
                h(ScrollArea.Scrollbar, () => h(ScrollArea.Thumb)),
                h(ScrollArea.Corner),
              ]),
            ]),
          ]);
      },
    };
    return () => h(Driver);
  },
};
