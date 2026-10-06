import type { Meta } from "@storybook/react-vite";

import { Descriptions } from ".";

const facts = [
  { term: "Paper", detail: "Warm ground" },
  { term: "Ink", detail: "Content first" },
];

const meta: Meta = { title: "Components/Data/Descriptions" };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => <Descriptions items={facts} />,
};
/** The horizontal ledger: terms down the leading column, details
 * trailing. */
export const Anatomy = {
  render: () => (
    <Descriptions.Root>
      <Descriptions.Item>
        <Descriptions.Term>Calligrapher</Descriptions.Term>
        <Descriptions.Detail>Lin Wanzhi</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Ink</Descriptions.Term>
        <Descriptions.Detail>Qinghua cobalt, first grinding</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Paper</Descriptions.Term>
        <Descriptions.Detail>Jingxian xuan, raw edge</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Seal</Descriptions.Term>
        <Descriptions.Detail>方寸为章 — square-cut, 6 mm</Descriptions.Detail>
      </Descriptions.Item>
    </Descriptions.Root>
  ),
};

/** The vertical ledger stacks each pair — the narrow-measure reading. */
export const Vertical = {
  render: () => (
    <Descriptions.Root layout="vertical" style={{ maxWidth: "16rem" }}>
      <Descriptions.Item>
        <Descriptions.Term>Edition</Descriptions.Term>
        <Descriptions.Detail>First, two hundred copies</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Binding</Descriptions.Term>
        <Descriptions.Detail>Thread-sewn, wrapped in paper</Descriptions.Detail>
      </Descriptions.Item>
    </Descriptions.Root>
  ),
};

/** The framed register: one hairline round the whole, terms on inset
 * paper, pairs across the grid. */
export const Bordered = {
  render: () => (
    <Descriptions.Root bordered column={2}>
      {[
        ["Calligrapher", "Lin Wanzhi"],
        ["Ink", "Qinghua cobalt, first grinding"],
        ["Paper", "Jingxian xuan, raw edge"],
        ["Seal", "方寸为章 — square-cut, 6 mm"],
      ].map(([term, detail]) => (
        <Descriptions.Item key={term}>
          <Descriptions.Term>{term}</Descriptions.Term>
          <Descriptions.Detail>{detail}</Descriptions.Detail>
        </Descriptions.Item>
      ))}
    </Descriptions.Root>
  ),
};
