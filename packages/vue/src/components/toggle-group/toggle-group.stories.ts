import { useToggleGroup } from "@ark-ui/vue/toggle-group";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { ToggleGroup } from "./index.js";

const meta: Meta = { title: "Components / Toggle Group" };
export default meta;

const strokeAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": true,
} as const;

const alignPaths: Record<string, string> = {
  left: "M4 4v16M9 8h10M9 12h12M9 16h7",
  center: "M12 4v16M7 8h10M4 12h16M8 16h8",
  right: "M20 4v16M5 8h10M3 12h12M8 16h7",
  justify: "M4 6h16M4 12h16M4 18h16",
};

const textPaths: Record<string, string> = {
  bold: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 4v6a6 6 0 0 0 12 0V4M4 20h16",
};

const icon = (d: string) => h("svg", strokeAttrs, () => [h("path", { d })]);

function alignItem(align: string) {
  return h(ToggleGroup.Item, { key: align, value: align, "aria-label": `Align ${align}` }, () =>
    icon(alignPaths[align]),
  );
}

/** The alignment bench: one seal pressed at rest, the others waiting. */
export const Basic = {
  args: {
    orientation: "horizontal",
    label: "Text alignment",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(
          ToggleGroup.Root,
          {
            defaultValue: ["left"],
            orientation: args.orientation,
            "aria-label": args.label,
          },
          () => Object.keys(alignPaths).map(alignItem),
        ),
    ),
};

/** The presses answer to the caller — the group only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["left"] as string[] });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `value: ${state.value.join(", ") || "none"}`,
          ),
          h(
            ToggleGroup.Root,
            {
              modelValue: state.value,
              onValueChange: (e: { value: string[] }) => (state.value = e.value),
              "aria-label": "Text alignment",
            } as any,
            () => Object.keys(alignPaths).map(alignItem),
          ),
        ]);
    }),
};

/** Several truths at once: bold, italic and underline hold independently. */
export const Multiple = {
  render: () =>
    h(
      ToggleGroup.Root,
      { defaultValue: ["bold"], multiple: true, "aria-label": "Text style" },
      () =>
        Object.keys(textPaths).map((value) =>
          h(ToggleGroup.Item, { key: value, value, "aria-label": value }, () =>
            icon(textPaths[value]),
          ),
        ),
    ),
};

/** One seal sealed shut: italic refuses, bold and underline keep working. */
export const Disabled = {
  render: () =>
    h(
      ToggleGroup.Root,
      { defaultValue: ["bold"], multiple: true, "aria-label": "Text style" },
      () =>
        Object.keys(textPaths).map((value) =>
          h(
            ToggleGroup.Item,
            { key: value, value, "aria-label": value, disabled: value === "italic" },
            () => icon(textPaths[value]),
          ),
        ),
    ),
};

/** The machine answers outside its anatomy: the provider owns the bench. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "ToggleGroupRootProvider",
      setup() {
        const toggleGroup = useToggleGroup({ defaultValue: ["left"] });
        return () => [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `value: ${toggleGroup.value.value.join(", ") || "none"}`,
          ),
          h(ToggleGroup.RootProvider as any, { value: toggleGroup.value }, () =>
            Object.keys(alignPaths).map(alignItem),
          ),
        ];
      },
    };
    return () => h(Driver);
  },
};
