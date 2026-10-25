import { flushSync, mount, unmount } from "svelte";
import type { ComponentProps } from "svelte";
// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { AiParts, toolPartDisplay } from "./index";
import type { AiSdkMessage, AiSdkToolPart } from "./parts";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("AiParts", () => {
  function mountAi(props: ComponentProps<typeof AiParts>) {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(AiParts, { target: container, props });
    return { component, container };
  }

  it("renders SDK text and file parts with their native viewers", () => {
    const message: AiSdkMessage = {
      id: "message-1",
      role: "assistant",
      parts: [
        { type: "text", text: "Ink answers." },
        {
          type: "file",
          mediaType: "image/png",
          url: "data:image/png;base64,ink",
          filename: "ink.png",
        },
        {
          type: "reasoning-file",
          mediaType: "application/pdf",
          url: "data:application/pdf;base64,reasoning",
        },
      ],
    };
    const { component, container } = mountAi({ message });

    expect(container.querySelector('[data-part="response"]')?.innerHTML).toContain("Ink answers.");
    const image = container.querySelector<HTMLImageElement>('[data-part="media"] img');
    expect(image?.src).toContain("data:image/png");
    expect(image?.alt).toBe("ink.png");
    const fileLink = container.querySelector<HTMLAnchorElement>('[data-part="file-link"]');
    expect(fileLink?.href).toContain("data:application/pdf");
    void unmount(component);
  });

  it("maps SDK approval state to shared tool actions", () => {
    const approved: string[] = [];
    const message: AiSdkMessage = {
      id: "message-2",
      role: "assistant",
      parts: [
        {
          type: "tool-search",
          toolCallId: "call-1",
          state: "approval-requested",
          input: { query: "ink" },
          approval: { id: "approval-1" },
        },
      ],
    };
    const { component, container } = mountAi({
      message,
      onApprove: ({ part }: { part: AiSdkToolPart }) => approved.push(toolPartDisplay(part).name),
    });

    const actions = container.querySelector('[data-part="tool-actions"]');
    const buttons = actions?.querySelectorAll("button") ?? [];
    buttons[buttons.length - 1]?.click();
    flushSync();
    expect(approved).toEqual(["search"]);
    void unmount(component);
  });

  it("maps denied and failed SDK states without a live message", () => {
    const denied = toolPartDisplay({
      type: "dynamic-tool",
      toolName: "search",
      toolCallId: "call-2",
      state: "output-denied",
      input: { query: "ink" },
      approval: { id: "approval-2", approved: false },
    });
    const failed = toolPartDisplay({
      type: "tool-search",
      toolCallId: "call-3",
      state: "output-error",
      input: { query: "ink" },
      errorText: "The ink ran dry",
    });

    expect(denied).toMatchObject({
      name: "search",
      status: "denied",
      approval: "denied",
    });
    expect(failed).toMatchObject({
      name: "search",
      status: "error",
      output: "The ink ran dry",
    });
  });
});
