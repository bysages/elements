import { createSignal } from "solid-js";

import { TreeSelect, type TreeSelectNode } from ".";

const meta = { title: "Components/Forms/Tree Select", component: TreeSelect };
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
    const [picked, setPicked] = createSignal("");

    return (
      <>
        <TreeSelect
          value={picked()}
          onValueChange={setPicked}
          data={REGIONS}
          placeholder="Choose a region…"
          style={{ "max-inline-size": "18rem" }}
        />
        <p
          style={{ "font-size": "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}
        >
          value: {JSON.stringify(picked())}
        </p>
      </>
    );
  },
};

/** Pre-selected and disabled: the label rides the control, the gate is
 * shut. */
export const Disabled = {
  render: () => (
    <TreeSelect value="hangzhou" data={REGIONS} disabled style={{ "max-inline-size": "18rem" }} />
  ),
};

/** A filter line at the top of the vessel: matches keep their ancestors
 * and every branch on the way stands open, so a deep hit still reads in
 * its hierarchy. */
export const Filterable = {
  render: () => {
    const [picked, setPicked] = createSignal("");

    return (
      <>
        <TreeSelect
          value={picked()}
          onValueChange={setPicked}
          data={REGIONS}
          filterable
          placeholder="Choose a region…"
          style={{ "max-inline-size": "18rem" }}
        />
        <p
          style={{ "font-size": "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}
        >
          value: {JSON.stringify(picked())}
        </p>
      </>
    );
  },
};
