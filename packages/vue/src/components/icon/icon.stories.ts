import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Icon } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Elements/Icon",
  component: Icon,
  argTypes: {
    size: { control: "radio", options: ["inherit", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

/** A fresh glyph per render — a shared vnode would be mounted twice. */
const drop = () =>
  h("svg", { viewBox: "0 0 24 24" }, [
    h("path", {
      d: "M12 2.5c3.5 4.4 6.5 8.2 6.5 11.4a6.5 6.5 0 1 1-13 0C5.5 10.7 8.5 6.9 12 2.5Z",
    }),
  ]);

/** A named icon rides a sentence: one em of the surrounding type, the
 * text's own ink, and an accessible name through `label`. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h("p", { style: { margin: "0" } }, [
          "The stroke falls where the light leaves it ",
          h(Icon, { label: "Ink drop" }, drop),
          " and the line goes on.",
        ]),
    ),
};

/** The size steps follow the surrounding font size — same text, same
 * glyphs, three measures. */
export const Sizes: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "p",
          {
            style: { margin: "0", display: "flex", alignItems: "center", gap: "var(--bs-space-4)" },
          },
          [
            h(Icon, { size: "sm", label: "Small drop" }, drop),
            h(Icon, { size: "md", label: "Medium drop" }, drop),
            h(Icon, { size: "lg", label: "Large drop" }, drop),
          ],
        ),
    ),
};

/** `inherit` takes its measure from the type it sits in — here the
 * serif voice at heading size. */
export const InText: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "h2",
          {
            style: {
              margin: "0",
              fontFamily: "var(--bs-font-serif)",
              fontSize: "var(--bs-font-size-xl)",
            },
          },
          [
            "Moonlight fills the vessel ",
            h(Icon, { label: "Ink drop" }, drop),
            " and the page keeps still.",
          ],
        ),
    ),
};
