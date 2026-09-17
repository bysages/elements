import type { Meta } from "@storybook/react-vite";

import { Descriptions } from ".";

const meta: Meta = { title: "Components/Data/Descriptions" };
export default meta;

/** The horizontal ledger: terms down the leading column, details
 * trailing. */
export const Basic = {
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
