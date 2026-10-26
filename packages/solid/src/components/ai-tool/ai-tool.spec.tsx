// @vitest-environment happy-dom
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiTool, type ToolApproval, type ToolStatus } from "./index";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("AiTool", () => {
  it("renders the denied presentation", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => <AiTool name="write" status="denied" defaultOpen inputValue={{ path: "/tmp" }} />,
      container,
    );

    expect(container.querySelector('[data-status="denied"]')).not.toBeNull();
    expect(container.querySelector('[data-part="tool-status"]')?.textContent).toBe("Denied");
  });

  it("reports approval decisions and presents their terminal states", async () => {
    const decisions: string[] = [];
    const [approval, setApproval] = createSignal<ToolApproval>("required");
    const [status, setStatus] = createSignal<ToolStatus>("pending");
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <AiTool
          name="write"
          status={status()}
          approval={approval()}
          defaultOpen
          onApprove={() => {
            decisions.push("approve");
            setApproval("approved");
            setStatus("completed");
          }}
          onDeny={() => {
            decisions.push("deny");
            setApproval("denied");
            setStatus("denied");
          }}
        />
      ),
      container,
    );

    const actions = () => [
      ...container.querySelectorAll<HTMLButtonElement>('[data-part="tool-actions"] button'),
    ];
    expect(actions().map((button) => button.textContent)).toEqual(["Deny", "Approve"]);

    actions()
      .find((button) => button.textContent === "Deny")
      ?.click();
    await Promise.resolve();
    expect(decisions).toEqual(["deny"]);
    expect(container.querySelector('[data-approval="denied"]')).not.toBeNull();
    expect(container.querySelector('[data-status="denied"]')).not.toBeNull();

    setApproval("required");
    setStatus("pending");
    await Promise.resolve();
    actions()
      .find((button) => button.textContent === "Approve")
      ?.click();
    await Promise.resolve();
    expect(decisions).toEqual(["deny", "approve"]);
    expect(container.querySelector('[data-approval="approved"]')).not.toBeNull();
    expect(container.querySelector('[data-status="completed"]')).not.toBeNull();
  });
});
