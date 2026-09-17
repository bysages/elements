import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { TreeSelect, type TreeSelectNode } from ".";

const meta: Meta = { title: "Components/Forms/Tree Select" };
export default meta;

const REGIONS: TreeSelectNode[] = [
  {
    label: "Jiangnan",
    value: "jiangnan",
    children: [
      { label: "Jiangsu", value: "jiangsu" },
      {
        label: "Zhejiang",
        value: "zhejiang",
        children: [
          { label: "Hangzhou", value: "hangzhou" },
          { label: "Shaoxing", value: "shaoxing" },
        ],
      },
    ],
  },
  {
    label: "Lingnan",
    value: "lingnan",
    children: [
      { label: "Guangdong", value: "guangdong" },
      { label: "Guangxi", value: "guangxi" },
    ],
  },
  { label: "Beyond the passes", value: "caiwai" },
];

/** One leaf click closes the vessel and lands the value. */
export const Basic = {
  render: () => {
    const [picked, setPicked] = useState("");
    return (
      <>
        <TreeSelect
          value={picked}
          onValueChange={setPicked}
          data={REGIONS}
          placeholder="Choose a region…"
          style={{ maxWidth: "18rem" }}
        />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          value: {JSON.stringify(picked)}
        </p>
      </>
    );
  },
};

/** Pre-selected and disabled: the label rides the control, the gate is
 * shut. */
export const Disabled = {
  render: () => (
    <TreeSelect value="hangzhou" data={REGIONS} disabled style={{ maxWidth: "18rem" }} />
  ),
};
