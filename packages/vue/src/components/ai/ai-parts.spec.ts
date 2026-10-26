import type { SourceDocumentUIPart, SourceUrlUIPart, UIMessage } from "ai";
// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import { AiParts, type AiPartsProps } from "./parts";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("AiParts", () => {
  function mount<MESSAGE extends UIMessage>(
    message: MESSAGE,
    handlers: { approve?: () => void; deny?: () => void } = {},
    slots?: Record<string, () => ReturnType<typeof h>>,
  ) {
    const host = defineComponent({
      setup() {
        return () =>
          h(
            AiParts as never,
            {
              message,
              onApprove: handlers.approve,
              onDeny: handlers.deny,
            } satisfies AiPartsProps<MESSAGE>,
            slots as never,
          );
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    return { app, container };
  }

  it("renders SDK text and file parts with their native viewers", async () => {
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
    const { container, app } = mount(message);
    await nextTick();

    expect(container.querySelector('[data-part="response"]')?.innerHTML).toContain("Ink answers.");
    const image = container.querySelector<HTMLImageElement>('[data-part="media"] img');
    expect(image?.src).toContain("data:image/png");
    expect(image?.alt).toBe("ink.png");
    app.unmount();
  });

  it("renders SDK source parts with typed application slots", async () => {
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
    const { container, app } = mount(message, {}, {
      sourceUrl: ({ part }: { part: SourceUrlUIPart }) =>
        h("a", { "data-test": "source-url", href: part.url }, part.title ?? part.url),
      sourceDocument: ({ part }: { part: SourceDocumentUIPart }) =>
        h("output", { "data-test": "source-document" }, part.title),
    } as never);
    await nextTick();

    const link = container.querySelector<HTMLAnchorElement>('[data-test="source-url"]');
    expect(link?.href).toBe("https://example.com/");
    expect(container.querySelector('[data-test="source-document"]')?.textContent).toBe("Spec");
    app.unmount();
  });

  it("maps SDK approval state to shared tool actions", async () => {
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
    const { container, app } = mount(message, { approve: () => approved.push("yes") });
    await nextTick();

    const actions = container.querySelector('[data-part="tool-actions"]');
    expect(actions).not.toBeNull();
    const buttons = actions!.querySelectorAll("button");
    buttons[buttons.length - 1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(approved).toEqual(["yes"]);
    app.unmount();
  });

  it("keeps application-owned data parts behind a typed slot", async () => {
    const message: UIMessage<unknown, { status: { label: string } }> = {
      id: "message-3",
      role: "assistant",
      parts: [{ type: "data-status", data: { label: "Writing" } }],
    };
    const { container, app } = mount(
      message,
      {},
      {
        data: () => h("output", { "data-test": "custom-data" }, "Writing"),
      },
    );
    await nextTick();

    expect(container.querySelector('[data-test="custom-data"]')?.textContent).toBe("Writing");
    app.unmount();
  });

  it("fires deny through the shared tool actions", async () => {
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
    const { container, app } = mount(message, { deny: () => denied.push("no") });
    await nextTick();

    const actions = container.querySelector('[data-part="tool-actions"]');
    const buttons = actions!.querySelectorAll("button");
    buttons[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(denied).toEqual(["no"]);
    app.unmount();
  });

  it("maps output-error parts to the error fold", async () => {
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
          errorText: "Line busy",
        },
      ],
    };
    const { container, app } = mount(message);
    await nextTick();

    expect(container.querySelector('[data-status="error"]')).not.toBeNull();
    expect(container.querySelector('[data-part="tool-body"]')?.textContent).toContain("Line busy");
    app.unmount();
  });

  it("maps output-denied parts to the denied fold", async () => {
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
          state: "output-denied",
          input: { query: "ink" },
          approval: { id: "approval-denied", approved: false },
        },
      ],
    };
    const { container, app } = mount(message);
    await nextTick();

    expect(container.querySelector('[data-status="denied"]')).not.toBeNull();
    app.unmount();
  });

  it("renders unknown parts through the fallback slot", async () => {
    const message = {
      id: "message-fallback",
      role: "assistant",
      parts: [{ type: "dimension-c-137", reality: "unknown" }],
    } as never as UIMessage;
    const { container, app } = mount(message, {}, {
      fallback: ({ part }: { part: { type: string } }) =>
        h("output", { "data-test": "fallback" }, part.type),
    } as never);
    await nextTick();

    expect(container.querySelector('[data-test="fallback"]')?.textContent).toBe("dimension-c-137");
    app.unmount();
  });
});
