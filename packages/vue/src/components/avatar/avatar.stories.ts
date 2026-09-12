import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Avatar } from "./index.js";

const meta: Meta = { title: "Components / Avatar" };
export default meta;

/** Initials stand in until the image arrives; the image loads over the
 * fallback in the same circle. */
export const Basic = {
  render: () =>
    h("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" } }, [
      h(Avatar.Root, { key: "image" }, () => [
        h(Avatar.Fallback, () => "S"),
        h(Avatar.Image, {
          src: "https://i.pravatar.cc/144?u=sage",
          alt: "Portrait of Sage",
        }),
      ]),
      h(Avatar.Root, { key: "initials" }, () => h(Avatar.Fallback, () => "BS")),
    ]),
};
