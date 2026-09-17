import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { ConfigProvider } from ".";
import { Button } from "../button";
import { Card } from "../card";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Elements/Config Provider",
  component: ConfigProvider,
  argTypes: {
    density: { control: "radio", options: ["compact", "default", "comfortable", "spacious"] },
    accent: { control: "radio", options: ["qinghua", "celadon", "zhusha"] },
  },
};
export default meta;
type Story = StoryObj<typeof ConfigProvider>;

/** The same furniture in every tier, so the density step and the
 * pigment read against each other. */
function demo(label: string) {
  return h(Card.Root as any, { style: { inlineSize: "26rem" } }, () => [
    h(Card.Header, () => [
      h(Card.Title, () => label),
      h(
        Card.Description,
        () => "Brush, ink, paper, and the inkstone — the same furniture, retiered.",
      ),
    ]),
    h(Card.Content, () =>
      h("div", { style: { display: "flex", flexWrap: "wrap", gap: "var(--bs-gap-sm)" } }, () => [
        h(Button, () => "Primary"),
        h(Button, { variant: "ghost" }, () => "Secondary"),
      ]),
    ),
  ]);
}

/** Compact controls under the qinghua pigment, set against the page's
 * own defaults — the provider carries both attributes at once. */
export const Basic: Story = {
  args: { density: "compact", accent: "qinghua" },
  render: (args) =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gap: "var(--bs-space-4)", justifyItems: "start" } },
          () => [
            demo("Outside — the page's own density and ink"),
            h(ConfigProvider, args, () =>
              demo("Inside — compact controls under the qinghua accent"),
            ),
          ],
        ),
    ),
};

/** A provider inside a provider: the inner one retiers its own subtree
 * and leaves the outer scope untouched — density and accent are local
 * to the host element and its descendants. */
export const Nested: Story = {
  render: () =>
    withState(
      () => () =>
        h(ConfigProvider, { density: "comfortable" }, () =>
          h(
            "div",
            { style: { display: "grid", gap: "var(--bs-space-4)", justifyItems: "start" } },
            () => [
              demo("Comfortable — the outer provider's tier"),
              h(ConfigProvider, { density: "compact" }, () =>
                demo("Compact — the inner provider, its own scope only"),
              ),
            ],
          ),
        ),
    ),
};
