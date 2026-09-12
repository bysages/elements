import { createListCollection } from "@ark-ui/vue/select";
import type { Meta } from "@storybook/vue3-vite";
import { computed, defineComponent, h, Teleport, reactive } from "vue";

import { withState } from "../with-state.js";
import { Select } from "./index.js";

const meta: Meta = { title: "Components / Select" };
export default meta;

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

const cities = createListCollection({
  items: [
    { label: "Suzhou", value: "suzhou", region: "Jiangnan" },
    { label: "Hangzhou", value: "hangzhou", region: "Jiangnan" },
    { label: "Chengdu", value: "chengdu", region: "Shu" },
    { label: "Chongqing", value: "chongqing", region: "Shu" },
  ],
  groupBy: (item: any) => item.region,
});

function chevronsUpDown() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m7 9 5-5 5 5M7 15l5 5 5-5" })],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );
}

function xGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6 6 18" })],
  );
}

function rows(collection: { items: readonly { label: string; value: string }[] }) {
  return collection.items.map((item) =>
    h(Select.Item, { key: item.value, item }, () => [
      h(Select.ItemText, () => item.label),
      h(Select.ItemIndicator, () => checkGlyph()),
    ]),
  );
}

function grouped(collection: any) {
  return (collection.group() as [string, { label: string; value: string }[]][]).map(
    ([region, items]) =>
      h(Select.ItemGroup, { key: region }, () => [
        h(Select.ItemGroupLabel, () => region),
        ...items.map((item) =>
          h(Select.Item, { key: item.value, item }, () => [
            h(Select.ItemText, () => item.label),
            h(Select.ItemIndicator, () => checkGlyph()),
          ]),
        ),
      ]),
  );
}

function shell(rootProps: any, collection: any, content: any) {
  return h(Select.Root, { collection, ...rootProps }, () => [
    h(Select.Label, () => "Framework"),
    h(Select.Control, () => [
      h(Select.Trigger, () => h(Select.ValueText, { placeholder: "Select" })),
      h(Select.ClearTrigger, () => xGlyph()),
      h(Select.Indicator, () => chevronsUpDown()),
    ]),
    h(Teleport, { to: "body" }, () => [
      h(Select.Positioner, () => h(Select.Content, () => content)),
    ]),
    h(Select.HiddenSelect),
  ]);
}

/** The trigger is the whole control; the chosen row carries the flat ink
 * fill inside the vessel. */
export const Basic = {
  render: () =>
    shell({}, frameworks, [
      h(Select.ItemGroup, () => [
        h(Select.ItemGroupLabel, () => "Frameworks"),
        ...rows(frameworks),
      ]),
    ]),
};

/** The selection answers to state — the trigger mirrors the caller. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["vue"] });
      return () =>
        shell(
          {
            modelValue: state.value,
            onValueChange: (e: { value: string[] }) => {
              state.value = e.value;
            },
          },
          frameworks,
          rows(frameworks),
        );
    }),
};

/** The whole field rests: no open, no pick, no highlight. */
export const Disabled = {
  render: () => shell({ disabled: true, defaultValue: ["solid"] }, frameworks, rows(frameworks)),
};

/** Several frameworks at once; every picked row keeps its check. */
export const Multiple = {
  render: () => shell({ multiple: true }, frameworks, rows(frameworks)),
};

/** Past two picks the rest go quiet. */
export const MaxSelected = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["react", "solid"] });
      return () =>
        shell(
          {
            multiple: true,
            modelValue: state.value,
            onValueChange: (e: { value: string[] }) => {
              if (e.value.length <= 2) state.value = e.value;
            },
          },
          frameworks,
          rows(frameworks),
        );
    }),
};

/** Rows ride in their region groups; the group() split drives the labels. */
export const Grouping = {
  render: () =>
    h(Select.Root, { collection: cities } as any, () => [
      h(Select.Label, () => "City"),
      h(Select.Control, () => [
        h(Select.Trigger, () => h(Select.ValueText, { placeholder: "Select" })),
        h(Select.ClearTrigger, () => xGlyph()),
        h(Select.Indicator, () => chevronsUpDown()),
      ]),
      h(Teleport, { to: "body" }, () => [
        h(Select.Positioner, () => h(Select.Content, () => grouped(cities))),
      ]),
      h(Select.HiddenSelect),
    ]),
};

/** A long list scrolls inside the vessel; the field never grows. */
export const Overflow = {
  render: () =>
    h(Select.Root, { collection: cities, multiple: true } as any, () => [
      h(Select.Label, () => "City"),
      h(Select.Control, () => [
        h(Select.Trigger, () => h(Select.ValueText, { placeholder: "Select" })),
        h(Select.ClearTrigger, () => xGlyph()),
        h(Select.Indicator, () => chevronsUpDown()),
      ]),
      h(Teleport, { to: "body" }, () => [
        h(Select.Positioner, () =>
          h(
            Select.Content,
            { style: { maxBlockHeight: "8rem", overflowY: "auto" } } as any,
            rows(cities),
          ),
        ),
      ]),
      h(Select.HiddenSelect),
    ]),
};

/** The popup mounts only on first open and leaves on exit — nothing of the
 * vessel rests in the page. */
export const LazyMount = {
  render: () => shell({ lazyMount: true, unmountOnExit: true }, frameworks, rows(frameworks)),
};

/** The collection itself answers to state: a toggle swaps the rows. */
export const DynamicItems = {
  render: () => {
    const DynamicSelect = defineComponent({
      name: "DynamicSelect",
      setup() {
        const state = reactive({ small: false });
        const collection = computed(() =>
          state.small
            ? createListCollection({ items: [{ label: "Vue", value: "vue" }] })
            : frameworks,
        );
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
            h(
              "button",
              {
                type: "button",
                onClick: () => (state.small = !state.small),
                style: {
                  justifySelf: "start",
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.5rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                },
              },
              "Toggle items",
            ),
            shell({}, collection.value, rows(collection.value)),
          ]);
      },
    });
    return h(DynamicSelect);
  },
};
