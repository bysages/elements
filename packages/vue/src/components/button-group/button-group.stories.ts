import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ButtonGroup } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Button Group" };
export default meta;

function chevronDown() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

function chevronUp() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m6 14 6-6 6 6" })],
  );
}

/** Variants keep their own registers inside the group: solid speaks,
 * outline draws, ghost floats — the seam reads across all three. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(ButtonGroup, () => [
          h(Button, { variant: "solid" }, () => "Save"),
          h(Button, { variant: "outline" }, () => "Save as"),
          h(Button, { variant: "ghost" }, () => "Discard"),
        ]),
    ),
};

/** Text and icon-only buttons share the seam; the icon-only members
 * square to the control height and carry accessible names. */
export const WithIconButtons = {
  render: () =>
    withState(
      () => () =>
        h(ButtonGroup, () => [
          h(Button, { variant: "outline" }, () => "Layers"),
          h(Button, { variant: "outline", square: true, "aria-label": "Move up" }, chevronUp),
          h(Button, { variant: "outline", square: true, "aria-label": "Move down" }, chevronDown),
        ]),
    ),
};

/** One register for every member: the group's size retunes the
 * buttons' heights. */
export const GroupSize = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "1.5rem", alignItems: "center" } }, [
          h(ButtonGroup, { size: "sm" }, () =>
            ["Left", "Center", "Right"].map((label) => h(Button, { key: label }, () => label)),
          ),
          h(ButtonGroup, () => [
            h(Button, {}, () => "Left"),
            h(Button, {}, () => "Center"),
            h(Button, {}, () => "Right"),
          ]),
          h(ButtonGroup, { size: "lg" }, () =>
            ["Left", "Center", "Right"].map((label) => h(Button, { key: label }, () => label)),
          ),
        ]),
    ),
};

/** Down a column: the seam runs block-wise, members fill to the
 * widest, and the corner trim turns with the orientation. */
export const Vertical = {
  render: () =>
    withState(
      () => () =>
        h(ButtonGroup, { orientation: "vertical" }, () => [
          h(Button, { variant: "outline" }, () => "Align left"),
          h(Button, { variant: "outline" }, () => "Align center"),
          h(Button, { variant: "outline" }, () => "Align right"),
        ]),
    ),
};
