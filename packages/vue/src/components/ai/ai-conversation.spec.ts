// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, h } from "vue";

import { AiConversation } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
});

function mountConversation(autoScroll = true) {
  const container = document.createElement("div");
  document.body.append(container);
  const app = createApp({ render: () => h(AiConversation as never, { autoScroll }, () => "Ink") });
  app.mount(container);
  const node = container.querySelector<HTMLElement>('[data-part="conversation"]');
  if (!node) throw new Error("conversation is missing");
  const positions: number[] = [];
  Object.defineProperties(node, {
    clientHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, get: () => 300 },
    scrollTop: {
      configurable: true,
      get: () => positions.at(-1) ?? 0,
      set: (value: number) => positions.push(value),
    },
  });
  return { app, node, positions };
}

async function grow() {
  document
    .querySelector<HTMLElement>('[data-part="conversation"]')
    ?.append(document.createElement("p"));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("AiConversation autoScroll", () => {
  it("follows stream growth while pinned to the bottom", async () => {
    const { app, node, positions } = mountConversation();
    node.scrollTop = 200;
    await grow();
    expect(positions.at(-1)).toBe(300);
    app.unmount();
  });

  it("stops following while a reader gesture is still cooling down", async () => {
    const { app, node, positions } = mountConversation();
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    await grow();
    expect(positions.at(-1)).toBe(50);
    app.unmount();
  });

  it("resumes after the cooldown once the reader returns to the bottom", async () => {
    const { app, node, positions } = mountConversation();
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    node.scrollTop = 201;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 160));
    await grow();
    expect(positions.at(-1)).toBe(300);
    app.unmount();
  });
});
