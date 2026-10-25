// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { TreeView, type TreeViewOption } from "./index";

const options: TreeViewOption[] = [
  {
    label: "Projects",
    value: "projects",
    icon: "folder",
    meta: "3",
    children: [{ label: "elements", value: "elements", icon: "file", meta: "12" }],
  },
];

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("TreeView nav options", () => {
  it("renders nav icons, meta, and trailing actions", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <TreeView
          options={options}
          defaultValue={["elements"]}
          label="Workspace"
          renderTrailing={(node) => <span data-part="node-action">action:{node.value}</span>}
        />
      ),
      container,
    );

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
    dispose = render(
      () => (
        <TreeView
          options={options}
          expandedValue={["projects"]}
          onExpandedChange={(value) => expanded.push(value.join(","))}
        />
      ),
      container,
    );
    container.querySelector<HTMLButtonElement>('[data-part="branch-control"]')?.click();
    await Promise.resolve();

    expect(expanded).toEqual([""]);
  });
});
