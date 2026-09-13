import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AvatarGroup } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Avatar Group" };
export default meta;

/** A demo avatar: sized in `em`, so the group's font-size sets the face. */
function face(label: string, background: string) {
  return h(
    "span",
    {
      "aria-label": label,
      title: label,
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        blockSize: "2em",
        inlineSize: "2em",
        borderRadius: "9999px",
        background,
        color: "var(--bs-color-ink-on-primary, #fff)",
        fontSize: "0.75em",
        letterSpacing: "0.02em",
        userSelect: "none",
      },
    },
    label,
  );
}

/** Avatars overlap one row, each rimmed in the ground so the pile stays
 * legible. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(AvatarGroup as any, () => [
          face("沈", "var(--bs-color-primary)"),
          face("竹", "var(--bs-color-success)"),
          face("丹", "var(--bs-color-danger)"),
          face("青", "var(--bs-color-info)"),
        ]),
    ),
};

/** Size them from the outside: one font-size resizes the whole pile. */
export const Large = {
  render: () =>
    withState(
      () => () =>
        h(AvatarGroup as any, { style: { fontSize: "1.25rem" } }, () => [
          face("林", "var(--bs-color-primary)"),
          face("墨", "var(--bs-color-warning)"),
        ]),
    ),
};
