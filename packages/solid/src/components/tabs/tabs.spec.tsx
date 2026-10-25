import { render } from "solid-js/web";
// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { Tabs, type TabsFacadeProps } from "./index";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("tabs facade", () => {
  const items = [
    { value: "one", label: "One", content: "First" },
    { value: "two", label: "Two", content: "Second" },
  ];

  function mount(props: TabsFacadeProps, container = document.createElement("div")) {
    document.body.append(container);
    dispose = render(() => <Tabs {...props} />, container);
    return container;
  }

  it("renders its panels and keeps the machine selection", () => {
    const container = mount({ items, defaultValue: "two" });

    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(2);
    const selected = container.querySelector<HTMLButtonElement>(
      '[data-part="trigger"][data-selected]',
    );
    expect(selected?.textContent).toContain("Two");
  });

  it("renders a session strip without panels", () => {
    const container = mount({ items, contentless: true, scrollable: true });

    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(0);
    expect(container.querySelector('[data-part="list"]')?.hasAttribute("data-scrollable")).toBe(
      true,
    );
  });

  it("uses a sibling close control and reports the closed item", () => {
    const closed: string[] = [];
    const container = mount({
      items,
      contentless: true,
      closable: true,
      onClose: (item) => closed.push(item.value),
    });

    const close = container.querySelector<HTMLButtonElement>('[data-part="close"]');
    expect(close?.getAttribute("aria-label")).toBe("Close One");
    expect(close?.closest('[data-part="trigger"]')).toBeNull();
    close?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    expect(closed).toEqual(["one"]);
  });

  it("supports disabled items, icons, and per-item closability", () => {
    const container = mount({
      items: [{ value: "one", label: "One", icon: "file", disabled: true, closable: true }],
      contentless: true,
    });
    const trigger = container.querySelector<HTMLButtonElement>('[data-part="trigger"]');

    expect(trigger?.hasAttribute("data-disabled")).toBe(true);
    expect(trigger?.querySelector("svg")).not.toBeNull();
    expect(trigger?.hasAttribute("data-closable")).toBe(true);
    expect(container.querySelector<HTMLButtonElement>('[data-part="close"]')?.disabled).toBe(true);
  });
});
