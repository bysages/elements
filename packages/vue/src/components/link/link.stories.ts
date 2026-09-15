import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Link } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Navigation/Link" };
export default meta;
type Story = StoryObj<typeof Link>;

/** The three underline settings, resting in a line of prose. */
export const Underlines: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-3)", maxWidth: "28rem" } }, [
          h("p", { style: { margin: 0, color: "var(--bs-color-text-secondary)" } }, [
            "The catalogue ",
            h(Link as any, { href: "#", underline: "always" }, () => "always underlines"),
            " — a quiet rail under the ink.",
          ]),
          h("p", { style: { margin: 0, color: "var(--bs-color-text-secondary)" } }, [
            "The default ",
            h(Link as any, { href: "#" }, () => "underlines on hover"),
            " — rest keeps the page still.",
          ]),
          h("p", { style: { margin: 0, color: "var(--bs-color-text-secondary)" } }, [
            "And ",
            h(Link as any, { href: "#", underline: "none" }, () => "some links never underline"),
            " — the pigment alone carries them.",
          ]),
        ]),
    ),
};
