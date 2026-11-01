// @vitest-environment happy-dom
import { describe, expect, it } from "vite-plus/test";

import { createConversationFollower } from "./conversation-scroll";

function createLog() {
  const node = document.createElement("div");
  document.body.append(node);
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

describe("createConversationFollower", () => {
  it("holds the viewport during the reader gesture cooldown", async () => {
    const { node, positions } = createLog();
    const stop = createConversationFollower(node, { cooldown: 1 });
    node.scrollTop = 50;
    node.dispatchEvent(new Event("scroll"));
    node.dispatchEvent(new WheelEvent("wheel"));
    node.append("more");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(positions).toEqual([50]);
    node.scrollTop = 201;
    node.dispatchEvent(new Event("scroll"));
    await new Promise((resolve) => setTimeout(resolve, 10));
    node.append("more");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(positions).toEqual([50, 201, 300]);
    stop();
  });

  it("keeps following without a recent gesture", async () => {
    const { node, positions } = createLog();
    const stop = createConversationFollower(node);
    node.append("more");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(positions).toEqual([300]);
    stop();
  });
});
