import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { CascadeSelect, type CascadeSelectNode } from ".";

const meta: Meta = { title: "Components/Forms/Cascade Select" };
export default meta;

const REGIONS: CascadeSelectNode[] = [
  {
    label: "广东省",
    value: "gd",
    children: [
      {
        label: "广州市",
        value: "gz",
        children: [
          { label: "越秀区", value: "yuexiu" },
          { label: "天河区", value: "tianhe" },
          { label: "海珠区", value: "haizhu" },
          { label: "荔湾区", value: "liwan" },
        ],
      },
      {
        label: "深圳市",
        value: "sz",
        children: [
          { label: "福田区", value: "futian" },
          { label: "南山区", value: "nanshan" },
          { label: "罗湖区", value: "luohu" },
        ],
      },
      {
        label: "珠海市",
        value: "zh",
        children: [{ label: "香洲区", value: "xiangzhou" }],
      },
    ],
  },
  {
    label: "浙江省",
    value: "zj",
    children: [
      {
        label: "杭州市",
        value: "hz",
        children: [
          { label: "西湖区", value: "xihu" },
          { label: "拱墅区", value: "gongshu" },
        ],
      },
      {
        label: "宁波市",
        value: "nb",
        children: [
          { label: "海曙区", value: "haishu" },
          { label: "鄞州区", value: "yinzhou" },
        ],
      },
    ],
  },
  {
    label: "江苏省",
    value: "js",
    children: [
      {
        label: "南京市",
        value: "nj",
        children: [
          { label: "玄武区", value: "xuanwu" },
          { label: "鼓楼区", value: "gulou" },
        ],
      },
    ],
  },
];

/** Walk the corridor: each click opens the next column, the leaf click
 * settles the path onto the trigger. */
export const Basic = {
  render: () => {
    const [picked, setPicked] = useState<string[][]>([]);
    return (
      <>
        <CascadeSelect
          value={picked}
          onValueChange={setPicked}
          data={REGIONS}
          placeholder="选择省 / 市 / 区"
        />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          path: {JSON.stringify(picked)}
        </p>
      </>
    );
  },
};

/** A path chosen up front rides back on the trigger, its checked leaf
 * already inked. */
export const InitialValue = {
  render: () => {
    const [picked, setPicked] = useState<string[][]>([["gd", "sz", "nanshan"]]);
    return (
      <>
        <CascadeSelect
          value={picked}
          onValueChange={setPicked}
          data={REGIONS}
          placeholder="选择省 / 市 / 区"
        />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          path: {JSON.stringify(picked)}
        </p>
      </>
    );
  },
};

/** Pointing is enough to unfold — the classic cascading menu. */
export const HoverTrigger = {
  render: () => {
    const [picked, setPicked] = useState<string[][]>([]);
    return (
      <CascadeSelect
        value={picked}
        onValueChange={setPicked}
        data={REGIONS}
        placeholder="Hover to walk…"
        highlightTrigger="hover"
      />
    );
  },
};

/** Locked fields neither walk nor settle. */
export const Disabled = {
  render: () => {
    const [picked, setPicked] = useState<string[][]>([["gd", "sz", "futian"]]);
    return (
      <CascadeSelect
        value={picked}
        onValueChange={setPicked}
        data={REGIONS}
        placeholder="选择省 / 市 / 区"
        disabled
      />
    );
  },
};

/** The corridor flattens into matching routes while a query runs — each
 * hit still reads as its full path. */
export const Filterable = {
  render: () => {
    const [picked, setPicked] = useState<string[][]>([]);
    return (
      <CascadeSelect
        value={picked}
        onValueChange={setPicked}
        data={REGIONS}
        filterable
        placeholder="选择省 / 市 / 区"
      />
    );
  },
};
