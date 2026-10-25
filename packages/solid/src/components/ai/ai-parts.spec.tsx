// @vitest-environment happy-dom
import type { UIMessage } from "ai";
import type { JSX } from "solid-js";
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiParts, toolPartDisplay } from "./parts";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("AiParts", () => {
  function mount(ui: () => JSX.Element, container = document.createElement("div")) {
    document.body.append(container);
    dispose = render(ui, container);
    return container;
  }

  it("renders SDK text and file parts with their native viewers", () => {
    const message: UIMessage = {
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
      ],
    };
    const container = mount(() => <AiParts message={message} />);

    expect(container.querySelector('[data-part="response"]')?.innerHTML).toContain("Ink answers.");
    const image = container.querySelector<HTMLImageElement>('[data-part="media"] img');
    expect(image?.src).toContain("data:image/png");
    expect(image?.alt).toBe("ink.png");
  });

  it("maps SDK approval state to shared tool actions", () => {
    const approved: string[] = [];
    const message: UIMessage<
      unknown,
      never,
      { search: { input: { query: string }; output: { hits: number } } }
    > = {
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
    const container = mount(() => (
      <AiParts message={message} onApprove={() => approved.push("yes")} />
    ));

    const actions = container.querySelector('[data-part="tool-actions"]');
    expect(actions).not.toBeNull();
    const buttons = actions!.querySelectorAll("button");
    buttons[buttons.length - 1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(approved).toEqual(["yes"]);
  });

  it("renders SDK source parts with typed application slots", () => {
    const message: UIMessage = {
      id: "message-sources",
      role: "assistant",
      parts: [
        { type: "source-url", sourceId: "source-1", url: "https://example.com", title: "Example" },
        {
          type: "source-document",
          sourceId: "source-2",
          mediaType: "application/pdf",
          title: "Spec",
        },
      ],
    };
    const container = mount(() => (
      <AiParts
        message={message}
        slots={{
          sourceUrl: ({ part }) => (
            <a data-test="source-url" href={part.url}>
              {part.title ?? part.url}
            </a>
          ),
          sourceDocument: ({ part }) => <output data-test="source-document">{part.title}</output>,
        }}
      />
    ));

    expect(container.querySelector<HTMLAnchorElement>('[data-test="source-url"]')?.href).toBe(
      "https://example.com/",
    );
    expect(container.querySelector('[data-test="source-document"]')?.textContent).toBe("Spec");
  });

  it("keeps application-owned data parts behind a typed slot", () => {
    const message: UIMessage<unknown, { status: { label: string } }> = {
      id: "message-3",
      role: "assistant",
      parts: [{ type: "data-status", data: { label: "Writing" } }],
    };
    const container = mount(() => (
      <AiParts
        message={message}
        slots={{
          data: ({ part }) => <output data-test="custom-data">{JSON.stringify(part.data)}</output>,
        }}
      />
    ));

    expect(container.querySelector('[data-test="custom-data"]')?.textContent).toContain("Writing");
  });

  it("maps denied SDK state onto the tool fold", () => {
    expect(
      toolPartDisplay({
        type: "dynamic-tool",
        toolName: "search",
        toolCallId: "call-1",
        state: "output-denied",
        input: { query: "ink" },
        approval: { id: "approval-1", approved: false },
      }),
    ).toEqual({
      name: "search",
      status: "denied",
      approval: "denied",
      input: { query: "ink" },
      output: undefined,
    });
  });
});
