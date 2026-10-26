// @vitest-environment happy-dom
import { createRawSnippet, mount, tick, unmount } from "svelte";
import type { ComponentProps } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

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

beforeEach(() => {
  document.body.replaceChildren();
});

describe("TreeView nav options", () => {
  it("renders nav icons, meta, and a real scoped trailing snippet", () => {
    const trailing = createRawSnippet<[TreeViewOption]>((node) => ({
      render: () => `<span data-part="node-action">action:${node().value}</span>`,
    }));
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(TreeView, {
      target: container,
      props: {
        options,
        defaultValue: ["elements"],
        label: "Workspace",
        trailing,
      } as unknown as ComponentProps<typeof TreeView>,
    });

    expect(container.querySelectorAll("svg")).toHaveLength(3);
    expect(container.querySelectorAll('[data-part="node-meta"]')).toHaveLength(2);
    expect(container.querySelector('[data-part="node-action"]')?.textContent).toBe(
      "action:projects",
    );
    expect(container.querySelector('[data-part="item"][data-selected]')?.textContent).toContain(
      "elements",
    );
    void unmount(component);
  });

  it("reports controlled expansion changes and collapses from the event", async () => {
    const expanded: string[][] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(TreeView, {
      target: container,
      props: {
        options,
        expandedValue: ["projects"],
        onExpandedChange: (value: string[]) => expanded.push(value),
      } as unknown as ComponentProps<typeof TreeView>,
    });
    await tick();

    expect(container.querySelector('[data-part="branch-content"]')).not.toBeNull();
    container.querySelector<HTMLElement>('[data-part="branch-control"]')?.click();
    await tick();

    expect(expanded).toEqual([[]]);
    expect(
      container.querySelector('[data-part="branch-content"]')?.getAttribute("data-state"),
    ).toBe("closed");
    void unmount(component);
  });
});
