// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiConversation } from "./index";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

function mountConversation(autoScroll = true) {
  const container = document.createElement("div");
  document.body.append(container);
  dispose = render(() => <AiConversation autoScroll={autoScroll}>Ink</AiConversation>, container);
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
  return { node, positions };
}

async function grow() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  document.querySelector<HTMLElement>('[data-part="conversation"]')?.append(" more");
}

describe("AiConversation autoScroll", () => {
  it("follows stream growth while pinned to the bottom", async () => {
    const { node, positions } = mountConversation();
    node.scrollTop = 200;
    await grow();

    expect(positions.at(-1)).toBe(300);
  });

  it("stops following after the reader scrolls upward", async () => {
    const { node, positions } = mountConversation();
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    await grow();

    expect(positions.at(-1)).toBe(50);
  });

  it("resumes after the reader returns to the bottom", async () => {
    const { node, positions } = mountConversation();
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    node.scrollTop = 201;
    node.dispatchEvent(new Event("scroll"));
    await grow();

    expect(positions.at(-1)).toBe(300);
  });
});
