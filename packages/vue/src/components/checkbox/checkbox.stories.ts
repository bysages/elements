import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Checkbox } from "./index.js";

const meta: Meta = { title: "Components / Checkbox" };
export default meta;

function checkGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 5 5L19 7" })],
  );
}

function minusGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "M6 12h12" })],
  );
}

function box(checked: boolean | "indeterminate", label: string, disabled = false) {
  return h(Checkbox.Root, { checked, disabled } as any, () => [
    h(Checkbox.Control, () =>
      h(Checkbox.Indicator, { indeterminate: minusGlyph() } as any, () => checkGlyph()),
    ),
    h(Checkbox.Label, () => label),
    h(Checkbox.HiddenInput),
  ]);
}

/** The three resting postures: checked, unchecked, and a disabled row. */
export const Basic = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
      box(true, "Ship the register"),
      box(false, "Outline the story"),
      box(false, "Archived", true),
    ]),
};

/** The state answers to the caller: the box only mirrors. */
export const Controlled = {
  render: () => {
    const state = reactive({ checked: true });
    return h(
      Checkbox.Root,
      {
        checked: state.checked,
        onCheckedChange: (e: { checked: boolean }) => {
          state.checked = !!e.checked;
        },
      } as any,
      () => [
        h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
        h(Checkbox.Label, () => "Controlled"),
        h(Checkbox.HiddenInput),
      ],
    );
  },
};

/** The dash posture: some, not all, of the rows below are checked. */
export const Indeterminate = {
  render: () =>
    h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
      box("indeterminate" as const, "All chapters"),
      box(true, "Part one"),
      box(false, "Part two"),
    ]),
};

/** Under a form name the accepted value rides the hidden input. */
export const WithForm = {
  render: () =>
    h(
      "form",
      {
        onSubmit: (e: Event) => e.preventDefault(),
        style: { display: "grid", gap: "0.75rem", "max-width": "20rem" },
      },
      [
        h(Checkbox.Root, { name: "terms", value: "accepted" }, () => [
          h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
          h(Checkbox.Label, () => "Accept the terms"),
          h(Checkbox.HiddenInput),
        ]),
        h("button", { type: "submit" }, "Submit"),
      ],
    ),
};

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
];

function groupRow(item: { label: string; value: string }) {
  return h(Checkbox.Root, { value: item.value }, () => [
    h(Checkbox.Control, () => h(Checkbox.Indicator, () => checkGlyph())),
    h(Checkbox.Label, () => item.label),
    h(Checkbox.HiddenInput),
  ]);
}

/** One group, one form name: rows join and leave the submitted value. */
export const Group = {
  render: () =>
    h(Checkbox.Group, { name: "framework", defaultValue: ["react"] } as any, () =>
      frameworks.map(groupRow),
    ),
};

/** The parent row summarizes its children: checked when all, dashed when
 * some, and its click sweeps the whole group. */
export const GroupWithSelectAll = {
  render: () => {
    const state = reactive({ value: ["react"] });
    const all = state.value.length === frameworks.length;
    const some = state.value.length > 0 && !all;
    return h("div", { style: { display: "grid", gap: "0.75rem", "max-width": "20rem" } }, [
      h(
        Checkbox.Root,
        {
          checked: some ? "indeterminate" : all,
          onCheckedChange: (e: { checked: boolean }) => {
            state.value = e.checked ? frameworks.map((f) => f.value) : [];
          },
        } as any,
        () => [
          h(Checkbox.Control, () =>
            h(Checkbox.Indicator, { indeterminate: minusGlyph() } as any, () => checkGlyph()),
          ),
          h(Checkbox.Label, () => "All frameworks"),
          h(Checkbox.HiddenInput),
        ],
      ),
      h(
        Checkbox.Group,
        { value: state.value, onValueChange: (e: any) => (state.value = e.value) } as any,
        () => frameworks.map(groupRow),
      ),
    ]);
  },
};

/** Past two picks the group refuses a third. */
export const GroupWithMaxSelected = {
  render: () =>
    h(Checkbox.Group, { name: "framework", maxSelectedValues: 2 } as any, () =>
      frameworks.map(groupRow),
    ),
};

/** The invalid group bleeds cinnabar onto every row. */
export const GroupWithInvalid = {
  render: () =>
    h(Checkbox.Group, { name: "framework", invalid: true } as any, () => frameworks.map(groupRow)),
};
