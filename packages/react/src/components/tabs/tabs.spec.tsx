// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { Tabs, type TabsFacadeProps } from "./index";

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

describe("tabs facade", () => {
  const items = [
    { value: "one", label: "One", content: "First" },
    { value: "two", label: "Two", content: "Second" },
  ];

  function mount(props: TabsFacadeProps) {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    act(() => {
      root?.render(<Tabs {...props} />);
    });

    return container;
  }

  it("renders its panels and keeps the machine selection", () => {
    const mounted = mount({ items, defaultValue: "two" });

    expect(mounted.querySelectorAll('[data-part="content"]')).toHaveLength(2);
    const selected = mounted.querySelector<HTMLButtonElement>(
      '[data-part="trigger"][data-selected]',
    );
    expect(selected?.textContent).toContain("Two");
  });

  it("renders a session strip without panels", () => {
    const mounted = mount({ items, contentless: true, scrollable: true });

    expect(mounted.querySelectorAll('[data-part="content"]')).toHaveLength(0);
    expect(mounted.querySelector('[data-part="list"]')?.hasAttribute("data-scrollable")).toBe(true);
  });

  it("uses a sibling close control and reports the closed item", () => {
    const closed: string[] = [];
    const mounted = mount({
      items,
      contentless: true,
      closable: true,
      onClose: (item) => closed.push(item.value),
    });

    const close = mounted.querySelector<HTMLButtonElement>('[data-part="close"]');
    expect(close?.getAttribute("aria-label")).toBe("Close One");
    expect(close?.closest('[data-part="trigger"]')).toBeNull();
    act(() => {
      close?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(closed).toEqual(["one"]);
  });

  it("supports disabled items, icons, and per-item closability", () => {
    const mounted = mount({
      items: [{ value: "one", label: "One", icon: "file", disabled: true, closable: true }],
      contentless: true,
    });
    const trigger = mounted.querySelector<HTMLButtonElement>('[data-part="trigger"]');

    expect(trigger?.hasAttribute("data-disabled")).toBe(true);
    expect(trigger?.querySelector("svg")).not.toBeNull();
    expect(trigger?.hasAttribute("data-closable")).toBe(true);
    expect(mounted.querySelector<HTMLButtonElement>('[data-part="close"]')?.disabled).toBe(true);
  });
});
