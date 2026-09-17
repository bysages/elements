import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { FloatButton } from ".";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Float Button" };
export default meta;

function glyph(d: string) {
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
    [h("path", { d })],
  );
}

const plus = "M12 5v14m-7-7h14";
const compose = "M12 20h9m-1.5-12.5a2.1 2.1 0 0 0-3-3L4 17v3h3Z";
const share = "M12 3v12m0-12 4 4m-4-4-4 4m-4 8v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3";
const trash = "M4 7h16m-9-4h2m-6 4 1 13h8l1-13m-7 4v6m4-6v6";

/** The moored trigger fans out its actions; each name surfaces beside
 * its button, and clicking one reports through `click`. */
export const Basic = {
  render: () =>
    withState(() => {
      const status = ref("Nothing chosen yet.");
      return () => [
        h(FloatButton, null, () => [
          h(FloatButton.Trigger, { label: "Actions" }, () => glyph(plus)),
          h(FloatButton.Item, { label: "Compose", onClick: () => (status.value = "Compose") }, () =>
            glyph(compose),
          ),
          h(FloatButton.Item, { label: "Share", onClick: () => (status.value = "Share") }, () =>
            glyph(share),
          ),
          h(FloatButton.Item, { label: "Delete", onClick: () => (status.value = "Delete") }, () =>
            glyph(trash),
          ),
        ]),
        h(
          "p",
          {
            role: "status",
            style:
              "margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          () => status.value,
        ),
      ];
    }),
};

/** Controlled: an outside hand drives the group; the Trigger reports
 * its own flips back through `update:open`. */
export const ControlledOpen = {
  render: () =>
    withState(() => {
      const open = ref(false);
      const status = ref("Nothing chosen yet.");
      return () => [
        h(Button, { variant: "outline", onClick: () => (open.value = !open.value) }, () =>
          open.value ? "Fold the group" : "Unfold the group",
        ),
        h(
          "p",
          {
            role: "status",
            style:
              "margin: var(--bs-space-4) 0; font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          () => status.value,
        ),
        h(
          FloatButton,
          {
            open: open.value,
            "onUpdate:open": (value: boolean) => (open.value = value),
            placement: "bottom-start",
          },
          () => [
            h(FloatButton.Trigger, { label: "Actions" }, () => glyph(plus)),
            h(
              FloatButton.Item,
              {
                label: "Compose",
                onClick: () => {
                  status.value = "Compose";
                  open.value = false;
                },
              },
              () => glyph(compose),
            ),
          ],
        ),
      ];
    }),
};
