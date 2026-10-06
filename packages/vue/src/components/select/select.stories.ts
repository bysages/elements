import { createListCollection } from "@ark-ui/vue/select";
import type { Meta } from "@storybook/vue3-vite";
import { computed, defineComponent, h, reactive } from "vue";

import { Select } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";
import { NativeSelect } from "./native";

const meta: Meta = { title: "Components/Forms/Select" };
export default meta;

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

const facadeOptions = [...frameworks.items];

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

function checkIcon() {
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

function xIcon() {
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
      h(Select.ItemIndicator, () => checkIcon()),
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
            h(Select.ItemIndicator, () => checkIcon()),
          ]),
        ),
      ]),
  );
}

function shell(rootProps: any, collection: any, content: any, placeholder = "Select") {
  return h(Select.Root, { collection, ...rootProps }, () => [
    h(Select.Label, () => "Framework"),
    h(Select.Control, () => [
      h(Select.Trigger, () => h(Select.ValueText, { placeholder })),
      h(Select.ClearTrigger, () => xIcon()),
      h(Select.Indicator, () => chevronsUpDown()),
    ]),
    h(Select.Positioner, () => h(Select.Content, () => content)),
    h(Select.HiddenSelect),
  ]);
}

/** The facade is the one-tag path; the args proxy must be read inside the
 * host's render so Controls edits stay live. */
export const Basic = {
  args: {
    placeholder: "Select",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Select, {
          options: facadeOptions,
          label: "Framework",
          groupLabel: "Frameworks",
          placeholder: args.placeholder,
        }),
    ),
};

/** The anatomy is the composition path: the same vessel, assembled from
 * Ark's parts when the caller needs full control. */
export const Anatomy = {
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
        h(Select.ClearTrigger, () => xIcon()),
        h(Select.Indicator, () => chevronsUpDown()),
      ]),
      h(Select.Positioner, () => h(Select.Content, () => grouped(cities))),
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
        h(Select.ClearTrigger, () => xIcon()),
        h(Select.Indicator, () => chevronsUpDown()),
      ]),
      h(Select.Positioner, () =>
        h(Select.Content, { style: { maxBlockHeight: "8rem", overflowY: "auto" } } as any, () =>
          rows(cities),
        ),
      ),
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
              Button,
              {
                size: "sm",
                onClick: () => (state.small = !state.small),
                style: { justifySelf: "start" },
              },
              () => "Toggle items",
            ),
            shell({}, collection.value, rows(collection.value)),
          ]);
      },
    });
    return h(DynamicSelect);
  },
};

/** The platform's own list wearing the control recipe: one native
 * element, the trigger vocabulary unchanged. */
export const Native = {
  render: () => {
    const NativeHost = defineComponent({
      name: "NativeSelectHost",
      setup() {
        const state = reactive({ value: "" });
        const options = [
          { label: "React", value: "react" },
          { label: "Solid", value: "solid" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
        ];
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
            h(NativeSelect, {
              options,
              modelValue: state.value,
              placeholder: "Choose a framework",
              "aria-label": "Framework",
              "onUpdate:modelValue": (next: string) => (state.value = next),
            }),
            h(NativeSelect, {
              options,
              modelValue: "vue",
              size: "sm",
              "aria-label": "Framework, small",
              "onUpdate:modelValue": () => {},
            }),
            h(NativeSelect, {
              options,
              modelValue: "solid",
              size: "lg",
              invalid: true,
              "aria-label": "Framework, large",
              "onUpdate:modelValue": () => {},
            }),
          ]);
      },
    });
    return h(NativeHost);
  },
};

/** The facade is the one-tag path: scalar and list models are translated
 * at the boundary while the same anatomy underneath does the work. */
export const Facade = {
  render: () => {
    const state = reactive({ value: "vue", values: ["react"] });
    const options = [
      { label: "React", value: "react" },
      { label: "Solid", value: "solid" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ];
    return () =>
      h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
        h(Select, {
          options,
          modelValue: state.value,
          label: "Framework",
          "onUpdate:modelValue": (next: string) => (state.value = next),
        }),
        h(Select, {
          options,
          modelValue: state.values,
          multiple: true,
          placeholder: "Frameworks",
          size: "sm",
          "onUpdate:modelValue": (next: string[]) => (state.values = next),
        }),
      ]);
  },
};
