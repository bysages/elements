import type { UIDataTypes, UIMessage } from "ai";
import { createRawSnippet, flushSync, mount, unmount } from "svelte";
import type { Component } from "svelte";
import type { Snippet } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { AiParts, toolPartDisplay, type AiPartsProps, type AiSdkMessage } from "./index";
import type { AiSdkSourceDocumentPart, AiSdkSourceUrlPart, AiSdkToolPart } from "./parts";

type WorkflowTools = {
  weather: { input: { city: string }; output: { degrees: number } };
};
type WorkflowMessage = UIMessage<unknown, UIDataTypes, WorkflowTools>;

beforeEach(() => {
  document.body.replaceChildren();
});

describe("Ai SDK integration contracts", () => {
  function mountAi<MESSAGE extends AiSdkMessage>(props: AiPartsProps<MESSAGE>) {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(AiParts as Component<AiPartsProps<MESSAGE>>, {
      target: container,
      props,
    });
    return { component, container };
  }

  it("narrows custom tool parts and reports approval", () => {
    const approved: Array<{ city: string; display: string }> = [];
    const message: WorkflowMessage = {
      id: "workflow-1",
      role: "assistant",
      parts: [
        {
          type: "tool-weather",
          toolCallId: "weather-1",
          state: "approval-requested",
          input: { city: "Ink City" },
          approval: { id: "approval-1" },
        },
      ],
    };
    const props: AiPartsProps<WorkflowMessage> = {
      message,
      onApprove: ({ part }: { part: AiSdkToolPart<WorkflowMessage> }) => {
        if (part.type === "tool-weather" && part.state === "approval-requested") {
          approved.push({
            city: part.input.city,
            display: toolPartDisplay(part).name,
          });
        }
      },
    };
    const { component, container } = mountAi(props);

    const actions = container.querySelector('[data-part="tool-actions"]');
    const buttons = actions?.querySelectorAll("button") ?? [];
    buttons[buttons.length - 1]?.click();
    flushSync();
    expect(approved).toEqual([{ city: "Ink City", display: "weather" }]);
    void unmount(component);
  });

  it("lets source snippets take over the whole source part", () => {
    const sourceUrl: Snippet<[AiSdkSourceUrlPart<WorkflowMessage>, number]> = createRawSnippet(
      (part: () => AiSdkSourceUrlPart<WorkflowMessage>) => ({
        render: () => `<a data-testid="custom-url" href="${part().url}">custom URL</a>`,
      }),
    );
    const sourceDocument: Snippet<[AiSdkSourceDocumentPart<WorkflowMessage>, number]> =
      createRawSnippet((part: () => AiSdkSourceDocumentPart<WorkflowMessage>) => ({
        render: () => `<span data-testid="custom-document">${part().title}</span>`,
      }));
    const message: WorkflowMessage = {
      id: "workflow-2",
      role: "assistant",
      parts: [
        { type: "source-url", sourceId: "one", url: "https://example.com" },
        {
          type: "source-document",
          sourceId: "two",
          mediaType: "text/plain",
          title: "Ink notes",
        },
      ],
    };
    const { component, container } = mountAi({
      message,
      sourceUrl,
      sourceDocument,
    });

    expect(container.querySelectorAll("[data-scope='ai'][data-part='sources']")).toHaveLength(0);
    expect(container.querySelector('[data-testid="custom-url"]')?.textContent).toBe("custom URL");
    expect(container.querySelector('[data-testid="custom-document"]')?.textContent).toBe(
      "Ink notes",
    );
    void unmount(component);
  });
});
