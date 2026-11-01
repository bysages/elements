// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiConversation } from "./index";

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

function mountConversation(autoScroll = true) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  const positions: number[] = [];

  act(() => {
    root?.render(
      <AiConversation autoScroll={autoScroll}>
        <p>Ink</p>
      </AiConversation>,
    );
  });

  const node = container.querySelector<HTMLElement>('[data-part="conversation"]');
  if (!node) throw new Error("conversation is missing");
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
  const node = document.querySelector<HTMLElement>('[data-part="conversation"]');
  node?.append(document.createElement("p"));
  await act(async () => {
    await Promise.resolve();
  });
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

  it("resumes after the cooldown following the return to the bottom", async () => {
    const { node, positions } = mountConversation();
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    node.scrollTop = 201;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 160));
    await grow();

    expect(positions.at(-1)).toBe(300);
  });
});
