// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { AiTool } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

describe("ai tool", () => {
  it("formats structured input and output", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <AiTool
          name="search_web"
          status="completed"
          defaultOpen
          inputValue={{ query: "paper" }}
          outputValue={{ hits: 12 }}
        />,
      );
    });

    const values = [...container.querySelectorAll("pre")].map((node) => node.textContent);
    expect(values).toEqual(['{\n  "query": "paper"\n}', '{\n  "hits": 12\n}']);
  });

  it("renders denied state and reports approval decisions", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const decisions: string[] = [];

    act(() => {
      root.render(
        <AiTool
          name="write_file"
          status="denied"
          defaultOpen
          approval="required"
          inputValue={{ path: "/tmp" }}
          onApprove={() => decisions.push("approve")}
          onDeny={() => decisions.push("deny")}
        />,
      );
    });
    const deny = [...container.querySelectorAll("button")].find(
      (node) => node.textContent === "Deny",
    );
    const approve = [...container.querySelectorAll("button")].find(
      (node) => node.textContent === "Approve",
    );

    act(() => {
      deny?.click();
      approve?.click();
    });

    expect(container.querySelector('[data-status="denied"]')).not.toBeNull();
    expect(container.querySelector('[data-approval="required"]')).not.toBeNull();
    expect(decisions).toEqual(["deny", "approve"]);
  });
});
