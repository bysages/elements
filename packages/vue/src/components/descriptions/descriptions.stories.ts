import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Descriptions } from ".";

const meta: Meta = { title: "Components/Data/Descriptions" };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () =>
    h(Descriptions, {
      items: [
        { term: "Paper", detail: "Warm ground" },
        { term: "Ink", detail: "Content first" },
      ],
    }),
};
type Story = StoryObj<typeof Descriptions>;

/** The horizontal ledger: terms down the leading column, details
 * trailing. */
export const Anatomy: Story = {
  render: () => () =>
    h(Descriptions.Root as never, {}, () => [
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Calligrapher"),
        h(Descriptions.Detail, () => "Lin Wanzhi"),
      ]),
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Ink"),
        h(Descriptions.Detail, () => "Qinghua cobalt, first grinding"),
      ]),
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Paper"),
        h(Descriptions.Detail, () => "Jingxian xuan, raw edge"),
      ]),
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Seal"),
        h(Descriptions.Detail, () => "方寸为章 — square-cut, 6 mm"),
      ]),
    ]),
};

/** The vertical ledger stacks each pair — the narrow-measure reading. */
export const Vertical: Story = {
  render: () => () =>
    h(Descriptions.Root as never, { layout: "vertical", style: { maxInlineSize: "16rem" } }, () => [
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Edition"),
        h(Descriptions.Detail, () => "First, two hundred copies"),
      ]),
      h(Descriptions.Item, () => [
        h(Descriptions.Term, () => "Binding"),
        h(Descriptions.Detail, () => "Thread-sewn, wrapped in paper"),
      ]),
    ]),
};

/** The framed register: one hairline round the whole, terms on inset
 * paper, pairs across the grid. */
export const Bordered: Story = {
  render: () => () =>
    h(Descriptions.Root as never, { bordered: true, column: 2 }, () =>
      [
        ["Calligrapher", "Lin Wanzhi"],
        ["Ink", "Qinghua cobalt, first grinding"],
        ["Paper", "Jingxian xuan, raw edge"],
        ["Seal", "方寸为章 — square-cut, 6 mm"],
      ].map(([term, detail]) =>
        h(Descriptions.Item, { key: term }, () => [
          h(Descriptions.Term, () => term),
          h(Descriptions.Detail, () => detail),
        ]),
      ),
    ),
};
