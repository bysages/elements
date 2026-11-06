// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, h } from "vue";

import { AiConversation, AiJumpToLatest } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
});

function mountConversation(autoScroll = true) {
  const container = document.createElement("div");
  document.body.append(container);
  const app = createApp({
    render: () =>
      h(AiConversation as never, { autoScroll, style: "overflow-y: auto" }, () => "Ink"),
  });
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
      set: (value: number) => {
        positions.push(value);
      },
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

  it("follows an outer transcript lane when the conversation does not scroll", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const lane = document.createElement("div");
    lane.style.overflowY = "auto";
    const positions: number[] = [];
    Object.defineProperties(lane, {
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
    container.append(lane);
    const app = createApp({
      render: () => h(AiConversation as never, { autoScroll: true }, () => "Ink"),
    });
    app.mount(lane);
    const node = lane.querySelector<HTMLElement>('[data-part="conversation"]');
    if (!node) throw new Error("conversation is missing");
    Object.defineProperties(node, {
      clientHeight: { configurable: true, value: 300 },
      scrollHeight: { configurable: true, get: () => 300 },
    });

    await grow();
    expect(positions.at(-1)).toBe(300);
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

function mountJumpToLatest() {
  const container = document.createElement("div");
  document.body.append(container);
  const app = createApp({
    render: () =>
      h(AiConversation as never, null, () => [
        h("p", "earlier ink"),
        h(AiJumpToLatest as never, { threshold: 96 }),
      ]),
  });
  app.mount(container);
  const node = container.querySelector<HTMLElement>('[data-part="conversation"]');
  const door = container.querySelector<HTMLElement>('[data-part="jump-to-latest"]');
  if (!node || !door) throw new Error("conversation or jump door is missing");
  Object.defineProperties(node, {
    clientHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, get: () => 300 },
    scrollTop: {
      configurable: true,
      get: () => (node as unknown as { _scrollTop?: number })._scrollTop ?? 0,
      set: (value: number) => {
        (node as unknown as { _scrollTop?: number })._scrollTop = value;
      },
    },
  });
  return { app, node, door };
}

describe("AiJumpToLatest", () => {
  it("surfaces while the reader is away from the bottom and jumps back", async () => {
    const { app, node, door } = mountJumpToLatest();
    node.scrollTop = 60;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(door.hasAttribute("data-visible")).toBe(true);
    (door as HTMLButtonElement).click();
    expect(node.scrollTop).toBe(300);
    app.unmount();
  });

  it("stays hidden while the log rests at the bottom edge", async () => {
    const { app, node, door } = mountJumpToLatest();
    node.scrollTop = 200;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(door.hasAttribute("data-visible")).toBe(false);
    app.unmount();
  });
});
