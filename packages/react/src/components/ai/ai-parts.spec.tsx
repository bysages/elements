// @vitest-environment happy-dom
import type { UIMessage } from "ai";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiParts, toolPartDisplay } from "./parts";

let container: HTMLDivElement | undefined;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  root?.unmount();
  root = undefined;
  container?.remove();
  container = undefined;
});

describe("AiParts", () => {
  function mount(ui: React.ReactElement) {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    act(() => {
      root?.render(ui);
    });

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
    const mounted = mount(<AiParts message={message} />);

    expect(mounted.querySelector('[data-part="response"]')?.innerHTML).toContain("Ink answers.");
    const image = mounted.querySelector<HTMLImageElement>('[data-part="media"] img');
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
    const mounted = mount(<AiParts message={message} onApprove={() => approved.push("yes")} />);

    const actions = mounted.querySelector('[data-part="tool-actions"]');
    expect(actions).not.toBeNull();
    const buttons = actions!.querySelectorAll("button");
    act(() => {
      buttons[buttons.length - 1]?.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    });
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
    const mounted = mount(
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
      />,
    );

    expect(mounted.querySelector<HTMLAnchorElement>('[data-test="source-url"]')?.href).toBe(
      "https://example.com/",
    );
    expect(mounted.querySelector('[data-test="source-document"]')?.textContent).toBe("Spec");
  });

  it("keeps application-owned data parts behind a typed slot", () => {
    const message: UIMessage<unknown, { status: { label: string } }> = {
      id: "message-3",
      role: "assistant",
      parts: [{ type: "data-status", data: { label: "Writing" } }],
    };
    const mounted = mount(
      <AiParts
        message={message}
        slots={{
          data: ({ part }) => <output data-test="custom-data">{JSON.stringify(part.data)}</output>,
        }}
      />,
    );

    expect(mounted.querySelector('[data-test="custom-data"]')?.textContent).toContain("Writing");
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
  it("maps an approved SDK response state onto the tool fold", () => {
    const message: UIMessage<
      unknown,
      never,
      { search: { input: { query: string }; output: { hits: number } } }
    > = {
      id: "message-approved",
      role: "assistant",
      parts: [
        {
          type: "tool-search",
          toolCallId: "call-approved",
          state: "approval-responded",
          input: { query: "ink" },
          approval: { id: "approval-approved", approved: true },
        },
      ],
    };
    const mounted = mount(<AiParts message={message} />);
    const tool = mounted.querySelector('[data-ai="tool"]');

    expect(tool?.getAttribute("data-approval")).toBe("approved");
    expect(mounted.querySelector('[data-part="tool-actions"]')).toBeNull();
  });

  it("maps a denied SDK response state onto the tool fold", () => {
    const message: UIMessage<
      unknown,
      never,
      { search: { input: { query: string }; output: { hits: number } } }
    > = {
      id: "message-denied",
      role: "assistant",
      parts: [
        {
          type: "tool-search",
          toolCallId: "call-denied",
          state: "approval-responded",
          input: { query: "ink" },
          approval: { id: "approval-denied", approved: false },
        },
      ],
    };
    const mounted = mount(<AiParts message={message} />);
    const tool = mounted.querySelector('[data-ai="tool"]');

    expect(tool?.getAttribute("data-approval")).toBe("denied");
    expect(mounted.querySelector('[data-part="tool-actions"]')).toBeNull();
  });

  it("opens an SDK tool error on its error presentation", () => {
    const message: UIMessage<
      unknown,
      never,
      { search: { input: { query: string }; output: { hits: number } } }
    > = {
      id: "message-error",
      role: "assistant",
      parts: [
        {
          type: "tool-search",
          toolCallId: "call-error",
          state: "output-error",
          input: { query: "ink" },
          errorText: "The ink ran dry.",
        },
      ],
    };
    const mounted = mount(<AiParts message={message} />);
    const tool = mounted.querySelector('[data-ai="tool"]');

    expect(tool?.getAttribute("data-status")).toBe("error");
    expect(mounted.querySelector('[data-part="tool-body"]')?.textContent).toContain(
      "The ink ran dry.",
    );
  });

  it("reports the SDK deny action for a required tool", () => {
    const denied: string[] = [];
    const message: UIMessage<
      unknown,
      never,
      { search: { input: { query: string }; output: { hits: number } } }
    > = {
      id: "message-deny",
      role: "assistant",
      parts: [
        {
          type: "tool-search",
          toolCallId: "call-deny",
          state: "approval-requested",
          input: { query: "ink" },
          approval: { id: "approval-deny" },
        },
      ],
    };
    const mounted = mount(<AiParts message={message} onDeny={() => denied.push("no")} />);

    const actions = mounted.querySelector('[data-part="tool-actions"]');
    expect(actions).not.toBeNull();
    const buttons = actions!.querySelectorAll("button");
    act(() => {
      buttons[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(denied).toEqual(["no"]);
  });

  it("renders unknown SDK parts through the fallback slot", () => {
    const message = {
      id: "message-unknown",
      role: "assistant",
      parts: [{ type: "future-part", value: "Reserved" }],
    } as unknown as UIMessage;
    const mounted = mount(
      <AiParts
        message={message}
        slots={{
          fallback: ({ part }) => <output data-test="fallback">{JSON.stringify(part)}</output>,
        }}
      />,
    );

    expect(mounted.querySelector('[data-test="fallback"]')?.textContent).toContain("future-part");
  });
});
