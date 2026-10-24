// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h } from "vue";

import { AiTool } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("ai tool", () => {
  it("formats structured input and output", () => {
    const host = defineComponent({
      render: () =>
        h(AiTool, {
          name: "search",
          status: "completed",
          defaultOpen: true,
          inputValue: { query: "paper" },
          outputValue: { hits: 12 },
        }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    createApp(host).mount(container);
    const values = [...container.querySelectorAll("pre")].map((node) => node.textContent);

    expect(values).toEqual(['{\n  "query": "paper"\n}', '{\n  "hits": 12\n}']);
    container.remove();
  });

  it("renders denied state and approval actions", async () => {
    const decisions: string[] = [];
    const host = defineComponent({
      setup() {
        return () =>
          h(AiTool, {
            name: "write",
            status: "denied",
            defaultOpen: true,
            approval: "required",
            inputValue: { path: "/tmp" },
            onApprove: () => decisions.push("approve"),
            onDeny: () => decisions.push("deny"),
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    createApp(host).mount(container);
    const deny = [...container.querySelectorAll("button")].find(
      (node) => node.textContent === "Deny",
    );
    const approve = [...container.querySelectorAll("button")].find(
      (node) => node.textContent === "Approve",
    );
    deny?.click();
    approve?.click();

    expect(container.querySelector('[data-status="denied"]')).not.toBeNull();
    expect(container.querySelector('[data-approval="required"]')).not.toBeNull();
    expect(decisions).toEqual(["deny", "approve"]);
    container.remove();
  });
});
