// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { AiConversation, AiJumpToLatest } from "./index";

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
      set: (value: number) => {
        positions.push(value);
      },
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

function mountJumpToLatest() {
  const container = document.createElement("div");
  document.body.append(container);
  const positions: number[] = [];
  dispose = render(
    () => (
      <AiConversation>
        <p>earlier ink</p>
        <AiJumpToLatest threshold={96} />
      </AiConversation>
    ),
    container,
  );
  const node = container.querySelector<HTMLElement>('[data-part="conversation"]');
  const door = container.querySelector<HTMLElement>('[data-part="jump-to-latest"]');
  if (!node || !door) throw new Error("conversation or jump door is missing");
  Object.defineProperties(node, {
    clientHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, get: () => 300 },
    scrollTop: {
      configurable: true,
      get: () => positions.at(-1) ?? 0,
      set: (value: number) => {
        positions.push(value);
      },
    },
  });
  return { node, positions, door };
}

describe("AiJumpToLatest", () => {
  it("surfaces while the reader is away from the bottom and jumps back", async () => {
    const { node, positions, door } = mountJumpToLatest();
    node.scrollTop = 60;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(door.hasAttribute("data-visible")).toBe(true);
    door.click();
    expect(positions.at(-1)).toBe(300);
  });

  it("stays hidden while the log rests at the bottom edge", async () => {
    const { node, door } = mountJumpToLatest();
    node.scrollTop = 200;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(door.hasAttribute("data-visible")).toBe(false);
  });
});
