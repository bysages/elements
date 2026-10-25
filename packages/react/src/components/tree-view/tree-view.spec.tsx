// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { TreeView } from "./index";

const options = [
  {
    label: "Projects",
    value: "projects",
    icon: "folder",
    meta: "3",
    children: [{ label: "elements", value: "elements", icon: "file", meta: "12" }],
  },
];

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

describe("TreeView nav options", () => {
  it("renders nav icons, meta, and trailing actions", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <TreeView
          options={options}
          defaultValue={["elements"]}
          label="Workspace"
          renderTrailing={(node) => <span data-part="node-action">action:{node.value}</span>}
        />,
      );
    });

    expect(container.querySelectorAll("svg")).toHaveLength(3);
    expect(container.querySelectorAll('[data-part="node-meta"]')).toHaveLength(2);
    expect(container.querySelector('[data-part="node-action"]')?.textContent).toBe(
      "action:projects",
    );
    expect(container.querySelector('[data-part="item"][data-selected]')?.textContent).toContain(
      "elements",
    );
  });

  it("reports controlled expansion changes", async () => {
    const expanded: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <TreeView
          options={options}
          expandedValue={["projects"]}
          onExpandedChange={(value) => expanded.push(value.join(","))}
        />,
      );
    });
    await act(async () => {
      container.querySelector<HTMLButtonElement>('[data-part="branch-control"]')?.click();
    });

    expect(expanded).toEqual([""]);
  });
});
