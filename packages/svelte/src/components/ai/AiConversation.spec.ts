import { flushSync, mount, unmount } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";

import { AiConversation, AiJumpToLatest } from "./index";

const originalMutationObserver = globalThis.MutationObserver;
let observerCallbacks: Array<() => void> = [];

class FakeMutationObserver {
  callback: () => void;
  constructor(callback: MutationCallback) {
    this.callback = () => callback([], this as unknown as MutationObserver);
    observerCallbacks.push(this.callback);
  }
  observe(): void {}
  disconnect(): void {}
  takeRecords(): MutationRecord[] {
    return [];
  }
}

beforeEach(() => {
  document.body.replaceChildren();
  observerCallbacks = [];
  globalThis.MutationObserver = FakeMutationObserver as unknown as typeof MutationObserver;
});

afterEach(() => {
  globalThis.MutationObserver = originalMutationObserver;
});

describe("AiConversation auto scroll", () => {
  function mountConversation(autoScroll = true) {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(AiConversation, {
      target: container,
      props: { autoScroll, style: "height: 100px; overflow: auto" },
    });
    const root = container.querySelector<HTMLElement>("[data-part='conversation']");
    if (!root) throw new Error("conversation root is missing");
    flushSync();
    return { component, root };
  }

  function installLayout(root: HTMLElement, scrollHeight: () => number) {
    let scrollTop = 0;
    Object.defineProperty(root, "scrollHeight", {
      configurable: true,
      get: scrollHeight,
    });
    Object.defineProperty(root, "clientHeight", {
      configurable: true,
      get: () => 100,
    });
    Object.defineProperty(root, "scrollTop", {
      configurable: true,
      get: () => scrollTop,
      set: (value: number) => {
        scrollTop = value;
      },
    });
    return () => scrollTop;
  }

  function streamGrows() {
    observerCallbacks.forEach((callback) => callback());
    flushSync();
  }

  function scroll(root: HTMLElement, value: number) {
    root.scrollTop = value;
    root.dispatchEvent(new Event("scroll"));
    flushSync();
  }

  it("follows growth while pinned and stops when the reader scrolls up", () => {
    const { component, root } = mountConversation();
    let height = 200;
    const scrollTop = installLayout(root, () => height);

    height = 300;
    streamGrows();
    expect(scrollTop()).toBe(300);

    scroll(root, 80);
    height = 400;
    streamGrows();
    expect(scrollTop()).toBe(80);
    void unmount(component);
  });

  it("resumes after the cooldown when the reader returns to the bottom edge", async () => {
    vi.useFakeTimers();
    const { component, root } = mountConversation();
    let height = 200;
    const scrollTop = installLayout(root, () => height);

    height = 300;
    streamGrows();
    scroll(root, 80);
    height = 400;
    streamGrows();
    expect(scrollTop()).toBe(80);

    scroll(root, 320);
    await vi.advanceTimersByTimeAsync(160);
    height = 500;
    streamGrows();
    expect(scrollTop()).toBe(500);
    vi.useRealTimers();
    void unmount(component);
  });

  it("does not follow when auto scroll is off", () => {
    const { component, root } = mountConversation(false);
    const scrollTop = installLayout(root, () => 200);
    streamGrows();
    expect(observerCallbacks).toHaveLength(0);
    expect(scrollTop()).toBe(0);
    void unmount(component);
  });
});

describe("AiJumpToLatest", () => {
  function mountJumpToLatest() {
    const container = document.createElement("div");
    document.body.append(container);
    const conversationComponent = mount(AiConversation, {
      target: container,
      props: { style: "height: 100px; overflow: auto" },
    });
    const root = container.querySelector<HTMLElement>("[data-part='conversation']");
    if (!root) throw new Error("conversation root is missing");
    const holder = document.createElement("div");
    root.append(holder);
    const component = mount(AiJumpToLatest, {
      target: holder,
      props: { threshold: 96 },
    });
    const door = container.querySelector<HTMLButtonElement>("[data-part='jump-to-latest']");
    if (!door) throw new Error("jump door is missing");

    let scrollTop = 0;
    Object.defineProperties(root, {
      scrollHeight: { configurable: true, get: () => 300 },
      clientHeight: { configurable: true, get: () => 100 },
      scrollTop: {
        configurable: true,
        get: () => scrollTop,
        set: (value: number) => {
          scrollTop = value;
        },
      },
    });
    return { component, conversationComponent, root, door };
  }

  function scroll(root: HTMLElement, value: number) {
    root.scrollTop = value;
    root.dispatchEvent(new Event("scroll"));
    flushSync();
  }

  it("surfaces away from the bottom and jumps back to the live edge", () => {
    const { component, conversationComponent, root, door } = mountJumpToLatest();
    scroll(root, 60);
    expect(door.hasAttribute("data-visible")).toBe(true);

    door.click();
    expect(root.scrollTop).toBe(300);
    void unmount(component);
    void unmount(conversationComponent);
  });

  it("stays hidden while the log rests at the bottom edge", () => {
    const { component, conversationComponent, root, door } = mountJumpToLatest();
    scroll(root, 200);
    expect(door.hasAttribute("data-visible")).toBe(false);
    void unmount(component);
    void unmount(conversationComponent);
  });
});
