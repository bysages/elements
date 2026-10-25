// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

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
});

describe("TreeView nav options", () => {
  it("renders nav icons, meta, and a scoped trailing slot", () => {
    const host = defineComponent({
      setup() {
        return () =>
          h(
            TreeView as never,
            {
              options,
              defaultValue: ["elements"],
              label: "Workspace",
            } as never,
            {
              trailing: ({ node }: { node: { value: string } }) =>
                h("span", { "data-part": "node-action" }, `action:${node.value}`),
            } as never,
          );
      },
    });

    const container = document.createElement("div");
    document.body.append(container);
    createApp(host).mount(container);

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
    const host = defineComponent({
      setup() {
        return () =>
          h(
            TreeView as never,
            {
              options,
              expandedValue: ["projects"],
              "onUpdate:expandedValue": (value: string[]) => expanded.push(value.join(",")),
            } as never,
          );
      },
    });

    const container = document.createElement("div");
    document.body.append(container);
    createApp(host).mount(container);
    container.querySelector<HTMLButtonElement>('[data-part="branch-control"]')?.click();
    await nextTick();

    expect(expanded).toEqual([""]);
  });
});
